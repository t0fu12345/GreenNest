import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authApi from '../services/authApi';

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const STORAGE_KEYS = {
  TOKEN: 'greennest_token',
  REMEMBERED_EMAIL: 'greennest_remembered_email',
};

const LEGACY_DOMAIN_KEYS = [
  'greennest_user',
  'greennest_session',
  'greennest_guest_garden',
  'greenNest_starredPlants',
  'livingCanopyStarredPlants',
  'livingCanopyGardenPlants',
  'greenNest_registered_users',
  'greenNest_gallery_likes',
  'greenNest_user_collections',
  'token',
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save the authenticated session to LocalStorage and cookies
  const saveSession = useCallback((userObj, jwtToken, rememberMe = true) => {
    setUser(userObj);
    setToken(jwtToken);
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, jwtToken);
    
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, userObj.email || '');
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
    }
  }, []);

  // Clear the authenticated session
  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }, []);

  // Restore the session when the application reloads
  useEffect(() => {
    const restoreSession = async () => {
      try {
        LEGACY_DOMAIN_KEYS.forEach(key => localStorage.removeItem(key));
        deleteCookie('greennest_jwt');
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (savedToken) {
          setToken(savedToken);
          const res = await authApi.getMe();
          const userData = res?.data?.user || res?.data;
          if (userData?.id || userData?._id) {
            setUser({
              id: userData._id || userData.id,
              name: userData.fullName || userData.name,
              email: userData.email,
              role: userData.role || 'user',
              avatar: userData.avatarUrl || userData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
              token: savedToken
            });
            return;
          }
          clearSession();
        }
      } catch (err) {
        console.warn('Session expired or invalid:', err.message);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();

    const handleAuthExpired = () => {
      clearSession();
    };
    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, [clearSession]);

  // Sign in through the backend API. Server-side authentication is authoritative.
  const login = async (identifier, password, rememberMe = true) => {
    try {
      let emailInput = (identifier || '').trim().toLowerCase();
      const passwordInput = (password || '').trim();

      if (!emailInput || !passwordInput) {
        return { success: false, message: 'Please enter both Email and Password.' };
      }

      // 1. Try the backend API
      try {
        const res = await authApi.login({ email: emailInput, password: passwordInput });
        if (res && res.data && res.data.token) {
          const tokenVal = res.data.token;
          const userVal = res.data.user;
          const normalizedUser = {
            id: userVal.id || userVal._id,
            name: userVal.fullName,
            email: userVal.email,
            role: userVal.role,
            avatar: userVal.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            token: tokenVal
          };

          saveSession(normalizedUser, tokenVal, rememberMe);

          return {
            success: true,
            isAdmin: normalizedUser.role === 'admin',
            user: normalizedUser,
            message: 'Signed in successfully!'
          };
        }
      } catch (apiErr) {
        console.warn('Backend login attempt unsuccessful:', apiErr.message);
        if (apiErr.status === 401) {
          return {
            success: false,
            message: apiErr.message || 'Invalid email or password.'
          };
        }
        if (apiErr.code === 'NETWORK_ERROR' || !apiErr.status) {
          return {
            success: false,
            message: 'Network Error: Cannot connect to backend server on http://localhost:5000.'
          };
        }
        return {
          success: false,
          message: apiErr.message || 'Login failed.'
        };
      }

      return {
        success: false,
        message: 'Invalid email or password. Please try again!'
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Incorrect email or password. Please try again!'
      };
    }
  };

  // Register a new account through the backend API
  const register = async ({ name, email, password }) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      const cleanName = (name || '').trim();

      const payload = {
        fullName: cleanName,
        email: cleanEmail,
        password: cleanPassword
      };

      // 1. Send registration to backend API
      try {
        const res = await authApi.register(payload);
        if (res && res.data && res.data.token) {
          const tokenVal = res.data.token;
          const userVal = res.data.user;
          const normalizedUser = {
            id: userVal.id || userVal._id,
            name: userVal.fullName,
            email: userVal.email,
            role: userVal.role || 'user',
            avatar: userVal.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            token: tokenVal
          };

          saveSession(normalizedUser, tokenVal, true);

          return {
            success: true,
            user: normalizedUser,
            message: 'Account registered successfully!'
          };
        }
      } catch (apiErr) {
        console.warn('Backend register attempt failed:', apiErr);
        if (apiErr.status) {
          return {
            success: false,
            message: apiErr.message || 'Registration failed on server.'
          };
        }
        return {
          success: false,
          message: 'Network Error: Cannot connect to backend server on port 5000.'
        };
      }

      return {
        success: false,
        message: 'Unable to register account. Please try again.'
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Unable to register account. Please try again.'
      };
    }
  };

  // Sign out
  const logout = () => {
    clearSession();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    STORAGE_KEYS,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

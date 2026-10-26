import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authApi from '../services/authApi';
import gardenApi from '../services/gardenApi';
import { DATABASE_USERS } from '../data/botanicalSpecimens';

// Cookie helper utilities
export const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const serialized = encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value);
  document.cookie = `${name}=${serialized}; expires=${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      try {
        const decoded = decodeURIComponent(c.substring(nameEQ.length));
        try {
          return JSON.parse(decoded);
        } catch {
          return decoded;
        }
      } catch (err) {
        return null;
      }
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

export const STORAGE_KEYS = {
  TOKEN: 'greennest_token',
  LEGACY_TOKEN: 'token',
  CURRENT_USER: 'greennest_user',
  REMEMBERED_EMAIL: 'greennest_remembered_email',
  COOKIE_JWT: 'greennest_jwt',
  COOKIE_SESSION: 'greennest_session',
  GUEST_GARDEN: 'greennest_guest_garden',
  LEGACY_STARRED: 'greenNest_starredPlants',
  REGISTERED_USERS: 'greenNest_registered_users'
};

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
    localStorage.setItem(STORAGE_KEYS.LEGACY_TOKEN, jwtToken);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
    
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, userObj.email || '');
      setCookie(STORAGE_KEYS.COOKIE_JWT, jwtToken, 30);
      setCookie(STORAGE_KEYS.COOKIE_SESSION, userObj, 30);
    } else {
      setCookie(STORAGE_KEYS.COOKIE_JWT, jwtToken, 1);
      setCookie(STORAGE_KEYS.COOKIE_SESSION, userObj, 1);
    }
  }, []);

  // Clear the authenticated session
  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    deleteCookie(STORAGE_KEYS.COOKIE_JWT);
    deleteCookie(STORAGE_KEYS.COOKIE_SESSION);
  }, []);

  // Trigger hybrid sync after login (localStorage to MongoDB)
  const triggerHybridSync = useCallback(async () => {
    try {
      const guestPlants = [];
      const storedGuest = localStorage.getItem(STORAGE_KEYS.GUEST_GARDEN);
      const storedStarred = localStorage.getItem(STORAGE_KEYS.LEGACY_STARRED);
      
      if (storedGuest) {
        try { guestPlants.push(...JSON.parse(storedGuest)); } catch {}
      }
      if (storedStarred) {
        try { guestPlants.push(...JSON.parse(storedStarred)); } catch {}
      }

      const uniqueIds = Array.from(new Set(guestPlants.filter(Boolean)));
      if (uniqueIds.length > 0) {
        await gardenApi.syncGarden(uniqueIds);
        localStorage.removeItem(STORAGE_KEYS.GUEST_GARDEN);
        localStorage.removeItem(STORAGE_KEYS.LEGACY_STARRED);
      }
    } catch (err) {
      console.warn('Hybrid sync error:', err.message);
    }
  }, []);

  // Restore the session when the application reloads
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN) 
          || localStorage.getItem(STORAGE_KEYS.LEGACY_TOKEN)
          || getCookie(STORAGE_KEYS.COOKIE_JWT);

        if (savedToken) {
          setToken(savedToken);
          // Validate the saved token through /auth/me when the backend is available
          try {
            const res = await authApi.getMe();
            if (res && res.data && res.data.user) {
              const userData = res.data.user;
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
          } catch {
            // Restore from the local cache when the backend is offline
            const savedUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            if (savedUserStr) {
              setUser(JSON.parse(savedUserStr));
              return;
            }
          }
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

  // Sign in through the backend API with an offline fallback
  const login = async (identifier, password, rememberMe = true) => {
    try {
      let emailInput = (identifier || '').trim().toLowerCase();
      const passwordInput = (password || '').trim();

      if (!emailInput || !passwordInput) {
        return { success: false, message: 'Please enter both Email and Password.' };
      }

      // Support quick-login aliases
      if (emailInput === 'admin') emailInput = 'admin@greennest.com';
      if (emailInput === 'admin@greennest.vn') emailInput = 'admin@greennest.com';
      if (emailInput === 'nam.le' || emailInput === 'alex') emailInput = 'alex.pham@example.com';

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
          triggerHybridSync();

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
  const register = async ({ name, email, password, nickname, preferredBiome = 'tropical' }) => {
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
          triggerHybridSync();

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

  // Simulate Google login
  const loginWithGoogle = async () => {
    return login('admin@greennest.com', 'AdminCanopy2026!', true);
  };

  const getAllUsers = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return (DATABASE_USERS && DATABASE_USERS.length > 0)
      ? DATABASE_USERS.map((u, idx) => ({
          id: u.id || `usr_${idx + 1}`,
          name: u.fullName,
          fullName: u.fullName,
          email: u.email,
          role: u.role || 'user',
          avatar: u.avatar || u.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
          biome: 'Global Botanical Network'
        }))
      : [
          { id: '1', name: 'Elena Vu (Master Admin)', fullName: 'Elena Vu (Master Admin)', email: 'admin@greennest.com', role: 'admin', avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80', biome: 'Global Botanical Network' },
          { id: '2', name: 'Alexandre Pham', fullName: 'Alexandre Pham', email: 'alex.pham@example.com', role: 'user', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', biome: 'Tropical Biome' }
        ];
  }, []);

  const updateUserRole = (userId, newRole) => {
    const users = getAllUsers();
    const updated = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updated));
    return { success: true, users: updated };
  };

  const deleteUser = (userId) => {
    const users = getAllUsers();
    const updated = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updated));
    return { success: true, users: updated };
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
    loginWithGoogle,
    STORAGE_KEYS,
    triggerHybridSync,
    getAllUsers,
    updateUserRole,
    deleteUser
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

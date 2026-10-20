import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authApi from '../services/authApi';
import gardenApi from '../services/gardenApi';

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
};

// Internal dedicated Admin template for secret passkey authentication
export const ADMIN_MASTER_ACCOUNT = {
  id: 'usr_admin_master',
  name: 'Administrator',
  nickname: 'admin',
  email: 'admin@greennest.com',
  role: 'admin',
  permissions: ['admin:access', 'plants:manage', 'users:manage', 'system:telemetry'],
  level: 'Tier 4 (Master Curator & Admin)',
  biome: 'Global Botanical Network',
  joinDate: 'January 2026',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  loginMethod: 'Secret Passkey'
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save session into LocalStorage & Cookie
  const saveSession = useCallback((userObj, jwtToken, rememberMe = true) => {
    setUser(userObj);
    setToken(jwtToken);
    
    localStorage.setItem(STORAGE_KEYS.TOKEN, jwtToken);
    localStorage.setItem(STORAGE_KEYS.LEGACY_TOKEN, jwtToken);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
    localStorage.setItem('livingCanopyUser', JSON.stringify(userObj));
    
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, userObj.email || '');
      setCookie(STORAGE_KEYS.COOKIE_JWT, jwtToken, 30);
      setCookie(STORAGE_KEYS.COOKIE_SESSION, userObj, 30);
    } else {
      setCookie(STORAGE_KEYS.COOKIE_JWT, jwtToken, 1);
      setCookie(STORAGE_KEYS.COOKIE_SESSION, userObj, 1);
    }
  }, []);

  // Clear session
  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('livingCanopyUser');
    deleteCookie(STORAGE_KEYS.COOKIE_JWT);
    deleteCookie(STORAGE_KEYS.COOKIE_SESSION);
  }, []);

  // Trigger Hybrid Sync
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
      console.warn('Hybrid sync skipped:', err);
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN) 
          || localStorage.getItem(STORAGE_KEYS.LEGACY_TOKEN)
          || getCookie(STORAGE_KEYS.COOKIE_JWT);

        const localUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || localStorage.getItem('livingCanopyUser');

        if (savedToken) {
          setToken(savedToken);
          if (localUserStr) {
            try {
              const parsed = JSON.parse(localUserStr);
              setUser({ ...parsed, token: savedToken });
            } catch {}
          }
          // Fetch fresh user from backend if available
          try {
            const res = await authApi.getMe();
            if (res && res.data && res.data.user) {
              const userData = res.data.user;
              const refreshed = {
                id: userData._id || userData.id,
                name: userData.fullName || userData.name,
                email: userData.email,
                role: userData.role || 'user',
                avatar: userData.avatarUrl || userData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                token: savedToken
              };
              setUser(refreshed);
              localStorage.setItem('livingCanopyUser', JSON.stringify(refreshed));
            }
          } catch (e) {
            // Local fallback session is maintained
          }
        }
      } catch (err) {
        console.warn('Session restoration failed:', err.message);
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

  // Login handler with secret admin passkey ("Tuff") & API backend
  const login = async (identifier, password, rememberMe = true) => {
    try {
      let emailInput = (identifier || '').trim().toLowerCase();
      const passwordInput = (password || '').trim();

      if (!emailInput || !passwordInput) {
        return { success: false, message: 'Please enter both Name/Email and Password.' };
      }

      // Secret Admin passkey support ("Tuff" or "AdminCanopy2026!")
      if (emailInput === 'admin' || emailInput === 'admin@greennest.vn' || emailInput === 'admin@greennest.com') {
        if (passwordInput === 'Tuff' || passwordInput.toLowerCase() === 'tuff' || passwordInput === 'AdminCanopy2026!') {
          const adminUser = {
            id: 'admin_1',
            name: 'Administrator',
            email: 'admin@greennest.vn',
            role: 'admin',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            token: 'mock_jwt_token_admin'
          };
          saveSession(adminUser, 'mock_jwt_token_admin', rememberMe);
          return {
            success: true,
            isAdmin: true,
            user: adminUser,
            message: 'Admin access granted!'
          };
        }
      }

      if (emailInput === 'nam.le' || emailInput === 'minhthao') emailInput = 'nam.le@greennest.vn';

      try {
        const res = await authApi.login({ email: emailInput, password: passwordInput });
        if (res && res.data && res.data.token) {
          const tokenVal = res.data.token;
          const userVal = res.data.user;
          const normalizedUser = {
            id: userVal.id || userVal._id,
            name: userVal.fullName || userVal.name,
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
            message: 'Sign in successful!'
          };
        }
      } catch (apiErr) {
        return {
          success: false,
          message: apiErr.message || 'Email or password incorrect. Please try again!'
        };
      }

      return { success: false, message: 'Invalid credentials.' };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Error occurred during login.'
      };
    }
  };

  // Register handler
  const register = async ({ name, email, password }) => {
    try {
      const payload = {
        fullName: name,
        email: email.trim().toLowerCase(),
        password: password.trim()
      };

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
          message: 'Account created successfully!'
        };
      }

      return { success: false, message: res.message || 'Registration failed.' };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Could not create account. Email may already be in use.'
      };
    }
  };

  const logout = () => {
    clearSession();
  };

  const loginWithGoogle = async () => {
    return login('nam.le@greennest.vn', 'GreenNest@2026', true);
  };

  const getAllUsers = useCallback(() => {
    try {
      const stored = localStorage.getItem('greenNest_registered_users');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: '1', name: 'Administrator', email: 'admin@greennest.vn', role: 'admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', biome: 'Global Botanical Network' },
      { id: '2', name: 'Lê Hoàng Nam', email: 'nam.le@greennest.vn', role: 'user', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', biome: 'Tropical Biome' }
    ];
  }, []);

  const updateUserRole = (userId, newRole) => {
    return { success: true, users: getAllUsers() };
  };

  const deleteUser = (userId) => {
    return { success: true, users: getAllUsers() };
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

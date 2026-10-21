import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signJwt, verifyJwt, decodeJwt } from '../utils/jwt';
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

const STORAGE_KEYS = {
  CURRENT_USER: 'livingCanopyUser',
  JWT_TOKEN: 'greenNest_jwt_token',
  REGISTERED_USERS: 'greenNest_registered_users',
  REMEMBERED_EMAIL: 'greenNest_remembered_email',
  COOKIE_SESSION: 'greenNest_session',
  COOKIE_JWT: 'greenNest_jwt'
};

// Map initial system accounts directly from MongoDB seed dataset (users.json)
const INITIAL_REGISTERED_USERS = (DATABASE_USERS && DATABASE_USERS.length > 0)
  ? DATABASE_USERS.map((u, idx) => ({
      id: u.id || `usr_db_${idx + 1}`,
      name: u.fullName,
      nickname: u.email === 'admin@greennest.com' ? 'admin' : (u.nickname || u.email.split('@')[0]),
      email: u.email,
      password: u.role === 'admin' ? 'AdminCanopy2026!' : 'GreenCanopy2026',
      avatar: u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      role: u.role || 'user',
      status: u.status || 'active',
      savedGardenSlugs: u.savedGardenSlugs || [],
      permissions: u.role === 'admin'
        ? ['admin:access', 'plants:manage', 'users:manage', 'collections:manage', 'system:telemetry']
        : ['garden:access', 'plants:view'],
      level: u.role === 'admin' ? 'Tier 4 (Master Curator & Admin)' : 'Tier 2 (Botanical Naturalist)',
      biome: 'Global Botanical Network',
      joinDate: 'January 2026',
      loginMethod: 'Nickname/Email'
    }))
  : [
      {
        id: 'usr_admin_001',
        name: 'Elena Vu (Master Admin)',
        nickname: 'admin',
        email: 'admin@greennest.com',
        password: 'AdminCanopy2026!',
        avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
        role: 'admin',
        permissions: ['admin:access', 'plants:manage', 'users:manage', 'collections:manage', 'system:telemetry'],
        level: 'Tier 4 (Master Curator & Admin)',
        biome: 'Global Botanical Network',
        joinDate: 'January 2026',
        loginMethod: 'Nickname/Email'
      }
    ];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and ensure registered users list in localStorage
  const getRegisteredUsers = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (stored) {
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge in any DB users that might not be in localStorage yet
          INITIAL_REGISTERED_USERS.forEach(dbU => {
            if (!parsed.some(existing => existing.email.toLowerCase() === dbU.email.toLowerCase())) {
              parsed.push(dbU);
            }
          });

          // Ensure every user has nickname
          parsed = parsed.map(u => {
            if (!u.nickname) {
              if (u.role === 'admin' || u.email === 'admin@greennest.com') {
                u.nickname = 'admin';
              } else {
                u.nickname = (u.email ? u.email.split('@')[0] : (u.name ? u.name.toLowerCase().replace(/\s+/g, '') : 'user'));
              }
            }
            return u;
          });

          // Ensure admin account always exists in list
          if (!parsed.some(u => u.role === 'admin' || u.email === 'admin@greennest.com' || u.nickname === 'admin')) {
            parsed.unshift(INITIAL_REGISTERED_USERS[0]);
          }
          localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(parsed));
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error parsing registered users from localStorage:', e);
    }
    // Seed initial demo and admin user from DB
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(INITIAL_REGISTERED_USERS));
    return INITIAL_REGISTERED_USERS;
  }, []);

  // Restore and verify JWT session on mount
  useEffect(() => {
    try {
      let storedToken = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN) || getCookie(STORAGE_KEYS.COOKIE_JWT);
      let localUserStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

      if (storedToken) {
        // Cryptographic / Expiration verification of JWT
        const verification = verifyJwt(storedToken);
        if (verification.valid && verification.payload) {
          setToken(storedToken);
          
          let userData = null;
          if (localUserStr) {
            try {
              userData = JSON.parse(localUserStr);
            } catch {}
          }
          if (!userData) {
            userData = {
              id: verification.payload.sub,
              name: verification.payload.name,
              email: verification.payload.email,
              role: verification.payload.role || 'user',
              permissions: verification.payload.permissions || [],
              biome: verification.payload.biome || 'Tropical Biome',
              avatar: verification.payload.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
            };
          }
          
          userData.token = storedToken;
          setUser(userData);
          setCookie(STORAGE_KEYS.COOKIE_SESSION, userData, 7);
          setCookie(STORAGE_KEYS.COOKIE_JWT, storedToken, 7);
          setLoading(false);
          return;
        } else {
          console.warn('JWT Verification failed:', verification.error);
          // Token expired or invalid -> clear stale session
          localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
          deleteCookie(STORAGE_KEYS.COOKIE_JWT);
          deleteCookie(STORAGE_KEYS.COOKIE_SESSION);
        }
      }
    } catch (err) {
      console.error('Error restoring JWT session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.CURRENT_USER || e.key === STORAGE_KEYS.JWT_TOKEN) {
        const storedToken = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
        if (storedToken) {
          const verification = verifyJwt(storedToken);
          if (verification.valid) {
            setToken(storedToken);
            try {
              setUser(JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)));
            } catch {}
            return;
          }
        }
        setUser(null);
        setToken(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login handler with JWT issuance supporting Nickname or Email
  const login = (identifier, password, rememberMe = true) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanId || !cleanPassword) {
      return { success: false, message: 'Please enter both your Nickname (or Email) and Password.' };
    }

    const users = getRegisteredUsers();
    // Allow matching by nickname, email, or exact full name
    const foundUser = users.find(u => 
      (u.nickname && u.nickname.toLowerCase() === cleanId) ||
      (u.email && u.email.toLowerCase() === cleanId) ||
      (u.name && u.name.toLowerCase() === cleanId)
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'Account or Nickname does not exist. Please check your credentials or create a new account!'
      };
    }

    if (foundUser.password !== cleanPassword) {
      return {
        success: false,
        message: 'Incorrect password. Please try again!'
      };
    }

    // Role and Permissions
    const userRole = foundUser.role || 'user';
    const permissions = foundUser.permissions || (
      userRole === 'admin'
        ? ['admin:access', 'plants:manage', 'users:manage', 'collections:manage', 'system:telemetry']
        : ['garden:access', 'plants:view']
    );

    // Issue JWT Token with nickname claim
    const jwtPayload = {
      sub: foundUser.id || `usr_${Date.now()}`,
      nickname: foundUser.nickname || cleanId,
      email: foundUser.email,
      name: foundUser.name,
      role: userRole,
      permissions: permissions,
      biome: foundUser.biome || 'Tropical Biome',
      avatar: foundUser.avatar
    };

    const validitySeconds = rememberMe ? 30 * 86400 : 7 * 86400;
    const issuedJwt = signJwt(jwtPayload, validitySeconds);

    // Prepare active session object
    const sessionUser = {
      id: foundUser.id || `usr_${Date.now()}`,
      name: foundUser.name,
      nickname: foundUser.nickname || cleanId,
      email: foundUser.email,
      avatar: foundUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: userRole,
      permissions: permissions,
      level: foundUser.level || (userRole === 'admin' ? "Tier 4 (Admin)" : "Tier 1 (Steward)"),
      biome: foundUser.biome || "Tropical Biome",
      joinDate: foundUser.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      loginMethod: "Nickname",
      token: issuedJwt
    };

    // Save JWT & User to LocalStorage
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, issuedJwt);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));

    // Save to Cookies
    setCookie(STORAGE_KEYS.COOKIE_JWT, issuedJwt, rememberMe ? 30 : 7);
    setCookie(STORAGE_KEYS.COOKIE_SESSION, sessionUser, rememberMe ? 30 : 7);

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, cleanId);
      setCookie(STORAGE_KEYS.REMEMBERED_EMAIL, cleanId, 30);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      deleteCookie(STORAGE_KEYS.REMEMBERED_EMAIL);
    }

    setToken(issuedJwt);
    setUser(sessionUser);
    return { success: true, user: sessionUser, token: issuedJwt, isAdmin: userRole === 'admin' };
  };

  // Register handler with JWT issuance & nickname support
  const register = ({ name, nickname, email, password, preferredBiome = 'tropical' }) => {
    const cleanName = (name || '').trim();
    const cleanNickname = (nickname ? nickname.trim().toLowerCase().replace(/\s+/g, '') : cleanName.toLowerCase().replace(/\s+/g, '') || cleanEmail.split('@')[0]);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    if (cleanPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const users = getRegisteredUsers();
    const existing = users.find(u => 
      u.email.toLowerCase() === cleanEmail || 
      (u.nickname && u.nickname.toLowerCase() === cleanNickname)
    );
    if (existing) {
      if (existing.email.toLowerCase() === cleanEmail) {
        return {
          success: false,
          message: 'This email is already in use! Please log in or use another email.'
        };
      }
      return {
        success: false,
        message: 'This nickname is already taken! Please choose a different nickname.'
      };
    }

    const biomeLabel = preferredBiome === 'tropical' 
      ? 'Tropical Biome' 
      : (preferredBiome === 'subtropical' ? 'Subtropical Biome' : 'Arid Biome');

    const newUser = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      nickname: cleanNickname,
      email: cleanEmail,
      password: cleanPassword,
      role: 'user', // Default registered users are regular members
      permissions: ['garden:access', 'plants:view'],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      level: "Tier 1 (Apprentice)",
      biome: biomeLabel,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      loginMethod: "Nickname",
      createdAt: new Date().toISOString()
    };

    // Save to registered list
    const updatedUsers = [...users, newUser];
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));

    // Issue JWT
    const jwtPayload = {
      sub: newUser.id,
      nickname: newUser.nickname,
      email: newUser.email,
      name: newUser.name,
      role: 'user',
      permissions: newUser.permissions,
      biome: newUser.biome,
      avatar: newUser.avatar
    };
    const issuedJwt = signJwt(jwtPayload, 7 * 86400);

    const sessionUser = { ...newUser, token: issuedJwt };
    delete sessionUser.password;

    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, issuedJwt);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
    setCookie(STORAGE_KEYS.COOKIE_JWT, issuedJwt, 7);
    setCookie(STORAGE_KEYS.COOKIE_SESSION, sessionUser, 7);

    setToken(issuedJwt);
    setUser(sessionUser);
    return { success: true, user: sessionUser, token: issuedJwt, isAdmin: false };
  };

  // Social / Google login handler with JWT
  const loginWithGoogle = () => {
    const googleUser = {
      id: `google_${Date.now()}`,
      name: "Alex Morgan",
      email: "alex.morgan.botany@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "user",
      permissions: ['garden:access', 'plants:view'],
      level: "Tier 2 (Naturalist)",
      biome: "Tropical Biome",
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      loginMethod: "Google"
    };

    const issuedJwt = signJwt({
      sub: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      role: 'user',
      permissions: googleUser.permissions
    }, 7 * 86400);

    googleUser.token = issuedJwt;

    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, issuedJwt);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(googleUser));
    setCookie(STORAGE_KEYS.COOKIE_JWT, issuedJwt, 7);
    setCookie(STORAGE_KEYS.COOKIE_SESSION, googleUser, 7);

    const users = getRegisteredUsers();
    if (!users.some(u => u.email === googleUser.email)) {
      users.push({ ...googleUser, password: 'GoogleOAuthUser' });
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    }

    setToken(issuedJwt);
    setUser(googleUser);
    return { success: true, user: googleUser, token: issuedJwt, isAdmin: false };
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    deleteCookie(STORAGE_KEYS.COOKIE_SESSION);
    deleteCookie(STORAGE_KEYS.COOKIE_JWT);
    setUser(null);
    setToken(null);
  };

  // Admin capabilities: get all registered users
  const getAllUsers = () => {
    return getRegisteredUsers();
  };

  // Admin capabilities: promote/demote user role
  const updateUserRole = (userId, newRole) => {
    if (user?.role !== 'admin') {
      return { success: false, message: 'Exclusive permission required: Admin role only' };
    }
    const users = getRegisteredUsers();
    const updated = users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          permissions: newRole === 'admin' 
            ? ['admin:access', 'plants:manage', 'users:manage', 'system:telemetry']
            : ['garden:access', 'plants:view']
        };
      }
      return u;
    });
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updated));
    return { success: true, users: updated };
  };

  // Admin capabilities: delete user
  const deleteUser = (userId) => {
    if (user?.role !== 'admin') {
      return { success: false, message: 'Exclusive permission required: Admin role only' };
    }
    const users = getRegisteredUsers();
    const updated = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updated));
    return { success: true, users: updated };
  };

  // Check if current user has permission
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return user.permissions?.includes(permission) || false;
  };

  // Decoded claims
  const jwtClaims = token ? decodeJwt(token) : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        jwtClaims,
        loading,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin',
        login,
        register,
        loginWithGoogle,
        logout,
        hasPermission,
        getAllUsers,
        updateUserRole,
        deleteUser,
        STORAGE_KEYS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

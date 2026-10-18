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

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lưu phiên đăng nhập vào LocalStorage & Cookie
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

  // Xóa sạch phiên đăng nhập
  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    deleteCookie(STORAGE_KEYS.COOKIE_JWT);
    deleteCookie(STORAGE_KEYS.COOKIE_SESSION);
  }, []);

  // Tự động kích hoạt Hybrid Sync khi đăng nhập (Đồng bộ cây từ localStorage lên MongoDB)
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
        // Sau khi sync thành công lên MongoDB, dọn dẹp localStorage
        localStorage.removeItem(STORAGE_KEYS.GUEST_GARDEN);
        localStorage.removeItem(STORAGE_KEYS.LEGACY_STARRED);
      }
    } catch (err) {
      console.warn('Lỗi đồng bộ hybrid sync vườn cây:', err);
    }
  }, []);

  // Khôi phục phiên làm việc khi reload ứng dụng
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN) 
          || localStorage.getItem(STORAGE_KEYS.LEGACY_TOKEN)
          || getCookie(STORAGE_KEYS.COOKIE_JWT);

        if (savedToken) {
          setToken(savedToken);
          // Gọi API /auth/me để xác thực token và lấy thông tin mới nhất từ database
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
          }
        }
      } catch (err) {
        console.warn('Phiên đăng nhập đã hết hạn hoặc không hợp lệ:', err.message);
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();

    // Lắng nghe sự kiện token hết hạn từ apiClient
    const handleAuthExpired = () => {
      clearSession();
    };
    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, [clearSession]);

  // Đăng nhập kết nối API Backend thực tế
  const login = async (identifier, password, rememberMe = true) => {
    try {
      let emailInput = (identifier || '').trim().toLowerCase();
      const passwordInput = (password || '').trim();

      if (!emailInput || !passwordInput) {
        return { success: false, message: 'Vui lòng nhập đầy đủ Email và Mật khẩu.' };
      }

      // Hỗ trợ alias đăng nhập nhanh
      if (emailInput === 'admin') emailInput = 'admin@greennest.vn';
      if (emailInput === 'nam.le' || emailInput === 'minhthao') emailInput = 'nam.le@greennest.vn';

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

        // Kích hoạt đồng bộ Vườn cây
        triggerHybridSync();

        return {
          success: true,
          isAdmin: normalizedUser.role === 'admin',
          user: normalizedUser,
          message: 'Đăng nhập thành công!'
        };
      }

      return { success: false, message: res.message || 'Đăng nhập không thành công.' };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại!'
      };
    }
  };

  // Đăng ký tài khoản mới kết nối API Backend
  const register = async ({ name, email, password, nickname, preferredBiome }) => {
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
          message: 'Đăng ký tài khoản thành công!'
        };
      }

      return { success: false, message: res.message || 'Đăng ký không thành công.' };
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Không thể tạo tài khoản. Email có thể đã được sử dụng.'
      };
    }
  };

  // Đăng xuất
  const logout = () => {
    clearSession();
  };

  // Mô phỏng Google Login cho tài khoản mẫu
  const loginWithGoogle = async () => {
    return login('nam.le@greennest.vn', 'GreenNest@2026', true);
  };

  const getAllUsers = useCallback(() => {
    try {
      const stored = localStorage.getItem('greenNest_registered_users');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: '1', name: 'Quản Trị Viên GreenNest', email: 'admin@greennest.vn', role: 'admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', biome: 'Global Botanical Network' },
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

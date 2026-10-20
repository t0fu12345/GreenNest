import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getCookie } from '../context/AuthContext';

const Login = () => {
  const { login, STORAGE_KEYS } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'
  const [isToastActive, setIsToastActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If user previously checked remember me, prefill remembered nickname (if available)
  useEffect(() => {
    try {
      const remembered = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) || getCookie(STORAGE_KEYS.REMEMBERED_EMAIL);
      if (remembered) {
        setIdentifier(remembered);
      }
    } catch {}
  }, [STORAGE_KEYS]);

  const showNotification = (message, type = 'success', duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, duration);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      showNotification('Vui lòng nhập đầy đủ Email (hoặc Nickname) và Mật khẩu.', 'error');
      return;
    }

    setSubmitting(true);
    const result = await login(identifier, password, rememberMe);

    if (result.success) {
      if (result.isAdmin) {
        showNotification(`Xác thực thành công! Đã cấp quyền Quản trị viên & Token JWT. Đang vào Admin Portal...`, 'success');
        setTimeout(() => {
          navigate('/admin');
        }, 900);
      } else {
        showNotification(`Chào mừng trở lại, ${result.user.name}! Đăng nhập thành công. Đang chuyển hướng...`, 'success');
        setTimeout(() => {
          navigate('/');
        }, 900);
      }
    } else {
      setSubmitting(false);
      showNotification(result.message, 'error', 4000);
    }
  };


  return (
    <>
      {/* Background Nature Layers with Cinematic Vignette Fade */}
      <div className="nature-bg-layer"></div>
      <div className="nature-fade-overlay"></div>
      <div className="ambient-glow-circle"></div>

      {/* Top Navigation */}
      <header className="top-nav-bar">
        <Link to="/" className="brand-link" title="The Living Canopy">
          <svg className="brand-svg" viewBox="0 0 32 32" fill="none">
            <path d="M16 2C9.5 2 4.5 7.5 4.5 14C4.5 20.5 10 26 16 30C22 26 27.5 20.5 27.5 14C27.5 7.5 22.5 2 16 2ZM16 25C12 21.5 8 18 8 14C8 9.5 11.5 6 16 6C20.5 6 24 9.5 24 14C24 18 20 21.5 16 25Z" fill="currentColor" fillOpacity="0.3"/>
            <path d="M16 8C14 11 11 14 11 17C11 19.8 13.2 22 16 22C18.8 22 21 19.8 21 17C21 14 18 11 16 8Z" fill="currentColor"/>
            <circle cx="16" cy="17" r="2.5" fill="#ffffff"/>
          </svg>
          <span className="brand-name">The Living Canopy</span>
        </Link>

        <Link to="/" className="btn-return-home">
          <span>← Back to Overview</span>
        </Link>
      </header>

      {/* Login Glassmorphic Card */}
      <main className="auth-container">
        <div className="auth-header">
          <div className="auth-pill-badge">
            <span className="auth-pill-dot"></span>
            <span>DIGITAL BOTANY ECOSYSTEM</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to manage your private sanctuary and climate-tailored cultivation guide.</p>
        </div>


        {/* Nickname & Password Form */}
        <form className="auth-form" id="loginForm" onSubmit={handleLogin}>
          
          <div className="form-group">
            <label htmlFor="loginNickname" className="form-label">Your Nickname</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                id="loginNickname" 
                className="input-field" 
                placeholder="e.g. admin or minhthao" 
                required 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)} 
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">
              <label htmlFor="loginPassword">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn."); }}>Quên mật khẩu?</a>
            </div>
            <div className="input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="loginPassword" 
                className="input-field" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="current-password"
              />
              <button 
                type="button" 
                className="input-icon-btn" 
                onClick={() => setShowPassword(!showPassword)} 
                title="Hiện/Ẩn mật khẩu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8 -4 8 -11 8 -11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrap">
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <span>Ghi nhớ phiên đăng nhập (Cookie)</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-auth-submit" 
            id="submitBtn"
            disabled={submitting}
          >
            <span>{submitting ? 'Đang xác thực...' : 'Sign In to Sanctuary →'}</span>
          </button>

          {/* Toast Feedback */}
          <div 
            className={`login-status-toast ${isToastActive ? 'active' : ''}`} 
            id="loginToast"
            style={{
              borderColor: toastType === 'error' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 197, 94, 0.4)',
              background: toastType === 'error' ? 'rgba(35, 10, 10, 0.95)' : 'rgba(14, 30, 22, 0.95)'
            }}
          >
            <span>{toastType === 'error' ? '⚠️' : '🌿'}</span>
            <div id="toastMessage" style={{ color: toastType === 'error' ? '#fca5a5' : '#86efac' }}>
              {toastMessage}
            </div>
          </div>

        </form>

        <div className="auth-footer">
          Chưa có tài khoản GreenNest?{' '}
          <Link to="/register">Tạo tài khoản mới ngay →</Link>
        </div>
      </main>

      <div className="auth-page-credits">
        © 2026 The Living Canopy & GreenNest Consortium. All rights reserved.
      </div>
    </>
  );
};

export default Login;

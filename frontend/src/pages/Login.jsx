import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, getCookie } from '../context/AuthContext';

const Login = () => {
  const { login, loginWithGoogle, STORAGE_KEYS } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'
  const [isToastActive, setIsToastActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Secret Admin modal state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSubmitting, setAdminSubmitting] = useState(false);

  // If user previously checked remember me, prefill remembered name (exclude admin)
  useEffect(() => {
    try {
      const remembered = localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) || getCookie(STORAGE_KEYS.REMEMBERED_EMAIL);
      if (remembered && remembered.toLowerCase() === 'admin') {
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
        deleteCookie(STORAGE_KEYS.REMEMBERED_EMAIL);
        setIdentifier('');
      } else if (remembered) {
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

  // Check if transferred from a protected page like My Garden
  useEffect(() => {
    if (location.state?.message) {
      showNotification(location.state.message, 'error', 4500);
    }
  }, [location.state]);

  const handleSocialLogin = (provider) => {
    setSubmitting(true);
    showNotification(`Connecting via ${provider}... Sign in successful!`, 'success');
    loginWithGoogle();
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      showNotification('Please enter both Name and Password.', 'error');
      return;
    }

    setSubmitting(true);
    const result = login(identifier, password, rememberMe);

    if (result.success) {
      if (result.isAdmin) {
        showNotification(`Authentication successful! Accessing Admin Portal...`, 'success');
        setTimeout(() => {
          navigate('/admin');
        }, 900);
      } else {
        showNotification(`Welcome back, ${result.user.name}! Redirecting...`, 'success');
        setTimeout(() => {
          navigate('/');
        }, 900);
      }
    } else {
      setSubmitting(false);
      showNotification(result.message || 'Invalid credentials. Please try again.', 'error', 4000);
    }
  };

  const handleAdminQuickLogin = (e) => {
    e.preventDefault();
    const cleanPass = adminPassInput.trim();
    if (!cleanPass) {
      setAdminError('Vui lòng nhập mật khẩu.');
      return;
    }

    if (cleanPass !== 'Tuff' && cleanPass.toLowerCase() !== 'tuff') {
      setAdminError('Mật khẩu không chính xác. Vui lòng thử lại!');
      return;
    }

    setAdminSubmitting(true);
    const result = login('admin', 'AdminCanopy2026!');
    if (result.success) {
      setIsAdminModalOpen(false);
      showNotification('Đăng nhập Quản trị viên thành công! Đang chuyển tới Admin Portal...', 'success');
      setTimeout(() => {
        navigate('/admin');
      }, 700);
    } else {
      setAdminSubmitting(false);
      setAdminError(result.message || 'Lỗi xác thực quản trị viên.');
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

        {/* Continue with Google / Gmail */}
        <button 
          type="button" 
          className="btn-google-auth" 
          id="btnGoogleLogin" 
          onClick={() => handleSocialLogin('Google')}
          disabled={submitting}
        >
          <svg className="google-icon-svg" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.1-.7-.3-1.5-.3-2.4l.3-3z"/>
            <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"/>
          </svg>
          <span>Continue with Google / Gmail</span>
        </button>

        <div className="auth-divider">
          <span>Or continue with Name</span>
        </div>

        {/* Name & Password Form */}
        <form className="auth-form" id="loginForm" onSubmit={handleLogin}>
          
          <div className="form-group">
            <label htmlFor="loginNickname" className="form-label">Name</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                id="loginNickname" 
                className="input-field" 
                placeholder="e.g. Alex Morgan or user" 
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
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions have been sent to your email."); }}>Forgot password?</a>
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
                title="Toggle password visibility"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
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
              <span>Remember me (Cookie)</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn-auth-submit" 
            id="submitBtn"
            disabled={submitting}
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In to Sanctuary →'}</span>
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
          Don't have a GreenNest account?{' '}
          <Link to="/register">Create an account now →</Link>
        </div>
      </main>

      <div className="auth-page-credits">
        © 2026 The Living Canopy & GreenNest Consortium. All rights reserved.
      </div>

      {/* Dimmed Secret Admin Button in Corner */}
      <button
        type="button"
        onClick={() => {
          setIsAdminModalOpen(true);
          setAdminPassInput('');
          setAdminError('');
        }}
        title="Admin Portal Access"
        aria-label="Admin Access"
        style={{
          position: 'fixed',
          bottom: '18px',
          right: '18px',
          zIndex: 99,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(14, 30, 22, 0.55)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          color: 'rgba(255, 255, 255, 0.45)',
          fontSize: '0.74rem',
          fontWeight: 600,
          opacity: 0.2,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.95';
          e.currentTarget.style.color = '#fef08a';
          e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.5)';
          e.currentTarget.style.background = 'rgba(14, 30, 22, 0.95)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.2';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.background = 'rgba(14, 30, 22, 0.55)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>🔒</span>
        <span>Admin</span>
      </button>

      {/* Secret Admin Password Modal */}
      {isAdminModalOpen && (
        <div
          onClick={() => setIsAdminModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(3, 8, 5, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(14, 30, 22, 0.98)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '20px',
              maxWidth: '380px',
              width: '100%',
              padding: '28px 24px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(234, 179, 8, 0.15)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              aria-label="Đóng"
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.35)',
                fontSize: '1.5rem',
                marginBottom: '12px'
              }}>
                👑
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#ffffff', margin: 0 }}>
                Admin Portal
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.84rem', marginTop: '6px' }}>
                Nhập mật khẩu quản trị viên để tiếp tục
              </p>
            </div>

            <form onSubmit={handleAdminQuickLogin}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
                  Password
                </label>
                <input
                  type="password"
                  autoFocus
                  value={adminPassInput}
                  onChange={(e) => {
                    setAdminPassInput(e.target.value);
                    setAdminError('');
                  }}
                  placeholder="Nhập mật khẩu Admin..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(7, 16, 11, 0.85)',
                    border: adminError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease'
                  }}
                />
                {adminError && (
                  <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>⚠️</span>
                    <span>{adminError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={adminSubmitting}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#07100b',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(234, 179, 8, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                {adminSubmitting ? 'Đang xác thực...' : 'Đăng nhập Admin →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

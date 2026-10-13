import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('minhthao.botany@gmail.com');
  const [password, setPassword] = useState('GreenCanopy2026');
  const [toastMessage, setToastMessage] = useState('');
  const [isToastActive, setIsToastActive] = useState(false);
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    setToastMessage(`Authenticating via ${provider}... Connected successfully! Redirecting to Overview.`);
    setIsToastActive(true);
    const mockUser = {
      name: "Minh Thao",
      email: "minhthao.botany@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Tropical Botanist",
      level: "Tier 3",
      biome: "Tropical Biome",
      joinDate: "March 2026",
      loginMethod: provider
    };
    localStorage.setItem('livingCanopyUser', JSON.stringify(mockUser));
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setToastMessage(`Welcome back, ${email.split('@')[0]}! Sign in successful. Redirecting to Overview...`);
    setIsToastActive(true);
    const mockUser = {
      name: "Minh Thao",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      role: "Urban Plant Enthusiast",
      level: "Tier 1",
      biome: "Subtropical Biome",
      joinDate: "March 2026",
      loginMethod: "Email"
    };
    localStorage.setItem('livingCanopyUser', JSON.stringify(mockUser));
    setTimeout(() => {
      navigate('/');
    }, 900);
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
        <button type="button" className="btn-google-auth" id="btnGoogleLogin" onClick={() => handleSocialLogin('Google')}>
          <svg className="google-icon-svg" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.1-.7-.3-1.5-.3-2.4l.3-3z"/>
            <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"/>
          </svg>
          <span>Continue with Google / Gmail</span>
        </button>

        <div className="auth-divider">
          <span>Or sign in with Email</span>
        </div>

        {/* Email & Password Form */}
        <form className="auth-form" id="loginForm" onSubmit={handleEmailLogin}>
          
          <div className="form-group">
            <label htmlFor="loginEmail" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                id="loginEmail" 
                className="input-field" 
                placeholder="you@domain.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">
              <label htmlFor="loginPassword">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link will be sent to your email."); }}>Forgot password?</a>
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
              />
              <button 
                type="button" 
                className="input-icon-btn" 
                onClick={() => setShowPassword(!showPassword)} 
                title="Show/Hide password"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrap">
              <input type="checkbox" id="rememberMe" defaultChecked />
              <span>Remember me on this device</span>
            </label>
            <span style={{ fontSize: '0.78rem', color: '#86efac' }}>⚡ Prototype Mode</span>
          </div>

          <button type="submit" className="btn-auth-submit" id="submitBtn">
            <span>Sign In to Sanctuary →</span>
          </button>

          {/* Toast Feedback */}
          <div className={`login-status-toast ${isToastActive ? 'active' : ''}`} id="loginToast">
            <span>🌿</span>
            <div id="toastMessage">{toastMessage}</div>
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
    </>
  );
};

export default Login;

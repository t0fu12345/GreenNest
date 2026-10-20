import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredBiome, setPreferredBiome] = useState('tropical');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error'
  const [isToastActive, setIsToastActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showNotification = (message, type = 'success', duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, duration);
  };

  const handleSocialRegister = (provider) => {
    setSubmitting(true);
    showNotification(`Đã liên kết tài khoản ${provider}! Chào mừng bạn đến với GreenNest.`, 'success');
    loginWithGoogle();
    setTimeout(() => {
      navigate('/');
    }, 950);
  };

  const handleEmailRegister = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    if (password.length < 6) {
      showNotification('Password must be at least 6 characters.', 'error');
      return;
    }

    if (!agreeTerms) {
      showNotification('Please agree to the botanical care principles.', 'error');
      return;
    }

    setSubmitting(true);
    const result = register({
      name: name.trim(),
      nickname: (nickname || name).trim(),
      email: email.trim(),
      password,
      preferredBiome
    });

    if (result.success) {
      showNotification(`Account created successfully! Welcome, ${result.user.name}. Redirecting...`, 'success');
      setTimeout(() => {
        navigate('/');
      }, 950);
    } else {
      setSubmitting(false);
      showNotification(result.message || 'Error creating account. Please try again.', 'error', 4000);
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

      {/* Register Glassmorphic Card */}
      <main className="auth-container">
        <div className="auth-header">
          <div className="auth-pill-badge">
            <span className="auth-pill-dot"></span>
            <span>BEGIN BOTANICAL JOURNEY</span>
          </div>
          <h1 className="auth-title">Join The Living Canopy</h1>
          <p className="auth-subtitle">Create your GreenNest profile to curate and nurture your microclimate-standardized plant collection.</p>
        </div>

        {/* Continue with Google / Gmail */}
        <button 
          type="button" 
          className="btn-google-auth" 
          id="btnGoogleRegister" 
          onClick={() => handleSocialRegister('Google')}
          disabled={submitting}
        >
          <svg className="google-icon-svg" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.1-.7-.3-1.5-.3-2.4l.3-3z"/>
            <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"/>
          </svg>
          <span>Quick Sign Up with Google / Gmail</span>
        </button>

        <div className="auth-divider">
          <span>Or complete profile details</span>
        </div>

        {/* Registration Form */}
        <form className="auth-form" id="registerForm" onSubmit={handleEmailRegister}>
          
          <div className="form-group">
            <label htmlFor="regName" className="form-label">Name</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                id="regName" 
                className="input-field" 
                placeholder="e.g. Alex Morgan" 
                required 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNickname(e.target.value);
                }} 
                autoComplete="name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="regEmail" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                id="regEmail" 
                className="input-field" 
                placeholder="you@domain.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="regPassword" className="form-label">Password</label>
            <div className="input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="regPassword" 
                className="input-field" 
                placeholder="At least 6 characters" 
                required 
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="new-password"
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

          {/* Biome of Interest */}
          <div className="form-group">
            <div className="biome-choice-title">Primary Biome Focus:</div>
            <div className="biome-radio-group">
              <label 
                className={`biome-radio-label ${preferredBiome === 'tropical' ? 'selected' : ''}`} 
                onClick={() => setPreferredBiome('tropical')}
              >
                <input type="radio" name="preferredBiome" value="tropical" checked={preferredBiome === 'tropical'} readOnly />
                <span className="biome-icon">🌴</span>
                <span className="biome-name">Tropical</span>
              </label>
              <label 
                className={`biome-radio-label ${preferredBiome === 'subtropical' ? 'selected' : ''}`} 
                onClick={() => setPreferredBiome('subtropical')}
              >
                <input type="radio" name="preferredBiome" value="subtropical" checked={preferredBiome === 'subtropical'} readOnly />
                <span className="biome-icon">🌲</span>
                <span className="biome-name">Subtropical</span>
              </label>
              <label 
                className={`biome-radio-label ${preferredBiome === 'arid' ? 'selected' : ''}`} 
                onClick={() => setPreferredBiome('arid')}
              >
                <input type="radio" name="preferredBiome" value="arid" checked={preferredBiome === 'arid'} readOnly />
                <span className="biome-icon">🏜️</span>
                <span className="biome-name">Arid</span>
              </label>
            </div>
          </div>

          <label className="checkbox-wrap">
            <input 
              type="checkbox" 
              id="agreeTerms" 
              checked={agreeTerms} 
              onChange={(e) => setAgreeTerms(e.target.checked)} 
              required 
            />
            <span>I pledge to preserve ecological balance and uphold organic botanical care principles.</span>
          </label>

          <button 
            type="submit" 
            className="btn-auth-submit" 
            id="submitRegBtn"
            disabled={submitting}
          >
            <span>{submitting ? 'Creating account...' : 'Create Account & Enter Sanctuary →'}</span>
          </button>

          {/* Feedback Toast */}
          <div 
            className={`login-status-toast ${isToastActive ? 'active' : ''}`} 
            id="regToast"
            style={{
              borderColor: toastType === 'error' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 197, 94, 0.4)',
              background: toastType === 'error' ? 'rgba(35, 10, 10, 0.95)' : 'rgba(14, 30, 22, 0.95)'
            }}
          >
            <span>{toastType === 'error' ? '⚠️' : '🌿'}</span>
            <div id="regToastMsg" style={{ color: toastType === 'error' ? '#fca5a5' : '#86efac' }}>
              {toastMessage}
            </div>
          </div>

        </form>

        <div className="auth-footer">
          Already have a GreenNest account?{' '}
          <Link to="/login">Sign in here →</Link>
        </div>
      </main>

      <div className="auth-page-credits">
        © 2026 The Living Canopy & GreenNest Consortium. All rights reserved.
      </div>
    </>
  );
};

export default Register;

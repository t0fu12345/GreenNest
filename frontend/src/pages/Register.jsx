import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    if (name.trim().length < 2) {
      showNotification('Full name must be at least 2 characters.', 'error');
      return;
    }

    if (password.length < 6) {
      showNotification('Password must be at least 6 characters for security.', 'error');
      return;
    }

    if (!agreeTerms) {
      showNotification('Please agree to the botanical care principles.', 'error');
      return;
    }

    setSubmitting(true);
    const result = await register({
      name,
      email,
      password
    });

    if (result.success) {
      showNotification(`Account created successfully! Welcome ${result.user.name}. Redirecting...`, 'success');
      setTimeout(() => {
        navigate('/');
      }, 950);
    } else {
      setSubmitting(false);
      showNotification(result.message, 'error', 4000);
    }
  };

  return (
    <div className="auth-page-shell">
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


        {/* Registration Form */}
        <form className="auth-form" id="registerForm" onSubmit={handleEmailRegister}>
          
          <div className="form-group">
            <label htmlFor="regName" className="form-label">Full Name</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                id="regName" 
                className="input-field" 
                placeholder="e.g. Alex Morgan" 
                required 
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)} 
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
                placeholder="Minimum 6 characters" 
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
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
            <span>I commit to ecological preservation and organic plant care principles.</span>
          </label>

          <button 
            type="submit" 
            className="btn-auth-submit" 
            id="submitRegBtn"
            disabled={submitting}
          >
            <span>{submitting ? 'Creating Account...' : 'Create Account & Enter Sanctuary →'}</span>
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
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  const handleLogout = () => {
    try {
      logout();
    } catch (e) {
      localStorage.removeItem('livingCanopyUser');
      localStorage.removeItem('token');
    }
    setToastMessage('Logged out successfully. Redirecting to Home...');
    setTimeout(() => {
      navigate('/');
    }, 700);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 22, 13, 0.45) 0%, #000000 85%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Button on the top right to switch back to home */}
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '28px',
          right: '32px',
          zIndex: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#e2e8f0',
          padding: '10px 22px',
          borderRadius: '9999px',
          fontSize: '0.9rem',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(34, 197, 94, 0.18)';
          e.currentTarget.style.borderColor = '#22c55e';
          e.currentTarget.style.color = '#86efac';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.color = '#e2e8f0';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Home</span>
      </Link>

      {/* Log Out button in the middle of a black screen */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log Out"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
            color: '#fca5a5',
            padding: '16px 38px',
            borderRadius: '9999px',
            fontSize: '1.05rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(239, 68, 68, 0.15)',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.28)';
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            e.currentTarget.style.boxShadow = '0 18px 45px rgba(239, 68, 68, 0.35), 0 0 30px rgba(239, 68, 68, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.45)';
            e.currentTarget.style.color = '#fca5a5';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(239, 68, 68, 0.15)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>

      {/* Logout Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '36px',
            background: 'rgba(14, 30, 22, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid #22c55e',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '0.9rem',
            fontWeight: 500,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
            zIndex: 200,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Profile;

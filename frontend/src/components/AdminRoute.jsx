import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, token, isAdmin, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07100b',
        color: '#86efac',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        <span>🔐 Verifying cryptographic JWT token claims...</span>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, show Exclusive 403 Forbidden Access Screen
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07100b',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.12) 0%, transparent 60%)',
        color: '#f8fafc',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '540px',
          width: '100%',
          background: 'rgba(20, 10, 10, 0.92)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: 0,
          padding: '44px 32px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{
            fontSize: '3.2rem',
            marginBottom: '16px',
            filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.6))'
          }}>
            🛡️ 403
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '5px 14px',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '18px',
            borderRadius: 0
          }}>
            EXCLUSIVE LEVEL 4 CLEARANCE REQUIRED
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '2rem',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            Restricted Administrator Clearance
          </h2>

          <p style={{
            color: '#cbd5e1',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Your current session (<strong>{user?.email}</strong>) possesses <code>{user?.role || 'user'}</code> privileges.
            Your active RFC 7519 token claims do not include <code>admin:access</code> permissions required for this control center.
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '12px',
            fontSize: '0.76rem',
            color: '#94a3b8',
            marginBottom: '28px',
            wordBreak: 'break-all',
            textAlign: 'left',
            borderRadius: '8px'
          }}>
            <span style={{ color: '#f87171', fontWeight: 600 }}>JWT Claims:</span> role="{user?.role}" | permissions={JSON.stringify(user?.permissions || [])}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '10px 22px',
                fontSize: '0.86rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '9999px'
              }}
            >
              ← Return to Home
            </Link>

            <Link
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                color: '#fff',
                padding: '10px 22px',
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: '9999px'
              }}
            >
              Sign In with Admin Account →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;

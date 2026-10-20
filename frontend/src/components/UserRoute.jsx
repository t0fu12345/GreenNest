import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

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
        <span>🌿 Connecting to Conservatory Sanctuary...</span>
      </div>
    );
  }

  // When not in an account, automatically transfer into sign in or sign up page
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: 'Please sign in or create an account to access My Garden.'
        }}
      />
    );
  }

  // Admin accounts do not have personal gardens
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default UserRoute;

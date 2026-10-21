import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const User = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    description: '',
    emoji: '🌿'
  });

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#07100b',
      color: '#f8fafc',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      backgroundImage: `
        linear-gradient(180deg, rgba(7, 16, 11, 0.82) 0%, rgba(7, 16, 11, 0.58) 38%, rgba(7, 16, 11, 0.86) 75%, #07100b 100%),
        radial-gradient(circle at 50% 30%, rgba(34, 197, 94, 0.08) 0%, transparent 60%),
        url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1920&q=80')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Portal Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '130px 24px 80px 24px',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        zIndex: 1
      }}>
        {/* Header Block */}
        <div style={{ textAlign: 'center', maxWidth: '680px', marginBottom: '44px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            color: '#86efac',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.76rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '18px'
          }}>
            <span>🌿 Conservatory Gateway</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.18,
            marginBottom: '14px',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)'
          }}>
            My Botanical Space
          </h1>

          <p style={{
            color: '#cbd5e1',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Nurture your living specimens, track hydration cadences, and monitor microclimate sensors in your private botanical sanctuary.
          </p>

          {/* User Session Profile Pill Card */}
          {isAuthenticated && user ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '14px',
              padding: '12px 22px',
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)'
            }}>
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} 
                alt={user.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22c55e' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#f0fdf4' }}>
                  {user.name} {user.nickname && <span style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '0.8rem' }}>@{user.nickname}</span>} <span style={{ fontSize: '0.78rem', color: '#86efac', fontWeight: 500 }}>({user.role || 'Member'})</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {user.email} • <span style={{ color: '#cbd5e1' }}>{user.biome || 'Tropical Biome'}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto', flexWrap: 'wrap' }}>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    style={{
                      background: 'rgba(234, 179, 8, 0.2)',
                      border: '1px solid rgba(234, 179, 8, 0.5)',
                      color: '#fef08a',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    👑 Admin Portal →
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '9999px'
            }}>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8' }}>Not currently signed in.</span>
              <Link 
                to="/login"
                style={{
                  color: '#86efac',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Sign In Now →
              </Link>
            </div>
          )}
        </div>

        {/* Single Centered Sanctuary Portal Box */}
        <div style={{
          width: '100%',
          maxWidth: '560px',
          margin: '0 auto'
        }}>
          {/* Garden Portal -> Leads to /garden */}
          <Link
            to="/garden"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              position: 'relative',
              aspectRatio: '1.2 / 1',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              background: '#0e1e16',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(32px, 5vw, 48px)',
              boxShadow: '0 25px 55px -15px rgba(0, 0, 0, 0.85)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Background Image: Subtle Potted Plant */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.34,
              filter: 'saturate(0.9) contrast(1.05)',
              pointerEvents: 'none'
            }} />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(14, 30, 22, 0.75) 0%, rgba(10, 24, 17, 0.5) 45%, rgba(6, 15, 10, 0.94) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Content Layer */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              pointerEvents: 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: '#86efac' }}>
                  🌱 Personal Sanctuary
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#86efac', borderRadius: '9999px' }}>
                  Enter Sanctuary →
                </span>
              </div>

              <div style={{ margin: 'auto 0', padding: '14px 0' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.2rem, 3vw, 2.8rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '12px' }}>
                  My Garden Sanctuary
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', fontWeight: 300, lineHeight: 1.6 }}>
                  Your secluded private sanctuary. Monitor root zone hydration cadences, light exposure, and nurture living specimens in your personal space.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>
                  <span>Enter Living Garden</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div style={{ width: '42px', height: '42px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '1.2rem' }}>
                  🌿
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Modal Dialog */}
      {modalData.isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 8, 5, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 2500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(14, 30, 22, 0.98)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '36px',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>{modalData.emoji}</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginBottom: '12px' }}>
              {modalData.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {modalData.description}
            </p>
            <button
              type="button"
              onClick={closeModal}
              style={{
                background: 'var(--emerald-accent)',
                color: '#07100b',
                border: 'none',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default User;

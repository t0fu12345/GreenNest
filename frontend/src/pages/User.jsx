import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const User = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    description: '',
    emoji: '🌿'
  });

  const openModal = (title, description, emoji) => {
    setModalData({
      isOpen: true,
      title,
      description,
      emoji
    });
  };

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
            lineHeight: 1.6
          }}>
            Select your portal below. Nurture your personal collection or explore your curated herbarium archives.
          </p>
        </div>

        {/* 2 Square Boxes Grid (Sharp corners: borderRadius 0) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 440px))',
          gap: '48px',
          width: '100%',
          maxWidth: '960px',
          justifyContent: 'center'
        }}>
          {/* Left Box: Garden */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => openModal(
              'Garden',
              'Your private botanical garden & living specimen collection. Monitor individual pot hydration, soil microclimates, and growth rhythms.',
              '🪴'
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openModal(
                  'Garden',
                  'Your private botanical garden & living specimen collection. Monitor individual pot hydration, soil microclimates, and growth rhythms.',
                  '🪴'
                );
              }
            }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              borderRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.14)',
              background: '#0e1e16',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(28px, 4vw, 42px)',
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
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#fde68a', borderRadius: 0 }}>
                  Coming Soon
                </span>
              </div>

              <div style={{ margin: 'auto 0', padding: '14px 0' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 2.6vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '12px' }}>
                  Garden
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.88rem, 1.05vw, 0.96rem)', fontWeight: 300, lineHeight: 1.6 }}>
                  Your secluded private sanctuary. Monitor root zone hydration cadences, light exposure, and nurture living specimens in your personal space.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                  <span>Enter Garden</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                  🌿
                </div>
              </div>
            </div>
          </div>

          {/* Right Box: Personal Gallery */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              window.location.href = 'personal-gallery.html';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = 'personal-gallery.html';
              }
            }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              borderRadius: 0,
              border: '1px solid rgba(255, 255, 255, 0.14)',
              background: '#0e1e16',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(28px, 4vw, 42px)',
              boxShadow: '0 25px 55px -15px rgba(0, 0, 0, 0.85)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Background Image: Subtle Open Book on Desk (blurred/symbolic, text illegible) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.32,
              filter: 'blur(0.9px) saturate(0.85) contrast(1.1)',
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
                  📖 Herbarium Archive
                </span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', background: 'rgba(34, 197, 94, 0.18)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#86efac', borderRadius: 0 }}>
                  Open Archive →
                </span>
              </div>

              <div style={{ margin: 'auto 0', padding: '14px 0' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 2.6vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '12px' }}>
                  Personal Gallery
                </h2>
                <p style={{ color: '#cbd5e1', fontSize: 'clamp(0.88rem, 1.05vw, 0.96rem)', fontWeight: 300, lineHeight: 1.6 }}>
                  Your private botanical herbarium. Curate high-resolution specimen captures, botanical notes, and field illustrations in your personal study.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                  <span>Personal Gallery</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                  📚
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Coming Soon Modal */}
      {modalData.isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 8, 5, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0e1e16',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              borderRadius: 0,
              maxWidth: '480px',
              width: '100%',
              padding: '44px 38px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(34, 197, 94, 0.25)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#94a3b8',
                width: '34px',
                height: '34px',
                borderRadius: 0,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
              {modalData.emoji}
            </div>

            <div>
              <span style={{
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#fde68a',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                padding: '4px 14px',
                display: 'inline-block',
                marginBottom: '16px',
                borderRadius: 0
              }}>
                Feature Under Cultivation
              </span>
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.9rem',
              color: '#ffffff',
              marginBottom: '12px',
              lineHeight: 1.25
            }}>
              {modalData.title} — Coming Soon
            </h3>

            <p style={{
              color: '#cbd5e1',
              fontSize: '0.95rem',
              lineHeight: 1.65,
              marginBottom: '28px',
              fontWeight: 300
            }}>
              {modalData.description} This space is currently under active cultivation and will be unveiled in the upcoming release.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={closeModal}
                style={{
                  background: '#22c55e',
                  color: '#05140b',
                  fontWeight: 700,
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: 0,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  letterSpacing: '0.05em'
                }}
              >
                Got It
              </button>
              <Link
                to="/"
                style={{
                  background: 'transparent',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  padding: '12px 24px',
                  borderRadius: 0,
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                Back to Overview
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default User;

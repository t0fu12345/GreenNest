import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import galleryData from '../data/gallery.json';
import { useAuth } from '../context/AuthContext';
import { getStarredPlantIds, toggleStarredPlant } from '../data/botanicalSpecimens';

const SPAN2_INDICES = [0, 7, 10, 17];

const Gallery = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();

  // Extract ONLY images from the json data
  const images = galleryData.map(item => item.imageUrl || item);
  const [activeIdx, setActiveIdx] = useState(null);
  const [starredIds, setStarredIds] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  // Load starred plant IDs strictly for the current account
  useEffect(() => {
    if (isAuthenticated && user && !isAdmin) {
      setStarredIds(getStarredPlantIds(user.id));
    } else {
      setStarredIds([]);
    }
  }, [isAuthenticated, user, isAdmin]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const handleToggleStar = (e, plantId) => {
    if (e) e.stopPropagation();

    // If not in an account, automatically transfer into sign in or sign up page
    if (!isAuthenticated || !user) {
      navigate('/login', {
        state: { message: 'Please sign in or create an account to star and save botanical specimens.' }
      });
      return;
    }

    // Admin accounts cannot have personal garden collections
    if (user.role === 'admin' || isAdmin) {
      showToast('⚠️ Admin accounts do not maintain personal garden collections.');
      return;
    }

    const updated = toggleStarredPlant(user.id, plantId);
    setStarredIds(updated);
    if (updated.includes(plantId)) {
      showToast('⭐ Specimen starred & saved to your account!');
    } else {
      showToast('Specimen removed from your account.');
    }
  };

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveIdx((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setActiveIdx(null);
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIdx, handleClose, handleNext, handlePrev]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#05120a', color: '#ffffff' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 24px 80px', maxWidth: '1320px', margin: '0 auto', width: '100%' }}>
        {/* Gallery Hero Header */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            color: '#86efac',
            padding: '6px 18px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
            EXHIBITION NO. 01 // DEDICATED ARCHIVE
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 700, color: '#ffffff', marginBottom: '14px', letterSpacing: '-0.02em' }}>
            The Specimen Gallery.
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto', fontWeight: 300 }}>
            A visual anthology of botanical flora curated in a pure Bento Box formation. Click any image to view in full screen, or click the star to curate to your account.
          </p>
        </header>

        {/* Pure Bento Box Square Formation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {images.map((imgUrl, idx) => {
            const isSpan2 = SPAN2_INDICES.includes(idx);
            const plantId = `specimen_${idx}`;
            const isStarred = starredIds.includes(plantId);

            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#07160e',
                  border: isStarred ? '1px solid rgba(250, 204, 21, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isStarred ? '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(250, 204, 21, 0.2)' : '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
                  gridColumn: isSpan2 ? 'span 2' : 'span 1',
                  gridRow: isSpan2 ? 'span 2' : 'span 1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.borderColor = isStarred ? 'rgba(250, 204, 21, 0.85)' : 'rgba(34, 197, 94, 0.55)';
                  e.currentTarget.style.boxShadow = isStarred
                    ? '0 20px 45px rgba(0, 0, 0, 0.75), 0 0 30px rgba(250, 204, 21, 0.35)'
                    : '0 20px 45px rgba(0, 0, 0, 0.75), 0 0 30px rgba(34, 197, 94, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = isStarred ? 'rgba(250, 204, 21, 0.5)' : 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = isStarred
                    ? '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(250, 204, 21, 0.2)'
                    : '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
                {/* Star on the above right corner */}
                <button
                  type="button"
                  onClick={(e) => handleToggleStar(e, plantId)}
                  title={isStarred ? "Starred in your account (Click to unstar)" : "Star plant (Save to your account)"}
                  aria-label={`Star Specimen ${idx + 1}`}
                  style={{
                    position: 'absolute',
                    top: isSpan2 ? '18px' : '14px',
                    right: isSpan2 ? '18px' : '14px',
                    zIndex: 10,
                    width: isSpan2 ? '42px' : '36px',
                    height: isSpan2 ? '42px' : '36px',
                    borderRadius: '50%',
                    background: isStarred ? 'rgba(250, 204, 21, 0.25)' : 'rgba(7, 22, 14, 0.75)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: isStarred ? '1px solid rgba(250, 204, 21, 0.85)' : '1px solid rgba(255, 255, 255, 0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isStarred ? '0 0 18px rgba(250, 204, 21, 0.45)' : '0 4px 12px rgba(0, 0, 0, 0.5)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                    if (!isStarred) {
                      e.currentTarget.style.borderColor = 'rgba(250, 204, 21, 0.8)';
                      e.currentTarget.style.background = 'rgba(7, 22, 14, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    if (!isStarred) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                      e.currentTarget.style.background = 'rgba(7, 22, 14, 0.75)';
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: isSpan2 ? '20px' : '17px',
                      height: isSpan2 ? '20px' : '17px',
                      fill: isStarred ? '#facc15' : 'transparent',
                      stroke: isStarred ? '#facc15' : 'rgba(255, 255, 255, 0.95)',
                      strokeWidth: isStarred ? '1' : '2',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      filter: isStarred ? 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.9))' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>

                <img
                  src={imgUrl}
                  alt={`Botanical Flora ${idx + 1}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* Pure Image Lightbox Modal */}
      {activeIdx !== null && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(3, 8, 5, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px'
          }}
        >
          {/* Star in Lightbox */}
          <button
            type="button"
            onClick={(e) => handleToggleStar(e, `specimen_${activeIdx}`)}
            aria-label="Star Specimen"
            title={starredIds.includes(`specimen_${activeIdx}`) ? "Starred in your account (Click to unstar)" : "Star specimen (Save to your account)"}
            style={{
              position: 'absolute',
              top: '24px',
              right: '84px',
              background: starredIds.includes(`specimen_${activeIdx}`) ? 'rgba(250, 204, 21, 0.25)' : 'rgba(14, 30, 22, 0.85)',
              border: starredIds.includes(`specimen_${activeIdx}`) ? '1px solid rgba(250, 204, 21, 0.85)' : '1px solid rgba(34, 197, 94, 0.45)',
              color: '#ffffff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              zIndex: 10001
            }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{
                width: '22px',
                height: '22px',
                fill: starredIds.includes(`specimen_${activeIdx}`) ? '#facc15' : 'transparent',
                stroke: starredIds.includes(`specimen_${activeIdx}`) ? '#facc15' : 'rgba(255, 255, 255, 0.95)',
                strokeWidth: starredIds.includes(`specimen_${activeIdx}`) ? '1' : '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                filter: starredIds.includes(`specimen_${activeIdx}`) ? 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.9))' : 'none'
              }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: '#ffffff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.25rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              zIndex: 10001
            }}
          >
            ✕
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: '#ffffff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.4rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              zIndex: 10001
            }}
          >
            ‹
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.45)',
              color: '#ffffff',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.4rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              zIndex: 10001
            }}
          >
            ›
          </button>

          {/* Pure Lightbox Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={images[activeIdx]}
              alt="Botanical Flora Full View"
              style={{
                maxWidth: '100%',
                maxHeight: '88vh',
                borderRadius: '18px',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(34, 197, 94, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                objectFit: 'contain',
                userSelect: 'none'
              }}
            />
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          background: 'rgba(7, 24, 16, 0.96)',
          border: '1px solid rgba(34, 197, 94, 0.5)',
          color: '#86efac',
          padding: '12px 24px',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.35)',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          animation: 'fadeInUp 0.3s ease'
        }}>
          {toastMsg}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

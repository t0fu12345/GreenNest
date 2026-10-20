import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import galleryData from '../data/gallery.json';

const SPAN2_INDICES = [0, 7, 10, 17];

const Gallery = () => {
  // Extract ONLY images from the json data
  const images = galleryData.map(item => item.imageUrl || item);
  const [activeIdx, setActiveIdx] = useState(null);

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
            A visual anthology of botanical flora curated in a pure Bento Box formation. Click any image to view in full screen.
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
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
                  gridColumn: isSpan2 ? 'span 2' : 'span 1',
                  gridRow: isSpan2 ? 'span 2' : 'span 1'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.55)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.75), 0 0 30px rgba(34, 197, 94, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45)';
                }}
              >
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

      <Footer />
    </div>
  );
};

export default Gallery;

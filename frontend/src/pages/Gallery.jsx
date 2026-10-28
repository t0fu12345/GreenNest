import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import galleryApi from '../services/galleryApi';

const Gallery = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load the image list from the GreenNest API
  const fetchGallery = useCallback(async () => {
    try {
      setLoadError('');
      const res = await galleryApi.getGallery({ limit: 50 });
      const galleryList = Array.isArray(res?.data) 
        ? res.data 
        : (Array.isArray(res?.data?.items) ? res.data.items : []);
      setItems(galleryList);
    } catch (err) {
      setItems([]);
      setLoadError(err.message || 'Unable to load the gallery from the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Toggle an image like through the API; authentication is required
  const handleLike = async (e, id) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please sign in to star this photograph!');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    try {
      const res = await galleryApi.likeImage(id);
      const isLiked = res?.data?.liked;
      const count = res?.data?.likesCount;
      if (count !== undefined) {
        setItems(prev => prev.map(item => 
          item._id === id ? { ...item, likesCount: count, isLiked } : item
        ));
        showToast(isLiked ? '❤️ Added to starred gallery!' : '🤍 Removed star from photograph.');
      }
    } catch (err) {
      showToast('Unable to update like status: ' + (err.message || 'Error'));
    }
  };

  // Handle keyboard controls while the lightbox is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, items.length]);

  const filteredItems = items.filter(item => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      (item.caption && item.caption.toLowerCase().includes(q)) ||
      (item.alt && item.alt.toLowerCase().includes(q)) ||
      (item.credit && item.credit.toLowerCase().includes(q))
    );
  });

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '24px',
          zIndex: 9999,
          background: 'rgba(34, 197, 94, 0.95)',
          color: '#041008',
          padding: '10px 20px',
          borderRadius: '9999px',
          fontWeight: 700,
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1, padding: '140px 24px 80px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(14, 30, 22, 0.85)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#86efac',
            marginBottom: '16px'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></span>
            <span>BOTANICAL LIGHTBOX // MONGODB ATLAS ARCHIVE</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '16px'
          }}>
            Interactive Botanical Gallery
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.65 }}>
            Curated photographic exhibition of tropical aroids, living foliage, and biophilic interior spaces from the GreenNest catalog. Click any image to open the high-resolution interactive Lightbox.
          </p>

          {/* Quick Search in Gallery */}
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search photography by species, notes..."
              style={{
                width: '100%',
                background: 'rgba(14, 30, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '12px 20px',
                borderRadius: '9999px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                textAlign: 'center'
              }}
            />
          </div>
        </div>

        {/* Gallery Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 24px', color: '#86efac' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🖼️</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading gallery...</div>
          </div>
        ) : loadError ? (
          <div role="alert" style={{ textAlign: 'center', padding: '60px 20px', color: '#fca5a5' }}>
            <p>{loadError}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <p>No photography matches "{filterQuery}".</p>
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              style={{
                marginTop: '12px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#86efac',
                padding: '8px 18px',
                borderRadius: '9999px',
                cursor: 'pointer'
              }}
            >
              View all photography
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredItems.map((item, idx) => (
              <article
                key={item._id || idx}
                onClick={() => setActiveLightboxIndex(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(14, 30, 22, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  aspectRatio: item.aspectRatio === 'tall' ? '3/4' : (item.aspectRatio === 'wide' ? '4/3' : '1/1'),
                  boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt || 'Botanical Gallery Specimen'}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Overlay on hover */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(7, 16, 11, 0.88) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  opacity: 0.95
                }}>
                  <p style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: 1.45,
                    marginBottom: '12px',
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.caption || item.alt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.74rem', color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Credit: {item.credit || 'Pinterest'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleLike(e, item._id)}
                      style={{
                        background: item.isLiked ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                        border: item.isLiked ? '1px solid rgba(239, 68, 68, 0.6)' : '1px solid rgba(255, 255, 255, 0.25)',
                        color: item.isLiked ? '#fca5a5' : '#fff',
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease'
                      }}
                      title={item.isLiked ? "Unlike" : "Star"}
                    >
                      <span>{item.isLiked ? '❤️' : '🤍'}</span>
                      <span>{item.likesCount || 0}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 8, 5, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              zIndex: 9010
            }}
          >
            ✕
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
            }}
            style={{
              position: 'absolute',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#fff',
              fontSize: '1.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9010
            }}
          >
            ‹
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
            }}
            style={{
              position: 'absolute',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: '#fff',
              fontSize: '1.6rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9010
            }}
          >
            ›
          </button>

          {/* Lightbox Dialog Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '960px',
              width: '100%',
              maxHeight: '90vh',
              background: 'rgba(14, 30, 22, 0.95)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 30px 80px rgba(0,0,0,0.9)'
            }}
          >
            <div style={{ flex: 1, maxHeight: '68vh', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeItem.imageUrl}
                alt={activeItem.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ maxWidth: '650px' }}>
                <p style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '6px', fontWeight: 600 }}>
                  {activeItem.caption || activeItem.alt}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Photographer: <span style={{ color: '#86efac' }}>{activeItem.credit || 'GreenNest Sanctuary'}</span> • Specimen {activeLightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleLike(e, activeItem._id)}
                style={{
                  background: activeItem.isLiked 
                    ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                    : 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                  color: activeItem.isLiked ? '#fff' : '#041008',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{activeItem.isLiked ? '❤️ Liked' : '🤍 Star Image'}</span>
                <span>({activeItem.likesCount || 0})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

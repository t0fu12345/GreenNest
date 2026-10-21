import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  return (
    <div className="gallery-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-deep, #0a0f0d)', color: '#fff' }}>
      <Navbar />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '48px 32px', backdropFilter: 'blur(16px)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🖼️</div>
          <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', fontWeight: 600, marginBottom: '12px', color: '#e8f5e9' }}>
            Interactive Botanical Gallery
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, fontSize: '1rem', marginBottom: '24px' }}>
            Artistic botanical photography exhibition & interactive specimen showcase. Harmonizing microclimates and botanical aesthetics.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: 'rgba(46, 125, 50, 0.15)', border: '1px solid rgba(46, 125, 50, 0.3)', color: '#81c784', fontSize: '0.85rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#81c784', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            Awaiting Stitch Design Export
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;

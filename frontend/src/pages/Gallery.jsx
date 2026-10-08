import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [activeBiome, setActiveBiome] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBiomeSelect = (biome) => {
    setActiveBiome(biome);
    setActiveTag(null);
  };

  const handleTagSelect = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    setActiveBiome('all');
  };

  return (
    <>
      <Navbar />

      {/* Gallery Hero Header */}
      <header className="gallery-hero-header" style={{ paddingTop: '150px', paddingBottom: '50px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <div className="gallery-kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', background: 'rgba(14, 30, 22, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '9999px', marginBottom: '20px', fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#86efac' }}>
          <span className="kicker-dot" style={{ width: '7px', height: '7px', background: 'var(--emerald-accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--emerald-accent)' }}></span>
          <span>EXHIBITION NO. 01 // DEDICATED ARCHIVE</span>
        </div>

        <h1 className="gallery-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.12, color: '#ffffff', marginBottom: '16px' }}>
          The Specimen Gallery.
        </h1>
        <p className="gallery-subtitle" style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 36px', fontWeight: 300 }}>
          Khám phá kho lưu trữ hoàn chỉnh các loài thực vật quý hiếm, tra cứu điều kiện sinh trưởng, độ râm mát và khả năng thanh lọc không khí cho ngôi nhà hiện đại.
        </p>

        {/* Search Input */}
        <div className="gallery-search-wrap" style={{ maxWidth: '680px', margin: '0 auto 32px', position: 'relative' }}>
          <div className="gallery-search-box" style={{ display: 'flex', alignItems: 'center', background: 'rgba(14, 30, 22, 0.85)', backdropFilter: 'blur(25px)', border: '1.5px solid rgba(34, 197, 94, 0.35)', borderRadius: '9999px', padding: '8px 12px 8px 24px', boxShadow: '0 16px 45px rgba(0, 0, 0, 0.6)', transition: 'var(--transition-smooth)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: 'var(--emerald-accent)', marginRight: '12px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm theo tên loài, chi khoa học, hoặc hashtag (#Araceae, #PetSafe)..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '1rem', fontFamily: 'var(--font-sans)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '6px', color: '#94a3b8' }}>⌘K</span>
          </div>
        </div>
      </header>

      {/* Filter & Tags Section */}
      <section className="filter-section-wrap" style={{ maxWidth: '1300px', margin: '0 auto 36px', padding: '0 24px' }}>
        {/* Category Filter Bar */}
        <div className="category-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }}>
          <button className={`cat-btn ${activeBiome === 'all' ? 'active' : ''}`} onClick={() => handleBiomeSelect('all')}>Tất Cả Đới Khí Hậu</button>
          <button className={`cat-btn ${activeBiome === 'tropical' ? 'active' : ''}`} onClick={() => handleBiomeSelect('tropical')}>🌴 Đới Nóng (Nhiệt Đới & Xích Đạo)</button>
          <button className={`cat-btn ${activeBiome === 'subtropical' ? 'active' : ''}`} onClick={() => handleBiomeSelect('subtropical')}>🌲 Đới Ôn Hòa & Cận Nhiệt</button>
          <button className={`cat-btn ${activeBiome === 'arid' ? 'active' : ''}`} onClick={() => handleBiomeSelect('arid')}>🏜️ Đới Khô Hạn & Bán Hoang Mạc</button>
        </div>

        {/* Facet Tags */}
        <div className="facets-cloud" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '14px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--sage-muted)', marginRight: '6px' }}>INDEX TAGS:</span>
          {['#Araceae', '#TrailingFoliage', '#PetSafe', '#VelvetLeaf', '#RareCultivar', '#DeepShadeThriving'].map(tag => (
             <button 
               key={tag} 
               className={`facet-pill ${activeTag === tag ? 'active' : ''}`}
               onClick={() => handleTagSelect(tag)}
               style={{ background: activeTag === tag ? 'rgba(34, 197, 94, 0.2)' : 'rgba(14, 30, 22, 0.6)', border: `1px solid ${activeTag === tag ? 'var(--emerald-accent)' : 'rgba(255, 255, 255, 0.1)'}`, color: activeTag === tag ? '#86efac' : '#94a3b8', padding: '5px 14px', borderRadius: '9999px', fontSize: '0.76rem', cursor: 'pointer' }}
             >
               {tag}
             </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="gallery-status-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.88rem', color: 'var(--sage-muted)' }}>
          <div>Đang lọc: <strong style={{ color: '#fff' }}>{activeTag ? activeTag : (activeBiome === 'all' ? 'Tất Cả Đới Khí Hậu' : activeBiome)}</strong></div>
          <div style={{ fontSize: '0.8rem', color: '#fbbf24' }}>⚡ No Data Yet (Chưa Hoàn Thành Sản Phẩm)</div>
        </div>
      </section>

      {/* Complete Grid: No Data Yet Container */}
      <main className="specimen-grid" style={{ display: 'block', maxWidth: '1300px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', padding: '75px 24px', background: 'rgba(14, 30, 22, 0.75)', backdropFilter: 'blur(25px)', border: '1.5px dashed rgba(245, 158, 11, 0.45)', borderRadius: '28px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)', maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🌱</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginBottom: '12px' }}>
            No Data Yet {searchQuery && `("${searchQuery}")`}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 26px' }}>
            Hệ thống dữ liệu cây trồng theo 3 đại đới khí hậu đang trong quá trình chuẩn hóa thực vật học và chưa hoàn thành sản phẩm. Cơ sở dữ liệu sẽ hiển thị đầy đủ ngay sau khi tích hợp Backend & API!
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', padding: '8px 22px', borderRadius: '9999px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            <span>⚡ Product Status: No Data Yet (Chưa Hoàn Thành Sản Phẩm)</span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Gallery;

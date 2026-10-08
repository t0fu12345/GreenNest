import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementation to be added later
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        
        {/* Foliage / Exhibition Tag */}
        <div className="hero-kicker-wrap">
          <span className="kicker-dot"></span>
          <span className="kicker-text">Exhibition No. 01 — The Domestic Arboretum</span>
          <span className="kicker-folio">Reg. Archive // Folio 01</span>
        </div>

        {/* Headline inspired by high-end nature conservation & editorial design */}
        <h1 className="hero-title">
          Think you know <span className="italic-accent">Nature?</span><br />
          Curate Your Sanctuary.
        </h1>

        <p className="hero-subtitle">
          Khám phá bộ sưu tập các loài thực vật quý hiếm được bảo tồn và tuyển chọn cho không gian sống hiện đại. Tương tác đa chiều, hướng dẫn chăm sóc chuyên sâu từ chuyên gia thực vật học.
        </p>

        {/* REPOSITIONED CENTRAL INTELLIGENT SEARCH BAR */}
        <div className="search-hero-container">
          <form className="search-box-pill" onSubmit={handleSearch}>
            <svg className="search-icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input-field" 
              id="herbariumSearchInput" 
              placeholder="Tìm theo tên thường gọi, chi khoa học, hoặc #tag (VD: Monstera, Velvet, Shade)..."
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-shortcut-pill">⌘K</span>
            <button type="submit" className="search-submit-btn" id="searchSubmitBtn">
              <span>Tìm Kiếm</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          {/* Live Instant Suggestions Dropdown */}
          <div className={`search-suggestions-panel ${searchQuery ? 'active' : ''}`} id="suggestionsPanel">
            {searchQuery && (
               <div style={{ padding: '14px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
                 ⚡ No Data Yet — Đang hoàn thiện sản phẩm
               </div>
            )}
          </div>
        </div>

        {/* INDEX FACETS */}
        <div className="facets-hero-wrap">
          <span className="facet-label">Index Facets:</span>
          <button className="facet-tag" data-tag="araceae">#Araceae</button>
          <button className="facet-tag" data-tag="trailingfoliage">#TrailingFoliage</button>
          <button className="facet-tag" data-tag="petsafe">#PetSafe</button>
          <button className="facet-tag" data-tag="velvetleaf">#VelvetLeaf</button>
          <button className="facet-tag" data-tag="rarecultivar">#RareCultivar</button>
          <button className="facet-tag" data-tag="deepshadethriving">#DeepShadeThriving</button>
        </div>

        {/* Action Row */}
        <div className="hero-actions-row">
          <Link to="/gallery" className="btn-hero-primary">
            <span>Xem Thư Viện Bản Mẫu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </Link>

          <button className="btn-video-tour" id="openVideoTourBtn">
            <div className="video-play-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <span>Xem Tour Vườn Kỹ Thuật Số</span>
          </button>
        </div>

      </div>

      {/* Bottom cinematic fade blend */}
      <div className="hero-bottom-fade"></div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  BOTANICAL_SPECIMENS,
  getStarredPlantIds,
  toggleStarredPlant
} from '../data/botanicalSpecimens';

const Plants = () => {
  const navigate = useNavigate();
  const [activeBiome, setActiveBiome] = useState('all');
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [starredIds, setStarredIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [inspectPlant, setInspectPlant] = useState(null);

  useEffect(() => {
    setStarredIds(getStarredPlantIds());
  }, []);

  const allPlants = Object.values(BOTANICAL_SPECIMENS);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleStar = (plantId, e) => {
    if (e) e.stopPropagation();
    const updated = toggleStarredPlant(plantId);
    setStarredIds(updated);
    const plant = BOTANICAL_SPECIMENS[plantId];
    if (updated.includes(plantId)) {
      showToast(`⭐ Added "${plant?.name || 'Plant'}" to Personal Gallery!`);
    } else {
      showToast(`Removed "${plant?.name || 'Plant'}" from Personal Gallery.`);
    }
  };

  const handleBiomeSelect = (biome) => {
    setActiveBiome(biome);
    setActiveTag(null);
  };

  const handleTagSelect = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    if (activeTag !== tag) setActiveBiome('all');
  };

  // Filter plants
  const filteredPlants = allPlants.filter(plant => {
    // Biome
    if (activeBiome !== 'all' && plant.biome !== activeBiome) {
      return false;
    }
    // Tag
    if (activeTag && !plant.tags?.includes(activeTag)) {
      return false;
    }
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchName = plant.name.toLowerCase().includes(q);
      const matchSci = plant.scientificName.toLowerCase().includes(q);
      const matchTag = plant.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchSci && !matchTag) return false;
    }
    return true;
  });

  const availableIndexTags = [
    '#Araceae',
    '#SubtropicalHighlands',
    '#TemperateGarden',
    '#AromaticBloom',
    '#SunLoving',
    '#RareCultivar',
    '#DeepShadeThriving',
    '#PetSafe'
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Gallery Hero Header */}
      <header className="gallery-hero-header" style={{ paddingTop: '140px', paddingBottom: '36px', textAlign: 'center', maxWidth: '940px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="gallery-kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', background: 'rgba(14, 30, 22, 0.75)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '9999px', marginBottom: '20px', fontSize: '0.76rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#86efac' }}>
          <span style={{ width: '7px', height: '7px', background: 'var(--emerald-accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--emerald-accent)' }}></span>
          <span>EXHIBITION NO. 01 // DEDICATED ARCHIVE</span>
        </div>

        <h1 className="gallery-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.12, color: '#ffffff', marginBottom: '16px' }}>
          The Specimen Gallery.
        </h1>
        <p className="gallery-subtitle" style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 36px', fontWeight: 300 }}>
          Explore the comprehensive archive of rare botanical specimens, examine growth parameters, shade tolerance metrics, and air purification telemetry for contemporary living spaces.
        </p>

        {/* Search Input */}
        <div className="gallery-search-wrap" style={{ maxWidth: '680px', margin: '0 auto 12px', position: 'relative' }}>
          <div className="gallery-search-box" style={{ display: 'flex', alignItems: 'center', background: 'rgba(14, 30, 22, 0.85)', backdropFilter: 'blur(25px)', border: '1.5px solid rgba(34, 197, 94, 0.35)', borderRadius: '9999px', padding: '8px 12px 8px 24px', boxShadow: '0 16px 45px rgba(0, 0, 0, 0.6)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: 'var(--emerald-accent)', marginRight: '12px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by common name, genus, or facet tag (e.g. Red Rose, #RareCultivar)..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#ffffff', fontSize: '0.98rem', fontFamily: 'var(--font-sans)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px 8px' }}
              >
                ✕
              </button>
            ) : (
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '6px', color: '#94a3b8' }}>⌘K</span>
            )}
          </div>
        </div>
      </header>

      {/* Filter & Tags Section */}
      <section className="filter-section-wrap" style={{ maxWidth: '1360px', width: '100%', margin: '0 auto 36px', padding: '0 24px' }}>
        
        {/* Category Filter Bar */}
        <div className="category-filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '16px' }}>
          <button className={`cat-btn ${activeBiome === 'all' ? 'active' : ''}`} onClick={() => handleBiomeSelect('all')}>All Climatic Biomes</button>
          <button className={`cat-btn ${activeBiome === 'tropical' ? 'active' : ''}`} onClick={() => handleBiomeSelect('tropical')}>🌴 Tropical Biome</button>
          <button className={`cat-btn ${activeBiome === 'subtropical' ? 'active' : ''}`} onClick={() => handleBiomeSelect('subtropical')}>🌲 Subtropical Highlands</button>
          <button className={`cat-btn ${activeBiome === 'arid' ? 'active' : ''}`} onClick={() => handleBiomeSelect('arid')}>🏜️ Arid & Desert</button>
        </div>

        {/* Facet Tags Cloud */}
        <div className="facets-cloud" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginTop: '14px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--sage-muted)', marginRight: '6px' }}>INDEX TAGS:</span>
          {availableIndexTags.map(tag => (
            <button 
              key={tag} 
              className={`facet-pill ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagSelect(tag)}
              style={{
                background: activeTag === tag ? 'rgba(34, 197, 94, 0.25)' : 'rgba(14, 30, 22, 0.6)',
                border: `1px solid ${activeTag === tag ? 'var(--emerald-accent)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: activeTag === tag ? '#86efac' : '#94a3b8',
                padding: '5px 14px',
                borderRadius: '9999px',
                fontSize: '0.76rem',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="gallery-status-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '16px 0', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.88rem', color: 'var(--sage-muted)' }}>
          <div>
            Filtering by: <strong style={{ color: '#fff' }}>{activeTag ? activeTag : (activeBiome === 'all' ? 'All Climatic Biomes' : activeBiome)}</strong>
            {searchQuery && <span> • matching "{searchQuery}"</span>}
            <span> ({filteredPlants.length} specimen{filteredPlants.length !== 1 ? 's' : ''})</span>
          </div>
          <Link to="/personal-gallery" style={{ fontSize: '0.82rem', color: '#86efac', textDecoration: 'none', fontWeight: 600 }}>
            ★ View Personal Gallery ({starredIds.length} saved) →
          </Link>
        </div>
      </section>

      {/* Specimen Grid */}
      <main style={{ flex: 1, maxWidth: '1360px', width: '100%', margin: '0 auto 100px', padding: '0 24px' }}>
        {filteredPlants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '75px 24px', background: 'rgba(14, 30, 22, 0.75)', border: '1.5px dashed rgba(245, 158, 11, 0.45)', borderRadius: '28px', maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🌱</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginBottom: '12px' }}>
              No Specimens Found
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 26px' }}>
              No botanical records in our exhibition match your active search and filter criteria.
            </p>
            <button
              type="button"
              className="btn-cta-pill"
              onClick={() => { setActiveBiome('all'); setActiveTag(null); setSearchQuery(''); }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '28px' }}>
            {filteredPlants.map(plant => {
              const isStarred = starredIds.includes(plant.id);
              return (
                <article
                  key={plant.id}
                  className="specimen-card"
                  style={{
                    background: 'rgba(14, 30, 22, 0.85)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Media Wrap */}
                  <div
                    style={{ position: 'relative', height: '230px', overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant.id)}`)}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(7, 16, 11, 0.85)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--emerald-light)'
                    }}>
                      {plant.biomeLabel}
                    </span>

                    {/* Star Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleStar(plant.id, e)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(7, 16, 11, 0.85)',
                        border: isStarred ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid var(--border-glass)',
                        color: isStarred ? '#f59e0b' : '#94a3b8',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        cursor: 'pointer'
                      }}
                      title={isStarred ? "Saved to Personal Gallery (click to remove)" : "Save to Personal Gallery"}
                    >
                      ★
                    </button>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <h3
                        onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant.id)}`)}
                        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff', cursor: 'pointer', marginBottom: '2px' }}
                      >
                        {plant.name}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--emerald-light)', fontStyle: 'italic' }}>
                        {plant.scientificName}
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {plant.tags?.map(t => (
                        <span
                          key={t}
                          onClick={() => handleTagSelect(t)}
                          style={{
                            background: activeTag === t ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${activeTag === t ? 'var(--emerald-accent)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '9999px',
                            padding: '2px 8px',
                            fontSize: '0.7rem',
                            color: activeTag === t ? '#86efac' : '#cbd5e1',
                            cursor: 'pointer'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, flex: 1 }}>
                      {plant.shortDesc}
                    </p>

                    {/* Action Bar */}
                    <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setInspectPlant(plant)}
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--border-glass)',
                          color: '#cbd5e1',
                          padding: '7px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Quick View
                      </button>

                      <Link
                        to={`/specimen-detail?id=${encodeURIComponent(plant.id)}`}
                        style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          border: '1px solid var(--border-accent)',
                          color: '#86efac',
                          padding: '7px 14px',
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Full Dossier</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Quick View Modal */}
      {inspectPlant && (
        <div
          onClick={() => setInspectPlant(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 8, 5, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 2500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(14, 30, 22, 0.98)',
              border: '1px solid var(--border-glass)',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
            }}
          >
            <button
              type="button"
              onClick={() => setInspectPlant(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img
                src={inspectPlant.image}
                alt={inspectPlant.name}
                style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '16px' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--emerald-light)', fontWeight: 700 }}>
                  {inspectPlant.biomeLabel}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginTop: '4px' }}>
                  {inspectPlant.name}
                </h3>
                <div style={{ fontStyle: 'italic', color: 'var(--emerald-light)', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {inspectPlant.scientificName}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {inspectPlant.shortDesc}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Hydration:</span>
                <div style={{ fontSize: '0.84rem', color: '#fff' }}>{inspectPlant.water}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Sunlight:</span>
                <div style={{ fontSize: '0.84rem', color: '#fff' }}>{inspectPlant.light}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => handleToggleStar(inspectPlant.id)}
                style={{
                  background: starredIds.includes(inspectPlant.id) ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.08)',
                  border: starredIds.includes(inspectPlant.id) ? '1px solid #f59e0b' : '1px solid var(--border-glass)',
                  color: starredIds.includes(inspectPlant.id) ? '#fde68a' : '#fff',
                  borderRadius: '9999px',
                  padding: '10px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {starredIds.includes(inspectPlant.id) ? '★ Saved' : '★ Save to Personal Gallery'}
              </button>
              <Link
                to={`/specimen-detail?id=${encodeURIComponent(inspectPlant.id)}`}
                style={{
                  background: 'var(--emerald-accent)',
                  color: '#07100b',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                Open Full Dossier →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'rgba(14, 30, 22, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--emerald-accent)',
          color: '#ffffff',
          padding: '14px 22px',
          borderRadius: '9999px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--emerald-glow)',
          fontSize: '0.9rem',
          fontWeight: 600,
          zIndex: 3000
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Plants;

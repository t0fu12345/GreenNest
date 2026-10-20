import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  BOTANICAL_SPECIMENS,
  getGardenPlantIds
} from '../data/botanicalSpecimens';

const Garden = () => {
  const navigate = useNavigate();
  const [plantIds, setPlantIds] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    setPlantIds(getGardenPlantIds());
  }, []);

  const plants = plantIds.map(id => BOTANICAL_SPECIMENS[id]).filter(Boolean);

  const filteredPlants = plants.filter(p => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.scientificName.toLowerCase().includes(q);
  });

  const handleTileClick = (plantId) => {
    navigate(`/plant-macro?id=${encodeURIComponent(plantId)}`);
  };

  return (
    <div className="garden-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Standalone Back to Sanctuary Button outside header box */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '24px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          to="/user"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid var(--border-accent, rgba(34, 197, 94, 0.4))',
            color: 'var(--emerald-light, #86efac)',
            fontSize: '0.84rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.25s ease'
          }}
        >
          ← Back to Sanctuary
        </Link>
      </div>

      <main style={{ flex: 1, padding: '20px 24px 80px', maxWidth: '1360px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Sidebar with telemetry overview */}
          <aside style={{
            background: 'rgba(14, 30, 22, 0.85)',
            border: '1px solid var(--border-glass)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700 }}>
                  Active Cultivars
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginTop: '4px' }}>
                  Garden Vitals
                </h2>
              </div>
              <span id="gardenCountBadge" style={{
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid var(--border-accent)',
                color: 'var(--emerald-light)',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {plants.length} Plant{plants.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Quick Filter */}
            <div>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search garden specimens..."
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-glass)',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* List of Cultivars */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
              {filteredPlants.length === 0 ? (
                <li style={{ fontSize: '0.82rem', color: '#94a3b8', padding: '12px', textAlign: 'center' }}>
                  No matching plants found.
                </li>
              ) : (
                filteredPlants.map(p => (
                  <li
                    key={p.id}
                    className="sidebar-plant-item"
                    onClick={() => handleTileClick(p.id)}
                    title={`Inspect Macro Vitals for ${p.name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '42px', height: '42px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--emerald-light)' }}>
                        {p.waterStatus || 'Hydrated'}
                      </div>
                    </div>
                    <span style={{ color: 'var(--emerald-light)', fontSize: '0.9rem' }}>→</span>
                  </li>
                ))
              )}
            </ul>

            <Link
              to="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid var(--border-accent)',
                color: 'var(--emerald-light)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              + Cultivate More From Gallery
            </Link>
          </aside>

          {/* Right Area: Header Banner + Bento Grid */}
          <div className="garden-main-content" style={{ gridColumn: 'span 2' }}>
            <div className="garden-header-card">
              <div className="garden-header-titles">
                <span className="garden-header-kicker">Living Conservatory Telemetry</span>
                <h1 className="garden-header-title">My Cultivated Garden Sanctuary</h1>
                <p className="garden-header-desc">
                  Your private biophilic nursery. Click any specimen tile to view daily hydration intake, ambient microclimate sensors, and biological macro telemetry.
                </p>
              </div>
              <div className="garden-header-actions">
                <Link to="/gallery" className="btn-garden-cta">
                  <span>Browse Gallery</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Bento Grid: 1:1 Aspect Ratio Tiles */}
            {plants.length === 0 ? (
              <div className="garden-empty-box">
                <div className="garden-empty-icon">🪴</div>
                <h3 className="garden-empty-title">Your Garden is Empty</h3>
                <p className="garden-empty-desc">
                  You haven't added any living specimens to your garden yet. Select plants from the Herbarium Gallery to nurture their daily hydration and environment macros here.
                </p>
                <Link to="/gallery" className="btn-garden-cta" style={{ marginTop: '14px' }}>
                  <span>Cultivate Plants in Gallery</span>
                  <span>→</span>
                </Link>
              </div>
            ) : filteredPlants.length === 0 ? (
              <div className="garden-empty-box">
                <h3 className="garden-empty-title">No Search Results</h3>
                <p className="garden-empty-desc">No cultivated plants match "{filterQuery}".</p>
                <button
                  type="button"
                  className="btn-garden-cta"
                  onClick={() => setFilterQuery('')}
                  style={{ marginTop: '14px' }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="garden-bento-grid">
                {filteredPlants.map(plant => (
                  <article
                    key={plant.id}
                    className="bento-square-tile"
                    onClick={() => handleTileClick(plant.id)}
                    title={`Click to view macro telemetry: ${plant.name}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleTileClick(plant.id);
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="bento-tile-image"
                    />
                    <div className="bento-hover-indicator">
                      <div>
                        <div style={{ fontWeight: 700 }}>{plant.name}</div>
                        <span className="bento-macro-tag">View Macro Vitals</span>
                      </div>
                      <span style={{ fontSize: '1.1rem', color: 'var(--emerald-light)' }}>↗</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Garden;

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import gardenApi from '../services/gardenApi';
import { BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';

const Garden = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const fetchGarden = useCallback(async () => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const res = await gardenApi.getMyGarden();
        const gardenList = res?.data?.garden || [];
        
        if (gardenList.length > 0) {
          const mapped = gardenList.map(item => {
            const p = item.plant || {};
            const staticMatch = BOTANICAL_SPECIMENS[p.specimenId] || BOTANICAL_SPECIMENS[p._id];
            const isWatered = item.checklist?.find(c => c.taskName === 'water')?.completed;
            return {
              gardenItemId: item._id,
              id: p.specimenId || p._id || item._id,
              dbId: p._id,
              name: item.customNickname || p.name || staticMatch?.name || 'Cultivated Specimen',
              scientificName: p.scientificName || staticMatch?.scientificName || 'Botanical flora',
              biome: p.biome || staticMatch?.biome || 'tropical',
              image: p.images?.[0]?.url || staticMatch?.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
              waterStatus: isWatered ? '💧 Hydrated Today' : (p.watering || 'Nominal Hydration'),
              isWatered: !!isWatered,
              checklist: item.checklist || [],
              rawPlant: p
            };
          });
          setPlants(mapped);
        } else {
          // No specimens in Atlas garden: leave empty to show Empty State
          setPlants([]);
        }
      } else {
        setPlants([]);
      }
    } catch (err) {
      console.warn('Error loading garden from MongoDB Atlas:', err.message);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchGarden();
  }, [fetchGarden]);

  const filteredPlants = plants.filter(p => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return true;
    return (p.name && p.name.toLowerCase().includes(q)) || 
           (p.scientificName && p.scientificName.toLowerCase().includes(q));
  });

  const handleTileClick = (plantId) => {
    navigate(`/plant-macro?id=${encodeURIComponent(plantId)}`);
  };

  const handleToggleWater = async (e, plant) => {
    e.stopPropagation();
    if (!plant.gardenItemId) return;
    try {
      const nextState = !plant.isWatered;
      await gardenApi.updateChecklist({
        gardenItemId: plant.gardenItemId,
        taskName: 'water',
        completed: nextState
      });
      setPlants(prev => prev.map(p => {
        if (p.gardenItemId === plant.gardenItemId) {
          return {
            ...p,
            isWatered: nextState,
            waterStatus: nextState ? '💧 Hydrated Today' : (p.rawPlant?.watering || 'Nominal Hydration')
          };
        }
        return p;
      }));
      showToast(nextState ? `💧 Recorded hydration for ${plant.name}!` : `Watering reset for ${plant.name}`);
    } catch (err) {
      showToast('Error updating status: ' + err.message);
    }
  };

  const handleRemovePlant = async (e, plant) => {
    e.stopPropagation();
    if (!window.confirm(`Remove "${plant.name}" from your garden sanctuary?`)) return;

    if (plant.gardenItemId) {
      try {
        await gardenApi.removePlant(plant.gardenItemId);
        setPlants(prev => prev.filter(p => p.gardenItemId !== plant.gardenItemId));
        showToast(`🌿 Removed "${plant.name}" from your MongoDB Atlas garden.`);
      } catch (err) {
        showToast('Could not remove plant: ' + err.message);
      }
    }
  };

  return (
    <div className="garden-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Standalone Back to Sanctuary Button outside header box */}
      <div style={{ maxWidth: '1360px', width: '100%', margin: '0 auto', padding: '110px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
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
            borderRadius: '9999px',
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
            backdropFilter: 'blur(14px)',
            border: '1px solid var(--border-glass)',
            borderRadius: '18px',
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
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {plants.length} Plant{plants.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Cloud Sync Status Indicator */}
            <div style={{
              fontSize: '0.76rem',
              padding: '6px 12px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              color: '#86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>☁️ Cloud Synced (MongoDB Atlas)</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Live Database</span>
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
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* List of Cultivars */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
              {loading ? (
                <li style={{ fontSize: '0.82rem', color: '#86efac', padding: '16px', textAlign: 'center' }}>
                  Connecting to GreenNest Atlas...
                </li>
              ) : filteredPlants.length === 0 ? (
                <li style={{ fontSize: '0.82rem', color: '#94a3b8', padding: '12px', textAlign: 'center' }}>
                  No matching plants found.
                </li>
              ) : (
                filteredPlants.map(p => (
                  <li
                    key={p.gardenItemId || p.id}
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
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: p.isWatered ? '#86efac' : 'var(--emerald-light)' }}>
                        {p.waterStatus}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleToggleWater(e, p)}
                      style={{
                        background: p.isWatered ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        color: p.isWatered ? '#86efac' : '#94a3b8',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                      title="Toggle Daily Watering Checklist"
                    >
                      💧
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleRemovePlant(e, p)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        padding: '2px 4px'
                      }}
                      title="Remove plant from garden"
                    >
                      ✕
                    </button>
                  </li>
                ))
              )}
            </ul>

            <Link
              to="/plants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid var(--border-accent)',
                borderRadius: '9999px',
                color: 'var(--emerald-light)',
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              + Cultivate More Plants
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
                <Link to="/plants" className="btn-garden-cta">
                  <span>Browse Directory</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Bento Grid: 1:1 Aspect Ratio Tiles */}
            {loading ? (
              <div className="garden-empty-box">
                <div className="garden-empty-icon">⏳</div>
                <h3 className="garden-empty-title">Loading Botanical Telemetry...</h3>
                <p className="garden-empty-desc">Fetching live plant sensors from MongoDB Atlas.</p>
              </div>
            ) : plants.length === 0 ? (
              <div className="garden-empty-box">
                <div className="garden-empty-icon">🪴</div>
                <h3 className="garden-empty-title">Your Garden is Empty</h3>
                <p className="garden-empty-desc">
                  You haven't added any living specimens to your garden yet. Select plants from the Herbarium Directory to nurture their daily hydration and environment macros here.
                </p>
                <Link to="/plants" className="btn-garden-cta" style={{ marginTop: '14px' }}>
                  <span>Cultivate Plants in Directory</span>
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
                    key={plant.gardenItemId || plant.id}
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
                        <span className="bento-macro-tag">
                          {plant.isWatered ? '💧 Watered Today' : 'View Macro Vitals'}
                        </span>
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

export default Garden;

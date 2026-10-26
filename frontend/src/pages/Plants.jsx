import React, { useState, useEffect, useMemo } from 'react';
import { scorePlant } from '../utils/searchPlants';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  BOTANICAL_SPECIMENS,
  CANONICAL_PLANT_SLUGS
} from '../data/botanicalSpecimens';
import SaveToCollectionModal from '../components/gallery/SaveToCollectionModal';
import { useAuth } from '../context/AuthContext';
import plantApi from '../services/plantApi';
import gardenApi from '../services/gardenApi';

const normalizePlant = (p) => ({
  id: p.specimenId || p._id,
  _id: p._id,
  catalogCode: p.specimenId || 'CANOPY-001',
  name: p.name,
  scientificName: p.scientificName || p.botanicalName || '',
  biome: p.biome || 'tropical',
  biomeLabel: p.biome ? p.biome.toUpperCase() : 'Botanical Cultivar',
  image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
  tags: p.tags?.length ? p.tags : [`#${p.category || 'Foliage'}`, `#${p.biome || 'Indoor'}`],
  taxonomyTags: [p.category, p.biome, 'Plantae'].filter(Boolean),
  traits: [p.light, p.watering, p.careLevel].filter(Boolean),
  shortDesc: p.description || p.shortDesc || '',
  origin: p.origin || 'GreenNest Sanctuary Nursery',
  water: p.watering || 'Weekly',
  light: p.light || 'Bright indirect',
  soil: p.careGuide?.soil || 'Loose, well-draining soil',
  humidity: p.careGuide?.humidity || '60% - 80%',
  temp: '20°C – 28°C',
  growth: p.careLevel || 'Moderate',
  toxicity: p.toxicity?.isToxicToPets ? 'Pet Caution' : 'Pet Safe',
  raw: p
});

const Plants = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQ = searchParams.get('q') || searchParams.get('search') || '';
  const initialTag = searchParams.get('tag') || null;
  const initialBiome = searchParams.get('biome') || 'all';

  const [activeBiome, setActiveBiome] = useState(initialBiome);
  const [activeTag, setActiveTag] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [starredIds, setStarredIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [apiPlants, setApiPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetSavePlantSlug, setTargetSavePlantSlug] = useState(null);
  const [gardenPlantIds, setGardenPlantIds] = useState([]);
  const [addingPlantId, setAddingPlantId] = useState(null);

  // Sync state if URL search params change
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
    const t = searchParams.get('tag');
    if (t !== null && t !== activeTag) {
      setActiveTag(t);
    }
    const b = searchParams.get('biome');
    if (b !== null && b !== activeBiome) {
      setActiveBiome(b);
    }
  }, [searchParams]);

  useEffect(() => {
    // Load live plant data from the MongoDB backend
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const res = await plantApi.getPlants({ limit: 100 });
        if (res?.data?.plants && Array.isArray(res.data.plants)) {
          setApiPlants(res.data.plants.map(normalizePlant));
        }
      } catch (err) {
        console.warn('Could not connect to the Plants API; using fallback data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserSaved = async () => {
      if (isAuthenticated) {
        try {
          const res = await gardenApi.getMyGarden();
          const saved = res?.data?.savedPlants || [];
          const ids = saved.map(p => p.specimenId || p._id || p.id).filter(Boolean);
          setStarredIds(ids);

          const garden = res?.data?.garden || [];
          const gIds = garden.map(item => item.plant?._id || item.plant?.specimenId || item.plant?.slug || item.plant?.catalogCode).filter(Boolean);
          setGardenPlantIds(gIds);
        } catch (e) {
          console.warn('Could not load favorite plants from the API:', e);
        }
      } else {
        setStarredIds([]);
        setGardenPlantIds([]);
      }
    };

    fetchPlants();
    fetchUserSaved();
  }, [isAuthenticated]);

  const fallbackPlants = CANONICAL_PLANT_SLUGS?.length
    ? CANONICAL_PLANT_SLUGS.map(slug => BOTANICAL_SPECIMENS[slug]).filter(Boolean)
    : Object.values(BOTANICAL_SPECIMENS);
  const allPlants = apiPlants.length > 0 ? apiPlants : fallbackPlants;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleStar = async (plantId, e) => {
    if (e) e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please sign in to save plants to your favorites!');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }

    const plant = allPlants.find(p => p.id === plantId || p._id === plantId) || BOTANICAL_SPECIMENS[plantId];
    const identifier = plant?._id || plant?.id || plantId;

    try {
      const res = await gardenApi.toggleBookmark(identifier);
      const isBookmarked = res?.data?.isBookmarked;
      if (isBookmarked) {
        setStarredIds(prev => Array.from(new Set([...prev, plantId])));
        showToast(`⭐ Added "${plant?.name || 'Plant'}" to Favorites!`);
      } else {
        setStarredIds(prev => prev.filter(id => id !== plantId && id !== identifier));
        showToast(`Removed "${plant?.name || 'Plant'}" from Favorites.`);
      }
    } catch (err) {
      showToast('Could not update favorites: ' + err.message);
    }
  };

  const handleAddToGarden = async (plant, e) => {
    if (e) e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please sign in to add specimens to your personal garden sanctuary!');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }

    const plantIdentifier = plant._id || plant.id || plant.specimenId || plant.slug;
    const isAlready = gardenPlantIds.includes(plant.id) ||
                      gardenPlantIds.includes(plant._id) ||
                      gardenPlantIds.includes(plant.specimenId) ||
                      (plant.raw?._id && gardenPlantIds.includes(plant.raw._id));

    if (isAlready) {
      showToast(`"${plant.name}" is already in your Garden Sanctuary!`);
      return;
    }

    try {
      setAddingPlantId(plant.id);
      await gardenApi.addPlant(plantIdentifier);
      setGardenPlantIds(prev => [...prev, plant.id, plant._id, plant.specimenId].filter(Boolean));
      showToast(`🌱 Added "${plant.name}" to My Garden!`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Could not add to garden';
      if (msg.includes('already in your garden') || msg.includes('PLANT_ALREADY_IN_GARDEN')) {
        setGardenPlantIds(prev => [...prev, plant.id, plant._id, plant.specimenId].filter(Boolean));
        showToast(`"${plant.name}" is already in your garden sanctuary.`);
      } else {
        const isNetworkIssue = !err.response || msg.includes('Network Error') || err.code === 'NETWORK_ERROR';
        if (isNetworkIssue) {
          try {
            const currentGarden = JSON.parse(localStorage.getItem('livingCanopyGardenPlants') || '[]');
            const pId = plant.slug || plant.id || plant.specimenId;
            if (!currentGarden.includes(pId)) {
              currentGarden.push(pId);
              localStorage.setItem('livingCanopyGardenPlants', JSON.stringify(currentGarden));
            }
            setGardenPlantIds(prev => [...prev, plant.id, plant._id, plant.specimenId, pId].filter(Boolean));
            showToast(`🌱 Added "${plant.name}" to My Garden!`);
            return;
          } catch {}
        }
        showToast('Error: ' + msg);
      }
    } finally {
      setAddingPlantId(null);
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

  // Filter plants with botanical relevance scoring
  const filteredPlants = useMemo(() => {
    let result = allPlants.filter(plant => {
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
        const score = scorePlant(plant, searchQuery);
        if (score <= 0) return false;
      }
      return true;
    });

    if (searchQuery.trim()) {
      result.sort((a, b) => scorePlant(b, searchQuery) - scorePlant(a, searchQuery));
    }

    return result;
  }, [allPlants, activeBiome, activeTag, searchQuery]);

  // Dynamic index tags extracted from all 20 plants
  const availableIndexTags = Array.from(
    new Set(allPlants.flatMap(p => p.tags || []))
  ).slice(0, 12);

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
          <Link to="/collections" style={{ fontSize: '0.82rem', color: '#86efac', textDecoration: 'none', fontWeight: 600 }}>
            📁 My Collections ({starredIds.length} starred) →
          </Link>
        </div>
      </section>

      {/* Specimen Grid */}
      <main style={{ flex: 1, maxWidth: '1360px', width: '100%', margin: '0 auto 100px', padding: '0 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#86efac' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🌿</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading botanical profiles from the GreenNest server...</div>
          </div>
        ) : filteredPlants.length === 0 ? (
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
                  onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant.id)}`)}
                  style={{
                    background: 'rgba(14, 30, 22, 0.85)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer'
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
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80';
                      }}
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
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {/* Redesigned Add to Garden Button */}
                      {(() => {
                        const inGarden = gardenPlantIds.includes(plant.id) ||
                                         gardenPlantIds.includes(plant._id) ||
                                         gardenPlantIds.includes(plant.specimenId) ||
                                         (plant.raw?._id && gardenPlantIds.includes(plant.raw._id));
                        return (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (inGarden) {
                                navigate('/garden');
                              } else {
                                handleAddToGarden(plant, e);
                              }
                            }}
                            disabled={addingPlantId === plant.id}
                            title={inGarden ? 'View in your Living Garden Sanctuary' : 'Add to personal Living Garden'}
                            style={{
                              background: inGarden
                                ? 'rgba(34, 197, 94, 0.2)'
                                : 'linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(16, 185, 129, 0.12) 100%)',
                              border: inGarden
                                ? '1px solid #22c55e'
                                : '1px solid rgba(34, 197, 94, 0.45)',
                              color: inGarden ? '#86efac' : '#ffffff',
                              padding: '7px 14px',
                              borderRadius: '9999px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: inGarden ? '0 0 12px rgba(34, 197, 94, 0.2)' : 'none',
                              transition: 'all 0.25s ease'
                            }}
                          >
                            <span>{inGarden ? '🌿' : '🌱'}</span>
                            <span>
                              {addingPlantId === plant.id
                                ? 'Adding...'
                                : inGarden
                                  ? 'In Garden →'
                                  : 'Add to Garden'}
                            </span>
                          </button>
                        );
                      })()}

                      {/* Save To Collection Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAuthenticated) {
                            showToast('Please sign in to save specimens to your collection!');
                            setTimeout(() => navigate('/login'), 1200);
                            return;
                          }
                          setTargetSavePlantSlug(plant.slug || plant.id);
                        }}
                        title="Save specimen to collection"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#cbd5e1',
                          padding: '7px 12px',
                          borderRadius: '9999px',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span>📁</span>
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
          borderRadius: '9999px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--emerald-glow)',
          fontSize: '0.9rem',
          fontWeight: 600,
          zIndex: 3000
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Save To Collection Modal */}
      <SaveToCollectionModal
        isOpen={Boolean(targetSavePlantSlug)}
        onClose={() => setTargetSavePlantSlug(null)}
        plantSlug={targetSavePlantSlug}
        onSaved={() => {
          showToast('Collection updated successfully!');
        }}
      />

      <Footer />
    </div>
  );
};

export default Plants;

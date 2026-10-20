import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import plantApi from '../services/plantApi';
import gardenApi from '../services/gardenApi';
import { BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';

const normalizeApiPlant = (p) => ({
  id: p.specimenId || p._id,
  _id: p._id,
  specimenId: p.specimenId,
  catalogCode: p.specimenId || 'CANOPY-PLANT',
  name: p.name,
  scientificName: p.scientificName || 'Botanical specimen',
  biome: p.biome || 'tropical',
  biomeLabel: p.biome ? p.biome.toUpperCase() : 'TROPICAL',
  image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
  tags: p.tags?.length ? p.tags : [`#${p.category || 'Flora'}`, `#${p.biome || 'Tropical'}`],
  shortDesc: p.description || p.shortDescription || 'Botanical specimen curated at GreenNest.',
  traits: [p.light, p.watering, p.careLevel].filter(Boolean),
});

const PersonalGallery = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [starredIds, setStarredIds] = useState([]);
  const [allPlantsMap, setAllPlantsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load plants from Atlas and sync with starred IDs from MongoDB
  const loadData = useCallback(async () => {
    setLoading(true);
    let effectiveStarred = [];
    const plantMap = { ...BOTANICAL_SPECIMENS };

    try {
      // 1. Fetch live plants directory from MongoDB Atlas
      const plantRes = await plantApi.getPlants({ limit: 100 });
      if (plantRes?.data?.plants && Array.isArray(plantRes.data.plants)) {
        plantRes.data.plants.forEach(p => {
          const norm = normalizeApiPlant(p);
          if (norm.id) plantMap[norm.id] = norm;
          if (norm._id) plantMap[norm._id] = norm;
          if (norm.specimenId) plantMap[norm.specimenId] = norm;
        });
      }

      // 2. Fetch authenticated user's bookmarks directly from MongoDB Atlas
      if (isAuthenticated) {
        try {
          const gardenRes = await gardenApi.getMyGarden();
          const savedFromDb = gardenRes?.data?.savedPlants || [];
          const dbStarredIds = [];
          savedFromDb.forEach(sp => {
            const norm = normalizeApiPlant(sp);
            const key = norm.id || norm._id;
            if (key) {
              plantMap[key] = norm;
              dbStarredIds.push(key);
            }
          });
          effectiveStarred = dbStarredIds;
        } catch (dbErr) {
          console.warn('Could not fetch saved plants from Atlas:', dbErr);
          effectiveStarred = [];
        }
      } else {
        effectiveStarred = [];
      }
    } catch (err) {
      console.warn('Lỗi khi tải dữ liệu cây:', err.message);
    } finally {
      setAllPlantsMap(plantMap);
      setStarredIds(Array.from(new Set(effectiveStarred)));
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Map starred IDs to actual plant objects
  const starredPlants = Array.from(new Set(starredIds))
    .map(id => allPlantsMap[id] || BOTANICAL_SPECIMENS[id])
    .filter(Boolean);

  const handleToggleStar = async (plantId, e) => {
    if (e) e.stopPropagation();
    const plant = allPlantsMap[plantId] || BOTANICAL_SPECIMENS[plantId];
    const identifier = plant?._id || plant?.specimenId || plantId;

    try {
      const res = await gardenApi.toggleBookmark(identifier);
      const isBookmarked = res?.data?.isBookmarked;
      if (isBookmarked) {
        setStarredIds(prev => Array.from(new Set([...prev, plantId])));
        showToast(`⭐ Đã thêm "${plant?.name || 'Cây'}" vào Mục Yêu Thích!`);
      } else {
        setStarredIds(prev => prev.filter(id => id !== plantId && id !== identifier));
        showToast(`Đã xóa "${plant?.name || 'Cây'}" khỏi Mục Yêu Thích.`);
      }
    } catch (err) {
      showToast('Lỗi cập nhật yêu thích: ' + err.message);
    }
  };

  // Extract all unique tags present ONLY in user's saved plants
  const availableTags = Array.from(new Set(starredPlants.flatMap(p => p.tags || [])));

  // Filter tags when user types in search
  const cleanSearch = searchTerm.trim().toLowerCase();
  const matchingTags = cleanSearch.length > 0 
    ? availableTags.filter(t => t.toLowerCase().includes(cleanSearch) || t.replace('#', '').toLowerCase().startsWith(cleanSearch))
    : [];

  // Filtered plants
  const filteredPlants = starredPlants.filter(p => {
    let matchQuery = true;
    if (cleanSearch) {
      const nameMatch = p.name && p.name.toLowerCase().includes(cleanSearch);
      const sciMatch = p.scientificName && p.scientificName.toLowerCase().includes(cleanSearch);
      const tagMatch = p.tags?.some(t => t.toLowerCase().includes(cleanSearch));
      matchQuery = nameMatch || sciMatch || tagMatch;
    }

    let matchTag = true;
    if (activeTag) {
      matchTag = p.tags?.includes(activeTag);
    }

    return matchQuery && matchTag;
  });

  const handleOpenDossier = (plantId) => {
    navigate(`/specimen-detail?id=${encodeURIComponent(plantId)}`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Header */}
      <header className="gallery-hero-header" style={{ paddingTop: '140px', paddingBottom: '30px', textAlign: 'center', maxWidth: '920px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="gallery-kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(14, 30, 22, 0.75)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '9999px', marginBottom: '18px', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#86efac' }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--emerald-accent)', borderRadius: '50%', boxShadow: '0 0 8px var(--emerald-accent)' }}></span>
          <span>HERBARIUM PRIVATE STUDY // ARCHIVE NO. 01</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '14px' }}>
          Personal Gallery.
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 28px', fontWeight: 300 }}>
          Your private botanical herbarium. Curate high-resolution specimen captures, botanical care telemetry, and field observations in your personal study.
        </p>

        {isAuthenticated && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '4px 14px', borderRadius: '9999px' }}>
            <span>☁️ Bookmarks Synced with MongoDB Atlas Cloud</span>
          </div>
        )}
      </header>

      {/* Main Workspace Layout */}
      <main style={{ flex: 1, maxWidth: '1360px', width: '100%', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>

          {/* Left Column: Sidebar with Filter & Saved Specimen List */}
          <aside style={{ background: 'rgba(14, 30, 22, 0.82)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-glass)', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700 }}>
                  Curated Collection
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff', marginTop: '2px' }}>
                  Herbarium Study
                </h2>
              </div>
              <span style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--border-accent)', color: 'var(--emerald-light)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
                {starredPlants.length} Saved
              </span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, genus or tag..."
                style={{
                  width: '100%',
                  background: 'rgba(7, 16, 11, 0.75)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '9999px',
                  padding: '10px 36px 10px 16px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dynamic Matching Tag Chips */}
            {matchingTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--emerald-light)', fontWeight: 700, width: '100%' }}>MATCHING TAGS:</span>
                {matchingTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                    style={{
                      background: activeTag === tag ? 'var(--emerald-accent)' : 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid var(--border-accent)',
                      color: activeTag === tag ? '#07100b' : '#86efac',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Saved Plants List */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
              {loading ? (
                <li style={{ padding: '24px 12px', textAlign: 'center', color: '#86efac', fontSize: '0.88rem' }}>
                  Loading saved specimens from Atlas...
                </li>
              ) : starredPlants.length === 0 ? (
                <li style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.88rem' }}>
                  No plants saved yet. Explore the catalog archive to bookmark specimens.
                </li>
              ) : filteredPlants.length === 0 ? (
                <li style={{ padding: '20px 12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                  No saved specimens match your filter.
                </li>
              ) : (
                filteredPlants.map(plant => (
                  <li
                    key={plant.id}
                    onClick={() => handleOpenDossier(plant.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {plant.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {plant.scientificName}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleToggleStar(plant.id, e)}
                      style={{ background: 'transparent', border: 'none', color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer', padding: '4px' }}
                      title="Remove from Personal Gallery"
                    >
                      ★
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
                padding: '11px 18px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid var(--border-accent)',
                borderRadius: '9999px',
                color: 'var(--emerald-light)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              + Curate More Plants
            </Link>
          </aside>

          {/* Right Area: Cards Grid */}
          <div style={{ gridColumn: 'span 2' }}>
            {/* Filter Status Bar */}
            {(searchTerm || activeTag) && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '10px 18px', background: 'rgba(14, 30, 22, 0.65)', border: '1px solid var(--border-glass)', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                  Filter: <strong style={{ color: '#86efac' }}>{searchTerm ? `"${searchTerm}"` : ''} {activeTag ? `[${activeTag}]` : ''}</strong> ({filteredPlants.length} results)
                </span>
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setActiveTag(''); }}
                  style={{ background: 'transparent', border: 'none', color: '#86efac', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Reset
                </button>
              </div>
            )}

            {/* Specimen Cards Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'rgba(14, 30, 22, 0.75)', borderRadius: '24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>⏳</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff' }}>Connecting to Herbarium Database...</h3>
              </div>
            ) : starredPlants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'rgba(14, 30, 22, 0.75)', border: '1.5px dashed rgba(34, 197, 94, 0.3)', borderRadius: '24px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🌿</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>Your Personal Gallery is Empty</h3>
                <p style={{ color: '#cbd5e1', maxWidth: '520px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
                  Bookmark botanical specimens from the main plant catalog to keep their dossiers, care telemetry, and taxonomy notes here.
                </p>
                <Link to="/plants" className="btn-cta-pill" style={{ textDecoration: 'none' }}>
                  Explore Plants Catalog →
                </Link>
              </div>
            ) : filteredPlants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(14, 30, 22, 0.5)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '14px' }}>No specimens matched your current filter.</p>
                <button type="button" className="btn-cta-pill" onClick={() => { setSearchTerm(''); setActiveTag(''); }}>Reset Filter</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '26px' }}>
                {filteredPlants.map(plant => (
                  <article
                    key={plant.id}
                    className="specimen-card"
                    style={{
                      background: 'rgba(14, 30, 22, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 16px 36px rgba(0,0,0,0.55)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div
                      style={{ position: 'relative', height: '220px', overflow: 'hidden', cursor: 'pointer' }}
                      onClick={() => handleOpenDossier(plant.id)}
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
                      <button
                        type="button"
                        onClick={(e) => handleToggleStar(plant.id, e)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(7, 16, 11, 0.85)',
                          border: '1px solid rgba(245, 158, 11, 0.5)',
                          color: '#f59e0b',
                          borderRadius: '50%',
                          width: '34px',
                          height: '34px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                        title="Remove from Personal Gallery"
                      >
                        ★
                      </button>
                    </div>

                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <h3
                          onClick={() => handleOpenDossier(plant.id)}
                          style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#fff', cursor: 'pointer', marginBottom: '2px' }}
                        >
                          {plant.name}
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: 'var(--emerald-light)', fontStyle: 'italic' }}>
                          {plant.scientificName}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {plant.tags?.map(t => (
                          <span
                            key={t}
                            onClick={() => setActiveTag(activeTag === t ? '' : t)}
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '9999px',
                              padding: '2px 8px',
                              fontSize: '0.7rem',
                              color: '#cbd5e1',
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

                      <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenDossier(plant.id)}
                          className="btn-inspect-specimen"
                          style={{
                            background: 'rgba(34, 197, 94, 0.12)',
                            border: '1px solid var(--border-accent)',
                            color: '#86efac',
                            padding: '7px 14px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>Botanical Dossier</span>
                          <span>→</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleToggleStar(plant.id, e)}
                          style={{ background: 'transparent', border: 'none', color: '#f59e0b', fontSize: '1.2rem', cursor: 'pointer' }}
                          title="Remove from Personal Gallery"
                        >
                          ★
                        </button>
                      </div>
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
          borderRadius: '9999px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--emerald-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
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

export default PersonalGallery;

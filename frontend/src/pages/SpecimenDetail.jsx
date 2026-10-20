import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  BOTANICAL_SPECIMENS,
  SPECIMEN_KEYS
} from '../data/botanicalSpecimens';
import SaveToCollectionModal from '../components/gallery/SaveToCollectionModal';
import { useAuth } from '../context/AuthContext';
import plantApi from '../services/plantApi';
import gardenApi from '../services/gardenApi';

const SpecimenDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedId = searchParams.get('id');

  const defaultId = (requestedId && BOTANICAL_SPECIMENS[requestedId])
    ? requestedId
    : 'monstera-deliciosa';

  const [currentPlant, setCurrentPlant] = useState(BOTANICAL_SPECIMENS[defaultId]);
  const [loading, setLoading] = useState(false);
  const [starredIds, setStarredIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUserSaved = async () => {
      if (isAuthenticated) {
        try {
          const res = await gardenApi.getMyGarden();
          const saved = res?.data?.savedPlants || [];
          const ids = saved.map(p => p.specimenId || p._id || p.id).filter(Boolean);
          setStarredIds(ids);
        } catch (e) {
          console.warn('Không thể tải cây yêu thích:', e);
        }
      } else {
        setStarredIds([]);
      }
    };
    fetchUserSaved();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!requestedId) return;

    // Nếu ID có trong BOTANICAL_SPECIMENS thì set trước
    if (BOTANICAL_SPECIMENS[requestedId]) {
      setCurrentPlant(BOTANICAL_SPECIMENS[requestedId]);
    }

    // Sau đó gọi API để lấy dữ liệu mới nhất từ MongoDB
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await plantApi.getPlant(requestedId);
        const p = res?.data?.plant || (res?.data?.name ? res.data : null);
        if (p) {
          setCurrentPlant({
            id: p.specimenId || p._id,
            catalogCode: p.specimenId || 'CANOPY-001',
            name: p.name,
            scientificName: p.scientificName || p.botanicalName || '',
            biome: p.biome || 'tropical',
            biomeLabel: p.biome ? p.biome.toUpperCase() : 'Tropical Rainforest',
            image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
            tags: p.tags?.length ? p.tags : [`#${p.category || 'Araceae'}`, `#${p.biome || 'Tropical'}`],
            taxonomyTags: [p.category, p.biome, 'Plantae'].filter(Boolean),
            traits: [p.light, p.watering, p.careLevel].filter(Boolean),
            shortDesc: p.description || '',
            origin: p.origin || 'Vườn ươm GreenNest Sanctuary',
            water: p.watering || 'Every 7-10 days',
            light: p.light || 'Dappled indirect sunlight',
            soil: p.careGuide?.soil || 'Chunky aroid mix',
            humidity: p.careGuide?.humidity || '65% - 85%',
            temp: '20°C – 28°C',
            growth: p.careLevel || 'Moderate',
            toxicity: p.toxicity?.isToxicToPets ? 'Pet Caution' : 'Pet Safe',
            waterDaily: '350 ml / 7 Days',
            waterStatus: 'Balanced',
            notifMsg: `${p.name} is flourishing under ambient biophilic light.`,
            waterVal: '350 ml',
            waterBar: '82%',
            waterSub: 'Optimal root zone saturation. Next deep hydration scheduled in 4 days.',
            humidityVal: '68% RH',
            humidityBar: '88%',
            humiditySub: 'High foliar turgor. Transpiration balanced under diffused light.',
            envVal: '1,600 FC',
            envBar: '95%',
            envSub: 'Dappled canopy daylight • 22°C ambient conservatory curve.',
            soilVal: 'Aroid Chunk',
            soilBar: '90%',
            soilSub: 'High aeration blend: orchid bark, pumice, and coco coir.'
          });
        }
      } catch (err) {
        console.warn('Dùng dữ liệu dự phòng cho chi tiết cây:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [requestedId]);

  const plant = currentPlant || BOTANICAL_SPECIMENS['specimen-monstera'];
  const plantId = plant.id || defaultId;

  const isStarred = starredIds.includes(plantId) || (plant._id && starredIds.includes(plant._id));

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleToggleStar = async () => {
    if (!isAuthenticated) {
      showToast('Vui lòng đăng nhập để lưu cây vào mục yêu thích!');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }

    const identifier = plant._id || plant.id || defaultId;
    try {
      const res = await gardenApi.toggleBookmark(identifier);
      const isBookmarked = res?.data?.isBookmarked;
      if (isBookmarked) {
        setStarredIds(prev => Array.from(new Set([...prev, plantId])));
        showToast(`⭐ Đã thêm "${plant.name}" vào Mục Yêu Thích!`);
      } else {
        setStarredIds(prev => prev.filter(id => id !== plantId && id !== plant._id));
        showToast(`Đã xóa "${plant.name}" khỏi Mục Yêu Thích.`);
      }
    } catch (err) {
      showToast('Lỗi cập nhật yêu thích: ' + err.message);
    }
  };

  // Pagination navigation
  const currentIndex = SPECIMEN_KEYS.indexOf(plantId);
  const prevIndex = (currentIndex - 1 + SPECIMEN_KEYS.length) % SPECIMEN_KEYS.length;
  const nextIndex = (currentIndex + 1) % SPECIMEN_KEYS.length;
  const prevId = SPECIMEN_KEYS[prevIndex];
  const nextId = SPECIMEN_KEYS[nextIndex];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '120px 24px 80px', maxWidth: '1360px', width: '100%', margin: '0 auto' }}>
        
        {/* Top Switcher Navigation Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px 24px',
          background: 'rgba(14, 30, 22, 0.85)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          marginBottom: '32px'
        }}>
          <Link
            to="/plants"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-light)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <span>← Back to Specimen Archive</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to={`/specimen-detail?id=${prevId}`}
              style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.86rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', border: '1px solid var(--border-glass)' }}
            >
              ← Prev
            </Link>
            <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              {currentIndex + 1} of {SPECIMEN_KEYS.length} • <strong style={{ color: '#fff' }}>{plant.name}</strong>
            </span>
            <Link
              to={`/specimen-detail?id=${nextId}`}
              style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.86rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '9999px', border: '1px solid var(--border-glass)' }}
            >
              Next →
            </Link>
          </div>
        </div>

        {/* 2-Column Dossier Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>

          {/* Left Column: Media & Taxonomy Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Main Specimen Image Card */}
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              background: '#0e1e16',
              boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
            }}>
              <img
                src={plant.image}
                alt={plant.name}
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              <span style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(7, 16, 11, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: 'var(--emerald-light)'
              }}>
                🌿 {plant.biomeLabel}
              </span>
              <button
                type="button"
                onClick={handleToggleStar}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(7, 16, 11, 0.85)',
                  border: isStarred ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid var(--border-glass)',
                  color: isStarred ? '#f59e0b' : '#cbd5e1',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
                title={isStarred ? "Saved in Personal Gallery" : "Save to Personal Gallery"}
              >
                ★
              </button>

              <div style={{ padding: '16px 20px', background: 'rgba(14, 30, 22, 0.95)', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Catalog #{plant.catalogCode}
                </span>
                <Link
                  to={`/plant-macro?id=${encodeURIComponent(plant.id)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--emerald-light)',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}
                >
                  <span>Open Macro Telemetry</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700 }}>
                Taxonomic Classification
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Catalog Identifier</span>
                  <strong style={{ color: '#fff' }}>{plant.catalogCode}</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Growth Biome</span>
                  <strong style={{ color: '#fff' }}>{plant.biomeLabel}</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Family Classification</span>
                  <strong style={{ color: '#fff' }}>{plant.taxonomyTags?.[0] || 'Plantae'}</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Toxicity Metric</span>
                  <strong style={{ color: plant.toxicity?.includes('Non-Toxic') ? '#86efac' : '#fde047' }}>{plant.toxicity}</strong>
                </li>
              </ul>
            </div>

            {/* Traits Pills */}
            <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700, marginBottom: '14px' }}>
                Morphological Traits
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {plant.traits?.map(tr => (
                  <span key={tr} style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--border-accent)', color: 'var(--emerald-light)', padding: '5px 12px', borderRadius: '9999px', fontSize: '0.78rem' }}>
                    {tr}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dossier Information */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Header Title Block */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--border-accent)', color: 'var(--emerald-light)', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {plant.biomeLabel}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  ARCHIVE #{plant.catalogCode}
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '6px' }}>
                {plant.name}
              </h1>

              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--emerald-light)', marginBottom: '16px' }}>
                {plant.scientificName}
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 300, marginBottom: '20px' }}>
                {plant.shortDesc}
              </p>

              {/* Tag Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {plant.tags?.map(t => (
                  <span
                    key={t}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.76rem' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      showToast('Vui lòng đăng nhập để thêm cây vào bộ sưu tập!');
                      setTimeout(() => navigate('/login'), 1200);
                      return;
                    }
                    setIsSaveModalOpen(true);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid var(--border-accent)',
                    color: '#86efac',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span>📁 Lưu Vào Bộ Sưu Tập</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleStar}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: isStarred ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: isStarred ? '1px solid #f59e0b' : '1px solid var(--border-glass)',
                    color: isStarred ? '#fde68a' : '#cbd5e1',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <span>{isStarred ? '★ Đã Yêu Thích' : '★ Yêu Thích'}</span>
                </button>

                <Link
                  to={`/plant-macro?id=${encodeURIComponent(plant.slug || plant.id)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.35)'
                  }}
                >
                  <span>View Telemetry Macro Site</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>

            {/* Geographical Origin & Provenance */}
            <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>
                Natural Habitat & Provenance
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {plant.origin}
              </p>
            </div>

            {/* Architectural & Biophilic Purpose */}
            <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>
                Architectural & Biophilic Living Functions
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.96rem' }}>
                {plant.purpose}
              </p>
            </div>

            {/* Care Telemetry Cards */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '18px' }}>
                Care Protocol & Environmental Telemetry
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '22px' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>💧</div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '8px' }}>Hydration Protocol</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{plant.water}</p>
                </div>

                <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '22px' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>☀️</div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '8px' }}>Solar Exposure</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{plant.light}</p>
                </div>

                <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '18px', padding: '22px' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>🌱</div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '8px' }}>Substrate & Soil</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{plant.soil}</p>
                </div>
              </div>
            </div>

            {/* Conservatory Microclimate Metrics */}
            <div style={{ background: 'rgba(14, 30, 22, 0.85)', border: '1px solid var(--border-glass)', borderRadius: '20px', padding: '24px' }}>
              <h4 style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700, marginBottom: '16px' }}>
                Optimal Microclimate Calibration
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Target Humidity</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{plant.humidity || '65% – 85%'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Thermal Range</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{plant.temp || '20°C – 28°C'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Growth Rate</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{plant.growth || 'Moderate'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Toxicity Caution</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: plant.toxicity?.includes('Non-Toxic') ? '#86efac' : '#fde047', marginTop: '4px' }}>{plant.toxicity}</div>
                </div>
              </div>
            </div>

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
          fontSize: '0.9rem',
          fontWeight: 600,
          zIndex: 3000
        }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Save To Collection Modal */}
      <SaveToCollectionModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        plantSlug={plant.slug || plantId}
        onSaved={() => {
          setToastMessage(`Đã cập nhật bộ sưu tập cho "${plant.name}"!`);
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />

      <Footer />
    </div>
  );
};

export default SpecimenDetail;

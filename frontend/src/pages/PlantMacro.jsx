import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import plantApi from '../services/plantApi';
import gardenApi from '../services/gardenApi';
import {
  BOTANICAL_SPECIMENS,
  SPECIMEN_KEYS
} from '../data/botanicalSpecimens';

const normalizePlantTelemetry = (raw, staticFallback = {}) => {
  const p = raw || {};
  const s = staticFallback || {};

  const name = p.name || s.name || 'Botanical Specimen';
  const biome = p.biome || s.biome || 'tropical';

  return {
    id: p.specimenId || p._id || s.id || 'specimen-monstera',
    dbId: p._id,
    catalogCode: p.specimenId || s.catalogCode || 'CANOPY-MACRO',
    name,
    scientificName: p.scientificName || s.scientificName || 'Botanical genus sp.',
    biome,
    biomeLabel: biome.toUpperCase(),
    image: p.images?.[0]?.url || s.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
    notifMsg: s.notifMsg || `${name} telemetry readings are running within nominal baseline parameters on MongoDB Atlas.`,
    
    // Macro 1: Water
    waterVal: s.waterVal || (p.watering?.toLowerCase().includes('daily') ? '150 ml' : '350 ml'),
    waterBar: s.waterBar || '82%',
    waterSub: s.waterSub || (p.watering ? `Nominal irrigation cadence: ${p.watering}. Keep substrate aerated.` : 'Optimal root zone saturation balance.'),
    waterVol: s.waterVol || '350 ml per saturation cycle',
    waterFreq: s.waterFreq || p.careGuide?.wateringFrequency || p.watering || 'Every 7–10 days when top 50% potting mix dries',
    
    // Macro 2: Humidity
    humidityVal: p.careGuide?.humidity || s.humidityVal || '68% RH',
    humidityBar: s.humidityBar || '88%',
    humiditySub: s.humiditySub || 'High foliar turgor. Aerial root transpiration balanced under diffused light.',
    humidityTarget: p.careGuide?.humidity || s.humidityTarget || '65% – 85% RH (Current: 68%)',
    mistCadence: s.mistCadence || 'Mist aerial foliage every 48 hours with filtered water',
    
    // Macro 3: Light
    envVal: s.envVal || (p.light?.toLowerCase().includes('direct') ? '2,200 FC' : '1,600 FC'),
    envBar: s.envBar || '92%',
    envSub: s.envSub || `${p.light || 'Dappled canopy daylight'} • 22°C ambient conservatory thermal curve.`,
    light: p.light || s.light || 'Dappled indirect sunlight (1,200–2,000 FC)',
    tempRange: s.tempRange || '20°C min night / 28°C max day',
    temp: s.temp || '20°C – 28°C',
    
    // Macro 4: Soil
    soilVal: p.careGuide?.soil?.split(',')[0] || s.soilVal || 'Aroid Chunk',
    soilBar: s.soilBar || '88%',
    soilSub: p.careGuide?.soil ? `Substrate: ${p.careGuide.soil}` : (s.soilSub || 'High aeration porous substrate with balanced mineral grit.'),
    
    raw: p
  };
};

const PlantMacro = () => {
  const [searchParams] = useSearchParams();
  const requestedId = searchParams.get('id');
  const targetId = requestedId || 'specimen-monstera';

  const { isAuthenticated } = useAuth();
  const initialFallback = BOTANICAL_SPECIMENS[targetId] || Object.values(BOTANICAL_SPECIMENS)[0] || null;
  
  const [plant, setPlant] = useState(() => normalizePlantTelemetry(null, initialFallback));
  const [plantCatalog, setPlantCatalog] = useState(SPECIMEN_KEYS);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!plant) {
    return (
      <div className="macro-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '160px 24px 80px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '16px' }}>No Macro Telemetry Available</h2>
          <p style={{ color: '#cbd5e1', marginBottom: '28px', lineHeight: 1.6 }}>The requested botanical specimen has been removed or is no longer in the archive.</p>
          <Link to="/gallery" className="btn-cta-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ← Return to Gallery Exhibition
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Load Catalog Keys for Pagination
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await plantApi.getPlants({ limit: 100 });
        if (res?.data?.plants && Array.isArray(res.data.plants)) {
          const keys = res.data.plants.map(p => p.specimenId || p._id);
          if (keys.length > 0) {
            setPlantCatalog(keys);
          }
        }
      } catch (err) {
        console.warn('Using default pagination catalog:', err.message);
      }
    };
    fetchCatalog();
  }, []);

  // Fetch Live Plant Telemetry from Atlas
  const fetchPlantTelemetry = useCallback(async () => {
    const staticFallback = BOTANICAL_SPECIMENS[targetId] || null;
    try {
      setLoading(true);
      const res = await plantApi.getPlantDetail(targetId);
      const rawPlant = res?.data?.plant || (res?.data?.name ? res.data : null);
      if (rawPlant) {
        setPlant(normalizePlantTelemetry(rawPlant, staticFallback));
      } else if (staticFallback) {
        setPlant(normalizePlantTelemetry(null, staticFallback));
      }
    } catch (err) {
      console.warn('Cannot fetch live telemetry from Atlas, using static fallback:', err.message);
      if (staticFallback) {
        setPlant(normalizePlantTelemetry(null, staticFallback));
      }
    } finally {
      setLoading(false);
    }
  }, [targetId]);

  useEffect(() => {
    fetchPlantTelemetry();
  }, [fetchPlantTelemetry]);

  const handleLogAction = async (type) => {
    if (type === 'water') {
      showToast(`💧 Logged ${plant.waterVal} hydration for ${plant.name}! Moisture macro updated.`);
      if (isAuthenticated && plant.dbId) {
        try {
          await gardenApi.updateChecklist({ plantId: plant.dbId, taskName: 'water', completed: true });
        } catch {}
      }
    } else if (type === 'mist') {
      showToast(`🌫️ Foliage mist logged for ${plant.name}! Ambient humidity stable at ${plant.humidityVal}.`);
      if (isAuthenticated && plant.dbId) {
        try {
          await gardenApi.updateChecklist({ plantId: plant.dbId, taskName: 'mist', completed: true });
        } catch {}
      }
    } else {
      showToast(`🌱 Root inspection logged for ${plant.name}! Substrate aeration optimal.`);
    }
  };

  // Pagination navigation
  const currentIndex = plantCatalog.indexOf(targetId) !== -1 ? plantCatalog.indexOf(targetId) : 0;
  const prevIndex = (currentIndex - 1 + plantCatalog.length) % plantCatalog.length;
  const nextIndex = (currentIndex + 1) % plantCatalog.length;
  const prevId = plantCatalog[prevIndex];
  const nextId = plantCatalog[nextIndex];

  return (
    <div className="macro-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
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
          background: 'rgba(14, 30, 22, 0.9)',
          border: '1px solid var(--border-glass)',
          marginBottom: '36px'
        }}>
          <Link
            to="/garden"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-light)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <span>← Return to My Garden Sanctuary</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              to={`/plant-macro?id=${encodeURIComponent(prevId)}`}
              style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)' }}
            >
              ← Prev
            </Link>
            <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              {currentIndex + 1} of {plantCatalog.length} • <strong style={{ color: '#fff' }}>{plant.name}</strong>
            </span>
            <Link
              to={`/plant-macro?id=${encodeURIComponent(nextId)}`}
              style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.84rem', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)' }}
            >
              Next →
            </Link>
          </div>
        </div>

        {/* Hero Title & Telemetry Status Banner */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid var(--border-accent)', color: 'var(--emerald-light)', padding: '6px 14px', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px' }}>
            <span>🌿 {plant.biomeLabel}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '6px' }}>
            {plant.name}
          </h1>

          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--emerald-light)', marginBottom: '18px' }}>
            {plant.scientificName}
          </div>

          {/* Telemetry Status Notification Box */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.95)',
            border: '1px solid var(--border-glass)',
            borderLeft: '4px solid var(--emerald-accent)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <span style={{ fontSize: '0.92rem', color: '#cbd5e1' }}>
                {plant.notifMsg}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleLogAction('water')}
                style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--border-accent)', color: '#86efac', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                💧 Log Hydration
              </button>
              <button
                type="button"
                onClick={() => handleLogAction('mist')}
                style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#7dd3fc', padding: '6px 12px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                🌫️ Log Mist
              </button>
            </div>
          </div>
        </div>

        {/* 4 Botanical Telemetry Macro Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* Card 1: Water */}
          <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', fontWeight: 700 }}>Water Macro</span>
              <span style={{ fontSize: '1.2rem' }}>💧</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{plant.waterVal}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: plant.waterBar || '80%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }}></div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              {plant.waterSub}
            </p>
          </div>

          {/* Card 2: Humidity */}
          <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', fontWeight: 700 }}>Ambient Humidity</span>
              <span style={{ fontSize: '1.2rem' }}>🌫️</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{plant.humidityVal}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: plant.humidityBar || '85%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #86efac)' }}></div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              {plant.humiditySub}
            </p>
          </div>

          {/* Card 3: Light */}
          <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', fontWeight: 700 }}>Environment Solar</span>
              <span style={{ fontSize: '1.2rem' }}>☀️</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{plant.envVal}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: plant.envBar || '90%', height: '100%', background: 'linear-gradient(90deg, #eab308, #fde047)' }}></div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              {plant.envSub}
            </p>
          </div>

          {/* Card 4: Soil */}
          <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', fontWeight: 700 }}>Substrate Aeration</span>
              <span style={{ fontSize: '1.2rem' }}>🌱</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>{plant.soilVal}</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: plant.soilBar || '88%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              {plant.soilSub}
            </p>
          </div>

        </div>

        {/* 2-Column Photo & Deep Telemetry Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'start' }}>
          
          {/* Photo Box */}
          <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--border-glass)', background: '#0e1e16' }}>
            <img
              src={plant.image}
              alt={plant.name}
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 20px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(7, 16, 11, 0.95) 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{plant.name}</div>
                <span style={{ fontSize: '0.72rem', color: 'var(--emerald-light)' }}>{plant.catalogCode} • Macro Holotype</span>
              </div>
              <Link
                to={`/specimen-detail?id=${encodeURIComponent(plant.id)}`}
                style={{ color: 'var(--emerald-light)', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600 }}
              >
                Open Full Dossier →
              </Link>
            </div>
          </div>

          {/* Telemetry Tables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Table 1: Environment Needed to Grow */}
            <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px' }}>
              <h3 style={{ fontSize: '0.88rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700, marginBottom: '16px' }}>
                Environmental Parameters
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Target Biome</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.biomeLabel}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Light Exposure</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.light}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Thermal Range</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.tempRange || plant.temp}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Humidity Telemetry */}
            <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px' }}>
              <h3 style={{ fontSize: '0.88rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700, marginBottom: '16px' }}>
                Humidity & Transpiration Telemetry
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Target Humidity (RH)</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.humidityTarget || plant.humidityVal}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Foliage Misting Cadence</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.mistCadence}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 3: Water Telemetry */}
            <div style={{ background: 'rgba(14, 30, 22, 0.88)', border: '1px solid var(--border-glass)', padding: '24px' }}>
              <h3 style={{ fontSize: '0.88rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--emerald-light)', fontWeight: 700, marginBottom: '16px' }}>
                Root Zone Hydration Schedule
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Saturation Volume</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.waterVol}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', color: '#94a3b8' }}>Irrigation Frequency</td>
                    <td style={{ padding: '10px 0', color: '#fff', textAlign: 'right', fontWeight: 600 }}>{plant.waterFreq}</td>
                  </tr>
                </tbody>
              </table>
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

export default PlantMacro;

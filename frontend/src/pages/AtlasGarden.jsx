import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import gardenApi from '../services/gardenApi';
import plantApi from '../services/plantApi';
import { toPlantViewModel, toPlantViewModels } from '../utils/plantAdapter';

// Custom Botanical Combobox Dropdown
const PlantSelectCombobox = ({ catalog, existingIds, selectedId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Available plants not yet added to the user's sanctuary
  const availablePlants = useMemo(() => {
    return catalog.filter(p => !existingIds.has(p._id));
  }, [catalog, existingIds]);

  // Filtered by search query
  const filteredPlants = useMemo(() => {
    if (!search.trim()) return availablePlants;
    const q = search.toLowerCase();
    return availablePlants.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.scientificName?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }, [availablePlants, search]);

  const selectedPlant = useMemo(() => {
    return catalog.find(p => p._id === selectedId);
  }, [catalog, selectedId]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', flex: 1, minWidth: 280 }}>
      {/* Trigger Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          background: 'rgba(7, 16, 11, 0.9)',
          border: isOpen ? '1px solid #22c55e' : '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: 14,
          padding: '10px 16px',
          color: selectedPlant ? '#ffffff' : '#94a3b8',
          fontSize: '0.92rem',
          cursor: 'pointer',
          textAlign: 'left',
          boxShadow: isOpen ? '0 0 20px rgba(34, 197, 94, 0.22)' : 'none',
          transition: 'all 0.25s ease'
        }}
      >
        {selectedPlant ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, overflow: 'hidden' }}>
            <img
              src={selectedPlant.image}
              alt={selectedPlant.name}
              style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'cover', background: '#0a1610' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedPlant.name}
              </div>
              {selectedPlant.scientificName && (
                <div style={{ fontSize: '0.75rem', color: '#86efac', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedPlant.scientificName}
                </div>
              )}
            </div>
            {selectedPlant.category && (
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                {selectedPlant.category}
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
            <span style={{ fontSize: '1.1rem' }}>🌿</span>
            <span>Choose a botanical specimen to cultivate...</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {selectedPlant && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelect('');
              }}
              title="Clear selection"
              style={{ padding: '2px 6px', borderRadius: 9999, background: 'rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.75rem' }}
            >
              ✕
            </span>
          )}
          <span style={{ fontSize: '0.75rem', color: '#86efac', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            ▼
          </span>
        </div>
      </button>

      {/* Custom Animated Popup Panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(8, 20, 14, 0.98)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: 18,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(34, 197, 94, 0.15)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#86efac', fontSize: '0.85rem' }}>
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, scientific, or category..."
              autoFocus
              style={{
                width: '100%',
                background: 'rgba(5, 12, 8, 0.9)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                borderRadius: 10,
                padding: '9px 12px 9px 34px',
                color: '#ffffff',
                fontSize: '0.86rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Plant Options List */}
          <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4, paddingRight: 4 }}>
            {filteredPlants.length === 0 ? (
              <div style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                No available specimens match your search.
              </div>
            ) : (
              filteredPlants.map(plant => (
                <div
                  key={plant._id}
                  onClick={() => {
                    onSelect(plant._id);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 12px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    background: selectedId === plant._id ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                    border: selectedId === plant._id ? '1px solid #22c55e' : '1px solid transparent',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={e => {
                    if (selectedId !== plant._id) {
                      e.currentTarget.style.background = 'rgba(34, 197, 94, 0.12)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedId !== plant._id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', background: '#0a1610' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                      {plant.name}
                    </div>
                    {plant.scientificName && (
                      <div style={{ fontSize: '0.76rem', color: '#86efac', fontStyle: 'italic' }}>
                        {plant.scientificName}
                      </div>
                    )}
                  </div>
                  {plant.category && (
                    <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.1)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.25)', whiteSpace: 'nowrap' }}>
                      {plant.category}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AtlasGarden = () => {
  const navigate = useNavigate();
  const [garden, setGarden] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'needs-water' | 'watered'
  const [toastMessage, setToastMessage] = useState('');

  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [gardenResponse, plantResponse] = await Promise.all([
        gardenApi.getMyGarden(),
        plantApi.getPlants({ limit: 100 }),
      ]);
      setGarden(Array.isArray(gardenResponse?.data?.garden) ? gardenResponse.data.garden : []);
      setCatalog(toPlantViewModels(Array.isArray(plantResponse?.data) ? plantResponse.data : []));
    } catch (loadError) {
      setGarden([]);
      setCatalog([]);
      setError(loadError.message || 'Unable to load your garden from the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const existingIds = useMemo(() => new Set(garden.map(item => item.plant?._id).filter(Boolean)), [garden]);

  const addPlant = async event => {
    event.preventDefault();
    if (!selectedPlant) return;
    try {
      await gardenApi.addPlant(selectedPlant);
      const addedSpecimen = catalog.find(p => p._id === selectedPlant);
      setSelectedPlant('');
      showToast(`${addedSpecimen?.name || 'Specimen'} added to your garden!`);
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to add this plant.');
    }
  };

  const removePlant = async item => {
    const plantName = item.customNickname || item.plant?.name || 'this specimen';
    if (!window.confirm(`Are you sure you want to remove ${plantName} from your garden?`)) return;
    try {
      await gardenApi.removePlant(item._id);
      showToast(`${plantName} removed.`);
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to remove this plant.');
    }
  };

  const toggleWater = async item => {
    const task = item.checklist?.find(entry => entry.taskName === 'water');
    const isNowWatered = !task?.completed;
    try {
      await gardenApi.updateChecklist({ gardenItemId: item._id, taskName: 'water', completed: isNowWatered });
      showToast(isNowWatered ? '💧 Plant marked as hydrated!' : '💧 Plant marked as needing water.');
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to update plant care.');
    }
  };

  // Filter calculations
  const filteredGarden = useMemo(() => {
    if (filter === 'watered') {
      return garden.filter(item => item.checklist?.find(entry => entry.taskName === 'water')?.completed);
    }
    if (filter === 'needs-water') {
      return garden.filter(item => !item.checklist?.find(entry => entry.taskName === 'water')?.completed);
    }
    return garden;
  }, [garden, filter]);

  const wateredCount = useMemo(() => {
    return garden.filter(item => item.checklist?.find(entry => entry.taskName === 'water')?.completed).length;
  }, [garden]);

  const needsWaterCount = garden.length - wateredCount;

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 0%, #0d2818 0%, #07100b 60%)', color: '#f0fdf4' }}>
      <Navbar />
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '130px 24px 90px' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 9999, marginBottom: 14 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#86efac', textTransform: 'uppercase' }}>Living Flora Sanctuary</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
              My Garden Sanctuary
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>
              Live biometric telemetry and care schedules from your GreenNest garden.
            </p>
          </div>
          <Link
            to="/plants"
            style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#86efac',
              padding: '10px 22px',
              borderRadius: 9999,
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease'
            }}
          >
            <span>🌿</span> Browse Full Catalog →
          </Link>
        </div>

        {/* Global Toast */}
        {toastMessage && (
          <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 100, background: 'rgba(14, 30, 22, 0.95)', border: '1px solid #22c55e', color: '#86efac', padding: '14px 22px', borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🌿</span> {toastMessage}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <p role="alert" style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#fca5a5', padding: '14px 20px', borderRadius: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>⚠️</span> {error}
          </p>
        )}

        {/* Custom Botanical Specimen Selection Form */}
        <section
          style={{
            background: 'rgba(14, 30, 22, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            borderRadius: 22,
            padding: '26px 30px',
            marginBottom: 36,
            boxShadow: '0 10px 32px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f0fdf4', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🌱</span> Add New Specimen to Sanctuary
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
              Search and select from curated botanical species in the catalog to track watering and microclimate telemetry.
            </p>
          </div>

          <form onSubmit={addPlant} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Custom Interactive Combobox */}
            <PlantSelectCombobox
              catalog={catalog}
              existingIds={existingIds}
              selectedId={selectedPlant}
              onSelect={setSelectedPlant}
            />

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={!selectedPlant}
              style={{
                background: selectedPlant
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'rgba(255, 255, 255, 0.08)',
                color: selectedPlant ? '#ffffff' : '#64748b',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '13px 28px',
                borderRadius: 14,
                border: 'none',
                cursor: selectedPlant ? 'pointer' : 'not-allowed',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: selectedPlant ? '0 4px 18px rgba(16, 185, 129, 0.35)' : 'none',
                transition: 'all 0.25s ease',
                height: 48
              }}
            >
              <span>🌱</span>
              <span>Add to garden</span>
            </button>
          </form>
        </section>

        {/* Garden Statistics & Filters Bar */}
        {garden.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            {/* Status Counters */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🌿</span> <strong>{garden.length}</strong> Specimens Total
              </span>
              <span style={{ color: '#475569' }}>•</span>
              <span style={{ fontSize: '0.85rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💧</span> <strong>{wateredCount}</strong> Hydrated
              </span>
              {needsWaterCount > 0 && (
                <>
                  <span style={{ color: '#475569' }}>•</span>
                  <span style={{ fontSize: '0.85rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>⚠️</span> <strong>{needsWaterCount}</strong> Require Water
                  </span>
                </>
              )}
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setFilter('all')}
                style={{
                  background: filter === 'all' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: filter === 'all' ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter === 'all' ? '#86efac' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                All ({garden.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('needs-water')}
                style={{
                  background: filter === 'needs-water' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: filter === 'needs-water' ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter === 'needs-water' ? '#fde047' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Needs Water ({needsWaterCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('watered')}
                style={{
                  background: filter === 'watered' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: filter === 'watered' ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter === 'watered' ? '#86efac' : '#cbd5e1',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Hydrated ({wateredCount})
              </button>
            </div>
          </div>
        )}

        {/* Garden Plant Specimen Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#86efac' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌱</div>
            <p>Loading your living garden sanctuary...</p>
          </div>
        ) : garden.length === 0 ? (
          <section
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              background: 'rgba(14, 30, 22, 0.45)',
              border: '1px solid rgba(40, 82, 61, 0.5)',
              borderRadius: 24,
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🪴</div>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.75rem', color: '#ffffff', margin: '0 0 10px 0' }}>
              Your Garden Sanctuary is Empty
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.02rem', maxWidth: 460, margin: '0 auto 28px' }}>
              Start cultivating your botanical space. Choose from our curated catalog above or explore all species in the catalog.
            </p>
            <Link
              to="/plants"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 700,
                padding: '13px 30px',
                borderRadius: 9999,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)'
              }}
            >
              <span>🌿</span> Explore Botanical Catalog
            </Link>
          </section>
        ) : filteredGarden.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <p>No specimens match the selected hydration filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filteredGarden.map(item => {
              const plant = toPlantViewModel(item.plant);
              const watered = item.checklist?.find(entry => entry.taskName === 'water')?.completed;
              return (
                <article
                  key={item._id}
                  style={{
                    background: 'rgba(14, 30, 22, 0.65)',
                    backdropFilter: 'blur(12px)',
                    border: watered ? '1px solid rgba(40, 82, 61, 0.6)' : '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* Plant Image Container */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#0a1610' }}>
                    <img
                      src={plant?.image}
                      alt={plant?.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Status Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: watered ? 'rgba(7, 24, 15, 0.88)' : 'rgba(38, 24, 4, 0.9)',
                        backdropFilter: 'blur(6px)',
                        border: watered ? '1px solid #22c55e' : '1px solid #f59e0b',
                        borderRadius: 9999,
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: watered ? '#86efac' : '#fcd34d',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5
                      }}
                    >
                      <span>{watered ? '✓' : '⚠️'}</span>
                      <span>{watered ? 'Hydrated Today' : 'Needs Water'}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h2
                        onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant?.slug || plant?.id)}`)}
                        style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', margin: '0 0 3px 0', cursor: 'pointer' }}
                      >
                        {item.customNickname || plant?.name}
                      </h2>
                      <p style={{ color: '#86efac', fontStyle: 'italic', fontSize: '0.84rem', margin: '0 0 16px 0' }}>
                        {plant?.scientificName}
                      </p>
                    </div>

                    {/* Redesigned Button Action Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      {/* Water Button Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleWater(item)}
                        title={watered ? 'Mark specimen as needing hydration' : 'Mark specimen as watered today'}
                        style={{
                          background: watered
                            ? 'rgba(34, 197, 94, 0.15)'
                            : 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.15) 100%)',
                          border: watered
                            ? '1px solid rgba(34, 197, 94, 0.45)'
                            : '1px solid rgba(245, 158, 11, 0.55)',
                          color: watered ? '#86efac' : '#fef08a',
                          padding: '7px 14px',
                          borderRadius: 9999,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span>{watered ? '✓' : '💧'}</span>
                        <span>{watered ? 'Watered' : 'Mark watered'}</span>
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {/* View Button */}
                        <button
                          type="button"
                          onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant?.slug || plant?.id)}`)}
                          title="View botanical macro details"
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#cbd5e1',
                            padding: '6px 12px',
                            borderRadius: 9999,
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          View
                        </button>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removePlant(item)}
                          title="Remove from garden sanctuary"
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: '#fca5a5',
                            padding: '6px 10px',
                            borderRadius: 9999,
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AtlasGarden;

import React, { useState, useEffect, useMemo } from 'react';
import plantApi from '../../services/plantApi';
import gardenApi from '../../services/gardenApi';
import { BOTANICAL_SPECIMENS, CANONICAL_PLANT_SLUGS } from '../../data/botanicalSpecimens';
import { scorePlant } from '../../utils/searchPlants';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80';

const AddPlantToGardenModal = ({ isOpen, onClose, onPlantAdded, existingGardenPlantIds = [] }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBiome, setSelectedBiome] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [customNickname, setCustomNickname] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Legacy modal retained until the local catalog is populated.
  useEffect(() => {
    if (!isOpen) return;

    const fetchAllPlants = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await plantApi.getPlants({ limit: 100 });
        if (res?.data?.plants && Array.isArray(res.data.plants) && res.data.plants.length > 0) {
          const mapped = res.data.plants.map(p => ({
            id: p.specimenId || p._id,
            dbId: p._id,
            specimenId: p.specimenId,
            slug: p.slug,
            name: p.name,
            scientificName: p.scientificName || p.botanicalName || '',
            biome: p.biome || 'tropical',
            category: p.category || 'foliage',
            image: p.images?.[0]?.url || FALLBACK_IMAGE,
            watering: p.watering || 'Weekly',
            light: p.light || 'Bright indirect',
            tags: p.tags || []
          }));
          setPlants(mapped);
        } else {
          // Fallback to local canonical specimens
          const fallback = CANONICAL_PLANT_SLUGS.map(slug => BOTANICAL_SPECIMENS[slug]).filter(Boolean);
          setPlants(fallback);
        }
      } catch (err) {
        console.warn('Could not load plants from API, using fallback catalog:', err.message);
        const fallback = CANONICAL_PLANT_SLUGS.map(slug => BOTANICAL_SPECIMENS[slug]).filter(Boolean);
        setPlants(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlants();
  }, [isOpen]);

  // Reset state when closing/opening
  useEffect(() => {
    if (isOpen) {
      setSelectedPlant(null);
      setCustomNickname('');
      setSearchQuery('');
      setSelectedBiome('all');
      setErrorMsg('');
    }
  }, [isOpen]);

  // Extract canonical identifier safely without undefined matches
  const getPlantKey = (p) => {
    if (!p) return null;
    return p.dbId || p._id || p.specimenId || p.slug || p.id || null;
  };

  // Check if a plant is already in the user's garden
  const isAlreadyInGarden = (plant) => {
    if (!plant) return false;
    const plantKey = getPlantKey(plant);
    return existingGardenPlantIds.some(id => {
      if (!id) return false;
      return (
        (plantKey && id === plantKey) ||
        (plant.id && id === plant.id) || 
        (plant.dbId && id === plant.dbId) || 
        (plant.specimenId && id === plant.specimenId) || 
        (plant.slug && id === plant.slug) ||
        (plant.rawPlant && (
          (plant.rawPlant._id && id === plant.rawPlant._id) || 
          (plant.rawPlant.specimenId && id === plant.rawPlant.specimenId)
        ))
      );
    });
  };

  // Filter and sort available specimens
  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      // Biome filter
      if (selectedBiome !== 'all' && plant.biome !== selectedBiome) {
        return false;
      }
      // Search query filter using botanical scoring
      if (searchQuery.trim()) {
        const score = scorePlant(plant, searchQuery);
        if (score <= 0) return false;
      }
      return true;
    }).sort((a, b) => {
      if (searchQuery.trim()) {
        return scorePlant(b, searchQuery) - scorePlant(a, searchQuery);
      }
      // Put non-added plants first
      const aIn = isAlreadyInGarden(a);
      const bIn = isAlreadyInGarden(b);
      if (aIn !== bIn) return aIn ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
  }, [plants, selectedBiome, searchQuery, existingGardenPlantIds]);

  const handleSelectPlant = (plant) => {
    if (isAlreadyInGarden(plant)) return;
    setSelectedPlant(plant);
    setCustomNickname(plant.name);
    setErrorMsg('');
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlant) {
      setErrorMsg('Please select a specimen from the catalog.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    const nickname = customNickname.trim() || selectedPlant.name;
    const plantIdentifier = selectedPlant.dbId || selectedPlant.specimenId || selectedPlant.id || selectedPlant.slug;

    try {
      const res = await gardenApi.addPlant(plantIdentifier, nickname);
      
      if (onPlantAdded) {
        onPlantAdded(selectedPlant, nickname, res?.data);
      }
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Could not add to garden';
      if (msg.includes('already in your garden') || msg.includes('PLANT_ALREADY_IN_GARDEN')) {
        setErrorMsg(`"${selectedPlant.name}" is already cultivated in your sanctuary.`);
      } else {
        // Fallback gracefully for Network Error, offline state, or dev session
        try {
          const currentGarden = JSON.parse(localStorage.getItem('livingCanopyGardenPlants') || '[]');
          const pId = selectedPlant.slug || selectedPlant.id || selectedPlant.specimenId || plantIdentifier;
          if (!currentGarden.includes(pId)) {
            currentGarden.push(pId);
            localStorage.setItem('livingCanopyGardenPlants', JSON.stringify(currentGarden));
          }
          if (onPlantAdded) {
            onPlantAdded(selectedPlant, nickname, { isLocal: true, id: pId });
          }
          onClose();
          return;
        } catch (localErr) {
          setErrorMsg('Failed to cultivate specimen: ' + msg);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(5, 13, 8, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          background: 'rgba(14, 30, 22, 0.98)',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(34, 197, 94, 0.15)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#86efac',
              marginBottom: '6px'
            }}>
              <span>🌿 Personal Sanctuary Portal</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif, "Playfair Display", Georgia, serif)',
              fontSize: '1.6rem',
              color: '#ffffff',
              margin: 0
            }}>
              Cultivate New Specimen
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#94a3b8' }}>
              Choose a botanical specimen to nurture in your private living garden sanctuary.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#94a3b8',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.1rem',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body / Search Controls */}
        <div style={{ padding: '16px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(7, 16, 11, 0.45)' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search specimen by name, genus or biome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Biome Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[
                { key: 'all', label: 'All Biomes' },
                { key: 'tropical', label: 'Tropical' },
                { key: 'subtropical', label: 'Subtropical' },
                { key: 'arid', label: 'Arid' }
              ].map(b => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setSelectedBiome(b.key)}
                  style={{
                    background: selectedBiome === b.key ? 'rgba(34, 197, 94, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedBiome === b.key ? 'var(--emerald-accent, #22c55e)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: selectedBiome === b.key ? '#86efac' : '#cbd5e1',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plant Selection List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#86efac' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌿</div>
              <div style={{ fontSize: '0.9rem' }}>Accessing Living Botanical Catalog...</div>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🍃</div>
              <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '4px' }}>No specimens match your search</div>
              <div style={{ fontSize: '0.82rem' }}>Try clearing filters or searching another common botanical name.</div>
            </div>
          ) : (
            filteredPlants.map((plant, index) => {
              const plantKey = getPlantKey(plant);
              const selectedKey = getPlantKey(selectedPlant);
              const inGarden = isAlreadyInGarden(plant);
              const isSelected = Boolean(selectedKey && plantKey && selectedKey === plantKey);

              return (
                <div
                  key={plantKey || `specimen-${index}`}
                  onClick={() => handleSelectPlant(plant)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: `1.5px solid ${isSelected ? 'var(--emerald-accent, #22c55e)' : inGarden ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'}`,
                    background: isSelected 
                      ? 'rgba(34, 197, 94, 0.15)' 
                      : inGarden 
                        ? 'rgba(0, 0, 0, 0.25)' 
                        : 'rgba(255, 255, 255, 0.03)',
                    cursor: inGarden ? 'not-allowed' : 'pointer',
                    opacity: inGarden ? 0.65 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {plant.name}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#86efac'
                      }}>
                        {plant.biome}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--emerald-light, #86efac)', fontStyle: 'italic', marginBottom: '4px' }}>
                      {plant.scientificName}
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                      <span>💧 {plant.watering}</span>
                      <span>☀️ {plant.light}</span>
                    </div>
                  </div>

                  {inGarden ? (
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#86efac',
                      background: 'rgba(34, 197, 94, 0.15)',
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      flexShrink: 0
                    }}>
                      ✓ In Sanctuary
                    </span>
                  ) : (
                    <button
                      type="button"
                      style={{
                        background: isSelected ? 'var(--emerald-accent, #22c55e)' : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#07100b' : '#ffffff',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSelected ? 'Selected ✓' : '+ Select'}
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected Plant Custom Nickname & Action Bar */}
        <form onSubmit={handleAddSubmit} style={{
          padding: '18px 28px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(7, 16, 11, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '0.84rem'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {selectedPlant && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>
                Specimen Nickname <span style={{ color: '#94a3b8', fontWeight: 400 }}>(e.g. "Living Room Monstera")</span>:
              </label>
              <input
                type="text"
                value={customNickname}
                onChange={(e) => setCustomNickname(e.target.value)}
                placeholder={selectedPlant.name}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  borderRadius: '10px',
                  padding: '9px 14px',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              {selectedPlant ? (
                <span>Ready to cultivate: <strong style={{ color: '#86efac' }}>{customNickname || selectedPlant.name}</strong></span>
              ) : (
                <span>Click a specimen above to begin cultivation</span>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#cbd5e1',
                  borderRadius: '9999px',
                  padding: '9px 18px',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!selectedPlant || submitting}
                style={{
                  background: !selectedPlant || submitting ? 'rgba(34, 197, 94, 0.3)' : 'var(--emerald-accent, #22c55e)',
                  border: 'none',
                  color: !selectedPlant || submitting ? '#94a3b8' : '#07100b',
                  borderRadius: '9999px',
                  padding: '9px 22px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: !selectedPlant || submitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease'
                }}
              >
                {submitting ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                    <span>Cultivating...</span>
                  </>
                ) : (
                  <>
                    <span>🌱 Add to Sanctuary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantToGardenModal;

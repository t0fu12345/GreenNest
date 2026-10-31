import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import personalCollectionApi from '../services/personalCollectionApi';
import { toPlantViewModels } from '../utils/plantAdapter';

const AtlasCollections = () => {
  const { isAuthenticated } = useAuth();
  const [collections, setCollections] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCollections = useCallback(async () => {
    if (!isAuthenticated) {
      setCollections([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await personalCollectionApi.getCollections();
      setCollections(Array.isArray(response?.data) ? response.data : []);
    } catch (loadError) {
      setCollections([]);
      setError(loadError.message || 'Unable to load personal collections from the database.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { loadCollections(); }, [loadCollections]);

  const selected = collections.find(item => item._id === selectedId);
  const plants = useMemo(() => toPlantViewModels(selected?.plants || []), [selected]);

  const submit = async event => {
    event.preventDefault();
    if (!name.trim()) return;
    setError('');
    try {
      if (editing) await personalCollectionApi.updateCollection(editing, { name: name.trim(), description: description.trim() });
      else await personalCollectionApi.createCollection({ name: name.trim(), description: description.trim() });
      setEditing(null);
      setName('');
      setDescription('');
      await loadCollections();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to save this collection.');
    }
  };

  const startEdit = collection => {
    setEditing(collection._id);
    setName(collection.name);
    setDescription(collection.description || '');
  };

  const cancelEdit = () => {
    setEditing(null);
    setName('');
    setDescription('');
  };

  const removeCollection = async collection => {
    if (!window.confirm(`Delete collection "${collection.name}"?`)) return;
    try {
      await personalCollectionApi.deleteCollection(collection._id);
      if (selectedId === collection._id) setSelectedId(null);
      await loadCollections();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to delete this collection.');
    }
  };

  const removePlant = async plant => {
    try {
      await personalCollectionApi.removePlant(selected._id, plant._id);
      await loadCollections();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to remove this plant.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 0%, #0d2818 0%, #07100b 60%)', color: '#f0fdf4' }}>
      <Navbar />
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '130px 24px 90px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 9999, marginBottom: 14 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#86efac', textTransform: 'uppercase' }}>Botanical Collections</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 10px 0' }}>
            My Botanical Collections
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: 0 }}>
            Collections are stored in your GreenNest database.
          </p>
        </div>

        {!isAuthenticated ? (
          <section style={{ padding: '60px 24px', background: 'rgba(14, 30, 22, 0.6)', border: '1px solid rgba(40, 82, 61, 0.6)', borderRadius: 24, textAlign: 'center', backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 16 }}>🌿</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 10, color: '#f0fdf4' }}>Personal Botanical Collections</h2>
            <p style={{ color: '#94a3b8', maxWidth: 460, margin: '0 auto 24px' }}>
              Sign in to view and manage your curated collections, arrange flora groups, and save specimens.
            </p>
            <Link
              to="/login"
              className="gn-interactive-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 600,
                padding: '12px 28px',
                borderRadius: 9999,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
              }}
            >
              Sign in to GreenNest
            </Link>
          </section>
        ) : (
          <>
            {error && (
              <p role="alert" style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#fca5a5', padding: '14px 20px', borderRadius: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>⚠️</span> {error}
              </p>
            )}

            {/* Create / Edit Form Card */}
            <form
              onSubmit={submit}
              style={{
                background: 'rgba(14, 30, 22, 0.75)',
                backdropFilter: 'blur(16px)',
                border: editing ? '1px solid #22c55e' : '1px solid rgba(34, 197, 94, 0.22)',
                borderRadius: 20,
                padding: '24px',
                marginBottom: 36,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#86efac', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{editing ? '✏️' : '✨'}</span>
                  {editing ? 'Editing Collection' : 'Create New Collection'}
                </span>
                {editing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                <input
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required
                  maxLength={60}
                  placeholder="Collection name"
                  style={{
                    background: 'rgba(7, 16, 11, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 12,
                    padding: '13px 18px',
                    color: '#ffffff',
                    fontSize: '0.95rem'
                  }}
                />
                <input
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                  maxLength={250}
                  placeholder="Description"
                  style={{
                    background: 'rgba(7, 16, 11, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 12,
                    padding: '13px 18px',
                    color: '#ffffff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  className="gn-interactive-button"
                  aria-label={editing ? 'Save changes' : 'Create collection'}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    padding: '12px 28px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 18px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{editing ? '💾' : '➕'}</span>
                  <span>{editing ? 'Save changes' : 'Create collection'}</span>
                </button>
              </div>
            </form>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#86efac' }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>🌱</div>
                <p>Loading collections...</p>
              </div>
            ) : collections.length === 0 ? (
              <section style={{ textAlign: 'center', padding: '60px 24px', background: 'rgba(14, 30, 22, 0.5)', border: '1px solid rgba(40, 82, 61, 0.4)', borderRadius: 20 }}>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: '0 0 16px' }}>You have not created any collections yet.</p>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Use the form above to start organizing your favorite botanical specimens!</p>
              </section>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: 28 }}>
                {/* Left Column: Collection List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 4 }}>
                    Your Collections ({collections.length})
                  </div>
                  {collections.map(collection => {
                    const isSelected = selectedId === collection._id;
                    const plantCount = collection.plants?.length || 0;
                    return (
                      <article
                        key={collection._id}
                        className="gn-collection-card"
                        style={{
                          background: isSelected
                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(14, 30, 22, 0.9) 100%)'
                            : 'rgba(14, 30, 22, 0.55)',
                          border: isSelected ? '1px solid #22c55e' : '1px solid rgba(40, 82, 61, 0.5)',
                          borderRadius: 18,
                          padding: '18px 20px',
                          boxShadow: isSelected ? '0 0 24px rgba(34, 197, 94, 0.16)' : 'none'
                        }}
                      >
                        <button
                          type="button"
                          className="gn-collection-select"
                          onClick={() => setSelectedId(collection._id)}
                          aria-pressed={isSelected}
                          aria-label={`Select ${collection.name} collection`}
                          style={{ display: 'block', width: '100%', background: 'transparent', border: 0, padding: 0, textAlign: 'left', color: 'inherit', cursor: 'pointer' }}
                        >
                        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                          <span style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.25rem', fontWeight: 600, color: '#ffffff' }}>
                            {collection.name}
                          </span>
                          <span style={{ fontSize: '0.74rem', fontWeight: 600, padding: '3px 10px', borderRadius: 9999, background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.3)', whiteSpace: 'nowrap' }}>
                            🌱 {plantCount} {plantCount === 1 ? 'specimen' : 'specimens'}
                          </span>
                        </span>
                        {collection.description && (
                          <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                            {collection.description}
                          </span>
                        )}
                        </button>
                        <div style={{ display: 'flex', gap: 10, paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          <button
                            type="button"
                            className="gn-interactive-button"
                            onClick={event => { event.stopPropagation(); startEdit(collection); }}
                            style={{
                              background: 'rgba(34, 197, 94, 0.12)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              color: '#86efac',
                              padding: '5px 14px',
                              borderRadius: 9999,
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <span>✏️</span> Edit
                          </button>
                          <button
                            type="button"
                            className="gn-interactive-button"
                            onClick={event => { event.stopPropagation(); removeCollection(collection); }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#fca5a5',
                              padding: '5px 14px',
                              borderRadius: 9999,
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <span>🗑️</span> Delete
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Right Column: Collection Plants View */}
                <section
                  style={{
                    background: 'rgba(14, 30, 22, 0.45)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(40, 82, 61, 0.5)',
                    borderRadius: 22,
                    padding: '28px',
                    minHeight: 400
                  }}
                >
                  {selected ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingBottom: 18, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: 24 }}>
                        <div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#86efac', marginBottom: 4 }}>
                            <span>📁 Active Collection</span>
                          </div>
                          <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.75rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                            {selected.name}
                          </h2>
                          {selected.description && (
                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '4px 0 0 0' }}>
                              {selected.description}
                            </p>
                          )}
                        </div>
                        <Link
                          to="/plants"
                          className="gn-interactive-button"
                          style={{
                            background: 'rgba(34, 197, 94, 0.15)',
                            border: '1px solid rgba(34, 197, 94, 0.35)',
                            color: '#86efac',
                            padding: '8px 18px',
                            borderRadius: 9999,
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <span>🌱</span> Add More Plants
                        </Link>
                      </div>

                      {plants.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
                          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🪴</div>
                          <p style={{ fontSize: '1.05rem', marginBottom: 8, color: '#f0fdf4' }}>No plants in this collection yet.</p>
                          <p style={{ fontSize: '0.9rem', maxWidth: 400, margin: '0 auto 20px' }}>
                            Browse the botanical catalog and click "Save to collection" to add specimens here.
                          </p>
                          <Link
                            to="/plants"
                            className="gn-interactive-button"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: '#ffffff',
                              fontWeight: 600,
                              padding: '10px 24px',
                              borderRadius: 9999,
                              textDecoration: 'none',
                              fontSize: '0.88rem'
                            }}
                          >
                            Explore Botanical Catalog
                          </Link>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                          {plants.map(plant => (
                            <article
                              key={plant._id}
                              style={{
                                background: 'rgba(7, 16, 11, 0.75)',
                                border: '1px solid rgba(40, 82, 61, 0.6)',
                                borderRadius: 16,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s ease, border-color 0.2s ease'
                              }}
                            >
                              <Link
                                to={`/specimen-detail?id=${encodeURIComponent(plant.slug || plant.id)}`}
                                className="gn-plant-link"
                                aria-label={`View ${plant.name}`}
                                style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', background: '#0a1610', display: 'block' }}
                              >
                                <img
                                  src={plant.image}
                                  alt={plant.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                />
                              </Link>
                              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                                <div>
                                  <Link
                                    to={`/specimen-detail?id=${encodeURIComponent(plant.slug || plant.id)}`}
                                    className="gn-plant-name-link"
                                    style={{ display: 'block', fontSize: '1.05rem', color: '#ffffff', cursor: 'pointer', marginBottom: 2, textDecoration: 'none' }}
                                  >
                                    {plant.name}
                                  </Link>
                                  {plant.scientificName && (
                                    <span style={{ fontSize: '0.8rem', color: '#86efac', fontStyle: 'italic', display: 'block', marginBottom: 12 }}>
                                      {plant.scientificName}
                                    </span>
                                  )}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                  <Link
                                    to={`/specimen-detail?id=${encodeURIComponent(plant.slug || plant.id)}`}
                                    className="gn-interactive-button"
                                    style={{
                                      background: 'transparent',
                                      border: 'none',
                                      color: '#86efac',
                                      fontSize: '0.82rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      textDecoration: 'none',
                                      padding: 0
                                    }}
                                  >
                                    View →
                                  </Link>
                                  <button
                                    type="button"
                                    className="gn-interactive-button"
                                    onClick={() => removePlant(plant)}
                                    style={{
                                      background: 'rgba(239, 68, 68, 0.1)',
                                      border: '1px solid rgba(239, 68, 68, 0.25)',
                                      color: '#fca5a5',
                                      fontSize: '0.78rem',
                                      fontWeight: 600,
                                      padding: '4px 10px',
                                      borderRadius: 9999,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
                      <div style={{ fontSize: '3rem', marginBottom: 16 }}>📁</div>
                      <h3 style={{ fontSize: '1.25rem', color: '#f0fdf4', marginBottom: 8 }}>Select a Collection</h3>
                      <p style={{ maxWidth: 360, margin: '0 auto' }}>
                        Click on any collection from the left panel to inspect its curated specimens, add notes, or manage entries.
                      </p>
                    </div>
                  )}
                </section>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AtlasCollections;

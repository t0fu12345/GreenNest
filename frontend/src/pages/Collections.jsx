import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';
import {
  getUserCollections,
  createUserCollection,
  updateUserCollection,
  deleteUserCollection,
  togglePlantInCollection
} from '../services/collectionService';

const Collections = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const userEmail = user?.email || 'guest';

  const [collections, setCollections] = useState([]);
  const [selectedColId, setSelectedColId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Modal Create / Edit Collection State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState(null); // null means creating
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Filter inside single collection
  const [innerFilter, setInnerFilter] = useState('');

  const reloadCollections = () => {
    const list = getUserCollections(userEmail);
    setCollections(list);
    return list;
  };

  useEffect(() => {
    if (isAuthenticated) {
      reloadCollections();
    } else {
      setCollections([]);
    }
  }, [isAuthenticated, userEmail]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingCol(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (col, e) => {
    if (e) e.stopPropagation();
    setEditingCol(col);
    setFormData({ name: col.name, description: col.description || '' });
    setIsModalOpen(true);
  };

  const handleDeleteCollection = (colId, colName, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete collection "${colName}"?`)) {
      deleteUserCollection(userEmail, colId);
      showToast(`Deleted collection "${colName}"`);
      if (selectedColId === colId) setSelectedColId(null);
      reloadCollections();
    }
  };

  const handleSaveCollectionForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCol) {
      updateUserCollection(userEmail, editingCol.id, {
        name: formData.name.trim(),
        description: formData.description.trim()
      });
      showToast('Collection updated successfully');
    } else {
      const created = createUserCollection(userEmail, {
        name: formData.name.trim(),
        description: formData.description.trim()
      });
      showToast(`Created collection "${created.name}"`);
    }

    setIsModalOpen(false);
    reloadCollections();
  };

  const handleRemovePlant = (colId, plantSlug, plantName, e) => {
    if (e) e.stopPropagation();
    togglePlantInCollection(userEmail, colId, plantSlug);
    showToast(`Removed "${plantName}" from collection`);
    reloadCollections();
  };

  // Find active selected collection if in detail view
  const currentCollection = collections.find((c) => c.id === selectedColId);

  // Filter plants inside current collection
  const innerPlants = currentCollection
    ? (currentCollection.plantSlugs || [])
      .map((slug) => BOTANICAL_SPECIMENS[slug])
      .filter(Boolean)
      .filter((p) => {
        if (!innerFilter) return true;
        const q = innerFilter.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '90px',
            right: '24px',
            background: 'rgba(14, 30, 22, 0.95)',
            border: '1px solid #22c55e',
            color: '#86efac',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '0.88rem',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1, padding: '130px 24px 80px', maxWidth: '1360px', width: '100%', margin: '0 auto' }}>

        {/* UNAUTHENTICATED STATE: Centered Sign In Prompt */}
        {!isAuthenticated ? (
          <div
            style={{
              minHeight: '55vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px'
            }}
          >
            <div
              style={{
                maxWidth: '560px',
                width: '100%',
                background: 'rgba(14, 30, 22, 0.92)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '28px',
                padding: '48px 36px',
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(34, 197, 94, 0.15)',
                backdropFilter: 'blur(16px)'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.4rem',
                  marginBottom: '20px',
                  boxShadow: '0 0 25px rgba(34, 197, 94, 0.25)'
                }}
              >
                📁
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#86efac',
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                <span>AUTHENTICATION REQUIRED</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '14px',
                  lineHeight: 1.25
                }}
              >
                Please Sign In
              </h2>

              <p
                style={{
                  color: '#cbd5e1',
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  maxWidth: '440px',
                  margin: '0 auto 28px',
                  fontWeight: 300
                }}
              >
                To create, curate, and manage your personalized living plant collections, please sign in to your GreenNest account.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/"
                  style={{
                    padding: '11px 22px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ← Return to Home
                </Link>

                <Link
                  to="/login"
                  state={{ from: { pathname: '/collections' } }}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 25px rgba(34, 197, 94, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Sign In Now</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        ) : selectedColId && currentCollection ? (
          <div>
            {/* Top Breadcrumb & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
              <button
                type="button"
                onClick={() => setSelectedColId(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>← Back to Collections</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={(e) => handleOpenEditModal(currentCollection, e)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#f0fdf4',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ✎ Edit Title & Description
                </button>
                <Link
                  to="/plants"
                  style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.35)',
                    color: '#86efac',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  + Add Specimen ↗
                </Link>
              </div>
            </div>

            {/* Collection Header Banner */}
            <div
              style={{
                background: 'rgba(14, 30, 22, 0.85)',
                border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.12))',
                borderRadius: '24px',
                padding: '36px 32px',
                marginBottom: '36px'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                <span>📁 USER COLLECTION</span>
                <span>•</span>
                <span>{currentCollection.plantSlugs.length} SPECIMENS</span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '12px'
                }}
              >
                {currentCollection.name}
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, maxWidth: '800px', fontWeight: 300, marginBottom: '24px' }}>
                {currentCollection.description || 'No description available for this collection.'}
              </p>

              {/* Inner Search Box */}
              <div style={{ maxWidth: '450px' }}>
                <input
                  type="text"
                  placeholder="Filter specimens in this collection..."
                  value={innerFilter}
                  onChange={(e) => setInnerFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Plants Grid Inside Collection */}
            {innerPlants.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '70px 24px',
                  background: 'rgba(14, 30, 22, 0.5)',
                  border: '1.5px dashed rgba(255, 255, 255, 0.15)',
                  borderRadius: '24px'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌱</div>
                <h3 style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>
                  {innerFilter ? 'No matching specimens found' : 'This collection has no specimens yet'}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px' }}>
                  {innerFilter ? 'Try searching with different botanical keywords' : 'Explore the Living Canopy catalog and curate specimens into this collection.'}
                </p>
                <Link
                  to="/plants"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    background: '#22c55e',
                    color: '#05140d',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.88rem'
                  }}
                >
                  Explore Botanical Catalog →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {innerPlants.map((plant) => (
                  <div
                    key={plant.slug}
                    style={{
                      background: 'rgba(14, 30, 22, 0.85)',
                      border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.12))',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)'
                    }}
                  >
                    <div
                      style={{ height: '200px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
                      onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant.slug)}`)}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => handleRemovePlant(currentCollection.id, plant.slug, plant.name, e)}
                        title="Remove from this collection"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(239, 68, 68, 0.85)',
                          border: 'none',
                          color: '#fff',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.74rem', color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>
                          {plant.category}
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                            fontSize: '1.25rem',
                            color: '#fff',
                            marginBottom: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate(`/specimen-detail?id=${encodeURIComponent(plant.slug)}`)}
                        >
                          {plant.name}
                        </h4>
                        <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#94a3b8', marginBottom: '12px' }}>
                          {plant.scientificName}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                          💧 {plant.wateringFrequency || plant.water}
                        </span>
                        <Link
                          to={`/specimen-detail?id=${encodeURIComponent(plant.slug)}`}
                          style={{ fontSize: '0.8rem', color: '#86efac', textDecoration: 'none', fontWeight: 600 }}
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: All Collections (Pinterest Boards Overview) */
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86efac', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <span>🌿 USER BOARDS & CURATION</span>
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                    fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.15
                  }}
                >
                  My Curated Collections
                </h1>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', marginTop: '8px', fontWeight: 300, maxWidth: '640px' }}>
                  Curate and personalize living plant collections tailored to your home layout, care schedule, and interior aesthetics.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateModal}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(34, 197, 94, 0.35)'
                }}
              >
                <span>+ Create New Collection</span>
              </button>
            </div>

            {/* Boards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
              {collections.map((col) => {
                // Get up to 3 plant images for collage
                const previewImages = (col.plantSlugs || [])
                  .map((slug) => BOTANICAL_SPECIMENS[slug]?.image)
                  .filter(Boolean)
                  .slice(0, 3);

                return (
                  <div
                    key={col.id}
                    onClick={() => setSelectedColId(col.id)}
                    style={{
                      background: 'rgba(14, 30, 22, 0.85)',
                      border: '1px solid var(--border-glass, rgba(255, 255, 255, 0.12))',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {/* Collage Preview Frame (Pinterest Board Style) */}
                    <div style={{ height: '200px', display: 'flex', gap: '3px', background: 'rgba(0, 0, 0, 0.5)', overflow: 'hidden' }}>
                      {previewImages.length === 0 ? (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(14, 30, 22, 0.95)',
                            color: '#94a3b8'
                          }}
                        >
                          <span style={{ fontSize: '2.5rem', marginBottom: '4px' }}>🌿</span>
                          <span style={{ fontSize: '0.78rem' }}>No specimens added</span>
                        </div>
                      ) : previewImages.length === 1 ? (
                        <img
                          src={previewImages[0]}
                          alt={col.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <>
                          <div style={{ flex: '1.2', height: '100%' }}>
                            <img
                              src={previewImages[0]}
                              alt="Collage 1"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <div style={{ flex: '0.8', display: 'flex', flexDirection: 'column', gap: '3px', height: '100%' }}>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                              <img
                                src={previewImages[1]}
                                alt="Collage 2"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                            {previewImages[2] ? (
                              <div style={{ flex: 1, overflow: 'hidden' }}>
                                <img
                                  src={previewImages[2]}
                                  alt="Collage 3"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                            ) : (
                              <div style={{ flex: 1, background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86efac', fontSize: '0.75rem' }}>
                                + {col.plantSlugs.length - 2 > 0 ? col.plantSlugs.length - 2 : ''}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Board Info */}
                    <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <h3
                            style={{
                              fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                              fontSize: '1.35rem',
                              fontWeight: 700,
                              color: '#fff'
                            }}
                          >
                            {col.name}
                          </h3>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              background: 'rgba(34, 197, 94, 0.15)',
                              color: '#86efac',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontWeight: 600
                            }}
                          >
                            {col.plantSlugs.length} plants
                          </span>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {col.description || 'Personalized botanical collection.'}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '0.78rem', color: '#86efac', fontWeight: 600 }}>
                          View Collection →
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={(e) => handleOpenEditModal(col, e)}
                            title="Edit collection"
                            style={{
                              background: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              color: '#cbd5e1',
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '0.82rem'
                            }}
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCollection(col.id, col.name, e)}
                            title="Delete collection"
                            style={{
                              background: 'rgba(239, 68, 68, 0.12)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#fca5a5',
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '0.82rem'
                            }}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Modal Create/Edit Collection */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001,
            padding: '20px'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: 'rgba(14, 30, 22, 0.98)',
              border: '1px solid var(--border-accent, rgba(34, 197, 94, 0.3))',
              borderRadius: '24px',
              padding: '32px',
              width: '100%',
              maxWidth: '480px',
              color: '#f0fdf4'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontSize: '1.5rem', marginBottom: '8px', color: '#fff' }}>
              {editingCol ? 'Edit Collection' : 'Create New Collection'}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', marginBottom: '20px' }}>
              Curate custom groupings to organize plant specimens by space, lighting, or personal preference.
            </p>

            <form onSubmit={handleSaveCollectionForm} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '6px' }}>
                  Collection Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Bedroom Air Purifiers..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#fff',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '6px' }}>
                  Description / Purpose
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the criteria or intended space..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#cbd5e1',
                    fontSize: '0.86rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontSize: '0.86rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    background: '#22c55e',
                    border: 'none',
                    color: '#05140d',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.86rem'
                  }}
                >
                  {editingCol ? 'Save Changes' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Collections;

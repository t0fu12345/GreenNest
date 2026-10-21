import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  getUserCollections,
  createUserCollection,
  togglePlantInCollection,
  getCollectionsContainingPlant
} from '../../services/collectionService';
import { BOTANICAL_SPECIMENS } from '../../data/botanicalSpecimens';

const SaveToCollectionModal = ({ isOpen, onClose, plantSlug, onSaved }) => {
  const { user } = useAuth();
  const userEmail = user?.email || 'guest';

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen || !plantSlug) return null;

  const plant = BOTANICAL_SPECIMENS[plantSlug] || { name: plantSlug };
  const collections = getUserCollections(userEmail);
  const containingIds = getCollectionsContainingPlant(userEmail, plantSlug);

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 2500);
  };

  const handleToggle = (colId, colName) => {
    const updated = togglePlantInCollection(userEmail, colId, plantSlug);
    const isNowIn = updated.plantSlugs.includes(plantSlug);
    if (isNowIn) {
      showToast(`Added "${plant.name}" to "${colName}"`);
    } else {
      showToast(`Removed from "${colName}"`);
    }
    if (onSaved) onSaved();
  };

  const handleCreateAndSave = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      setErrorMsg('Please enter a collection title');
      return;
    }
    setErrorMsg('');

    const newCol = createUserCollection(userEmail, {
      name: newColName.trim(),
      description: newColDesc.trim(),
      initialPlantSlug: plantSlug
    });

    showToast(`Created "${newCol.name}" and saved specimen!`);
    setNewColName('');
    setNewColDesc('');
    setIsCreatingNew(false);
    if (onSaved) onSaved();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(14, 30, 22, 0.98)',
          border: '1px solid var(--border-accent, rgba(34, 197, 94, 0.3))',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: '#f0fdf4'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#86efac',
                fontWeight: 700
              }}
            >
              SAVE SPECIMEN // LIVING CANOPY
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                fontSize: '1.4rem',
                color: '#fff',
                marginTop: '4px'
              }}
            >
              Curate to Collection
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Selected Plant Preview */}
        <div
          style={{
            padding: '14px 28px',
            background: 'rgba(7, 16, 11, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <img
            src={plant.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=200&q=80'}
            alt={plant.name}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              objectFit: 'cover',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.96rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {plant.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {plant.scientificName}
            </div>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', padding: '4px 10px', borderRadius: '9999px', fontWeight: 600 }}>
            {plant.catalogCode || 'SPECIMEN'}
          </span>
        </div>

        {/* Toast inside modal */}
        {successToast && (
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.25)',
              borderBottom: '1px solid rgba(34, 197, 94, 0.4)',
              color: '#86efac',
              padding: '10px 28px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            {successToast}
          </div>
        )}

        {/* Collections List */}
        <div style={{ padding: '20px 28px', maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '4px' }}>
            Select Collection ({collections.length}):
          </div>

          {collections.map((col) => {
            const isSaved = containingIds.includes(col.id);
            return (
              <div
                key={col.id}
                onClick={() => handleToggle(col.id, col.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: isSaved ? 'rgba(34, 197, 94, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSaved ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(34, 197, 94, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      flexShrink: 0
                    }}
                  >
                    📁
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {col.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      {col.plantSlugs.length} specimens
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isSaved ? '#22c55e' : 'rgba(255, 255, 255, 0.08)',
                    color: isSaved ? '#05140d' : '#f0fdf4',
                    border: isSaved ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSaved ? '✓ Saved' : '+ Curate'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Create New Collection Inline Toggle */}
        <div style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {!isCreatingNew ? (
            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px dashed rgba(34, 197, 94, 0.45)',
                borderRadius: '14px',
                color: '#86efac',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span>+ Create New Collection</span>
            </button>
          ) : (
            <form onSubmit={handleCreateAndSave} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#86efac' }}>
                Create a new collection and save specimen:
              </div>
              <input
                type="text"
                placeholder="Collection title (e.g., Desktop Workstation Greenery)..."
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                maxLength={60}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
                autoFocus
              />
              <textarea
                placeholder="Collection purpose or placement notes (optional)..."
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
                maxLength={250}
                rows={2}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
              {errorMsg && <span style={{ color: '#fca5a5', fontSize: '0.76rem' }}>{errorMsg}</span>}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: '#22c55e',
                    border: 'none',
                    color: '#05140d',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Create & Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaveToCollectionModal;

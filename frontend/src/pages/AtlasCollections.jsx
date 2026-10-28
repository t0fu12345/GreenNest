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

  const removeCollection = async collection => {
    if (!window.confirm(`Delete "${collection.name}"?`)) return;
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

  return <div style={{ minHeight: '100vh', background: '#07100b', color: '#f0fdf4' }}>
    <Navbar />
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '130px 24px 80px' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 8 }}>My Botanical Collections</h1>
      <p style={{ color: '#94a3b8', marginBottom: 28 }}>Collections are stored in your GreenNest database.</p>
      {!isAuthenticated ? <section style={{ padding: 40, border: '1px solid #28523d', borderRadius: 24, textAlign: 'center' }}><p>Sign in to view and manage your collections.</p><Link to="/login" style={{ color: '#86efac' }}>Sign in</Link></section> : <>
        {error && <p role="alert" style={{ color: '#fca5a5', padding: 12 }}>{error}</p>}
        <form onSubmit={submit} style={{ display: 'grid', gap: 12, padding: 20, border: '1px solid #28523d', borderRadius: 18, marginBottom: 24 }}>
          <input value={name} onChange={event => setName(event.target.value)} required maxLength={60} placeholder="Collection name" style={{ padding: 12, borderRadius: 10 }} />
          <textarea value={description} onChange={event => setDescription(event.target.value)} maxLength={250} placeholder="Description" style={{ padding: 12, borderRadius: 10 }} />
          <button type="submit" style={{ padding: 12, borderRadius: 10, background: '#22c55e', fontWeight: 700 }}>{editing ? 'Save changes' : 'Create collection'}</button>
        </form>
        {loading ? <p>Loading collections...</p> : <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) 2fr', gap: 24 }}>
          <div style={{ display: 'grid', gap: 12 }}>{collections.map(collection => <article key={collection._id} onClick={() => setSelectedId(collection._id)} style={{ padding: 18, border: selectedId === collection._id ? '1px solid #22c55e' : '1px solid #28523d', borderRadius: 16, cursor: 'pointer' }}><h2>{collection.name}</h2><p style={{ color: '#94a3b8' }}>{collection.description}</p><div style={{ display: 'flex', gap: 12, marginTop: 12 }}><button type="button" onClick={event => { event.stopPropagation(); startEdit(collection); }} style={{ color: '#86efac' }}>Edit</button><button type="button" onClick={event => { event.stopPropagation(); removeCollection(collection); }} style={{ color: '#fca5a5' }}>Delete</button></div></article>)}</div>
          <section>{selected ? <><h2>{selected.name}</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16, marginTop: 16 }}>{plants.map(plant => <article key={plant._id} style={{ border: '1px solid #28523d', borderRadius: 14, overflow: 'hidden' }}><img src={plant.image} alt={plant.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} /><div style={{ padding: 12 }}><strong>{plant.name}</strong><button type="button" onClick={() => removePlant(plant)} style={{ display: 'block', color: '#fca5a5', marginTop: 8 }}>Remove</button></div></article>)}</div></> : <p style={{ color: '#94a3b8' }}>Select a collection to view its plants.</p>}</section>
        </div>}
      </>}
    </main>
    <Footer />
  </div>;
};

export default AtlasCollections;

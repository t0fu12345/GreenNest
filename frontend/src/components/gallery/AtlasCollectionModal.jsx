import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import personalCollectionApi from '../../services/personalCollectionApi';
import plantApi from '../../services/plantApi';
import { toPlantViewModel } from '../../utils/plantAdapter';

const AtlasCollectionModal = ({ isOpen, onClose, plantSlug, onSaved }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [plant, setPlant] = useState(null);
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    if (!plantSlug || !isAuthenticated) return;
    setLoading(true);
    setError('');
    try {
      const [plantResponse, collectionResponse] = await Promise.all([
        plantApi.getPlantDetail(plantSlug),
        personalCollectionApi.getCollections(),
      ]);
      setPlant(toPlantViewModel(plantResponse?.data));
      setCollections(Array.isArray(collectionResponse?.data) ? collectionResponse.data : []);
    } catch (loadError) {
      setError(loadError.message || 'Unable to load collections from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (!isAuthenticated) {
      onClose();
      navigate('/login');
      return;
    }
    load();
  }, [isOpen, isAuthenticated, plantSlug]);

  if (!isOpen || !isAuthenticated) return null;

  const containsPlant = collection => collection.plants?.some(item => {
    const id = typeof item === 'string' ? item : item?._id;
    return id === plant?._id;
  });

  const togglePlant = async collection => {
    if (!plant?._id) return;
    setError('');
    try {
      if (containsPlant(collection)) await personalCollectionApi.removePlant(collection._id, plant._id);
      else await personalCollectionApi.addPlant(collection._id, plant._id);
      await load();
      onSaved?.();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to update this collection.');
    }
  };

  const createCollection = async event => {
    event.preventDefault();
    if (!name.trim() || !plant?._id) return;
    setError('');
    try {
      const created = await personalCollectionApi.createCollection({ name: name.trim(), description: description.trim() });
      await personalCollectionApi.addPlant(created.data._id, plant._id);
      setName('');
      setDescription('');
      await load();
      onSaved?.();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to create this collection.');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-5" onClick={onClose}>
      <section className="w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#0e1e16] p-6 text-white" onClick={event => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Personal collections</p><h2 className="mt-1 text-2xl font-bold">Save {plant?.name || 'specimen'}</h2></div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-3 py-1">Close</button>
        </div>
        {error && <p role="alert" className="mb-4 rounded-xl border border-red-400/40 bg-red-950/40 p-3 text-sm text-red-200">{error}</p>}
        {loading ? <p className="py-8 text-center text-emerald-200">Loading collections...</p> : <div className="space-y-2">
          {collections.length === 0 && <p className="text-sm text-slate-300">No personal collections yet.</p>}
          {collections.map(collection => <button key={collection._id} type="button" onClick={() => togglePlant(collection)} className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left hover:border-emerald-400/60"><span>{collection.name}</span><span className="text-sm font-bold text-emerald-300">{containsPlant(collection) ? 'Remove' : 'Save'}</span></button>)}
        </div>}
        <form onSubmit={createCollection} className="mt-6 space-y-3 border-t border-white/10 pt-5">
          <input value={name} onChange={event => setName(event.target.value)} maxLength={60} required placeholder="New collection name" className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3" />
          <textarea value={description} onChange={event => setDescription(event.target.value)} maxLength={250} placeholder="Description (optional)" className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3" />
          <button type="submit" disabled={loading || !plant} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-bold text-emerald-950 disabled:opacity-50">Create and save</button>
        </form>
      </section>
    </div>
  );
};

export default AtlasCollectionModal;

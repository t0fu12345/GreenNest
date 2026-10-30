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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <section className="w-full max-w-lg rounded-3xl border border-emerald-500/25 bg-[#0a1811] p-6 text-white shadow-2xl" onClick={event => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span>📁</span> Personal Collections
            </span>
            <h2 className="mt-1 text-2xl font-bold font-serif">Save {plant?.name || 'Specimen'}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-red-400/40 bg-red-950/40 p-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-8 text-center text-emerald-300">Loading your collections...</p>
        ) : (
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {collections.length === 0 && (
              <p className="text-sm text-slate-400 py-3 text-center">No personal collections yet. Create your first one below!</p>
            )}
            {collections.map(collection => {
              const isSaved = containsPlant(collection);
              return (
                <button
                  key={collection._id}
                  type="button"
                  onClick={() => togglePlant(collection)}
                  className="flex w-full items-center justify-between rounded-xl border border-emerald-900/50 bg-[#0d2217]/50 px-4 py-3 text-left hover:border-emerald-400/60 transition"
                >
                  <span className="font-medium text-slate-200 flex items-center gap-2">
                    <span>📁</span> {collection.name}
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isSaved
                        ? 'bg-red-500/15 border-red-500/30 text-red-300'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    {isSaved ? '✓ Saved (Remove)' : '+ Save'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <form onSubmit={createCollection} className="mt-6 space-y-3 border-t border-white/10 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Or Create New Collection</p>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={60}
            required
            placeholder="New collection name"
            className="w-full rounded-xl border border-emerald-900/60 bg-[#07130c] px-4 py-2.5 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none text-sm"
          />
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            maxLength={250}
            placeholder="Description (optional)"
            className="w-full rounded-xl border border-emerald-900/60 bg-[#07130c] px-4 py-2.5 text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none text-sm"
          />
          <button
            type="submit"
            disabled={loading || !plant}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 transition"
          >
            Create and Save Specimen
          </button>
        </form>
      </section>
    </div>
  );
};

export default AtlasCollectionModal;

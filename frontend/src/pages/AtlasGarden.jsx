import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import gardenApi from '../services/gardenApi';
import plantApi from '../services/plantApi';
import { toPlantViewModel, toPlantViewModels } from '../utils/plantAdapter';

const AtlasGarden = () => {
  const navigate = useNavigate();
  const [garden, setGarden] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setSelectedPlant('');
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to add this plant.');
    }
  };

  const removePlant = async item => {
    try {
      await gardenApi.removePlant(item._id);
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to remove this plant.');
    }
  };

  const toggleWater = async item => {
    const task = item.checklist?.find(entry => entry.taskName === 'water');
    try {
      await gardenApi.updateChecklist({ gardenItemId: item._id, taskName: 'water', completed: !task?.completed });
      await load();
    } catch (mutationError) {
      setError(mutationError.message || 'Unable to update plant care.');
    }
  };

  return <div style={{ minHeight: '100vh', background: '#07100b', color: '#f0fdf4' }}><Navbar /><main style={{ maxWidth: 1200, margin: '0 auto', padding: '130px 24px 80px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}><div><h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>My Garden Sanctuary</h1><p style={{ color: '#94a3b8' }}>Live data from your GreenNest garden.</p></div><Link to="/plants" style={{ color: '#86efac' }}>Browse catalog</Link></div>
    <form onSubmit={addPlant} style={{ display: 'flex', gap: 12, margin: '28px 0', flexWrap: 'wrap' }}><select value={selectedPlant} onChange={event => setSelectedPlant(event.target.value)} style={{ flex: 1, minWidth: 240, padding: 12, borderRadius: 10 }}><option value="">Choose a plant</option>{catalog.filter(plant => !existingIds.has(plant._id)).map(plant => <option key={plant._id} value={plant._id}>{plant.name}</option>)}</select><button type="submit" disabled={!selectedPlant} style={{ padding: '12px 20px', borderRadius: 10, background: '#22c55e', fontWeight: 700 }}>Add to garden</button></form>
    {error && <p role="alert" style={{ color: '#fca5a5', padding: 12 }}>{error}</p>}
    {loading ? <p>Loading your garden...</p> : garden.length === 0 ? <p>Your garden is empty.</p> : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>{garden.map(item => { const plant = toPlantViewModel(item.plant); const watered = item.checklist?.find(entry => entry.taskName === 'water')?.completed; return <article key={item._id} style={{ border: '1px solid #28523d', borderRadius: 18, overflow: 'hidden' }}><img src={plant?.image} alt={plant?.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} /><div style={{ padding: 16 }}><h2>{item.customNickname || plant?.name}</h2><p style={{ color: '#94a3b8' }}>{plant?.scientificName}</p><div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button type="button" onClick={() => navigate(`/plant-macro?id=${encodeURIComponent(plant?.id)}`)} style={{ color: '#86efac' }}>View</button><button type="button" onClick={() => toggleWater(item)} style={{ color: watered ? '#86efac' : '#fcd34d' }}>{watered ? 'Watered' : 'Mark watered'}</button><button type="button" onClick={() => removePlant(item)} style={{ color: '#fca5a5' }}>Remove</button></div></div></article>; })}</div>}
  </main><Footer /></div>;
};

export default AtlasGarden;

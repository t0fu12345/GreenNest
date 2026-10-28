import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AtlasCollectionModal from '../components/gallery/AtlasCollectionModal';
import { useAuth } from '../context/AuthContext';
import gardenApi from '../services/gardenApi';
import plantApi from '../services/plantApi';
import { toPlantViewModel, toPlantViewModels } from '../utils/plantAdapter';

const AtlasPlantDetail = () => {
  const [searchParams] = useSearchParams();
  const identifier = searchParams.get('id');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [plant, setPlant] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveOpen, setSaveOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    if (!identifier) {
      setError('Plant identifier is missing.');
      setLoading(false);
      return () => { active = false; };
    }
    setLoading(true);
    setError('');
    Promise.all([plantApi.getPlantDetail(identifier), plantApi.getRelatedPlants(identifier)])
      .then(([detailResponse, relatedResponse]) => {
        if (!active) return;
        setPlant(toPlantViewModel(detailResponse?.data));
        setRelated(toPlantViewModels(Array.isArray(relatedResponse?.data) ? relatedResponse.data : []));
      })
      .catch(loadError => {
        if (active) setError(loadError.message || 'Unable to load this plant from the database.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [identifier]);

  const addToGarden = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await gardenApi.addPlant(plant._id);
      setMessage(`${plant.name} was added to your garden.`);
    } catch (mutationError) {
      setMessage(mutationError.message || 'Unable to add this plant.');
    }
  };

  return <div style={{ minHeight: '100vh', background: '#07100b', color: '#f0fdf4' }}><Navbar /><main style={{ maxWidth: 1200, margin: '0 auto', padding: '130px 24px 80px' }}>
    {loading ? <p>Loading botanical profile...</p> : error ? <p role="alert" style={{ color: '#fca5a5' }}>{error}</p> : plant && <>
      <Link to="/plants" style={{ color: '#86efac' }}>← Back to plants</Link>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 36, marginTop: 24 }}><img src={plant.image} alt={plant.name} style={{ width: '100%', borderRadius: 24, maxHeight: 600, objectFit: 'cover' }} /><div><p style={{ color: '#86efac' }}>{plant.catalogCode}</p><h1 style={{ fontSize: 'clamp(2.4rem,6vw,4.5rem)' }}>{plant.name}</h1><p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: 20 }}>{plant.scientificName}</p><p style={{ lineHeight: 1.75, margin: '24px 0' }}>{plant.description || plant.shortDesc}</p><dl style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}><div><dt style={{ color: '#94a3b8' }}>Light</dt><dd>{plant.light}</dd></div><div><dt style={{ color: '#94a3b8' }}>Water</dt><dd>{plant.water}</dd></div><div><dt style={{ color: '#94a3b8' }}>Humidity</dt><dd>{plant.humidity}</dd></div><div><dt style={{ color: '#94a3b8' }}>Toxicity</dt><dd>{plant.toxicity}</dd></div></dl><div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}><button type="button" onClick={addToGarden} style={{ background: '#22c55e', padding: '12px 20px', borderRadius: 999, fontWeight: 700 }}>Add to garden</button><button type="button" onClick={() => isAuthenticated ? setSaveOpen(true) : navigate('/login')} style={{ border: '1px solid #22c55e', padding: '12px 20px', borderRadius: 999, color: '#86efac' }}>Save to collection</button></div>{message && <p role="status" style={{ marginTop: 16 }}>{message}</p>}</div></section>
      {related.length > 0 && <section style={{ marginTop: 60 }}><h2>Related specimens</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 16, marginTop: 18 }}>{related.map(item => <Link key={item._id} to={`/specimen-detail?id=${encodeURIComponent(item.slug || item.id)}`} style={{ color: 'inherit', textDecoration: 'none' }}><img src={item.image} alt={item.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 14 }} /><strong>{item.name}</strong></Link>)}</div></section>}
      <AtlasCollectionModal isOpen={saveOpen} onClose={() => setSaveOpen(false)} plantSlug={plant.slug || plant.id} onSaved={() => setMessage('Collection updated.')} />
    </>}
  </main><Footer /></div>;
};

export default AtlasPlantDetail;

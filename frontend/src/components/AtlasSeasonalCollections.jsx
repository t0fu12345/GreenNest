import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import collectionApi from '../services/collectionApi';
import { toPlantViewModels } from '../utils/plantAdapter';

const AtlasSeasonalCollections = () => {
  const [collections, setCollections] = useState([]);
  const [activeSeason, setActiveSeason] = useState('spring');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    collectionApi.getCollections()
      .then(response => setCollections(Array.isArray(response?.data) ? response.data : []))
      .catch(loadError => setError(loadError.message || 'Unable to load seasonal collections from the database.'))
      .finally(() => setLoading(false));
  }, []);

  const active = collections.find(collection => collection.season === activeSeason) || collections[0];
  const plants = useMemo(() => toPlantViewModels(active?.plants || []), [active]);

  return <section id="seasonal-collections" style={{ maxWidth: 1300, margin: '0 auto', padding: '80px 24px 100px', color: '#f0fdf4' }}>
    <p style={{ color: '#86efac', fontWeight: 700, letterSpacing: '.14em' }}>SEASONAL COLLECTIONS</p>
    <h2 style={{ fontSize: 'clamp(2rem,3.5vw,2.75rem)', margin: '12px 0' }}>Seasonal Curated Collections</h2>
    <p style={{ color: '#8ca395', maxWidth: 720 }}>Explore botanical collections curated for the changing seasons.</p>
    {loading ? <p style={{ padding: '40px 0', color: '#86efac' }}>Loading seasonal collections...</p> : error ? <p role="alert" style={{ padding: '40px 0', color: '#fca5a5' }}>{error}</p> : <>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '30px 0' }}>{collections.map(collection => <button key={collection._id} type="button" onClick={() => setActiveSeason(collection.season)} style={{ whiteSpace: 'nowrap', borderRadius: 999, padding: '10px 18px', border: active?._id === collection._id ? '1px solid #22c55e' : '1px solid #28523d', background: '#0e1e16', color: '#f0fdf4' }}>{collection.title}</button>)}</div>
      {active && (
        <article style={{ border: '1px solid rgba(40, 82, 61, 0.6)', borderRadius: 24, overflow: 'hidden', background: 'rgba(14, 30, 22, 0.75)', backdropFilter: 'blur(16px)', boxShadow: '0 12px 36px rgba(0,0,0,0.4)' }}>
          <img src={active.coverImage} alt={active.title} style={{ width: '100%', maxHeight: 360, objectFit: 'cover' }} />
          <div style={{ padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 30, color: '#ffffff', margin: 0 }}>{active.title}</h3>
            <p style={{ color: '#a7b8ad', margin: '10px 0 24px', fontSize: '1.02rem', lineHeight: 1.6 }}>{active.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {plants.map(plant => (
                <Link
                  key={plant._id}
                  to={`/specimen-detail?id=${encodeURIComponent(plant.slug || plant.id)}`}
                  style={{
                    background: 'rgba(7, 16, 11, 0.75)',
                    border: '1px solid rgba(40, 82, 61, 0.5)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    color: 'inherit',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <img src={plant.image} alt={plant.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                  <div style={{ padding: '14px 16px' }}>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#ffffff', marginBottom: 2 }}>{plant.name}</strong>
                    {plant.scientificName && (
                      <span style={{ fontSize: '0.8rem', color: '#86efac', fontStyle: 'italic', display: 'block', marginBottom: 10 }}>{plant.scientificName}</span>
                    )}
                    <span style={{ fontSize: '0.78rem', color: '#86efac', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      )}
    </>}
  </section>;
};

export default AtlasSeasonalCollections;

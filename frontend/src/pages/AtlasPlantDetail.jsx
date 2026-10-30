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
  const [addingToGarden, setAddingToGarden] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

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
    setAddingToGarden(true);
    try {
      await gardenApi.addPlant(plant._id);
      setAddedSuccess(true);
      setMessage(`${plant.name} has been added to your Living Garden Sanctuary.`);
      setTimeout(() => setAddedSuccess(false), 3000);
    } catch (mutationError) {
      setMessage(mutationError.message || 'Unable to add this plant.');
    } finally {
      setAddingToGarden(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 50% 0%, #0d2818 0%, #07100b 60%)', color: '#f0fdf4' }}>
      <Navbar />
      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '130px 24px 90px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#86efac' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>🌿</div>
            <p style={{ fontSize: '1.1rem' }}>Loading botanical specimen profile...</p>
          </div>
        ) : error ? (
          <div style={{ maxWidth: 600, margin: '60px auto', padding: 24, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: 20, textAlign: 'center' }}>
            <p role="alert" style={{ color: '#fca5a5', fontSize: '1.05rem', margin: '0 0 16px 0' }}>{error}</p>
            <Link to="/plants" style={{ color: '#86efac', fontWeight: 600, textDecoration: 'none' }}>
              ← Return to Botanical Catalog
            </Link>
          </div>
        ) : plant && (
          <>
            {/* Breadcrumb Navigation */}
            <div style={{ marginBottom: 24 }}>
              <Link
                to="/plants"
                style={{
                  color: '#86efac',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  borderRadius: 9999,
                  transition: 'all 0.2s ease'
                }}
              >
                <span>←</span> Back to Catalog
              </Link>
            </div>

            {/* Specimen Presentation Grid */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 48,
                alignItems: 'start',
                background: 'rgba(14, 30, 22, 0.55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(40, 82, 61, 0.6)',
                borderRadius: 28,
                padding: '36px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Plant Image Showcase */}
              <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)', background: '#08120c' }}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{
                    width: '100%',
                    maxHeight: 560,
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {plant.catalogCode && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: 'rgba(7, 16, 11, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      borderRadius: 9999,
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#86efac',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {plant.catalogCode}
                  </span>
                )}
              </div>

              {/* Plant Details & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.15, margin: '0 0 6px 0' }}>
                    {plant.name}
                  </h1>
                  <p style={{ color: '#86efac', fontStyle: 'italic', fontSize: '1.2rem', margin: '0 0 20px 0' }}>
                    {plant.scientificName}
                  </p>
                  <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: '1.02rem', margin: '0 0 28px 0' }}>
                    {plant.description || plant.shortDesc}
                  </p>
                </div>

                {/* Botanical Metrics Grid */}
                <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, margin: '0 0 32px 0' }}>
                  <div style={{ background: 'rgba(7, 16, 11, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '14px 16px' }}>
                    <dt style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span>☀️</span> Light Exposure
                    </dt>
                    <dd style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>{plant.light || 'Bright indirect'}</dd>
                  </div>
                  <div style={{ background: 'rgba(7, 16, 11, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '14px 16px' }}>
                    <dt style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span>💧</span> Water Schedule
                    </dt>
                    <dd style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>{plant.water || 'Weekly'}</dd>
                  </div>
                  <div style={{ background: 'rgba(7, 16, 11, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '14px 16px' }}>
                    <dt style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span>🌫️</span> Humidity
                    </dt>
                    <dd style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>{plant.humidity || 'Moderate'}</dd>
                  </div>
                  <div style={{ background: 'rgba(7, 16, 11, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '14px 16px' }}>
                    <dt style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span>🐾</span> Pet Safety
                    </dt>
                    <dd style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.98rem', margin: 0 }}>{plant.toxicity || 'Non-toxic'}</dd>
                  </div>
                </dl>

                {/* Redesigned Primary Action Buttons */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={addToGarden}
                    disabled={addingToGarden}
                    style={{
                      background: addedSuccess
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                      color: '#ffffff',
                      padding: '13px 26px',
                      borderRadius: 9999,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 6px 20px rgba(34, 197, 94, 0.35)',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span>{addedSuccess ? '✓' : '🌱'}</span>
                    <span>{addingToGarden ? 'Adding...' : addedSuccess ? 'Added to Garden!' : 'Add to garden'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => isAuthenticated ? setSaveOpen(true) : navigate('/login')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(34, 197, 94, 0.45)',
                      padding: '13px 24px',
                      borderRadius: 9999,
                      color: '#86efac',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span>📁</span>
                    <span>Save to collection</span>
                  </button>
                </div>

                {/* Feedback Toast Banner */}
                {message && (
                  <p
                    role="status"
                    style={{
                      marginTop: 20,
                      padding: '12px 18px',
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#86efac',
                      borderRadius: 12,
                      fontSize: '0.92rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <span>🌿</span> {message}
                  </p>
                )}
              </div>
            </section>

            {/* Related Botanical Specimens */}
            {related.length > 0 && (
              <section style={{ marginTop: 70 }}>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', color: '#86efac', textTransform: 'uppercase' }}>Affiliated Species</span>
                  <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '2rem', color: '#ffffff', margin: '4px 0 0 0' }}>Related Specimens</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                  {related.map(item => (
                    <Link
                      key={item._id}
                      to={`/specimen-detail?id=${encodeURIComponent(item.slug || item.id)}`}
                      style={{
                        background: 'rgba(14, 30, 22, 0.55)',
                        border: '1px solid rgba(40, 82, 61, 0.5)',
                        borderRadius: 18,
                        overflow: 'hidden',
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'transform 0.25s ease, border-color 0.25s ease'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ padding: '14px 16px' }}>
                        <strong style={{ display: 'block', fontSize: '1rem', color: '#ffffff', marginBottom: 2 }}>{item.name}</strong>
                        {item.scientificName && (
                          <span style={{ fontSize: '0.8rem', color: '#86efac', fontStyle: 'italic' }}>{item.scientificName}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Modal for saving to personal collections */}
            <AtlasCollectionModal
              isOpen={saveOpen}
              onClose={() => setSaveOpen(false)}
              plantSlug={plant.slug || plant.id}
              onSaved={() => setMessage('Specimen saved to your collection.')}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AtlasPlantDetail;

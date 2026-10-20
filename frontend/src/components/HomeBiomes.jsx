import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeBiomes = () => {
  const [activeBiome, setActiveBiome] = useState(null);

  const biomes = [
    {
      id: 'tropical',
      icon: '🌴',
      badge: 'Tropical & Equatorial',
      title: 'Tropical Canopy',
      desc: 'Consistent warm temperatures and ambient humidity year-round. An optimal environment for warmth-loving broadleaf species, skylit living rooms, and diffused sunspots.',
      temp: '25°C - 35°C',
      humidity: '> 70%',
      env: 'Humid & Warm',
      buttonLabel: 'Filter Tropical Biome',
      resultTitle: '🌴 Tropical Biome (Rainforest & Equatorial)'
    },
    {
      id: 'subtropical',
      icon: '🌲',
      badge: 'Highland & Cloud Forest',
      title: 'Subtropical Highlands',
      desc: 'Cooler, dynamic temperate climates ideal for montane species and antique ferns. Thrives in climate-controlled spaces, shaded balconies, and refreshing ambient airflow.',
      temp: '16°C - 24°C',
      humidity: '50% - 65%',
      env: 'Cool Temperate',
      buttonLabel: 'Filter Subtropical Biome',
      resultTitle: '🌲 Subtropical Highlands & Cloud Forest'
    },
    {
      id: 'arid',
      icon: '🏜️',
      badge: 'Arid & Semi-Desert',
      title: 'Arid & Semi-Arid',
      desc: 'Abundant direct solar radiation with wide diurnal-nocturnal temperature shifts. Highly resilient water-storing tissues, ideal for west-facing windows and busy curators.',
      temp: '20°C - 38°C',
      humidity: '< 40%',
      env: 'Drought Resilient',
      buttonLabel: 'Filter Arid Biome',
      resultTitle: '🏜️ Arid & Semi-Desert Succulents'
    }
  ];

  return (
    <main className="archive-section" id="specimens">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <div className="section-subtitle-kicker">The Tri-Biome Architecture // 3 Global Ecological Biomes</div>
          <h2 className="section-heading">Explore Flora by Climatic Biome</h2>
        </div>
        <Link to="/gallery" className="btn-cta-pill" style={{ fontSize: '0.85rem' }}>
          <span>Explore Complete Archive (Gallery Page) →</span>
        </Link>
      </div>

      {/* 3 Climatic Biome Theme Cards */}
      <div className="biomes-grid">
        {biomes.map((biome) => (
          <div className="biome-card" key={biome.id}>
            <div className="biome-header">
              <div className="biome-icon-wrap">{biome.icon}</div>
              <span className="biome-tag-badge">{biome.badge}</span>
            </div>
            <h3 className="biome-title">{biome.title}</h3>
            <p className="biome-desc">{biome.desc}</p>
            <div className="biome-specs-row">
              <div className="biome-spec-item">
                <span className="biome-spec-label">Temperature</span>
                <span className="biome-spec-val">{biome.temp}</span>
              </div>
              <div className="biome-spec-item">
                <span className="biome-spec-label">Humidity</span>
                <span className="biome-spec-val">{biome.humidity}</span>
              </div>
              <div className="biome-spec-item">
                <span className="biome-spec-label">Environment</span>
                <span className="biome-spec-val">{biome.env}</span>
              </div>
            </div>
            <button 
              className={`btn-biome-select ${activeBiome === biome.id ? 'active' : ''}`}
              onClick={() => setActiveBiome(activeBiome === biome.id ? null : biome.id)}
            >
              <span>{biome.buttonLabel}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Filter Result / No Data Yet Box */}
      <div className="no-data-display" id="specimensResults" style={{ display: activeBiome ? 'block' : 'none' }}>
        <div className="no-data-icon">
          {activeBiome && biomes.find(b => b.id === activeBiome)?.icon}
        </div>
        <h3 className="no-data-title">Catalog Ingestion in Progress ({activeBiome && biomes.find(b => b.id === activeBiome)?.resultTitle})</h3>
        <p className="no-data-text" id="noDataMessage">
          We are currently compiling high-resolution botanical records for <strong>{activeBiome && biomes.find(b => b.id === activeBiome)?.resultTitle}</strong>. Specimen records and live telemetry will become available upon database API connection.
        </p>
        <div className="no-data-badge">
          <span>⚡ Product Status: Database Catalog Ingestion Phase</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/gallery" className="btn-hero-primary" style={{ display: 'inline-flex', padding: '14px 32px', fontSize: '0.95rem', gap: '10px' }}>
          <span>Switch to Dedicated Gallery Archive →</span>
        </Link>
      </div>
    </main>
  );
};

export default HomeBiomes;

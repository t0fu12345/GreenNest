import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gardenerApi from '../services/gardenerApi';

const FALLBACK_CURATORS = [
  {
    name: 'Dr. Elena Vance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    specialization: 'Lead Curator of Tropical Flora & Araceae',
    bio: 'Over 12 years investigating the Araceae family in Southeast Asian equatorial canopies. Specializes in fenestrated leaf adaptations of Monstera and Philodendron in urban interiors.',
    experienceYears: 12,
    contactEmail: 'elena.vance@greennest.vn',
    biomeBadge: '🌴 Tropical Rainforest'
  },
  {
    name: 'Marcus Thorne',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    specialization: 'Highland Ecology & Pteridophyte Specialist',
    bio: 'Forestry graduate leading cloud-forest botanical inquiries. Pioneered aerated moisture-retentive substrate formulations enabling delicate ferns to thrive within air-conditioned rooms.',
    experienceYears: 9,
    contactEmail: 'marcus.thorne@greennest.vn',
    biomeBadge: '🌲 Subtropical Highlands'
  },
  {
    name: 'M.Sc. Mai Nguyen',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    specialization: 'Plant Pathology & Bio-Organic Substrates',
    bio: 'Conducts research on rhizosphere microflora and organic pest balance mechanisms, guaranteeing care safety protocols for environments with young children and pets.',
    experienceYears: 8,
    contactEmail: 'mai.nguyen@greennest.vn',
    biomeBadge: '🔬 Plant Pathology'
  },
  {
    name: 'David Sterling',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    specialization: 'Succulent Biology & Drought Adaptation Advisor',
    bio: 'Renowned researcher focusing on Crassulacean Acid Metabolism (CAM) in desert succulents. Develops full-spectrum photoperiod guidelines for desktop succulent cultivation.',
    experienceYears: 14,
    contactEmail: 'david.sterling@greennest.vn',
    biomeBadge: '🏜️ Xerophyte & Succulents'
  }
];

const About = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxData, setLightboxData] = useState(null);
  const [gardeners, setGardeners] = useState([]);
  const [loadingGardeners, setLoadingGardeners] = useState(true);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        setLoadingGardeners(true);
        const res = await gardenerApi.getGardeners();
        const list = Array.isArray(res?.data) ? res.data : (res?.data?.gardeners || []);
        if (list && list.length > 0) {
          setGardeners(list);
        }
      } catch (err) {
        console.warn('Unable to load botanists from MongoDB Atlas, using fallback data:', err.message);
      } finally {
        setLoadingGardeners(false);
      }
    };
    fetchGardeners();
  }, []);

  const displayGardeners = gardeners.length > 0 ? gardeners : FALLBACK_CURATORS;

  const openLightbox = (src, title, desc) => {
    setLightboxData({ src, title, desc });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  return (
    <>
      {/* Floating Navigation */}
      <Navbar />

      {/* Hero Section: Project Purpose & Philosophy */}
      <section className="about-hero">
        <div className="about-kicker">
          <span className="kicker-dot"></span>
          <span>MISSION & PURPOSE // ABOUT THE LIVING CANOPY</span>
        </div>

        <h1 className="about-hero-title">
          Infusing the Living Forest Pulse into <span className="italic-accent">Contemporary Sanctuaries</span>.
        </h1>

        <p className="about-hero-subtitle">
          <strong>The Living Canopy & GreenNest</strong> was founded to fundamentally eliminate the heartbreak of indoor houseplant failure due to misaligned microclimates. We synthesize rigorous botanical taxonomy with sunlight-filled biophilic architecture, empowering every home to cultivate a thriving, resilient indoor biome.
        </p>

        <div className="status-tag-banner">
          <span>🌿 Open Botanical Framework: Microclimate Standardization Across 3 Global Biomes</span>
        </div>
      </section>

      {/* Section 1: The Real-World Awakening Story */}
      <section className="purpose-section">
        <div className="story-hero-grid">
          <div className="story-content-wrap">
            <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.16em', color: '#86efac', textTransform: 'uppercase', marginBottom: '12px' }}>
              THE URBAN BOTANIST'S DILEMMA
            </div>
            <h2>Why Do Cultivated Plants So Often Wither Within Weeks?</h2>
            <div className="story-lead-quote">
              "Plants do not perish from an absence of devotion; they deteriorate when forced into artificial microclimates contrary to their evolutionary circadian rhythms."
            </div>
            <p className="story-paragraph">
              Across metropolitan residences, over 70% of plant custodians experience profound frustration when beloved potted flora yellows, suffers root suffocation, or defoliates within a short period. The root cause rarely lies in inadequate affection, but in <strong>a profound deficit of native microclimate alignment</strong>: placing cool-mist ferns in dehumidified air conditioning, or exposing deep-understory Araceae to harsh glass reflections.
            </p>
            <p className="story-paragraph">
              <strong>The Living Canopy</strong> was engineered as an <em>open botanical classification architecture</em>, categorizing indoor flora across <strong>3 Primary Climatic Biomes</strong>, providing unambiguous metrics for photon saturation, drainage cadences, and substrate aeration ratios.
            </p>

            {/* Stats Counter Row */}
            <div className="story-stats-row">
              <div className="story-stat-card">
                <div className="stat-number">3 Biomes</div>
                <div className="stat-caption">Microclimatic Ecosystems</div>
              </div>
              <div className="story-stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-caption">Open Botanical Science</div>
              </div>
              <div className="story-stat-card">
                <div className="stat-number">0 Synthetics</div>
                <div className="stat-caption">Safe for Children & Pets</div>
              </div>
            </div>
          </div>

          <div className="story-image-wrap">
            <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80" alt="Botanical conservatory illuminated with diffused daylight" />
            <div className="story-image-overlay">
              <span className="story-badge-floating">☀️ Conservatory Research Hub</span>
              <span className="story-caption-text">Partner greenhouse conserving native biodiversity and germplasm</span>
            </div>
          </div>
        </div>

        {/* 3 Core Purpose Pillars Bento Grid */}
        <div className="purpose-bento-grid">
          
          {/* Pillar 1 */}
          <div className="purpose-card">
            <span className="purpose-card-num">01</span>
            <div className="purpose-icon-box">🌴</div>
            <h3 className="purpose-title">Standardized Across 3 Biomes</h3>
            <p className="purpose-text">
              Replacing guesswork with ecological telemetry. Our matrix categorizes specimens based on ambient temperature (°C) and atmospheric vapor pressure (%): <strong>Tropical Rainforest</strong>, <strong>Subtropical Cloud Forest</strong>, and <strong>Arid Semi-Desert</strong>.
            </p>
            <ul className="purpose-key-points">
              <li><span className="bullet">✓</span> Precise alignment with home humidity zones</li>
              <li><span className="bullet">✓</span> Prevention of root shock caused by thermal shifts</li>
              <li><span className="bullet">✓</span> Optimized diurnal-nocturnal temperature shifts</li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="purpose-card">
            <span className="purpose-card-num">02</span>
            <div className="purpose-icon-box">🔬</div>
            <h3 className="purpose-title">Transparent Botanical Telemetry</h3>
            <p className="purpose-text">
              Translating academic research into intuitive indoor directives: Foot-Candle (FC) illumination indices, dry-down substrate intervals, sterile mineral aeration media, and explicit Pet-Safe toxicity guidance for domestic animals.
            </p>
            <ul className="purpose-key-points">
              <li><span className="bullet">✓</span> Quantified diffused light exposure thresholds</li>
              <li><span className="bullet">✓</span> Pathogen-free organic aeration substrates</li>
              <li><span className="bullet">✓</span> Total safety for feline and canine companions</li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="purpose-card">
            <span className="purpose-card-num">03</span>
            <div className="purpose-icon-box">☀️</div>
            <h3 className="purpose-title">Sunlit Biophilic Architecture</h3>
            <p className="purpose-text">
              Applying the core principles of <strong>Biophilic Design</strong> to weave living foliage seamlessly into modern architecture. Living plants are not decorative props, but living organisms that scrub particulate matter and ground human circadian wellbeing.
            </p>
            <ul className="purpose-key-points">
              <li><span className="bullet">✓</span> Illuminating low-light living alcoves</li>
              <li><span className="bullet">✓</span> Reducing cognitive fatigue and cortisol</li>
              <li><span className="bullet">✓</span> Cultivating mindfulness through botanical care</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Section 2: Botanist Profiles */}
      <section className="botanists-section">
        <div className="section-header-centered">
          <div className="section-subkicker">
            <span>🌱</span>
            <span>SCIENTIFIC CURATORS & FIELD RESEARCHERS</span>
          </div>
          <h2 className="section-heading-lg">Our Botanical Curators</h2>
          <p className="section-desc-light">
            Meet the dedicated specialists working directly in sunlight-drenched conservatories and primary forest habitats, preserving plant genetics and authoring care protocols for The Living Canopy.
          </p>
        </div>

        <div className="botanists-grid">
          {displayGardeners.map((curator, idx) => {
            const badges = [
              { sun: '☀️ DIFFUSED CANOPY', tag: '🌴 Tropical Rainforest' },
              { sun: '☀️ HIGHLAND MIST', tag: '🌲 Subtropical Highlands' },
              { sun: '☀️ ORGANIC NURSERY', tag: '🔬 Plant Pathology' },
              { sun: '☀️ ARID DAYLIGHT', tag: '🏜️ Xerophyte & Succulents' }
            ];
            const badge = badges[idx % badges.length];
            return (
              <article key={curator._id || curator.name || idx} className="botanist-card">
                <div 
                  className="botanist-avatar-wrap" 
                  onClick={() => openLightbox(
                    curator.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
                    `${curator.name} — ${curator.specialization}`,
                    curator.bio
                  )}
                >
                  <img 
                    src={curator.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'} 
                    alt={curator.name} 
                    className="botanist-img" 
                  />
                  <div className="botanist-img-fade"></div>
                  <span className="botanist-sun-badge">
                    {curator.experienceYears ? `☀️ ${curator.experienceYears} YRS EXP` : badge.sun}
                  </span>
                  <span className="botanist-badge">
                    {curator.biomeBadge || badge.tag}
                  </span>
                </div>
                <div className="botanist-info-body">
                  <h3 className="botanist-name">{curator.name}</h3>
                  <div className="botanist-role">{curator.specialization}</div>
                  <p className="botanist-bio">
                    {curator.bio}
                  </p>
                  {curator.contactEmail && (
                    <div className="botanist-quote" style={{ fontStyle: 'normal', fontSize: '0.8rem', color: '#86efac' }}>
                      ✉️ {curator.contactEmail}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: Bright Lush Flora Showcase */}
      <section className="lush-gallery-section">
        <div className="section-header-centered">
          <div className="section-subkicker">
            <span>☀️</span>
            <span>SUNLIT CANOPY & LUSH BOTANICAL SANCTUARY</span>
          </div>
          <h2 className="section-heading-lg">Sunlit Flora & Vibrant Canopies</h2>
          <p className="section-desc-light">
            Experience the vibrant vitality of living botanicals under natural daylight across research greenhouses, private herbariums, and biophilic homes. Click any image to inspect details.
          </p>
        </div>

        {/* Filter Pills for Gallery */}
        <div className="gallery-filter-tabs">
          <button className={`gallery-tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Perspectives (6)</button>
          <button className={`gallery-tab-btn ${filter === 'tropical' ? 'active' : ''}`} onClick={() => setFilter('tropical')}>🌴 Tropical Broadleaf</button>
          <button className={`gallery-tab-btn ${filter === 'subtropical' ? 'active' : ''}`} onClick={() => setFilter('subtropical')}>🌲 Subtropical Cloud Forest</button>
          <button className={`gallery-tab-btn ${filter === 'arid' ? 'active' : ''}`} onClick={() => setFilter('arid')}>🏜️ Arid & Succulents</button>
          <button className={`gallery-tab-btn ${filter === 'biophilic' ? 'active' : ''}`} onClick={() => setFilter('biophilic')}>🏡 Biophilic Living</button>
        </div>

        <div className="lush-mosaic-grid" id="mosaicGrid">
          
          {/* Item 1 (Wide): Diffused sunlight through tropical canopy */}
          {(filter === 'all' || filter === 'tropical') && (
            <div 
              className="mosaic-item span-2" 
              data-cat="tropical" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1400&q=85', 'Diffused Daylight Through Tropical Canopy', 'Morning solar radiation piercing through broadleaf emerald canopies, illuminating chlorophyll structures.')}
            >
              <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80" alt="Tropical foliage in morning sunlight" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🌴 TROPICAL CANOPY // 28°C • 80% RH</span>
                <h4 className="mosaic-caption">Diffused Daylight Through Broadleaf Canopy</h4>
                <p className="mosaic-subtext">Optimal 1,500 FC photosynthetic photon flux density</p>
              </div>
            </div>
          )}

          {/* Item 2: Succulents in warm sunlight */}
          {(filter === 'all' || filter === 'arid') && (
            <div 
              className="mosaic-item" 
              data-cat="arid" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1200&q=85', 'Sunlit Succulent Terraces', 'Drought-tolerant cultivars holding water reserves within thick fleshy tissues under direct arid sun exposure.')}
            >
              <img src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80" alt="Succulents in bright sunlight" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🏜️ ARID BIOME // NOCTURNAL CAM</span>
                <h4 className="mosaic-caption">Sunlit Succulent Terraces</h4>
                <p className="mosaic-subtext">100% porous mineral grit substrate</p>
              </div>
            </div>
          )}

          {/* Item 3: Royal Conservatory Glass Dome */}
          {(filter === 'all' || filter === 'biophilic') && (
            <div 
              className="mosaic-item" 
              data-cat="biophilic" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=85', 'Victorian Glasshouse Conservatory', 'Full-spectrum architectural dome maintaining seasonal circadian rhythms for protected germplasm.')}
            >
              <img src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80" alt="Conservatory glasshouse interior" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🏡 HERITAGE CONSERVATORY</span>
                <h4 className="mosaic-caption">Full-Spectrum Glass Architecture</h4>
                <p className="mosaic-subtext">Automated microclimate misting telemetry</p>
              </div>
            </div>
          )}

          {/* Item 4: Biophilic Interior Sanctuary */}
          {(filter === 'all' || filter === 'biophilic') && (
            <div 
              className="mosaic-item" 
              data-cat="biophilic" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85', 'Biophilic Residential Living Space', 'Harmonious integration of generous window lighting and specimen plants elevating home circadian wellness.')}
            >
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Biophilic living room with plants" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🏡 BIOPHILIC LIVING</span>
                <h4 className="mosaic-caption">Living Room Urban Oasis</h4>
                <p className="mosaic-subtext">Active VOC particulate scrubbing & biophilia</p>
              </div>
            </div>
          )}

          {/* Item 5 (Wide): Monstera Deliciosa Pure Leaf Fenestration */}
          {(filter === 'all' || filter === 'tropical') && (
            <div 
              className="mosaic-item span-2" 
              data-cat="tropical" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1400&q=85', 'Monstera Deliciosa Pure Fenestration', 'Specimen leaf demonstrating symmetric natural fenestrations that evolved to permit light penetration.')}
            >
              <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80" alt="Monstera leaf in golden sunlight" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🌴 MONSTERA DELICIOSA // ARACEAE</span>
                <h4 className="mosaic-caption">Pure Specimen Fenestrations</h4>
                <p className="mosaic-subtext">Evolutionary understory light-harvesting adaptations</p>
              </div>
            </div>
          )}

          {/* Item 6: Cloud Forest Fern Understory */}
          {(filter === 'all' || filter === 'subtropical') && (
            <div 
              className="mosaic-item" 
              data-cat="subtropical" 
              onClick={() => openLightbox('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85', 'Cloud Forest Fern Understory', 'Highland fern fronds welcoming early sunlight through delicate alpine morning mist.')}
            >
              <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" alt="Fern fronds in misty morning sun" />
              <div className="mosaic-overlay">
                <span className="mosaic-tag">🌲 SUBTROPICAL // 18°C CLOUD FOREST</span>
                <h4 className="mosaic-caption">Misty Highland Fern Canopy</h4>
                <p className="mosaic-subtext">High relative humidity & constant air circulation</p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="cta-explore-banner">
        <div className="cta-explore-inner">
          <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.18em', color: '#86efac', textTransform: 'uppercase', marginBottom: '12px' }}>
            NEXT STEPS IN YOUR JOURNEY
          </div>
          <h2>Ready to Cultivate Your Living Sanctuary?</h2>
          <p>
            Explore our curated botanical specimen taxonomy across the 3 primary climatic biomes in the Gallery, or return to Overview to discover specimens tailored to your home conditions.
          </p>
          <div className="cta-btn-group">
            <Link to="/plants" className="btn-cta-primary">Explore Specimen Catalog →</Link>
            <Link to="/" className="btn-cta-secondary">Return to Sanctuary Overview</Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal Component */}
      {lightboxData && (
        <div className="lightbox-modal active" id="lightboxModal" onClick={closeLightbox}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox}>✕</button>
            <div className="lightbox-img-holder">
              <img id="lightboxImg" src={lightboxData.src} alt={lightboxData.title} />
            </div>
            <div className="lightbox-details">
              <div>
                <h3 className="lightbox-title" id="lightboxTitle">{lightboxData.title}</h3>
                <p className="lightbox-desc" id="lightboxDesc">{lightboxData.desc}</p>
              </div>
              <button className="btn-back-home" style={{ padding: '8px 18px', fontSize: '0.82rem' }} onClick={closeLightbox}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;

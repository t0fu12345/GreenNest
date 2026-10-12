import React from 'react';
import { Link } from 'react-router-dom';

const HomeAbout = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-hero-card">
        <div className="about-grid-content">
          <div className="about-text-wrap">
            <div className="about-kicker">
              <span className="kicker-dot"></span>
              <span>Manifesto & Conservation // About the Sanctuary</span>
            </div>
            <h2 className="about-title">
              Redefining Living Canopies for Contemporary Urban Spaces.
            </h2>
            <p className="about-desc">
              Drawing inspiration from Biophilic Design and global plant conservation societies, <strong>The Living Canopy</strong> was born with a mission to bring rare botanical cultivars from academic conservatories into modern living sanctuaries.
            </p>
            <div className="about-quote-box">
              “We believe that nurturing living botanicals is not merely landscape decoration, but a grounding practice of mindfulness, microclimatic air restoration, and reconnection with natural rhythms.”
              <span className="quote-author">— GreenNest Botanical Advisory Board</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-cta-pill">View Mission & Botanist Curators (Dedicated Page) →</Link>
              <Link to="/gallery" className="btn-garden-badge" style={{ borderRadius: '9999px', padding: '10px 20px' }}>Explore Gallery →</Link>
            </div>
          </div>

          {/* Status highlights */}
          <div className="about-metrics-grid">
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ Active Prototype</div>
              <div className="metric-title">Curated Specimens</div>
              <div className="metric-detail">Preliminary static catalog (Node.js & MongoDB API ingestion underway)</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ Active Prototype</div>
              <div className="metric-title">Scientific Telemetry</div>
              <div className="metric-detail">Photon index & substrate aeration diagnostics (Syncing with database)</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ Active Prototype</div>
              <div className="metric-title">My Garden & Bookmarks</div>
              <div className="metric-detail">Client-cached sanctuary collections, persisting to User Collection with Auth</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ Active Prototype</div>
              <div className="metric-title">Pet-Safe & Rare Cultivars</div>
              <div className="metric-detail">Instant client facet filtering prior to database query integration</div>
            </div>
          </div>
        </div>

        {/* Teaser of Botanists & Lush Greenery */}
        <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80" alt="Botanist Elena Vu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Dr. Elena Vu — Tropical Taxonomy</span>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80" alt="Lush foliage in sunlight" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Morning Sunlight through Broadleaf Canopies</span>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" alt="Researcher Alexandre Pham" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Alexandre Pham — Highland Ferns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BOTANICAL_SPECIMENS, CANONICAL_PLANT_SLUGS } from '../data/botanicalSpecimens';
import { filterAndRankPlants } from '../utils/searchPlants';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const allPlants = useMemo(() => {
    return CANONICAL_PLANT_SLUGS.map(slug => BOTANICAL_SPECIMENS[slug]).filter(Boolean);
  }, []);

  // Filter and rank matching plants with intelligent botanical relevance scoring
  const { matchingPlants, totalMatches } = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return { matchingPlants: [], totalMatches: 0 };

    const { results, totalMatches } = filterAndRankPlants(allPlants, q, 5);
    return {
      matchingPlants: results,
      totalMatches
    };
  }, [searchQuery, allPlants]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        if (searchQuery.trim()) {
          setIsOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchQuery]);

  // Navigate to /plants with search query
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/plants?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/plants');
    }
  };

  // Keyboard arrow navigation inside dropdown
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setSelectedIndex(prev => (prev < matchingPlants.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : matchingPlants.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < matchingPlants.length) {
        e.preventDefault();
        const selected = matchingPlants[selectedIndex];
        navigate(`/specimen-detail?id=${selected.slug}`);
        setIsOpen(false);
      } else {
        handleSearch(e);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectSpecimen = (plant) => {
    setIsOpen(false);
    navigate(`/specimen-detail?id=${plant.slug}`);
  };

  const handleFacetClick = (tag) => {
    const cleanTag = tag.replace('#', '');
    navigate(`/plants?q=${encodeURIComponent(cleanTag)}`);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        
        {/* Foliage / Exhibition Tag */}
        <div className="hero-kicker-wrap">
          <span className="kicker-dot"></span>
          <span className="kicker-text">Exhibition No. 01 — The Domestic Arboretum</span>
          <span className="kicker-folio">Reg. Archive // Folio 01</span>
        </div>

        {/* Headline inspired by high-end nature conservation & editorial design */}
        <h1 className="hero-title">
          Think you know <span className="italic-accent">Nature?</span><br />
          Curate Your Sanctuary.
        </h1>

        <p className="hero-subtitle">
          Explore a curated collection of rare botanical specimens preserved and cultivated for contemporary living spaces. Interactive taxonomy, biophilic design insights, and expert horticultural care protocols.
        </p>

        {/* REPOSITIONED CENTRAL INTELLIGENT SEARCH BAR */}
        <div className="search-hero-container" ref={containerRef}>
          <form className="search-box-pill" onSubmit={handleSearch}>
            <svg className="search-icon-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              ref={inputRef}
              type="text" 
              className="search-input-field" 
              id="herbariumSearchInput" 
              placeholder="Search by common name, genus, or #tag (e.g., Monstera, Velvet, Shade)..."
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(-1);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '4px'
                }}
                title="Clear query"
              >
                ✕
              </button>
            )}
            <span className="search-shortcut-pill">⌘K</span>
            <button type="submit" className="search-submit-btn" id="searchSubmitBtn">
              <span>Search</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          {/* Live Instant Suggestions Dropdown with Plant Thumbnails */}
          {isOpen && searchQuery.trim() && (
            <div className="search-suggestions-panel active" id="suggestionsPanel">
              {matchingPlants.length > 0 ? (
                <>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px 10px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '6px'
                  }}>
                    <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#86efac', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                      Live Catalog Suggestions ({totalMatches})
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Press [Enter] to view all in /plants
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {matchingPlants.map((plant, index) => (
                      <div
                        key={plant.slug || plant.id}
                        className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                        onClick={() => handleSelectSpecimen(plant)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <img
                          className="suggestion-thumb"
                          src={plant.image}
                          alt={plant.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                        <div className="suggestion-info">
                          <span className="suggestion-name">{plant.name}</span>
                          <span className="suggestion-botanical">{plant.scientificName}</span>
                        </div>
                        <div className="suggestion-meta">
                          <span className="suggestion-badge">{plant.biome || plant.category}</span>
                          <span className="suggestion-arrow">→</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="suggestions-footer-btn"
                    onClick={handleSearch}
                  >
                    <span>View all {totalMatches} matching results in Living Catalog (/plants)</span>
                    <span>→</span>
                  </button>
                </>
              ) : (
                <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🌿</div>
                  <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
                    No exact specimens match "{searchQuery}"
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px' }}>
                    Press Enter or click below to search the comprehensive botanical catalog at /plants.
                  </div>
                  <button
                    type="button"
                    className="suggestions-footer-btn"
                    onClick={handleSearch}
                  >
                    <span>Search /plants with "{searchQuery}" →</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INDEX FACETS */}
        <div className="facets-hero-wrap">
          <span className="facet-label">Index Facets:</span>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Araceae')}>#Araceae</button>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Trailing')}>#TrailingFoliage</button>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Pet Safe')}>#PetSafe</button>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Velvet')}>#VelvetLeaf</button>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Rare Cultivar')}>#RareCultivar</button>
          <button type="button" className="facet-tag" onClick={() => handleFacetClick('Shade')}>#DeepShadeThriving</button>
        </div>

      </div>

      {/* Bottom cinematic fade blend */}
      <div className="hero-bottom-fade"></div>
    </section>
  );
};

export default Hero;
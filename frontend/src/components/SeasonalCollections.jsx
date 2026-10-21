import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLANT_COLLECTIONS, BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';

const SEASON_META = {
  spring: {
    icon: '🌸',
    label: 'Spring',
    english: 'Spring Equinox'
  },
  summer: {
    icon: '☀️',
    label: 'Summer',
    english: 'Summer Solstice'
  },
  autumn: {
    icon: '🍂',
    label: 'Autumn',
    english: 'Autumn Equinox'
  },
  winter: {
    icon: '❄️',
    label: 'Winter',
    english: 'Winter Solstice'
  }
};

const SeasonalCollections = () => {
  const [activeSeason, setActiveSeason] = useState('spring');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredTabKey, setHoveredTabKey] = useState(null);

  // Active collection object from seed data
  const activeCollection =
    PLANT_COLLECTIONS.find((c) => c.seasonKey === activeSeason) ||
    PLANT_COLLECTIONS[0];

  const seasonMeta = SEASON_META[activeSeason] || SEASON_META.spring;

  // Resolve plant specimens from plantSlugs
  const plants = (activeCollection.plantSlugs || [])
    .map((slug) => ({
      slug,
      data: BOTANICAL_SPECIMENS[slug]
    }))
    .filter((item) => Boolean(item.data));

  return (
    <section
      id="seasonal-collections"
      style={{
        position: 'relative',
        padding: '80px 24px 100px',
        maxWidth: '1300px',
        margin: '0 auto',
        zIndex: 10
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '36px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#86efac'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              boxShadow: '0 0 10px #22c55e',
              display: 'inline-block'
            }}
          />
          SEASONAL COLLECTIONS // FRS 8
        </div>

        <h2
          style={{
            fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            color: '#f0fdf4',
            lineHeight: 1.2,
            margin: 0
          }}
        >
          Seasonal Curated Collections
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
            fontSize: '1rem',
            color: '#8ca395',
            maxWidth: '720px',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          Explore the vegetative rhythms of botanical life through four seasons. Each seasonal collection is intentionally curated to align with solar exposure, ambient humidity, and natural dormancy cycles.
        </p>
      </div>

      {/* 4 Season Selector Buttons (Pill-style, horizontal scroll on mobile) */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '32px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {PLANT_COLLECTIONS.map((collection) => {
          const key = collection.seasonKey;
          const meta = SEASON_META[key] || {};
          const isActive = activeSeason === key;
          const isHovered = hoveredTabKey === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSeason(key)}
              onMouseEnter={() => setHoveredTabKey(key)}
              onMouseLeave={() => setHoveredTabKey(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '9999px',
                border: isActive
                  ? '1px solid #22c55e'
                  : isHovered
                  ? '1px solid rgba(34, 197, 94, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(14, 30, 22, 0.95) 100%)'
                  : isHovered
                  ? 'rgba(22, 44, 33, 0.7)'
                  : 'rgba(14, 30, 22, 0.6)',
                color: isActive ? '#f0fdf4' : isHovered ? '#ffffff' : '#cbd5e1',
                boxShadow: isActive
                  ? '0 0 20px rgba(34, 197, 94, 0.25), 0 4px 12px rgba(0, 0, 0, 0.4)'
                  : 'none',
                cursor: 'pointer',
                fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{meta.icon}</span>
              <span>{collection.name}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: isActive
                    ? 'rgba(34, 197, 94, 0.25)'
                    : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#86efac' : '#94a3b8',
                  fontWeight: 600
                }}
              >
                {collection.plantSlugs.length} species
              </span>
            </button>
          );
        })}
      </div>

      {/* Hero Banner for Selected Collection with Image & Overlay */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          minHeight: '220px',
          marginBottom: '36px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          src={activeCollection.image}
          alt={activeCollection.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.65)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(7, 16, 11, 0.94) 0%, rgba(7, 16, 11, 0.82) 45%, rgba(7, 16, 11, 0.45) 100%)'
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '36px clamp(20px, 4vw, 48px)',
            maxWidth: '780px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#86efac',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px'
            }}
          >
            <span>{seasonMeta.icon}</span>
            <span>{seasonMeta.label} • {seasonMeta.english}</span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
              color: '#f0fdf4',
              margin: '0 0 10px 0',
              fontWeight: 700
            }}
          >
            {activeCollection.name}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
              color: '#cbd5e1',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            {activeCollection.description}
          </p>
        </div>
      </div>

      {/* Grid of Plant Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}
      >
        {plants.map(({ slug, data: plant }) => {
          const isCardHovered = hoveredCardId === slug;

          return (
            <div
              key={slug}
              onMouseEnter={() => setHoveredCardId(slug)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{
                backgroundColor: '#0e1e16',
                borderRadius: '16px',
                border: isCardHovered
                  ? '1px solid rgba(34, 197, 94, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: isCardHovered
                  ? '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 197, 94, 0.15)'
                  : '0 8px 24px rgba(0, 0, 0, 0.3)',
                transform: isCardHovered ? 'translateY(-6px)' : 'translateY(0)',
                transition:
                  'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              {/* Plant Image (180px height, object-fit cover) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '180px',
                  overflow: 'hidden',
                  backgroundColor: '#07100b'
                }}
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isCardHovered ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  loading="lazy"
                />
                {plant.biomeLabel && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(7, 16, 11, 0.75)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#86efac',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}
                  >
                    {plant.biomeLabel}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}
              >
                {plant.catalogCode && (
                  <span
                    style={{
                      fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                      marginBottom: '4px'
                    }}
                  >
                    {plant.catalogCode}
                  </span>
                )}

                <h4
                  style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#f0fdf4',
                    margin: '0 0 4px 0',
                    lineHeight: 1.3
                  }}
                >
                  {plant.name}
                </h4>

                <p
                  style={{
                    fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
                    fontStyle: 'italic',
                    fontSize: '0.85rem',
                    color: '#8ca395',
                    margin: '0 0 16px 0',
                    lineHeight: 1.4
                  }}
                >
                  {plant.scientificName}
                </p>

                {/* Footer Link to Specimen Detail */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <Link
                    to={`/specimen-detail?id=${slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: isCardHovered ? '#86efac' : '#22c55e',
                      fontFamily: "var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif)",
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      transform: isCardHovered ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  >
                    <span>→ View Specimen</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SeasonalCollections;

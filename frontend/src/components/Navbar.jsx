import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadItems, setUnreadItems] = useState([1, 2, 3]);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setUnreadItems([]);
  };

  const handleItemClick = (id) => {
    setUnreadItems(prev => prev.filter(item => item !== id));
  };

  return (
    <header className="header-floating-wrap">
      <nav className="navbar-pill" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" title="The Living Canopy">
          <svg className="brand-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C9.5 2 4.5 7.5 4.5 14C4.5 20.5 10 26 16 30C22 26 27.5 20.5 27.5 14C27.5 7.5 22.5 2 16 2ZM16 25C12 21.5 8 18 8 14C8 9.5 11.5 6 16 6C20.5 6 24 9.5 24 14C24 18 20 21.5 16 25Z" fill="currentColor" fillOpacity="0.3"/>
            <path d="M16 8C14 11 11 14 11 17C11 19.8 13.2 22 16 22C18.8 22 21 19.8 21 17C21 14 18 11 16 8Z" fill="currentColor"/>
            <circle cx="16" cy="17" r="2.5" fill="#ffffff"/>
          </svg>
          <div className="brand-text">
            <span className="brand-title">The Living Canopy</span>
            <span className="brand-sub">GreenNest Herbarium</span>
          </div>
        </Link>

        {/* Menu links in English */}
        <ul className="nav-links">
          <li><NavLink to="/" end>Overview</NavLink></li>
          <li><NavLink to="/plants">Plants 🌿</NavLink></li>
          <li><NavLink to="/collections">Collections 📁</NavLink></li>
          <li><NavLink to="/gallery">Gallery ↗</NavLink></li>
          <li><NavLink to="/about">About Us ↗</NavLink></li>
          <li><NavLink to="/user">My Garden 🌿</NavLink></li>
          {isAdmin && (
            <li>
              <NavLink 
                to="/admin" 
                style={{ 
                  color: '#facc15', 
                  fontWeight: 700, 
                  textShadow: '0 0 10px rgba(234, 179, 8, 0.4)' 
                }}
              >
                👑 Admin Portal
              </NavLink>
            </li>
          )}
          <li><NavLink to="/contact">Contact ↗</NavLink></li>
        </ul>

        {/* Right CTAs with Notification Bell */}
        <div className="nav-actions">
          {/* Notification Bell with Popover Dropdown */}
          <div className="notif-container" ref={notifRef} id="notifContainer">
            <button
              type="button"
              className={`btn-notif-bell ${notifOpen ? 'active' : ''}`}
              id="notifBellBtn"
              aria-label="Notifications"
              aria-expanded={notifOpen}
              title="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setNotifOpen(!notifOpen);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {unreadItems.length > 0 && (
                <span className="notif-badge-pill" id="notifBadge">{unreadItems.length}</span>
              )}
            </button>

            {/* Notification Dropdown Popover Box */}
            <div className={`notif-dropdown ${notifOpen ? 'show' : ''}`} id="notifDropdown" role="region" aria-label="Notifications Panel">
              <div className="notif-header">
                <div className="notif-header-title-wrap">
                  <span className="notif-header-title">Notifications</span>
                  <span className="notif-count-tag" id="notifCountTag">
                    {unreadItems.length > 0 ? `${unreadItems.length} New` : 'All Read'}
                  </span>
                </div>
                <button type="button" className="notif-mark-read" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              </div>

              <ul className="notif-list" id="notifList">
                <li
                  className={`notif-item ${unreadItems.includes(1) ? 'unread' : ''}`}
                  onClick={() => handleItemClick(1)}
                >
                  <Link to="/user" style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <div className="notif-icon-bubble garden">🌿</div>
                    <div className="notif-body">
                      <div className="notif-meta">
                        <span className="notif-source-badge garden">Your Garden</span>
                        <span className="notif-time">10m ago</span>
                      </div>
                      <div className="notif-title">Watering Schedule Due</div>
                      <div className="notif-text">3 saved plants in your sanctuary need hydration check.</div>
                    </div>
                    {unreadItems.includes(1) && <div className="notif-dot"></div>}
                  </Link>
                </li>

                <li
                  className={`notif-item ${unreadItems.includes(2) ? 'unread' : ''}`}
                  onClick={() => handleItemClick(2)}
                >
                  <Link to="/plants" style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <div className="notif-icon-bubble gallery">🌱</div>
                    <div className="notif-body">
                      <div className="notif-meta">
                        <span className="notif-source-badge gallery">Gallery</span>
                        <span className="notif-time">1h ago</span>
                      </div>
                      <div className="notif-title">3 New Specimens Added</div>
                      <div className="notif-text">Explore newly curated Araceae & Velvet Leaf cultivars in the archive.</div>
                    </div>
                    {unreadItems.includes(2) && <div className="notif-dot"></div>}
                  </Link>
                </li>

                <li
                  className={`notif-item ${unreadItems.includes(3) ? 'unread' : ''}`}
                  onClick={() => handleItemClick(3)}
                >
                  <Link to="/about" style={{ display: 'flex', gap: '12px', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <div className="notif-icon-bubble about">📖</div>
                    <div className="notif-body">
                      <div className="notif-meta">
                        <span className="notif-source-badge about">Botanical Journal</span>
                        <span className="notif-time">Yesterday</span>
                      </div>
                      <div className="notif-title">Exhibition Dispatch Published</div>
                      <div className="notif-text">Read: "Canopy Humidity & Microclimates in Modern Living Spaces".</div>
                    </div>
                    {unreadItems.includes(3) && <div className="notif-dot"></div>}
                  </Link>
                </li>
              </ul>

              <div className="notif-footer">
                <Link to="/user" className="notif-footer-link">Go to My Garden 🌿</Link>
              </div>
            </div>
          </div>

          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={logout}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#fca5a5',
                  borderRadius: 0,
                  padding: '7px 14px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.25s ease'
                }}
                title={`Logged in as ${user.name}. Click to sign out.`}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-cta-pill" id="navAuthBtn" style={{ padding: '9px 18px', fontSize: '0.84rem', borderRadius: 0 }}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

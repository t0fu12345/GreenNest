import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

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
          <li><NavLink to="/plants">Plants</NavLink></li>
          <li><NavLink to="/collections">Collections</NavLink></li>
          <li><NavLink to="/gallery">Gallery</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/user">My Garden</NavLink></li>
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
                👑 Admin
              </NavLink>
            </li>
          )}
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        {/* Right CTAs */}
        <div className="nav-actions">
          {isAuthenticated && user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={logout}
                className="btn-nav-signout"
                title={`Logged in as ${user.name || user.email || 'User'}. Click to sign out.`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-cta-pill" id="navAuthBtn" style={{ padding: '7px 16px', fontSize: '0.82rem', borderRadius: '9999px' }}>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
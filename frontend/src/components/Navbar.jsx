import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
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

        {/* Menu links */}
        <ul className="nav-links">
          <li><NavLink to="/" end>Tổng Quan</NavLink></li>
          <li><NavLink to="/gallery">Gallery ↗</NavLink></li>
          <li><NavLink to="/about">About Us ↗</NavLink></li>
          <li><NavLink to="/user">Khu Vườn Của Tôi 🌿</NavLink></li>
          <li><a href="#footer">Liên Hệ</a></li>
        </ul>

        {/* Right CTAs */}
        <div className="nav-actions">
          <Link to="/user" className="btn-garden-badge" id="gardenBadgeBtn" title="Xem Khu Vườn Cá Nhân">
            <span>🌿 Vườn Của Tôi</span>
            <span className="badge-counter" id="savedCount">3</span>
          </Link>
          <Link to="/login" className="btn-cta-pill" id="navAuthBtn" style={{ padding: '9px 18px', fontSize: '0.84rem' }}>Đăng Nhập</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

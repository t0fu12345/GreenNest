import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-inner">
        <div className="footer-main-grid">
          
          {/* Brand column */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
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
            <p className="footer-bio">
              A curated botanical exhibition and digital archive dedicated to contemporary architectural living spaces. Bringing wilderness into the modern home with reverence and botanical precision.
            </p>
          </div>

          {/* Col 2: About Us */}
          <div className="footer-col">
            <h4 className="footer-col-title">About Us</h4>
            <p className="footer-desc">
              A research and digitization initiative documenting tropical flora and biophilic living systems for modern architecture.
            </p>
            <Link to="/about" className="footer-link">Our Purpose & Botanists →</Link>
          </div>

          {/* Col 3: More Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">More Info</h4>
            <p className="footer-desc">
              GreenNest digital interface and taxonomy. Discover the complete specimen collection in our curated archive.
            </p>
            <Link to="/gallery" className="footer-link">Gallery Archive →</Link>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <div>
            © 2026 The Living Canopy & GreenNest Consortium. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('CITES & IUCN conservation protocols apply to all catalog records.'); }}>CITES Protocol</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy policy for botanical data and user profiles.'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of service for botanical archive and exhibition.'); }}>Terms of Service</a>
          </div>
          <button className="btn-back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span>Back to top ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

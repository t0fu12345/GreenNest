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
              Triển lãm thực vật học và kho lưu trữ số dành riêng cho không gian sống hiện đại. Đưa thiên nhiên hoang dã vào ngôi nhà với sự tôn trọng và hiểu biết sâu sắc.
            </p>
            <div className="footer-social-links">
              <a href="#" className="social-btn" title="Instagram" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-btn" title="GitHub" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" className="social-btn" title="Twitter / X" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: About Us */}
          <div>
            <h4 className="footer-col-title">About Us</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '240px', marginBottom: '8px' }}>
              Dự án nghiên cứu và lưu trữ số hóa các loài thực vật nhiệt đới dành cho không gian sống hiện đại.
            </p>
            <Link to="/about" style={{ color: '#86efac', fontSize: '0.84rem', textDecoration: 'underline' }}>Xem Mục Đích & Botanists →</Link>
          </div>

          {/* Col 3: More Info */}
          <div>
            <h4 className="footer-col-title">More Info</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '240px' }}>
              Mô hình thử nghiệm giao diện GreenNest. Khám phá toàn bộ danh mục tại <Link to="/gallery" style={{ color: '#86efac', textDecoration: 'underline' }}>Gallery Archive →</Link>
            </p>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="footer-col-title">Bản Tin Thực Vật Học</h4>
            <div className="footer-newsletter-wrap">
              <p className="newsletter-desc">
                Đăng ký để nhận các bài viết phân loại học, mẹo chăm sóc độc quyền và thông báo triển lãm mới vào mỗi thứ Năm.
              </p>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký!'); }}>
                <input type="email" className="newsletter-input" placeholder="Nhập địa chỉ email của bạn..." required />
                <button type="submit" className="newsletter-submit">Đăng Ký</button>
              </form>
              <div style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--emerald-accent)' }}>●</span> Không spam. Hủy đăng ký bất cứ lúc nào.
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-row">
          <div>
            © 2026 The Living Canopy & GreenNest Consortium. Bảo lưu mọi quyền.
          </div>
          <div className="footer-legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Quy chuẩn bảo tồn CITES & IUCN áp dụng cho toàn bộ dữ liệu.'); }}>Quy Chuẩn CITES</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật dữ liệu người dùng.'); }}>Chính Sách Bảo Mật</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ thư viện thực vật học.'); }}>Điều Khoản</a>
          </div>
          <button className="btn-back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span>Lên đầu trang ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
              <span>Manifesto & Conservation // Về Dự Án</span>
            </div>
            <h2 className="about-title">
              Tái Định Nghĩa Mảng Xanh Cho Không Gian Sống Kỷ Nguyên Số.
            </h2>
            <p className="about-desc">
              Lấy cảm hứng từ phong trào kiến trúc sinh thái (Biophilic Design) và các hiệp hội bảo tồn thực vật học quốc tế, <strong>The Living Canopy</strong> ra đời với sứ mệnh đưa các giống thực vật quý hiếm từ những nhà kính hàn lâm vào môi trường sống hiện đại.
            </p>
            <div className="about-quote-box">
              “Chúng tôi tin rằng việc chăm sóc một loài cây không đơn thuần là thú vui cảnh quan, mà là một hành trình thực hành chánh niệm, làm sạch vi khí hậu và kết nối lại với nhịp điệu nguyên sơ của thiên nhiên.”
              <span className="quote-author">— Ban Cố Vấn Thực Vật Học GreenNest</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn-cta-pill">Xem Mục Đích & Đội Ngũ Botanist (Trang Riêng) →</Link>
              <Link to="/gallery" className="btn-garden-badge" style={{ borderRadius: '9999px', padding: '10px 20px' }}>Khám Phá Gallery →</Link>
            </div>
          </div>

          {/* Status highlights */}
          <div className="about-metrics-grid">
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ No Backend Yet</div>
              <div className="metric-title">Bản Mẫu Tuyển Chọn</div>
              <div className="metric-detail">Dữ liệu mẫu demo tĩnh (Đang chuẩn bị API Node.js & MongoDB)</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ No Backend Yet</div>
              <div className="metric-title">Dữ Liệu Khoa Học</div>
              <div className="metric-detail">Chẩn đoán ánh sáng & giá thể (Sẽ đồng bộ từ Database)</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ No Backend Yet</div>
              <div className="metric-title">Vườn Của Tôi & Bookmark</div>
              <div className="metric-detail">Hiện lưu tạm ở Client, sẽ lưu vào User Collection khi có Auth</div>
            </div>
            <div className="metric-box">
              <div className="metric-num-nobackend">⚡ No Backend Yet</div>
              <div className="metric-title">Bộ Lọc Thú Cưng & Cây Hiếm</div>
              <div className="metric-detail">Client filtering tức thời trước khi chuyển sang Backend Queries</div>
            </div>
          </div>
        </div>

        {/* Bright Teaser of Botanists & Lush Greenery */}
        <div style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80" alt="Botanist Elena Vũ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>TS. Elena Vũ — Ban Nhiệt Đới</span>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80" alt="Cây cối tươi sáng dưới ánh nắng" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Lá xanh tươi sáng đón ban mai</span>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '180px', border: '1px solid var(--border-glass)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" alt="Nhà nghiên cứu Alexandre Phạm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,16,11,0.85) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>Alexandre Phạm — Ban Cận Nhiệt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;

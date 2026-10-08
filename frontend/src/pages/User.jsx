
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const User = () => {
  return (
    <>
      

  {/*  Floating Navigation  */}
  <Navbar />

  {/*  User Profile Section  */}
  <section className="user-profile-section">
    <div className="profile-hero-card">
      
      {/*  Avatar  */}
      <div className="avatar-wrapper">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Avatar người dùng" className="user-avatar-img" id="userAvatar" />
        <span className="avatar-level-badge" id="userLevelBadge">CẤP 3</span>
      </div>

      {/*  User Information  */}
      <div className="profile-info-wrap">
        <div className="profile-pill-tag">
          <span>🌱 THÀNH VIÊN SINH THÁI CHÍNH THỨC</span>
        </div>
        <h1 className="user-name" id="displayUserName">Hoàng Minh Thảo</h1>
        <div className="user-email-meta">
          <span className="meta-item" id="displayUserEmail">minhthao.botany@gmail.com</span>
          <span className="meta-dot">•</span>
          <span className="meta-item" id="displayJoinDate">Thành viên từ: Tháng 03, 2026</span>
          <span className="meta-dot">•</span>
          <span className="meta-item" id="displayLoginMethod" style={{ color: '#86efac' }}>Đã xác thực qua Google</span>
        </div>

        <div className="profile-badges-row">
          <div className="eco-badge">
            <span>🌴</span>
            <span id="displayUserBiome">Đới Nóng (Tropical)</span>
          </div>
          <div className="eco-badge">
            <span>🏆</span>
            <span id="displayUserRole">Nhà Làm Vườn Nhiệt Đới</span>
          </div>
          <div className="eco-badge">
            <span>✨</span>
            <span>Không Hóa Chất Độc Hại</span>
          </div>
        </div>
      </div>

      {/*  Action Buttons  */}
      <div className="profile-actions-col">
        <button className="btn-edit-profile" onClick={() => {}}>
          <span>✏️ Chỉnh Sửa Hồ Sơ</span>
        </button>
        <div style={{ fontSize: '0.78rem', color: '#86efac', textAlign: 'right' }}>
          <span>⚡ Trạng thái: Đang hoạt động</span>
        </div>
      </div>

    </div>

    {/*  Eco Dashboard Bento Metrics  */}
    <div className="user-metrics-grid">
      
      <div className="metric-bento-card">
        <div className="metric-icon-small">🌿</div>
        <div className="metric-val" id="totalPlantsCounter">3</div>
        <div className="metric-label">Cây Đang Chăm Sóc</div>
        <div className="metric-subhint">100% sinh trưởng ổn định</div>
      </div>

      <div className="metric-bento-card">
        <div className="metric-icon-small">💧</div>
        <div className="metric-val" id="pendingWaterCounter">1 Cây</div>
        <div className="metric-label">Cần Tưới Chiều Nay</div>
        <div className="metric-subhint">Monstera Deliciosa (45% ẩm)</div>
      </div>

      <div className="metric-bento-card">
        <div className="metric-icon-small">🌬️</div>
        <div className="metric-val">~450 L</div>
        <div className="metric-label">O₂ Tạo Ra Ước Tính</div>
        <div className="metric-subhint">Thanh lọc không khí phòng khách</div>
      </div>

      <div className="metric-bento-card">
        <div className="metric-icon-small">☀️</div>
        <div className="metric-val">1,500 FC</div>
        <div className="metric-label">Cường Độ Sáng Trung Bình</div>
        <div className="metric-subhint">Ánh sáng tán xạ tự nhiên hoàn hảo</div>
      </div>

    </div>
  </section>

  {/*  My Garden Section (Danh sách cây đã thêm)  */}
  <section className="my-garden-section">
    <div className="garden-header-bar">
      <div className="garden-title-wrap">
        <h2>Khu Vườn Sinh Thái Của Tôi</h2>
        <p>Danh sách các bản mẫu thực vật học bạn đã thêm vào khu vườn. Theo dõi độ ẩm và nhịp tưới ráo từng cây.</p>
      </div>

      <div className="garden-controls">
        <a href="gallery.html" className="btn-add-plant">
          <span>+ Khám Phá Thêm Cây Mới (Gallery) →</span>
        </a>
      </div>
    </div>

    {/*  Plants Cards Grid  */}
    <div className="plants-grid" id="plantsGrid">

      {/*  Plant 1: Monstera Deliciosa  */}
      <article className="plant-card" id="plant-card-monstera" data-id="monstera">
        <div className="plant-card-thumb-wrap">
          <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80" alt="Monstera Deliciosa" className="plant-card-thumb" />
          <div className="plant-thumb-fade"></div>
          <span className="plant-biome-badge">🌴 Đới Nóng</span>
          <span className="plant-health-badge">TƯƠI TỐT</span>
        </div>
        <div className="plant-body">
          <div className="plant-names">
            <h3 className="plant-common-name">Trầu Bà Lá Xẻ</h3>
            <p className="plant-botanical-name">Monstera Deliciosa Liebm.</p>
          </div>

          <div className="plant-care-status-box">
            <div className="care-row">
              <span className="care-key"><span>☀️</span> Ánh Sáng:</span>
              <span className="care-val">Tán xạ 1,200 FC</span>
            </div>
            <div className="care-row">
              <span className="care-key"><span>💧</span> Lịch Tưới:</span>
              <span className="care-val" id="water-status-monstera">Cần tưới chiều nay</span>
            </div>
            <div className="soil-meter-wrap">
              <div className="soil-meter-header">
                <span>Độ ẩm giá thể:</span>
                <span id="soil-pct-monstera">45% (Hơi khô)</span>
              </div>
              <div className="soil-bar-track">
                <div className="soil-bar-fill" id="soil-bar-monstera" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          <div className="plant-card-actions">
            <button className="btn-action-water" onClick={() => {}}>
              <span>💧 Tưới Nước Ngay</span>
            </button>
            <button className="btn-action-delete" onClick={() => {}} title="Gỡ khỏi vườn">
              <span>🗑️</span>
            </button>
          </div>
        </div>
      </article>

      {/*  Plant 2: Ficus Lyrata  */}
      <article className="plant-card" id="plant-card-ficus" data-id="ficus">
        <div className="plant-card-thumb-wrap">
          <img src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80" alt="Ficus Lyrata" className="plant-card-thumb" />
          <div className="plant-thumb-fade"></div>
          <span className="plant-biome-badge">🌴 Đới Nóng</span>
          <span className="plant-health-badge">ĐÂM CHỒI MỚI</span>
        </div>
        <div className="plant-body">
          <div className="plant-names">
            <h3 className="plant-common-name">Bàng Singapore</h3>
            <p className="plant-botanical-name">Ficus Lyrata Warb.</p>
          </div>

          <div className="plant-care-status-box">
            <div className="care-row">
              <span className="care-key"><span>☀️</span> Ánh Sáng:</span>
              <span className="care-val">Nắng gián tiếp 2,000 FC</span>
            </div>
            <div className="care-row">
              <span className="care-key"><span>💧</span> Lịch Tưới:</span>
              <span className="care-val" id="water-status-ficus">Đã tưới hôm qua</span>
            </div>
            <div className="soil-meter-wrap">
              <div className="soil-meter-header">
                <span>Độ ẩm giá thể:</span>
                <span id="soil-pct-ficus">75% (Tốt)</span>
              </div>
              <div className="soil-bar-track">
                <div className="soil-bar-fill" id="soil-bar-ficus" style={{ width: '75%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
              </div>
            </div>
          </div>

          <div className="plant-card-actions">
            <button className="btn-action-water" onClick={() => {}}>
              <span>💧 Tưới Phun Sương</span>
            </button>
            <button className="btn-action-delete" onClick={() => {}} title="Gỡ khỏi vườn">
              <span>🗑️</span>
            </button>
          </div>
        </div>
      </article>

      {/*  Plant 3: Haworthia Fasciata  */}
      <article className="plant-card" id="plant-card-succulent" data-id="succulent">
        <div className="plant-card-thumb-wrap">
          <img src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80" alt="Sen đá móng rồng" className="plant-card-thumb" />
          <div className="plant-thumb-fade"></div>
          <span className="plant-biome-badge">🏜️ Đới Khô Hạn</span>
          <span className="plant-health-badge">MỌNG NƯỚC</span>
        </div>
        <div className="plant-body">
          <div className="plant-names">
            <h3 className="plant-common-name">Sen Đá Móng Rồng</h3>
            <p className="plant-botanical-name">Haworthia Fasciata Haw.</p>
          </div>

          <div className="plant-care-status-box">
            <div className="care-row">
              <span className="care-key"><span>☀️</span> Ánh Sáng:</span>
              <span className="care-val">Nắng trực tiếp 3,500 FC</span>
            </div>
            <div className="care-row">
              <span className="care-key"><span>💧</span> Lịch Tưới:</span>
              <span className="care-val" id="water-status-succulent">Không cần tưới 8 ngày tới</span>
            </div>
            <div className="soil-meter-wrap">
              <div className="soil-meter-header">
                <span>Độ ẩm giá thể:</span>
                <span id="soil-pct-succulent">20% (Khô chuẩn CAM)</span>
              </div>
              <div className="soil-bar-track">
                <div className="soil-bar-fill" id="soil-bar-succulent" style={{ width: '20%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
              </div>
            </div>
          </div>

          <div className="plant-card-actions">
            <button className="btn-action-water" onClick={() => {}}>
              <span>💧 Tưới Nhỏ Giọt</span>
            </button>
            <button className="btn-action-delete" onClick={() => {}} title="Gỡ khỏi vườn">
              <span>🗑️</span>
            </button>
          </div>
        </div>
      </article>

    </div>

    {/*  Empty State Container  */}
    <div className="empty-garden-state" id="emptyGardenBox">
      <div className="empty-icon">🪴</div>
      <h3 className="empty-title">Khu Vườn Của Bạn Chưa Có Cây Nào</h3>
      <p className="empty-text">
        Hãy ghé thăm kho thư viện bản mẫu để khám phá các dòng cây theo 3 đới khí hậu và thêm cây đầu tiên vào khu vườn của bạn!
      </p>
      <a href="gallery.html" className="btn-add-plant">Khám Phá Thư Viện Gallery Ngay →</a>
    </div>

  </section>

  {/*  Edit Profile Modal  */}
  <div className="modal-backdrop" id="editModal">
    <div className="modal-box">
      <button className="modal-close-btn" onClick={() => {}}>✕</button>
      <h3 className="modal-title">Cập Nhật Thông Tin</h3>
      <p className="modal-subtitle">Chỉnh sửa tên hiển thị và đới khí hậu yêu thích của bạn.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Tên hiển thị:</label>
          <input type="text" id="editNameInput" style={{ width: '100%', background: 'rgba(5,13,8,0.7)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem' }} value="Hoàng Minh Thảo" required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Đới khí hậu bạn ưu tiên:</label>
          <select id="editBiomeSelect" style={{ width: '100%', background: '#0c1c14', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '10px 14px', color: '#fff', fontSize: '0.9rem' }}>
            <option value="Đới Nóng (Tropical)">🌴 Đới Nóng Nhiệt Đới</option>
            <option value="Đới Ôn Hòa (Subtropical)">🌲 Đới Ôn Hòa & Cận Nhiệt</option>
            <option value="Đới Khô Hạn (Arid)">🏜️ Đới Khô Hạn & Sen Đá</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => {}} style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: '#cbd5e1', padding: '8px 18px', borderRadius: '9999px', cursor: 'pointer' }}>Hủy</button>
          <button type="submit" className="btn-add-plant" style={{ border: 'none', cursor: 'pointer' }}>Lưu Thay Đổi</button>
        </div>
      </form>
    </div>
  </div>

  {/*  Minimal Footer  */}
  <Footer />

  

    </>
  );
};

export default User;

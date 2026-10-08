import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeBiomes = () => {
  const [activeBiome, setActiveBiome] = useState(null);

  const biomes = [
    {
      id: 'tropical',
      icon: '🌴',
      badge: 'Đới Nóng & Xích Đạo',
      title: 'Tropical Canopy',
      desc: 'Vùng nhiệt độ cao và ổn định quanh năm, là môi trường lý tưởng nhất cho cây ưa nhiệt. Thích hợp cho phòng khách ấm, giếng trời và góc nhiều ánh sáng gián tiếp.',
      temp: '25°C - 35°C',
      humidity: '> 70%',
      env: 'Ưa nhiệt ẩm',
      buttonLabel: 'Lọc Đới Nóng (Nhiệt Đới)',
      resultTitle: '🌴 Đới Nóng (Rừng Mưa Nhiệt Đới & Xích Đạo)'
    },
    {
      id: 'subtropical',
      icon: '🌲',
      badge: 'Ôn Đới & Cận Nhiệt',
      title: 'Subtropical Highlands',
      desc: 'Khí hậu mát mẻ hơn, phù hợp cho các loài cây cận nhiệt và ôn đới (như vùng Trung du & miền núi Bắc Bộ, Đà Lạt). Thích hợp phòng điều hòa và ban công mát.',
      temp: '16°C - 24°C',
      humidity: '50% - 65%',
      env: 'Chịu rét nhẹ',
      buttonLabel: 'Lọc Đới Cận Nhiệt & Ôn Đới',
      resultTitle: '🌲 Đới Ôn Hòa & Cận Nhiệt Cao Nguyên'
    },
    {
      id: 'arid',
      icon: '🏜️',
      badge: 'Khô Hạn & Bán Hoang Mạc',
      title: 'Arid & Semi-Arid',
      desc: 'Ánh nắng trực tiếp dồi dào, biên độ nhiệt ngày/đêm lớn. Cây có khả năng tích trữ nước bền bỉ, thích hợp ban công hướng Tây đón nắng gắt và người bận rộn.',
      temp: '20°C - 38°C',
      humidity: '< 40%',
      env: 'Chịu hạn cao',
      buttonLabel: 'Lọc Đới Khô Hạn',
      resultTitle: '🏜️ Đới Khô Hạn & Bán Hoang Mạc'
    }
  ];

  return (
    <main className="archive-section" id="specimens">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <div className="section-subtitle-kicker">The Tri-Biome Architecture // 3 Đại Đới Sinh Thái</div>
          <h2 className="section-heading">Khám Phá Cây Theo Đới Khí Hậu</h2>
        </div>
        <Link to="/gallery" className="btn-cta-pill" style={{ fontSize: '0.85rem' }}>
          <span>Xem Toàn Bộ Thư Viện (Gallery Page) →</span>
        </Link>
      </div>

      {/* 3 Climatic Biome Theme Cards */}
      <div className="biomes-grid">
        {biomes.map((biome) => (
          <div className="biome-card" key={biome.id}>
            <div className="biome-header">
              <div className="biome-icon-wrap">{biome.icon}</div>
              <span className="biome-tag-badge">{biome.badge}</span>
            </div>
            <h3 className="biome-title">{biome.title}</h3>
            <p className="biome-desc">{biome.desc}</p>
            <div className="biome-specs-row">
              <div className="biome-spec-item">
                <span className="biome-spec-label">Nhiệt Độ</span>
                <span className="biome-spec-val">{biome.temp}</span>
              </div>
              <div className="biome-spec-item">
                <span className="biome-spec-label">Độ Ẩm</span>
                <span className="biome-spec-val">{biome.humidity}</span>
              </div>
              <div className="biome-spec-item">
                <span className="biome-spec-label">Môi Trường</span>
                <span className="biome-spec-val">{biome.env}</span>
              </div>
            </div>
            <button 
              className={`btn-biome-select ${activeBiome === biome.id ? 'active' : ''}`}
              onClick={() => setActiveBiome(activeBiome === biome.id ? null : biome.id)}
            >
              <span>{biome.buttonLabel}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Active Filter Result / No Data Yet Box */}
      <div className="no-data-display" id="specimensResults" style={{ display: activeBiome ? 'block' : 'none' }}>
        <div className="no-data-icon">
          {activeBiome && biomes.find(b => b.id === activeBiome)?.icon}
        </div>
        <h3 className="no-data-title">No Data Yet ({activeBiome && biomes.find(b => b.id === activeBiome)?.resultTitle})</h3>
        <p className="no-data-text" id="noDataMessage">
          Chúng tôi đang biên soạn hồ sơ thực vật học cho nhóm <strong>{activeBiome && biomes.find(b => b.id === activeBiome)?.resultTitle}</strong>. Dữ liệu sẽ sẵn sàng ngay sau khi hoàn thành kết nối cơ sở dữ liệu MongoDB và API.
        </p>
        <div className="no-data-badge">
          <span>⚡ Product Status: No Data Yet (Chưa Hoàn Thành Sản Phẩm)</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/gallery" className="btn-hero-primary" style={{ display: 'inline-flex', padding: '14px 32px', fontSize: '0.95rem', gap: '10px' }}>
          <span>Chuyển Sang Trang Gallery Riêng (Xem Bộ Lọc) →</span>
        </Link>
      </div>
    </main>
  );
};

export default HomeBiomes;

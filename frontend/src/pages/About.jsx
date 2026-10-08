
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      

  {/*  Floating Navigation  */}
  <Navbar />

  {/*  Hero Section: Project Purpose & Philosophy  */}
  <section className="about-hero">
    <div className="about-kicker">
      <span className="kicker-dot"></span>
      <span>MISSION & PURPOSE // VỀ DỰ ÁN THE LIVING CANOPY</span>
    </div>

    <h1 className="about-hero-title">
      Mang Nhịp Đập Rừng Xanh Tươi Sáng Vào <span className="italic-accent">Không Gian Sống</span> Đô Thị.
    </h1>

    <p className="about-hero-subtitle">
      <strong>The Living Canopy & GreenNest</strong> ra đời từ khát vọng giải quyết triệt để vấn đề cây trồng nội thất bị héo úa do sai đới khí hậu. Chúng tôi kết hợp nghiên cứu khoa học thực vật chuẩn mực với kiến trúc Biophilic ngập tràn ánh nắng tự nhiên, giúp mỗi gia đình tự tin nuôi dưỡng một góc rừng an lành, rực rỡ và bền bỉ.
    </p>

    <div className="status-tag-banner">
      <span>🌿 Prototype MERN: Giao diện trực quan — Dữ liệu chuẩn bị kết nối MongoDB</span>
    </div>
  </section>

  {/*  Section 1: The Real-World Awakening Story  */}
  <section className="purpose-section">
    <div className="story-hero-grid">
      <div className="story-content-wrap">
        <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.16em', color: '#86efac', textTransform: 'uppercase', marginBottom: '12px' }}>
          NỖI TRĂN TRỞ CỦA NGƯỜI YÊU CÂY
        </div>
        <h2>Tại Sao Cây Mua Về Rất Dễ Tàn Phai Sau Vài Tuần?</h2>
        <div className="story-lead-quote">
          "Cây không chết vì thiếu tình thương; cây héo úa vì con người áp đặt khí hậu nhân tạo sai lệch lên nhịp sinh học tự nhiên của chúng."
        </div>
        <p className="story-paragraph">
          Tại các thành phố hiện đại, hơn 70% người yêu cây gặp phải cảm giác thất vọng khi chậu cây yêu thích bị úa vàng, thối rễ hoặc rụng lá chỉ sau một thời gian ngắn. Nguyên nhân không nằm ở kỹ năng, mà ở <strong>sự thiếu hụt dữ liệu khí hậu bản địa</strong>: mua cây ôn đới ẩm đặt trong phòng kín điều hòa khô khốc, hoặc ép cây nhiệt đới tắm nắng gay gắt qua kính kính chịu nhiệt.
        </p>
        <p className="story-paragraph">
          <strong>The Living Canopy</strong> được xây dựng như một <em>bộ quy chuẩn thực vật học mở</em>, phân loại cây trồng khoa học theo <strong>3 Đại Đới Khí Hậu</strong>, cung cấp tường minh từng thông số quang hợp, tưới ráo và tỷ lệ đất giá thể.
        </p>

        {/*  Stats Counter Row  */}
        <div className="story-stats-row">
          <div className="story-stat-card">
            <div className="stat-number">3 Đới</div>
            <div className="stat-caption">Hệ Sinh Thái Vi Khí Hậu</div>
          </div>
          <div className="story-stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-caption">Khoa Học Thực Vật Mở</div>
          </div>
          <div className="story-stat-card">
            <div className="stat-number">0 Hóa Chất</div>
            <div className="stat-caption">An Toàn Cho Trẻ & Thú Cưng</div>
          </div>
        </div>
      </div>

      <div className="story-image-wrap">
        <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80" alt="Nhà kính thực vật học ngập tràn ánh nắng mặt trời rực rỡ" />
        <div className="story-image-overlay">
          <span className="story-badge-floating">☀️ Viện Nghiên Cứu & Nhà Kính</span>
          <span className="story-caption-text">Mô hình nhà kính đối tác bảo tồn nguồn gen thực vật tại Đà Lạt</span>
        </div>
      </div>
    </div>

    {/*  3 Core Purpose Pillars Bento Grid  */}
    <div className="purpose-bento-grid">
      
      {/*  Pillar 1  */}
      <div className="purpose-card">
        <span className="purpose-card-num">01</span>
        <div className="purpose-icon-box">🌴</div>
        <h3 className="purpose-title">Chuẩn Hóa Theo 3 Đới Khí Hậu</h3>
        <p className="purpose-text">
          Chấm dứt việc nuôi cây bằng cảm tính. Chúng tôi xây dựng ma trận phân loại dựa trên nhiệt độ (°C) và độ ẩm không khí (%): <strong>Đới Nóng (Tropical)</strong>, <strong>Đới Ôn Hòa & Cận Nhiệt (Subtropical)</strong> và <strong>Đới Khô Hạn (Arid)</strong>.
        </p>
        <ul className="purpose-key-points">
          <li><span className="bullet">✓</span> Định vị đúng độ ẩm tự nhiên của phòng</li>
          <li><span className="bullet">✓</span> Ngăn ngừa thối rễ do sốc nhiệt đột ngột</li>
          <li><span className="bullet">✓</span> Tối ưu biên độ nhiệt độ ngày và đêm</li>
        </ul>
      </div>

      {/*  Pillar 2  */}
      <div className="purpose-card">
        <span className="purpose-card-num">02</span>
        <div className="purpose-icon-box">🔬</div>
        <h3 className="purpose-title">Chỉ Dẫn Khoa Học Minh Bạch</h3>
        <p className="purpose-text">
          Số hóa toàn bộ kiến thức hàn lâm thành chỉ dẫn dễ áp dụng: Cường độ sáng Foot-Candle (FC), chu kỳ đất khô giữa hai lần tưới, thành phần giá thể thoát nước (Perlite, vỏ thông) và cảnh báo Pet-Safe cho mèo, chó.
        </p>
        <ul className="purpose-key-points">
          <li><span className="bullet">✓</span> Đo lường ánh sáng tán xạ khoa học</li>
          <li><span className="bullet">✓</span> Giá thể hữu cơ vô trùng chống nấm mốc</li>
          <li><span className="bullet">✓</span> An toàn tuyệt đối cho trẻ nhỏ & thú nuôi</li>
        </ul>
      </div>

      {/*  Pillar 3  */}
      <div className="purpose-card">
        <span className="purpose-card-num">03</span>
        <div className="purpose-icon-box">☀️</div>
        <h3 className="purpose-title">Kiến Trúc Sinh Thái Tươi Sáng</h3>
        <p className="purpose-text">
          Áp dụng triết lý <strong>Biophilic Design</strong> để đưa mảng xanh tự nhiên vào kiến trúc hiện đại. Cây xanh không chỉ để ngắm mà là một thành viên thanh lọc bụi mịn, điều hòa vi khí hậu và nuôi dưỡng nguồn năng lượng tích cực cho tâm hồn.
        </p>
        <ul className="purpose-key-points">
          <li><span className="bullet">✓</span> Bừng sáng các góc nhà thiếu ánh sáng</li>
          <li><span className="bullet">✓</span> Giảm căng thẳng tinh thần sau giờ làm việc</li>
          <li><span className="bullet">✓</span> Tạo thói quen sống chậm hòa vào tự nhiên</li>
        </ul>
      </div>

    </div>
  </section>

  {/*  Section 2: Botanist Profiles — Bright, Sunlit & Passionate  */}
  <section className="botanists-section">
    <div className="section-header-centered">
      <div className="section-subkicker">
        <span>🌱</span>
        <span>SCIENTIFIC CURATORS & FIELD RESEARCHERS</span>
      </div>
      <h2 className="section-heading-lg">Đội Ngũ Nhà Thực Vật Học</h2>
      <p className="section-desc-light">
        Gặp gỡ những chuyên gia tâm huyết luôn làm việc trực tiếp tại các nhà kính ngập tràn ánh nắng và các vùng rừng nguyên sinh, bảo tồn nguồn gen thực vật và xây dựng hệ thống cẩm nang cho The Living Canopy.
      </p>
    </div>

    <div className="botanists-grid">
      
      {/*  Botanist 1: Elena Vũ  */}
      <article className="botanist-card">
        <div className="botanist-avatar-wrap" onClick={() => {}}>
          <img src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80" alt="TS. Elena Vũ trong nhà kính ngập nắng ấm nhiệt đới" className="botanist-img" />
          <div className="botanist-img-fade"></div>
          <span className="botanist-sun-badge">☀️ NẮNG TỰ NHIÊN</span>
          <span className="botanist-badge">🌴 Đới Nóng Nhiệt Đới</span>
        </div>
        <div className="botanist-info-body">
          <h3 className="botanist-name">TS. Elena Vũ</h3>
          <div className="botanist-role">Trưởng Ban Phân Loại Thực Vật Học Nhiệt Đới</div>
          <p className="botanist-bio">
            Hơn 12 năm nghiên cứu các dòng họ Ráy (Araceae) tại rừng mưa nhiệt đới Đông Nam Á. Cô chuyên sâu về khả năng đón ánh sáng tán xạ của lá xẻ Monstera và Philodendron trong căn hộ.
          </p>
          <div className="botanist-quote">
            "Mỗi phiến lá xẻ là một kiệt tác tiến hóa để đón trọn vẹn từng giọt nắng sớm mai."
          </div>
        </div>
      </article>

      {/*  Botanist 2: Alexandre Phạm  */}
      <article className="botanist-card">
        <div className="botanist-avatar-wrap" onClick={() => {}}>
          <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" alt="Alexandre Phạm kiểm tra cấu trúc lá dương xỉ trong nắng mai" className="botanist-img" />
          <div className="botanist-img-fade"></div>
          <span className="botanist-sun-badge">☀️ THỰC ĐỊA MAI SỚM</span>
          <span className="botanist-badge">🌲 Đới Ôn Hòa & Cận Nhiệt</span>
        </div>
        <div className="botanist-info-body">
          <h3 className="botanist-name">Alexandre Phạm</h3>
          <div className="botanist-role">Chuyên Gia Sinh Thái Cao Nguyên & Dương Xỉ</div>
          <p className="botanist-bio">
            Tốt nghiệp Đại học Lâm Nghiệp, phụ trách nghiên cứu thực vật vùng ôn hòa và sương mù. Anh sáng tạo ra các công thức giá thể giữ ẩm thoáng khí giúp dương xỉ sinh trưởng tốt trong phòng điều hòa.
          </p>
          <div className="botanist-quote">
            "Cây đới mát cần sự luân chuyển gió trong lành hơn là những gáo nước đẫm úng."
          </div>
        </div>
      </article>

      {/*  Botanist 3: Kỹ Sư Mai Linh  */}
      <article className="botanist-card">
        <div className="botanist-avatar-wrap" onClick={() => {}}>
          <img src="https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80" alt="Kỹ sư Mai Linh mỉm cười trong phòng ươm mầm ngập nắng sáng" className="botanist-img" />
          <div className="botanist-img-fade"></div>
          <span className="botanist-sun-badge">☀️ VƯỜN ƯƠM XANH</span>
          <span className="botanist-badge">🔬 Bệnh Học Cây Trồng</span>
        </div>
        <div className="botanist-info-body">
          <h3 className="botanist-name">Kỹ Sư Mai Linh</h3>
          <div className="botanist-role">Chuyên Gia Bệnh Học Cây Trồng & Giá Thể Hữu Cơ</div>
          <p className="botanist-bio">
            Nghiên cứu hệ vi sinh vật vùng rễ (Rhizosphere) và phương pháp kiểm soát nhện đỏ bằng chế phẩm sinh học tự nhiên, bảo đảm an toàn tuyệt đối cho gia đình có trẻ em và thú cưng.
          </p>
          <div className="botanist-quote">
            "Bộ rễ khỏe mạnh quyết định 90% vẻ rực rỡ và sức sống bền bỉ của phiến lá."
          </div>
        </div>
      </article>

      {/*  Botanist 4: GS. Daniel Lee  */}
      <article className="botanist-card">
        <div className="botanist-avatar-wrap" onClick={() => {}}>
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" alt="GS Daniel Lee nghiên cứu thực vật đới khô hạn trong phòng thí nghiệm kính sáng" className="botanist-img" />
          <div className="botanist-img-fade"></div>
          <span className="botanist-sun-badge">☀️ ĐỚI KHÔ HẠN</span>
          <span className="botanist-badge">🏜️ Bán Hoang Mạc & Sen Đá</span>
        </div>
        <div className="botanist-info-body">
          <h3 className="botanist-name">GS. Daniel Lee</h3>
          <div className="botanist-role">Cố Vấn Sinh Học Thực Vật Mọng Nước & Chịu Hạn</div>
          <p className="botanist-bio">
            Chuyên gia hàng đầu về cơ chế quang hợp CAM ở cây mọng nước và xương rồng. Ông cung cấp phác đồ chiếu sáng quang phổ đầy đủ giúp cây phát triển tại bàn làm việc thiếu nắng.
          </p>
          <div className="botanist-quote">
            "Sức sống mãnh liệt của cây sa mạc dạy chúng ta bài học kiên cường giữa khắc nghiệt."
          </div>
        </div>
      </article>

    </div>
  </section>

  {/*  Section 3: Bright Lush Flora Showcase (Hình ảnh tươi sáng về cây cối)  */}
  <section className="lush-gallery-section">
    <div className="section-header-centered">
      <div className="section-subkicker">
        <span>☀️</span>
        <span>SUNLIT CANOPY & LUSH BOTANICAL SANCTUARY</span>
      </div>
      <h2 className="section-heading-lg">Thiên Nhiên Tươi Sáng & Cây Cối Rực Rỡ</h2>
      <p className="section-desc-light">
        Ngắm nhìn sức sống mãnh liệt của thực vật học dưới ánh nắng chan hòa tại các vườn ươm, nhà kính sinh thái và không gian sống xanh đương đại. Nhấp vào bất kỳ ảnh nào để phóng to chi tiết.
      </p>
    </div>

    {/*  Filter Pills for Gallery  */}
    <div className="gallery-filter-tabs">
      <button className="gallery-tab-btn active" onClick={() => {}}>Tất Cả Khung Cảnh (8)</button>
      <button className="gallery-tab-btn" onClick={() => {}}>🌴 Đới Nóng & Lá Rộng</button>
      <button className="gallery-tab-btn" onClick={() => {}}>🌲 Đới Ôn Hòa & Rừng Mát</button>
      <button className="gallery-tab-btn" onClick={() => {}}>🏜️ Đới Khô Hạn & Sen Đá</button>
      <button className="gallery-tab-btn" onClick={() => {}}>🏡 Không Gian Sống Biophilic</button>
    </div>

    <div className="lush-mosaic-grid" id="mosaicGrid">
      
      {/*  Item 1 (Wide): Nắng vàng rọi qua tán lá nhiệt đới  */}
      <div className="mosaic-item span-2" data-cat="tropical" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80" alt="Lá xanh mướt nhiệt đới tắm trong nắng ấm ban mai" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🌴 ĐỚI NÓNG // 28°C • 80% ẨM</span>
          <h4 className="mosaic-caption">Ánh Sáng Tán Xạ Qua Tán Lá Rộng</h4>
          <p className="mosaic-subtext">Cường độ 1,500 FC lý tưởng cho quang hợp diệp lục</p>
        </div>
      </div>

      {/*  Item 2: Cây mọng nước dưới nắng ấm rực rỡ  */}
      <div className="mosaic-item" data-cat="arid" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80" alt="Sen đá tắm nắng ấm rạng ngời" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🏜️ ĐỚI KHÔ HẠN // CAM</span>
          <h4 className="mosaic-caption">Vườn Sen Đá Đón Nắng</h4>
          <p className="mosaic-subtext">Giá thể sỏi thoáng khí 100%</p>
        </div>
      </div>

      {/*  Item 3: Nhà kính bảo tồn rực rỡ nắng sớm  */}
      <div className="mosaic-item" data-cat="biophilic" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80" alt="Nhà kính bảo tồn giống cây quý trong ánh sáng tự nhiên" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🏡 NHÀ KÍNH BẢO TỒN</span>
          <h4 className="mosaic-caption">Vòm Kính Đón Sáng Toàn Phần</h4>
          <p className="mosaic-subtext">Hệ thống phun sương vi khí hậu tự động</p>
        </div>
      </div>

      {/*  Item 4: Không gian nội thất Biophilic tươi sáng  */}
      <div className="mosaic-item" data-cat="biophilic" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Phòng khách kiến trúc Biophilic ngập tràn ánh nắng và cây xanh" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🏡 BIOPHILIC LIVING</span>
          <h4 className="mosaic-caption">Ốc Đảo Xanh Phòng Khách</h4>
          <p className="mosaic-subtext">Thanh lọc không khí và giảm bức xạ điện từ</p>
        </div>
      </div>

      {/*  Item 5 (Wide): Monstera Deliciosa phiến lá xẻ hoàn mỹ  */}
      <div className="mosaic-item span-2" data-cat="tropical" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80" alt="Monstera Deliciosa xẻ tự nhiên dưới ánh nắng vàng" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🌴 MONSTERA DELICIOSA // HỌ RÁY</span>
          <h4 className="mosaic-caption">Bản Mẫu Monstera Thuần Khiết</h4>
          <p className="mosaic-subtext">Các lỗ xẻ đón nắng tầng dưới trong rừng nhiệt đới</p>
        </div>
      </div>

      {/*  Item 6: Dương xỉ đới ôn hòa trong sương mai  */}
      <div className="mosaic-item" data-cat="subtropical" onClick={() => {}}>
        <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" alt="Dương xỉ đón nắng sớm trong rừng ôn hòa" />
        <div className="mosaic-overlay">
          <span className="mosaic-tag">🌲 ĐỚI ÔN HÒA // 18°C</span>
          <h4 className="mosaic-caption">Thảm Dương Xỉ Sương Mai</h4>
          <p className="mosaic-subtext">Độ ẩm cao & luân chuyển gió liên tục</p>
        </div>
      </div>

    </div>
  </section>

  {/*  Section 4: Call to Action — Explore Gallery & Connect  */}
  <section className="cta-explore-banner">
    <div className="cta-explore-inner">
      <div style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.18em', color: '#86efac', textTransform: 'uppercase', marginBottom: '12px' }}>
        BƯỚC TIẾP THEO TRONG HÀNH TRÌNH
      </div>
      <h2>Sẵn Sàng Kiến Tạo Không Gian Xanh Của Riêng Bạn?</h2>
      <p>
        Khám phá kho thư viện mẫu cây đã được phân loại theo 3 đại đới khí hậu trên trang Gallery, hoặc trở về trang chủ để tìm kiếm cây theo điều kiện phòng của bạn.
      </p>
      <div className="cta-btn-group">
        <a href="gallery.html" className="btn-cta-primary">Khám Phá Thư Viện Gallery →</a>
        <a href="index.html" className="btn-cta-secondary">Về Trang Chủ Tổng Quan</a>
      </div>
    </div>
  </section>

  {/*  Minimal Luxury Footer  */}
  <Footer />

  {/*  Lightbox Modal Component  */}
  <div className="lightbox-modal" id="lightboxModal" onClick={() => {}}>
    <div className="lightbox-content-box" onClick={() => {}}>
      <button className="lightbox-close-btn" onClick={() => {}}>✕</button>
      <div className="lightbox-img-holder">
        <img id="lightboxImg" src="" alt="Phóng to ảnh" />
      </div>
      <div className="lightbox-details">
        <div>
          <h3 className="lightbox-title" id="lightboxTitle">Tiêu đề ảnh</h3>
          <p className="lightbox-desc" id="lightboxDesc">Mô tả chi tiết ảnh</p>
        </div>
        <button className="btn-back-home" style={{ padding: '8px 18px', fontSize: '0.82rem' }} onClick={() => {}}>Đóng</button>
      </div>
    </div>
  </div>

  {/*  Interactive JavaScript  */}
  


    </>
  );
};

export default About;

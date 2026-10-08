
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  return (
    <>
      

  {/*  Background Nature Layers with Cinematic Vignette Fade  */}
  <div className="nature-bg-layer"></div>
  <div className="nature-fade-overlay"></div>
  <div className="ambient-glow-circle"></div>

  {/*  Top Navigation  */}
  <header className="top-nav-bar">
    <a href="index.html" className="brand-link" title="The Living Canopy">
      <svg className="brand-svg" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C9.5 2 4.5 7.5 4.5 14C4.5 20.5 10 26 16 30C22 26 27.5 20.5 27.5 14C27.5 7.5 22.5 2 16 2ZM16 25C12 21.5 8 18 8 14C8 9.5 11.5 6 16 6C20.5 6 24 9.5 24 14C24 18 20 21.5 16 25Z" fill="currentColor" fillOpacity="0.3"/>
        <path d="M16 8C14 11 11 14 11 17C11 19.8 13.2 22 16 22C18.8 22 21 19.8 21 17C21 14 18 11 16 8Z" fill="currentColor"/>
        <circle cx="16" cy="17" r="2.5" fill="#ffffff"/>
      </svg>
      <span className="brand-name">The Living Canopy</span>
    </a>

    <a href="index.html" className="btn-return-home">
      <span>← Về Trang Chủ</span>
    </a>
  </header>

  {/*  Register Glassmorphic Card  */}
  <main className="auth-container">
    <div className="auth-header">
      <div className="auth-pill-badge">
        <span className="auth-pill-dot"></span>
        <span>KHỞI ĐẦU HÀNH TRÌNH XANH</span>
      </div>
      <h1 className="auth-title">Đăng Ký Thành Viên</h1>
      <p className="auth-subtitle">Tạo tài khoản GreenNest để lưu giữ và chăm sóc bộ sưu tập cây trồng chuẩn hóa của bạn.</p>
    </div>

    {/*  Continue with Google / Gmail  */}
    <button type="button" className="btn-google-auth" id="btnGoogleRegister" onClick={() => {}}>
      <svg className="google-icon-svg" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
        <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.1-.7-.3-1.5-.3-2.4l.3-3z"/>
        <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"/>
      </svg>
      <span>Đăng Ký Nhanh Với Google / Gmail</span>
    </button>

    <div className="auth-divider">
      <span>Hoặc điền thông tin chi tiết</span>
    </div>

    {/*  Registration Form  */}
    <form className="auth-form" id="registerForm" onSubmit={(e) => e.preventDefault()}>
      
      <div className="form-group">
        <label htmlFor="regName" className="form-label">Họ và Tên</label>
        <div className="input-wrapper">
          <input type="text" id="regName" className="input-field" placeholder="Ví dụ: Hoàng Minh Thảo" required value="Hoàng Minh Thảo" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="regEmail" className="form-label">Địa chỉ Email</label>
        <div className="input-wrapper">
          <input type="email" id="regEmail" className="input-field" placeholder="vi-du@domain.com" required value="minhthao.botany@gmail.com" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="regPassword" className="form-label">Mật khẩu</label>
        <div className="input-wrapper">
          <input type="password" id="regPassword" className="input-field" placeholder="Tối thiểu 8 ký tự" required value="GreenCanopy2026" />
          <button type="button" className="input-icon-btn" onClick={() => {}} title="Hiện/Ẩn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/*  Biome of Interest (Option 1 Integration)  */}
      <div className="form-group">
        <div className="biome-choice-title">Đới khí hậu bạn muốn tập trung chăm sóc:</div>
        <div className="biome-radio-group">
          <label className="biome-radio-label selected" onClick={() => {}}>
            <input type="radio" name="preferredBiome" value="tropical" checked />
            <span className="biome-icon">🌴</span>
            <span className="biome-name">Đới Nóng</span>
          </label>
          <label className="biome-radio-label" onClick={() => {}}>
            <input type="radio" name="preferredBiome" value="subtropical" />
            <span className="biome-icon">🌲</span>
            <span className="biome-name">Cận Nhiệt</span>
          </label>
          <label className="biome-radio-label" onClick={() => {}}>
            <input type="radio" name="preferredBiome" value="arid" />
            <span className="biome-icon">🏜️</span>
            <span className="biome-name">Khô Hạn</span>
          </label>
        </div>
      </div>

      <label className="checkbox-wrap">
        <input type="checkbox" id="agreeTerms" checked required />
        <span>Tôi đồng ý với cam kết bảo tồn sinh thái và tuân thủ các nguyên tắc canh tác an toàn không hóa chất độc hại.</span>
      </label>

      <button type="submit" className="btn-auth-submit" id="submitRegBtn">
        <span>Tạo Tài Khoản & Vào Hệ Sinh Thái →</span>
      </button>

      {/*  Feedback Toast  */}
      <div className="login-status-toast" id="regToast">
        <span>🌿</span>
        <div id="regToastMsg">Đăng ký thành công! Đang chuyển hướng về Trang Chủ...</div>
      </div>

    </form>

    <div className="auth-footer">
      Đã có tài khoản GreenNest? 
      <a href="login.html">Đăng nhập tại đây →</a>
    </div>
  </main>

  <div className="auth-page-credits">
    © 2026 The Living Canopy & GreenNest Consortium. Bảo lưu mọi quyền.
  </div>

  

    </>
  );
};

export default Register;

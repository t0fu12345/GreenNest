import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import contactApi from '../services/contactApi';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Tư vấn chọn cây cảnh cho không gian sống',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn.', 'error');
      return;
    }

    try {
      setLoading(true);
      await contactApi.sendContact(formData);
      showToast('Cảm ơn bạn! Tin nhắn tư vấn đã được gửi thành công đến đội ngũ chuyên gia GreenNest.', 'success');
      setFormData({
        fullName: '',
        email: '',
        subject: 'Tư vấn chọn cây cảnh cho không gian sống',
        message: ''
      });
    } catch (err) {
      showToast(err.message || 'Không thể gửi tin nhắn. Vui lòng thử lại sau ít phút.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#07100b', color: '#f0fdf4' }}>
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '24px',
          zIndex: 9999,
          background: toastType === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(239, 68, 68, 0.95)',
          color: '#041008',
          padding: '12px 24px',
          borderRadius: '9999px',
          fontWeight: 600,
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1, padding: '140px 24px 80px', maxWidth: '1080px', width: '100%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(14, 30, 22, 0.85)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#86efac',
            marginBottom: '16px'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%' }}></span>
            <span>GET IN TOUCH // BOTANICAL CONSULTATION</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Liên Hệ & Tư Vấn Thực Vật
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.65 }}>
            Bạn đang cần tư vấn cây trồng phù hợp với hướng ban công, vi khí hậu căn hộ, hay thắc mắc về bệnh lý của cây? Hãy gửi tin nhắn cho các chuyên gia GreenNest.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          background: 'rgba(14, 30, 22, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
        }}>
          {/* Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', color: '#ffffff' }}>
              GreenNest Conservatory Sanctuary
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Không gian thực vật học số và trung tâm bảo tồn các dòng cây nhiệt đới quý hiếm. Chúng tôi luôn sẵn sàng hỗ trợ bạn kiến tạo không gian sống xanh biophilic.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>📍</span>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', fontWeight: 600 }}>Địa chỉ Vườn Ươm</div>
                  <div style={{ fontSize: '0.92rem', color: '#ffffff' }}>Khu Công Nghệ Sinh Học, Hòa Lạc, Hà Nội</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>📧</span>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', fontWeight: 600 }}>Email Hỗ Trợ</div>
                  <div style={{ fontSize: '0.92rem', color: '#ffffff' }}>support@greennest.vn</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>🌿</span>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#86efac', textTransform: 'uppercase', fontWeight: 600 }}>Giờ Tiếp Đón Tham Quan</div>
                  <div style={{ fontSize: '0.92rem', color: '#ffffff' }}>Thứ Hai – Thứ Bảy: 08:30 – 17:30</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Họ và Tên <span style={{ color: '#22c55e' }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="VD: Nguyễn Văn An"
                required
                style={{
                  width: '100%',
                  background: 'rgba(5, 13, 8, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Địa chỉ Email <span style={{ color: '#22c55e' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="VD: an.nguyen@gmail.com"
                required
                style={{
                  width: '100%',
                  background: 'rgba(5, 13, 8, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Chủ Đề Cần Hỗ Trợ
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: '100%',
                  background: 'rgba(5, 13, 8, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              >
                <option value="Tư vấn chọn cây cảnh cho không gian sống">Tư vấn chọn cây cảnh cho không gian sống</option>
                <option value="Chẩn đoán bệnh lý & hướng dẫn chăm sóc cây">Chẩn đoán bệnh lý & hướng dẫn chăm sóc cây</option>
                <option value="Hợp tác chuyên gia & cung cấp vườn ươm">Hợp tác chuyên gia & cung cấp vườn ươm</option>
                <option value="Đóng góp ý kiến cho hệ sinh thái GreenNest">Đóng góp ý kiến cho hệ sinh thái GreenNest</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>
                Nội Dung Tin Nhắn <span style={{ color: '#22c55e' }}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Nhập chi tiết yêu cầu tư vấn hoặc tình trạng cây của bạn..."
                required
                style={{
                  width: '100%',
                  background: 'rgba(5, 13, 8, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                color: '#041008',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
                marginTop: '8px'
              }}
            >
              {loading ? 'Đang gửi tin nhắn...' : 'Gửi Tin Nhắn Tư Vấn →'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

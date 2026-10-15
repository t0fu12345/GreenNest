import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Tự động đính kèm JWT Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('greennest_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Chuẩn hóa dữ liệu trả về và xử lý lỗi tập trung
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý khi token hết hạn hoặc không hợp lệ (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('greennest_token');
      localStorage.removeItem('token');
      localStorage.removeItem('greennest_user');
      // Không tự chuyển trang nếu đang ở trang login/register
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }
    }

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message 
      || 'Đã xảy ra lỗi khi kết nối máy chủ.';

    return Promise.reject({
      status: error.response?.status,
      code: error.response?.data?.error?.code || 'NETWORK_ERROR',
      message,
      details: error.response?.data?.error?.details || null,
      raw: error,
    });
  }
);

export default apiClient;

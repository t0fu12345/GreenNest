import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Automatically attach JWT Bearer Token
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

// Response Interceptor: Normalize response data and centralized error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle expired or invalid token (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('greennest_token');
      localStorage.removeItem('token');
      localStorage.removeItem('greennest_user');
      // Do not redirect automatically if currently on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }
    }

    const message = error.response?.data?.error?.message 
      || error.response?.data?.message 
      || error.message 
      || 'An error occurred while connecting to the server.';

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

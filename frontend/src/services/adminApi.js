import apiClient from './apiClient';

export const adminApi = {
  getDashboardStats: () => apiClient.get('/admin/dashboard/stats'),
};

export default adminApi;

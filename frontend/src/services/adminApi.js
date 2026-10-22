import apiClient from './apiClient';

export const adminApi = {
  getDashboardStats: () => apiClient.get('/admin/dashboard/stats'),
  getUsers: (params = {}) => apiClient.get('/admin/users', { params }),
  updateUserRole: (id, role) => apiClient.patch(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
};

export default adminApi;

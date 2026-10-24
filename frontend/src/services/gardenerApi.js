import apiClient from './apiClient';
import normalizeListResponse from './normalizeListResponse';

export const gardenerApi = {
  getGardeners: async () => normalizeListResponse(await apiClient.get('/gardeners')),
  getGardenerDetail: (id) => apiClient.get(`/gardeners/${id}`),
  createGardener: (data) => apiClient.post('/gardeners', data),
  updateGardener: (id, data) => apiClient.put(`/gardeners/${id}`, data),
  deleteGardener: (id) => apiClient.delete(`/gardeners/${id}`),
};

export default gardenerApi;

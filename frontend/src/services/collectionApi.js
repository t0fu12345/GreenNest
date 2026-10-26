import apiClient from './apiClient';
import normalizeListResponse from './normalizeListResponse';

export const collectionApi = {
  getCollections: async (params = {}) => normalizeListResponse(await apiClient.get('/collections', { params })),
  getCollectionDetail: (idOrSlug) => apiClient.get(`/collections/${idOrSlug}`),
  createCollection: (data) => apiClient.post('/collections', data),
  updateCollection: (id, data) => apiClient.put(`/collections/${id}`, data),
  deleteCollection: (id) => apiClient.delete(`/collections/${id}`),
};

export default collectionApi;

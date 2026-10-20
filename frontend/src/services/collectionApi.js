import apiClient from './apiClient';

export const collectionApi = {
  getCollections: (params = {}) => apiClient.get('/collections', { params }),
  getCollectionDetail: (idOrSlug) => apiClient.get(`/collections/${idOrSlug}`),
  createCollection: (data) => apiClient.post('/collections', data),
  updateCollection: (id, data) => apiClient.put(`/collections/${id}`, data),
  deleteCollection: (id) => apiClient.delete(`/collections/${id}`),
};

export default collectionApi;

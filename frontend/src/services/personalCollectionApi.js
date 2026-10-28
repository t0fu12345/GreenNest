import apiClient from './apiClient';

export const personalCollectionApi = {
  getCollections: () => apiClient.get('/personal-collections'),
  createCollection: (data) => apiClient.post('/personal-collections', data),
  updateCollection: (id, data) => apiClient.put(`/personal-collections/${id}`, data),
  deleteCollection: (id) => apiClient.delete(`/personal-collections/${id}`),
  addPlant: (id, plantId) => apiClient.post(`/personal-collections/${id}/plants`, { plantId }),
  removePlant: (id, plantId) => apiClient.delete(`/personal-collections/${id}/plants/${plantId}`),
};

export default personalCollectionApi;

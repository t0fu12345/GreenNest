import apiClient from './apiClient';
import normalizeListResponse from './normalizeListResponse';

export const plantApi = {
  getPlants: async (params = {}) => normalizeListResponse(await apiClient.get('/plants', { params })),
  getPlantDetail: (idOrSlug) => apiClient.get(`/plants/${idOrSlug}`),
  getRelatedPlants: (id) => apiClient.get(`/plants/${id}/related`),
  createPlant: (data) => apiClient.post('/plants', data),
  updatePlant: (id, data) => apiClient.put(`/plants/${id}`, data),
  deletePlant: (id) => apiClient.delete(`/plants/${id}`),
  getFilters: () => apiClient.get('/metadata/filters'),
};

export default plantApi;

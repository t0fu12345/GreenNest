import apiClient from './apiClient';

export const gardenApi = {
  getMyGarden: () => apiClient.get('/garden'),
  syncGarden: (plantIds) => apiClient.post('/garden/sync', { plantIds }),
  addPlant: (plantId) => apiClient.post('/garden', { plantId }),
  removePlant: (id) => apiClient.delete(`/garden/${id}`),
  updateChecklist: (payload) => apiClient.put('/garden/checklist', payload),
  resetChecklist: () => apiClient.post('/garden/checklist/reset'),
};

export default gardenApi;

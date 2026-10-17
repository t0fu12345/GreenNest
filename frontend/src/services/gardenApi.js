import apiClient from './apiClient';

export const gardenApi = {
  getMyGarden: () => apiClient.get('/garden'),
  syncGarden: (plantIds) => apiClient.post('/garden/sync', { plantIds }),
  addPlant: (plantId, customNickname) => apiClient.post('/garden', { plantId, customNickname }),
  removePlant: (id) => apiClient.delete(`/garden/${id}`),
  updateChecklist: (payload) => apiClient.put('/garden/checklist', payload),
  resetChecklist: () => apiClient.post('/garden/checklist/reset'),
  toggleBookmark: (plantId) => apiClient.post('/garden/bookmarks/toggle', { plantId }),
};

export default gardenApi;

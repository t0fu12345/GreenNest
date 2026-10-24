import apiClient from './apiClient';
import normalizeListResponse from './normalizeListResponse';

export const galleryApi = {
  getGallery: async (params = {}) => normalizeListResponse(await apiClient.get('/gallery', { params })),
  likeImage: (id) => apiClient.post(`/gallery/${id}/like`),
  createGalleryItem: (data) => apiClient.post('/gallery', data),
  updateGalleryItem: (id, data) => apiClient.put(`/gallery/${id}`, data),
  deleteGalleryItem: (id) => apiClient.delete(`/gallery/${id}`),
};

export default galleryApi;

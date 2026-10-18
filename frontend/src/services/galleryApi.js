import apiClient from './apiClient';

export const galleryApi = {
  getGallery: (params = {}) => apiClient.get('/gallery', { params }),
  likeImage: (id) => apiClient.post(`/gallery/${id}/like`),
  createGalleryItem: (data) => apiClient.post('/gallery', data),
  deleteGalleryItem: (id) => apiClient.delete(`/gallery/${id}`),
};

export default galleryApi;

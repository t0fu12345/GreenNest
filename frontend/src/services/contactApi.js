import apiClient from './apiClient';
import normalizeListResponse from './normalizeListResponse';

export const contactApi = {
  sendContact: (data) => apiClient.post('/contact', data),
  getContacts: async (params = {}) => normalizeListResponse(await apiClient.get('/contact', { params })),
  updateContactStatus: (id, status) => apiClient.patch(`/contact/${id}/status`, { status }),
  deleteContact: (id) => apiClient.delete(`/contact/${id}`),
};

export default contactApi;

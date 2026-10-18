import apiClient from './apiClient';

export const contactApi = {
  sendContact: (data) => apiClient.post('/contact', data),
  getContacts: (params = {}) => apiClient.get('/contact', { params }),
  updateContactStatus: (id, status) => apiClient.patch(`/contact/${id}/status`, { status }),
  deleteContact: (id) => apiClient.delete(`/contact/${id}`),
};

export default contactApi;

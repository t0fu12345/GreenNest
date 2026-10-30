import apiClient from './apiClient';

export const chatbotApi = {
  /**
   * Send text message or image payload to AI Botanist
   * @param {Object} params
   * @param {string} params.message - Question or symptom description
   * @param {Object|null} params.image - { data: 'data:image/...;base64,...', mimeType: 'image/jpeg' }
   * @param {Array} params.history - Array of recent { role: 'user'|'model', text: string }
   * @returns {Promise<{ reply: string, suggestedPlants: Array, source: 'gemini'|'fallback' }>}
   */
  async sendMessage({ message = '', image = null, history = [] }) {
    const response = await apiClient.post(
      '/chatbot/message',
      {
        message,
        image,
        history
      },
      {
        timeout: 25000 // Extended 25s timeout for multimodal AI image analysis
      }
    );

    // apiClient response interceptor already returns response.data
    return response.data || response;
  }
};

export default chatbotApi;

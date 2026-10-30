import { describe, expect, it, vi, beforeEach } from 'vitest';
import apiClient from './apiClient';
import chatbotApi from './chatbotApi';

describe('chatbotApi Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('posts message payload with 25000ms timeout config', async () => {
    const mockResponse = {
      success: true,
      data: {
        reply: 'Cây của bạn có dấu hiệu thiếu nước',
        suggestedPlants: [],
        source: 'fallback'
      }
    };

    const postSpy = vi.spyOn(apiClient, 'post').mockResolvedValueOnce(mockResponse);

    const result = await chatbotApi.sendMessage({
      message: 'Lá cây bị héo',
      image: null,
      history: []
    });

    expect(postSpy).toHaveBeenCalledWith(
      '/chatbot/message',
      {
        message: 'Lá cây bị héo',
        image: null,
        history: []
      },
      expect.objectContaining({ timeout: 25000 })
    );

    expect(result).toEqual(mockResponse.data);
  });
});

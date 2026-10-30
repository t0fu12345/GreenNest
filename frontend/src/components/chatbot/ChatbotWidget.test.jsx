import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import chatbotApi from '../../services/chatbotApi';
import ChatbotWidget from './ChatbotWidget';

describe('ChatbotWidget Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const renderWidget = () =>
    render(
      <MemoryRouter>
        <ChatbotWidget />
      </MemoryRouter>
    );

  it('renders the floating trigger button by default in collapsed state', () => {
    renderWidget();
    const triggerBtn = screen.getByRole('button', { name: /ask ai botanist/i });
    expect(triggerBtn).toBeInTheDocument();
    expect(screen.queryByText(/greennest ai botanist/i)).not.toBeInTheDocument();
  });

  it('expands chat dialog when clicking trigger button and closes on close button', async () => {
    const user = userEvent.setup();
    renderWidget();

    const triggerBtn = screen.getByRole('button', { name: /ask ai botanist/i });
    await user.click(triggerBtn);

    expect(screen.getByRole('dialog', { name: /greennest ai botanist/i })).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close chat/i });
    await user.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /greennest ai botanist/i })).not.toBeInTheDocument();
  });

  it('sends user message, calls chatbotApi, and renders bot response with plant cards', async () => {
    const user = userEvent.setup();
    const mockReply = {
      reply: 'Lá cây bị vàng là do thừa nước.',
      suggestedPlants: [
        {
          _id: 'plant-1',
          specimenId: 'specimen-snake-plant',
          name: 'Snake Plant',
          scientificName: 'Sansevieria trifasciata',
          category: 'Foliage',
          image: '/images/plants/snake.jpg'
        }
      ],
      source: 'fallback'
    };

    vi.spyOn(chatbotApi, 'sendMessage').mockResolvedValueOnce(mockReply);

    renderWidget();
    await user.click(screen.getByRole('button', { name: /ask ai botanist/i }));

    const input = screen.getByPlaceholderText(/hỏi về chăm sóc cây, chẩn đoán bệnh/i);
    await user.type(input, 'Tại sao cây bị vàng lá?');
    await user.click(screen.getByRole('button', { name: /gửi tin nhắn/i }));

    expect(screen.getByText('Tại sao cây bị vàng lá?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Lá cây bị vàng là do thừa nước/i)).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
  });
});

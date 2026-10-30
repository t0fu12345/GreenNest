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

  it('renders the floating trigger button by default in collapsed state with hover tooltip', () => {
    renderWidget();
    const triggerBtn = screen.getByRole('button', { name: /ask ai botanist/i });
    expect(triggerBtn).toBeInTheDocument();
    expect(screen.getByText(/Have any questions\? Ask our AI plant expert now/i)).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: /greennest ai botanist/i })).not.toBeInTheDocument();
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
      reply: 'Yellow leaves are usually caused by overwatering.',
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

    const input = screen.getByPlaceholderText(/ask about plant care, diagnosis/i);
    await user.type(input, 'Why are my plant leaves turning yellow?');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Why are my plant leaves turning yellow?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Yellow leaves are usually caused by overwatering/i)).toBeInTheDocument();
      expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    });
  });
});

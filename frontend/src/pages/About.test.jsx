import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import About from './About';
import gardenerApi from '../services/gardenerApi';

vi.mock('../components/Navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../services/gardenerApi', () => ({
  default: { getGardeners: vi.fn() },
}));

describe('About botanists API state', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows an API error without rendering fallback botanists', async () => {
    gardenerApi.getGardeners.mockRejectedValue(new Error('Database offline'));

    render(<MemoryRouter><About /></MemoryRouter>);

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load botanists from the database.');
    expect(screen.queryByText('Dr. Elena Vance')).not.toBeInTheDocument();
  });
});

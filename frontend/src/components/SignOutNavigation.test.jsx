import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from './Navbar';
import User from '../pages/User';
import * as AuthContext from '../context/AuthContext';
import gardenApi from '../services/gardenApi';

describe('public sign out navigation', () => {
  const logout = vi.fn();

  beforeEach(() => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { name: 'Member', email: 'member@example.com', role: 'user' },
      isAuthenticated: true,
      logout,
    });
    vi.spyOn(gardenApi, 'getMyGarden').mockResolvedValue({ data: { garden: [] } });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    logout.mockClear();
  });

  it.each([
    ['navbar', Navbar],
    ['profile', User],
  ])('returns to Overview after signing out from %s', async (_label, Page) => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/user']}>
        <Routes>
          <Route path="/user" element={<Page />} />
          <Route path="/" element={<div>Overview destination</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getAllByRole('button', { name: 'Sign Out' }).at(-1));

    expect(logout).toHaveBeenCalledOnce();
    expect(screen.getByText('Overview destination')).toBeInTheDocument();
  });
});

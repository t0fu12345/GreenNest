import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import authApi from '../services/authApi';

vi.mock('../services/authApi', () => ({
  default: {
    getMe: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
  },
}));

const Probe = () => {
  const { isAuthenticated, loading } = useAuth();
  return <div>{loading ? 'loading' : isAuthenticated ? 'authenticated' : 'signed-out'}</div>;
};

const RegisterProbe = () => {
  const { register } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          const result = await register({
            name: 'Q',
            email: 'q@example.com',
            password: 'secret123',
          });
          setMessage(result.message);
        }}
      >
        Register probe
      </button>
      <span>{message}</span>
    </>
  );
};

describe('AuthProvider Atlas-only session restoration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = 'greennest_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    vi.clearAllMocks();
  });

  it('does not trust cached user data when Atlas-backed token validation fails', async () => {
    localStorage.setItem('greennest_token', 'stale-token');
    localStorage.setItem('greennest_user', JSON.stringify({ role: 'admin' }));
    localStorage.setItem('livingCanopyGardenPlants', JSON.stringify(['specimen-monstera']));
    localStorage.setItem('greenNest_user_collections', JSON.stringify({ guest: [] }));
    localStorage.setItem('greennest_remembered_email', 'member@example.com');
    authApi.getMe.mockRejectedValue({ code: 'NETWORK_ERROR', message: 'Atlas unavailable' });

    render(<AuthProvider><Probe /></AuthProvider>);

    await waitFor(() => expect(screen.getByText('signed-out')).toBeInTheDocument());
    expect(localStorage.getItem('greennest_token')).toBeNull();
    expect(localStorage.getItem('greennest_user')).toBeNull();
    expect(localStorage.getItem('livingCanopyGardenPlants')).toBeNull();
    expect(localStorage.getItem('greenNest_user_collections')).toBeNull();
    expect(localStorage.getItem('greennest_remembered_email')).toBe('member@example.com');
  });

  it('restores a session only from the profile returned by /auth/me', async () => {
    localStorage.setItem('greennest_token', 'valid-token');
    authApi.getMe.mockResolvedValue({
      data: {
        id: 'atlas-user-id',
        fullName: 'Atlas Member',
        email: 'atlas@example.com',
        role: 'user',
      },
    });

    render(<AuthProvider><Probe /></AuthProvider>);

    await waitFor(() => expect(screen.getByText('authenticated')).toBeInTheDocument());
    expect(authApi.getMe).toHaveBeenCalledOnce();
  });

  it('returns the first field-level registration error from the API', async () => {
    authApi.register.mockRejectedValue({
      status: 422,
      message: 'Registration validation failed',
      details: [{
        field: 'fullName',
        message: 'Full name is required and must be at least 2 characters',
      }],
    });
    const user = userEvent.setup();

    render(<AuthProvider><RegisterProbe /></AuthProvider>);
    await user.click(screen.getByRole('button', { name: /register probe/i }));

    await waitFor(() => {
      expect(screen.getByText('Full name is required and must be at least 2 characters')).toBeInTheDocument();
    });
  });
});

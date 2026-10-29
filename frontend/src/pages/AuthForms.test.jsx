import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as AuthContext from '../context/AuthContext';
import Login from './Login';
import Register from './Register';

const authValue = {
  login: vi.fn(),
  register: vi.fn(),
  STORAGE_KEYS: { REMEMBERED_EMAIL: 'greennest_remembered_email' },
};

const renderPage = (Page) => render(
  <MemoryRouter>
    <Page />
  </MemoryRouter>,
);

describe('authentication forms', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    authValue.login = vi.fn();
    authValue.register = vi.fn().mockResolvedValue({
      success: false,
      message: 'Unexpected registration call',
    });
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue(authValue);
  });

  it('does not offer a nickname field during registration', () => {
    renderPage(Register);

    expect(screen.queryByLabelText(/nickname/i)).not.toBeInTheDocument();
  });

  it('rejects a one-character full name before calling the backend', async () => {
    const user = userEvent.setup();
    renderPage(Register);

    await user.type(screen.getByLabelText(/full name/i), 'Q');
    await user.type(screen.getByLabelText(/email address/i), 'q@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(authValue.register).not.toHaveBeenCalled();
    expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
  });

  it.each([
    ['login', Login],
    ['register', Register],
  ])('renders the %s screen inside a scroll-safe auth shell', (_label, Page) => {
    const { container } = renderPage(Page);

    expect(container.firstElementChild).toHaveClass('auth-page-shell');
  });

  it.each([
    ['login', Login],
    ['register', Register],
  ])('does not render the malformed password icon path on %s', (_label, Page) => {
    const { container } = renderPage(Page);

    expect(container.querySelector('path[d="M1 12s4-8 11-8 11 8 11 8 -4 8 -11 8 -11-8z"]')).toBeNull();
  });
});

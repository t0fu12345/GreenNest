import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminRoute from '../../components/AdminRoute';
import Login from '../Login';
import * as AuthContext from '../../context/AuthContext';

vi.mock('../../context/NotificationContext', () => ({ useNotification: () => ({ showNotification: vi.fn() }) }));

describe('admin authentication navigation', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('redirects an anonymous visitor to login', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: null, token: null, isAdmin: false, isAuthenticated: false, loading: false });
    render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/login" element={<div>Login screen</div>} /><Route path="/admin" element={<AdminRoute><div>Admin area</div></AdminRoute>} /></Routes></MemoryRouter>);
    expect(screen.getByText('Login screen')).toBeInTheDocument();
  });

  it('blocks an authenticated standard user', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { email: 'member@example.com', role: 'user' }, token: 'token', isAdmin: false, isAuthenticated: true, loading: false });
    render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/admin" element={<AdminRoute><div>Admin area</div></AdminRoute>} /></Routes></MemoryRouter>);
    expect(screen.getByText(/403/)).toBeInTheDocument();
    expect(screen.queryByText('Admin area')).not.toBeInTheDocument();
  });

  it('renders the admin area for an administrator', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { email: 'admin@example.com', role: 'admin' }, token: 'token', isAdmin: true, isAuthenticated: true, loading: false });
    render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/admin" element={<AdminRoute><div>Admin area</div></AdminRoute>} /></Routes></MemoryRouter>);
    expect(screen.getByText('Admin area')).toBeInTheDocument();
  });

  it.each([
    ['administrator', { success: true, isAdmin: true, user: { name: 'Admin User', role: 'admin' } }, '/admin', 'Admin destination'],
    ['standard user', { success: true, isAdmin: false, user: { name: 'Garden Member', role: 'user' } }, '/', 'Home destination'],
  ])('sends a successful %s login to the correct destination', async (_label, result, path, destination) => {
    const login = vi.fn().mockResolvedValue(result);
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ login, isAuthenticated: false, isAdmin: false, user: null });
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/login']}><Routes><Route path="/login" element={<Login />} /><Route path={path} element={<div>{destination}</div>} /></Routes></MemoryRouter>);
    await user.type(screen.getByLabelText(/Your Nickname/i), 'greennest');
    await user.type(screen.getByLabelText(/^Password/i), 'secret123');
    await user.click(screen.getByRole('button', { name: /Sign In to Sanctuary/i }));
    await waitFor(() => expect(screen.getByText(destination)).toBeInTheDocument(), { timeout: 2500 });
  });
});

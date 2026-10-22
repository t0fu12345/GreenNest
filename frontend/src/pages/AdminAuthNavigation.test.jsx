import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AdminRoute from '../components/AdminRoute';
import Login from './Login';
import * as AuthContextModule from '../context/AuthContext';

// Mock Notification Context
vi.mock('../context/NotificationContext', () => ({
  useNotification: () => ({
    showNotification: vi.fn(),
  }),
}));

describe('Admin Authentication & Route Protection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AdminRoute Protection States', () => {
    it('redirects unauthenticated users to /login', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: null,
        token: null,
        isAdmin: false,
        isAuthenticated: false,
        loading: false,
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/login" element={<div>Trang Đăng Nhập</div>} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div>Khu Vực Quản Trị</div>
                </AdminRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Trang Đăng Nhập')).toBeInTheDocument();
      expect(screen.queryByText('Khu Vực Quản Trị')).not.toBeInTheDocument();
    });

    it('displays 403 Forbidden Screen for authenticated non-admin users', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { name: 'Normal User', email: 'user@example.com', role: 'user' },
        token: 'sample-user-token',
        isAdmin: false,
        isAuthenticated: true,
        loading: false,
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div>Khu Vực Quản Trị</div>
                </AdminRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText(/403/)).toBeInTheDocument();
      expect(screen.getByText(/Restricted Administrator Clearance/i)).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
      expect(screen.queryByText('Khu Vực Quản Trị')).not.toBeInTheDocument();
    });

    it('renders protected children for authorized admin users', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { name: 'Admin Master', email: 'admin@greennest.com', role: 'admin' },
        token: 'sample-admin-token',
        isAdmin: true,
        isAuthenticated: true,
        loading: false,
      });

      render(
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <div>Khu Vực Quản Trị GreenNest</div>
                </AdminRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Khu Vực Quản Trị GreenNest')).toBeInTheDocument();
      expect(screen.queryByText(/403/)).not.toBeInTheDocument();
    });
  });

  describe('Login Navigation Decisions', () => {
    it('redirects administrator to /admin after successful authentication', async () => {
      const mockLogin = vi.fn().mockResolvedValue({
        success: true,
        isAdmin: true,
        user: { name: 'Admin User', role: 'admin' },
      });

      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<div>Admin CMS Landing</div>} />
            <Route path="/" element={<div>Home Landing</div>} />
          </Routes>
        </MemoryRouter>
      );

      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/Your Nickname/i), 'admin');
      await user.type(screen.getByLabelText(/^Password/i), 'adminSecret123');

      await user.click(screen.getByRole('button', { name: /Sign In to Sanctuary/i }));

      expect(mockLogin).toHaveBeenCalledWith('admin', 'adminSecret123', true);

      await waitFor(() => {
        expect(screen.getByText('Admin CMS Landing')).toBeInTheDocument();
      }, { timeout: 2500 });
    });

    it('redirects standard member to / after successful authentication', async () => {
      const mockLogin = vi.fn().mockResolvedValue({
        success: true,
        isAdmin: false,
        user: { name: 'Member Jane', role: 'user' },
      });

      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        login: mockLogin,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<div>Admin CMS Landing</div>} />
            <Route path="/" element={<div>Home Landing</div>} />
          </Routes>
        </MemoryRouter>
      );

      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/Your Nickname/i), 'minhthao');
      await user.type(screen.getByLabelText(/^Password/i), 'memberSecret123');

      await user.click(screen.getByRole('button', { name: /Sign In to Sanctuary/i }));

      expect(mockLogin).toHaveBeenCalledWith('minhthao', 'memberSecret123', true);

      await waitFor(() => {
        expect(screen.getByText('Home Landing')).toBeInTheDocument();
      }, { timeout: 2500 });
    });
  });
});

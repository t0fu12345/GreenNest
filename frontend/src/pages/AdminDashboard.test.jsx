import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import AdminDashboard from './AdminDashboard';
import adminApi from '../services/adminApi';
import plantApi from '../services/plantApi';
import contactApi from '../services/contactApi';
import gardenerApi from '../services/gardenerApi';
import collectionApi from '../services/collectionApi';
import galleryApi from '../services/galleryApi';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'admin-1', name: 'Admin GreenNest', email: 'admin@greennest.com', role: 'admin' },
    token: 'jwt-token-sample',
    isAdmin: true,
    isAuthenticated: true,
    logout: vi.fn(),
  }),
}));

vi.mock('../services/adminApi', () => ({
  default: {
    getDashboardStats: vi.fn(),
    getUsers: vi.fn(),
    updateUserRole: vi.fn(),
    deleteUser: vi.fn(),
  },
}));

vi.mock('../services/plantApi', () => ({
  default: {
    getPlants: vi.fn(),
    createPlant: vi.fn(),
    updatePlant: vi.fn(),
    deletePlant: vi.fn(),
  },
}));

vi.mock('../services/contactApi', () => ({
  default: {
    getContacts: vi.fn(),
    updateContactStatus: vi.fn(),
    deleteContact: vi.fn(),
  },
}));

vi.mock('../services/gardenerApi', () => ({
  default: {
    getGardeners: vi.fn(),
    createGardener: vi.fn(),
    updateGardener: vi.fn(),
    deleteGardener: vi.fn(),
  },
}));

vi.mock('../services/collectionApi', () => ({
  default: {
    getCollections: vi.fn(),
    createCollection: vi.fn(),
    updateCollection: vi.fn(),
    deleteCollection: vi.fn(),
  },
}));

vi.mock('../services/galleryApi', () => ({
  default: {
    getGallery: vi.fn(),
    createGalleryItem: vi.fn(),
    updateGalleryItem: vi.fn(),
    deleteGalleryItem: vi.fn(),
  },
}));

describe('AdminDashboard Controller & Panels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(adminApi.getDashboardStats).mockResolvedValue({
      data: {
        totalPlants: 20,
        publishedPlants: 18,
        draftPlants: 2,
        totalGardeners: 4,
        totalCollections: 4,
        totalGalleryImages: 20,
        pendingContacts: 3,
        resolvedContacts: 10,
        totalAccounts: 5,
        totalAdmins: 2,
        totalUsers: 3,
        recentContacts: [
          { _id: 'c1', fullName: 'Nguyen Van A', subject: 'Tư vấn văn phòng', message: 'Cần hỗ trợ', status: 'pending' },
        ],
        recentUsers: [
          { _id: 'u1', fullName: 'Tran Thi B', email: 'b@gmail.com', createdAt: '2026-10-15T10:00:00Z' },
        ],
      },
    });

    vi.mocked(plantApi.getPlants).mockResolvedValue({
      data: [
        { _id: 'p1', name: 'Monstera Deliciosa', scientificName: 'Monstera deliciosa Liebm.', category: 'Aroid', biome: 'tropical', status: 'published' },
      ],
    });

    vi.mocked(contactApi.getContacts).mockResolvedValue({
      data: [
        { _id: 'c1', fullName: 'Nguyen Van A', email: 'a@gmail.com', subject: 'Tư vấn', message: 'Cần cây bóng râm', status: 'pending' },
      ],
    });

    vi.mocked(adminApi.getUsers).mockResolvedValue({
      data: [
        { _id: 'u1', fullName: 'Tran Thi B', email: 'b@gmail.com', role: 'user', createdAt: '2026-10-15T10:00:00Z' },
      ],
    });

    vi.mocked(gardenerApi.getGardeners).mockResolvedValue({ data: [] });
    vi.mocked(collectionApi.getCollections).mockResolvedValue({ data: [] });
    vi.mocked(galleryApi.getGallery).mockResolvedValue({ data: [] });
  });

  it('renders overview dashboard with 6 KPI cards and recent activities', async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Tổng quan Quản trị' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tổng quan/i })).toHaveAttribute('aria-current', 'page');

    await waitFor(() => {
      const mainEl = screen.getByRole('main');
      expect(within(mainEl).getByText('Chuyên gia')).toBeInTheDocument();
      expect(within(mainEl).getByText('Bộ sưu tập')).toBeInTheDocument();
      expect(within(mainEl).getByText('Thư viện ảnh')).toBeInTheDocument();
      expect(within(mainEl).getByText('Tin nhắn liên hệ gần đây')).toBeInTheDocument();
      expect(within(mainEl).getByText('Thành viên mới tham gia')).toBeInTheDocument();
    });
  });

  it('switches between modules and renders live API data', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });

    // Switch to Plants module
    await user.click(screen.getByRole('button', { name: /Cây trồng/ }));
    expect(await screen.findByRole('heading', { name: 'Quản lý Cây trồng' })).toBeInTheDocument();
    expect(await screen.findByText('Monstera Deliciosa')).toBeInTheDocument();

    // Switch to Contacts module
    await user.click(screen.getByRole('button', { name: /Liên hệ/ }));
    expect(await screen.findByRole('heading', { name: 'Tin nhắn Liên hệ' })).toBeInTheDocument();
    expect(await screen.findByText('Nguyen Van A')).toBeInTheDocument();

    // Switch to Users module
    await user.click(screen.getByRole('button', { name: /Người dùng/ }));
    expect(await screen.findByRole('heading', { name: 'Quản lý Tài khoản' })).toBeInTheDocument();
    expect(await screen.findByText('Tran Thi B')).toBeInTheDocument();
  });

  it('locks mutations and shows offline banner when backend API fails', async () => {
    vi.mocked(plantApi.getPlants).mockRejectedValueOnce(new Error('Mất kết nối máy chủ'));
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });
    await user.click(screen.getByRole('button', { name: /Cây trồng/ }));

    expect(await screen.findByText(/Mất kết nối máy chủ/)).toBeInTheDocument();
    expect(screen.getByText(/Không thể kết nối cơ sở dữ liệu MongoDB/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /\+ Thêm mới/i })).not.toBeInTheDocument();
  });

  it('handles contact status toggle and triggers API reload', async () => {
    vi.mocked(contactApi.updateContactStatus).mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });
    await user.click(screen.getByRole('button', { name: /Liên hệ/ }));

    const toggleBtn = await screen.findByRole('button', { name: 'Đổi trạng thái' });
    await user.click(toggleBtn);

    expect(contactApi.updateContactStatus).toHaveBeenCalledWith('c1', 'resolved');
  });

  it('handles user role toggle and triggers API update', async () => {
    vi.mocked(adminApi.updateUserRole).mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });
    await user.click(screen.getByRole('button', { name: /Người dùng/ }));

    const roleBtn = await screen.findByRole('button', { name: 'Đổi role' });
    await user.click(roleBtn);

    expect(adminApi.updateUserRole).toHaveBeenCalledWith('u1', 'admin');
  });

  it('keeps modal open and shows error when plant creation fails', async () => {
    vi.mocked(plantApi.createPlant).mockRejectedValueOnce(new Error('Tên cây đã tồn tại'));
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });
    await user.click(screen.getByRole('button', { name: /Cây trồng/ }));

    const addBtn = await screen.findByRole('button', { name: /\+ Thêm mới/i });
    await user.click(addBtn);

    expect(screen.getByRole('heading', { name: 'Thêm Cây trồng' })).toBeInTheDocument();

    const saveBtn = screen.getByRole('button', { name: 'Lưu thay đổi' });
    fireEvent.submit(saveBtn.closest('form'));

    // Form stays open and displays the server error
    const matches = await screen.findAllByText(/Tên cây đã tồn tại/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { name: 'Thêm Cây trồng' })).toBeInTheDocument();
  });
});

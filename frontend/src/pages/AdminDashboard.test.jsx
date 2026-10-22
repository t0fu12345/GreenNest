import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AdminDashboard from './AdminDashboard';
import adminApi from '../services/adminApi';
import plantApi from '../services/plantApi';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'admin-1', name: 'Admin GreenNest', email: 'admin@greennest.com', role: 'admin' },
    token: 'token',
    logout: vi.fn(),
  }),
}));

vi.mock('../services/adminApi', () => ({
  default: { getDashboardStats: vi.fn().mockResolvedValue({ data: {} }), getUsers: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock('../services/plantApi', () => ({
  default: { getPlants: vi.fn().mockResolvedValue({ data: { plants: [] } }) },
}));

vi.mock('../services/contactApi', () => ({
  default: { getContacts: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock('../services/gardenerApi', () => ({
  default: { getGardeners: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock('../services/collectionApi', () => ({
  default: { getCollections: vi.fn().mockResolvedValue({ data: [] }) },
}));

vi.mock('../services/galleryApi', () => ({
  default: { getGallery: vi.fn().mockResolvedValue({ data: { gallery: [] } }) },
}));

beforeEach(() => {
  vi.mocked(adminApi.getDashboardStats).mockResolvedValue({ data: {} });
  vi.mocked(adminApi.getUsers).mockResolvedValue({ data: [] });
  vi.mocked(plantApi.getPlants).mockResolvedValue({ data: [] });
});

test('opens the Vietnamese overview dashboard for an administrator', () => {
  render(
    <MemoryRouter>
      <AdminDashboard />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Tổng quan Quản trị' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Tổng quan/i })).toHaveAttribute('aria-current', 'page');
});

test('locks plant mutations instead of displaying fallback data when the API is offline', async () => {
  vi.mocked(plantApi.getPlants).mockRejectedValueOnce({ message: 'Không kết nối được backend' });
  const user = userEvent.setup();

  render(<MemoryRouter><AdminDashboard /></MemoryRouter>);
  await screen.findByRole('heading', { name: 'Tổng quan Quản trị' });
  await user.click(screen.getByRole('button', { name: /Cây trồng/ }));

  expect(await screen.findByText(/Không thể tải dữ liệu: Không kết nối được backend/)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /\+ Thêm mới/i })).not.toBeInTheDocument();
});

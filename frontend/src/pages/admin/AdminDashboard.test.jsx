import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminDashboard from './AdminDashboard';
import adminApi from '../../services/adminApi';
import plantApi from '../../services/plantApi';
import contactApi from '../../services/contactApi';

const logout = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { _id: 'admin-1', name: 'Admin GreenNest', email: 'admin@greennest.com', role: 'admin' },
    logout,
  }),
}));

vi.mock('../../services/adminApi', () => ({
  default: {
    getDashboardStats: vi.fn(), getUsers: vi.fn(), updateUserRole: vi.fn(), deleteUser: vi.fn(),
  },
}));
vi.mock('../../services/plantApi', () => ({
  default: { getPlants: vi.fn(), createPlant: vi.fn(), updatePlant: vi.fn(), deletePlant: vi.fn() },
}));
vi.mock('../../services/contactApi', () => ({
  default: { getContacts: vi.fn(), updateContactStatus: vi.fn(), deleteContact: vi.fn() },
}));
vi.mock('../../services/gardenerApi', () => ({
  default: { getGardeners: vi.fn().mockResolvedValue({ data: [] }), createGardener: vi.fn(), updateGardener: vi.fn(), deleteGardener: vi.fn() },
}));
vi.mock('../../services/collectionApi', () => ({
  default: { getCollections: vi.fn().mockResolvedValue({ data: [] }), createCollection: vi.fn(), updateCollection: vi.fn(), deleteCollection: vi.fn() },
}));
vi.mock('../../services/galleryApi', () => ({
  default: { getGallery: vi.fn().mockResolvedValue({ data: [], pagination: { page: 1, totalPages: 1 } }), createGalleryItem: vi.fn(), updateGalleryItem: vi.fn(), deleteGalleryItem: vi.fn() },
}));

const stats = {
  totalPlants: 12, publishedPlants: 10, draftPlants: 2, totalGardeners: 4,
  totalCollections: 3, totalGalleryImages: 9, pendingContacts: 2,
  resolvedContacts: 6, totalAccounts: 7, totalAdmins: 1,
};

describe('Admin dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adminApi.getDashboardStats.mockResolvedValue({ data: stats });
    plantApi.getPlants.mockResolvedValue({
      data: [{ _id: 'p1', name: 'Monstera Deliciosa', scientificName: 'Monstera deliciosa', category: 'Aroid', light: 'Indirect light', watering: 'Weekly', status: 'published' }],
      pagination: { page: 1, totalPages: 1, total: 1 },
    });
    contactApi.getContacts.mockResolvedValue({
      data: [{ _id: 'c1', fullName: 'Alex Green', email: 'alex@example.com', subject: 'Plant care', message: 'Please help with my fern.', status: 'pending' }],
      pagination: { page: 1, totalPages: 1, total: 1 },
    });
    adminApi.getUsers.mockResolvedValue({ data: [], pagination: { page: 1, totalPages: 1 } });
  });

  it('renders the seven English modules and the simplified header', async () => {
    const { unmount } = render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    expect(document.body).toHaveClass('admin-page-active');
    const navigation = screen.getByRole('navigation', { name: 'Admin modules' });
    expect(within(navigation).getAllByRole('button')).toHaveLength(7);
    for (const label of ['Overview', 'Plants', 'Gardeners', 'Collections', 'Gallery', 'Contacts', 'Users']) {
      expect(within(navigation).getByRole('button', { name: new RegExp(label) })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('button', { name: /Users/ })).toHaveLength(1);
    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/search plants, gardeners/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/plant care tip/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last 7 days/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/export report/i)).not.toBeInTheDocument();
    unmount();
    expect(document.body).not.toHaveClass('admin-page-active');
  });

  it('shows live overview data without an activity log', async () => {
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    expect(await screen.findByRole('heading', { name: 'Admin Overview' })).toBeInTheDocument();
    expect(within(screen.getByRole('main')).getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Monstera Deliciosa')).toBeInTheDocument();
    expect(screen.getByText('Alex Green')).toBeInTheDocument();
    expect(screen.queryByText(/activity log/i)).not.toBeInTheDocument();
  });

  it('switches to each page component from the sidebar', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    for (const [label, heading] of [
      ['Plants', 'Plant Management'], ['Gardeners', 'Gardener Management'],
      ['Collections', 'Collection Management'], ['Gallery', 'Gallery Management'],
      ['Contacts', 'Contact Messages'], ['Users', 'User Management'],
    ]) {
      await user.click(screen.getByRole('button', { name: new RegExp(label) }));
      expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
    }
  });

  it('does not offer role-changing actions in user management', async () => {
    adminApi.getUsers.mockResolvedValue({
      data: [
        { _id: 'user-1', fullName: 'Garden Member', email: 'member@example.com', role: 'user', createdAt: '2026-10-22T00:00:00.000Z' },
        { _id: 'admin-2', fullName: 'Second Admin', email: 'second-admin@example.com', role: 'admin', createdAt: '2026-10-22T00:00:00.000Z' },
      ],
      pagination: { page: 1, totalPages: 1 },
    });
    const user = userEvent.setup();
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    await user.click(screen.getByRole('button', { name: /Users/ }));
    expect(await screen.findByText('Garden Member')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Make Admin' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Make User' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(2);
    expect(adminApi.updateUserRole).not.toHaveBeenCalled();
  });

  it('keeps the shell visible and disables writes when a module cannot load', async () => {
    plantApi.getPlants.mockRejectedValue({ message: 'Network Error' });
    const user = userEvent.setup();
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    await user.click(screen.getByRole('button', { name: /Plants/ }));
    expect(await screen.findByText('Network Error')).toBeInTheDocument();
    expect(screen.getByTestId('admin-shell')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Plant' })).toBeDisabled();
  });

  it('logs out and returns to the login screen', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/admin" element={<AdminDashboard />} /><Route path="/login" element={<div>Login destination</div>} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Log out' }));
    await waitFor(() => expect(logout).toHaveBeenCalledOnce());
    expect(screen.getByText('Login destination')).toBeInTheDocument();
  });

  it('refreshes the current data and KPI statistics after a successful mutation', async () => {
    contactApi.updateContactStatus.mockResolvedValue({ data: { status: 'resolved' } });
    const user = userEvent.setup();
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    await user.click(screen.getByRole('button', { name: /Contacts/ }));
    await user.click(await screen.findByRole('button', { name: 'Mark resolved' }));

    expect(contactApi.updateContactStatus).toHaveBeenCalledWith('c1', 'resolved');
    await waitFor(() => expect(adminApi.getDashboardStats).toHaveBeenCalledTimes(2));
    expect(contactApi.getContacts).toHaveBeenCalledTimes(3);
  });

  it('keeps an editor open and preserves its values when a mutation fails', async () => {
    plantApi.createPlant.mockRejectedValue({ message: 'Specimen ID already exists.' });
    const user = userEvent.setup();
    render(<MemoryRouter><AdminDashboard /></MemoryRouter>);

    await user.click(screen.getByRole('button', { name: /Plants/ }));
    await user.click(await screen.findByRole('button', { name: 'Add Plant' }));
    await user.type(screen.getByLabelText('Common name'), 'Rare Fern');
    fireEvent.submit(screen.getByRole('button', { name: 'Save Changes' }).closest('form'));

    expect(await screen.findByText('Specimen ID already exists.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Add Plant' })).toBeInTheDocument();
    expect(screen.getByLabelText('Common name')).toHaveValue('Rare Fern');
  });
});

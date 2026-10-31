import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminToast from '../../components/admin/AdminToast';
import { useAuth } from '../../context/AuthContext';
import adminApi from '../../services/adminApi';
import CollectionsPage from './CollectionsPage';
import ContactsPage from './ContactsPage';
import GalleryPage from './GalleryPage';
import GardenersPage from './GardenersPage';
import OverviewPage from './OverviewPage';
import PlantsPage from './PlantsPage';
import UsersPage from './UsersPage';

const pages = { plants: PlantsPage, gardeners: GardenersPage, collections: CollectionsPage, gallery: GalleryPage, contacts: ContactsPage, users: UsersPage };

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState('');
  const [toast, setToast] = useState(null);

  const loadStats = useCallback(async () => {
    setStatsLoading(true); setStatsError('');
    try { const response = await adminApi.getDashboardStats(); setStats(response.data || {}); }
    catch (error) { setStatsError(error?.message || 'Unable to connect to the administration server.'); }
    finally { setStatsLoading(false); }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => {
    document.body.classList.add('admin-page-active');
    return () => document.body.classList.remove('admin-page-active');
  }, []);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(null), 3500); return () => window.clearTimeout(timer); }, [toast]);

  const showToast = useCallback((message, type = 'success') => setToast({ message, type }), []);
  const handleLogout = () => { logout(); navigate('/', { replace: true }); };
  const badges = useMemo(() => ({ plants: stats?.totalPlants ?? 0, gardeners: stats?.totalGardeners ?? 0, collections: stats?.totalCollections ?? 0, gallery: stats?.totalGalleryImages ?? 0, contacts: stats?.pendingContacts ?? 0, users: stats?.totalAccounts ?? 0 }), [stats]);
  const Page = pages[active];

  return (
    <div data-testid="admin-shell" className="admin-shell min-h-screen bg-[#f4f7f3] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      <AdminSidebar active={active} onChange={setActive} badges={badges} />
      <div className="min-w-0 lg:ml-[290px]">
        <AdminHeader user={user} onLogout={handleLogout} />
        <main className="min-w-0 p-4 sm:p-6 xl:p-8">
          {active === 'overview' ? <OverviewPage stats={stats} statsLoading={statsLoading} statsError={statsError} /> : <Page onMutated={loadStats} onToast={showToast} />}
        </main>
      </div>
      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

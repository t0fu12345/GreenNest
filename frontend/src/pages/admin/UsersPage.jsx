import { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPagination from '../../components/admin/AdminPagination';
import AdminStatusBadge from '../../components/admin/AdminStatusBadge';
import adminApi from '../../services/adminApi';

const columns = [
  { key: 'fullName', label: 'Account', render: (row) => <div><strong className="block text-slate-950">{row.fullName}</strong><small className="text-slate-400">{row.email}</small></div> },
  { key: 'role', label: 'Role', render: (row) => <AdminStatusBadge value={row.role} /> },
  { key: 'createdAt', label: 'Joined', render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-US') : '—' },
];

export default function UsersPage({ onMutated, onToast }) {
  const [rows, setRows] = useState([]); const [search, setSearch] = useState(''); const [role, setRole] = useState('all');
  const [page, setPage] = useState(1); const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(async () => { setLoading(true); setError(''); try { const response = await adminApi.getUsers({ search, role, page, limit: 10 }); setRows(response.data || []); setTotalPages(response.pagination?.totalPages || 1); } catch (requestError) { setRows([]); setError(requestError?.message || 'Unable to load user accounts.'); } finally { setLoading(false); } }, [page, role, search]);
  useEffect(() => { load(); }, [load]);
  const mutate = async (action, success) => { try { await action(); onToast(success); await Promise.all([load(), onMutated?.()]); } catch (requestError) { onToast(requestError?.message || 'The request failed.', 'error'); } };
  return <div className="space-y-6"><AdminPageHeader title="User Management" description="Search accounts, review roles, and manage user accounts." /><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex flex-col gap-3 p-5 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><span className="sr-only">Search users</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search users..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm" /></label><select aria-label="User role" value={role} onChange={(event) => { setRole(event.target.value); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All roles</option><option value="admin">Admin</option><option value="user">User</option></select></div><AdminDataTable columns={columns} rows={rows} loading={loading} error={error} emptyMessage="No user accounts found." actions={!error ? (row) => <div className="flex justify-end"><button type="button" onClick={() => window.confirm('Delete this user account?') && mutate(() => adminApi.deleteUser(row._id), 'User account deleted.')} className="font-bold text-red-600">Delete</button></div> : undefined} />{!loading && !error && <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />}</section></div>;
}

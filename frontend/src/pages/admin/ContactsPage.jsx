import { useCallback, useEffect, useState } from 'react';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminPagination from '../../components/admin/AdminPagination';
import AdminStatusBadge from '../../components/admin/AdminStatusBadge';
import contactApi from '../../services/contactApi';

const columns = [
  { key: 'fullName', label: 'Sender', render: (row) => <div><strong className="block text-slate-950">{row.fullName}</strong><small className="text-slate-400">{row.email}</small></div> },
  { key: 'subject', label: 'Subject' },
  { key: 'message', label: 'Message', render: (row) => <span className="block max-w-lg whitespace-normal">{row.message}</span> },
  { key: 'status', label: 'Status', render: (row) => <AdminStatusBadge value={row.status} /> },
];

export default function ContactsPage({ onMutated, onToast }) {
  const [rows, setRows] = useState([]); const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1); const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(async () => { setLoading(true); setError(''); try { const response = await contactApi.getContacts({ status: status === 'all' ? undefined : status, page, limit: 10 }); setRows(response.data || []); setTotalPages(response.pagination?.totalPages || 1); } catch (requestError) { setRows([]); setError(requestError?.message || 'Unable to load contact messages.'); } finally { setLoading(false); } }, [page, status]);
  useEffect(() => { load(); }, [load]);
  const mutate = async (action, success) => { try { await action(); onToast(success); await Promise.all([load(), onMutated?.()]); } catch (requestError) { onToast(requestError?.message || 'The request failed.', 'error'); } };
  return <div className="space-y-6"><AdminPageHeader title="Contact Messages" description="Review visitor requests and keep response status up to date." /><section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex justify-end p-5"><select aria-label="Contact status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All statuses</option><option value="pending">Pending</option><option value="resolved">Resolved</option></select></div><AdminDataTable columns={columns} rows={rows} loading={loading} error={error} emptyMessage="No contact messages found." actions={!error ? (row) => <div className="flex justify-end gap-3"><button type="button" onClick={() => mutate(() => contactApi.updateContactStatus(row._id, row.status === 'pending' ? 'resolved' : 'pending'), 'Contact status updated.')} className="font-bold text-emerald-700">Mark {row.status === 'pending' ? 'resolved' : 'pending'}</button><button type="button" onClick={() => window.confirm('Delete this contact message?') && mutate(() => contactApi.deleteContact(row._id), 'Contact message deleted.')} className="font-bold text-red-600">Delete</button></div> : undefined} />{!loading && !error && <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />}</section></div>;
}

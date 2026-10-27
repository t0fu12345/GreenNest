import { AlertCircle, Inbox, LoaderCircle } from 'lucide-react';

export default function AdminStateView({ loading, error, empty, emptyMessage = 'No records found.' }) {
  if (loading) return <div className="flex min-h-48 items-center justify-center gap-2 text-sm font-semibold text-slate-500"><LoaderCircle className="animate-spin" size={20} /> Loading data...</div>;
  if (error) return <div role="alert" className="m-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="mt-0.5 shrink-0" size={18} /><div><strong className="block">Unable to load this module.</strong>{error}</div></div>;
  if (empty) return <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-sm text-slate-500"><Inbox size={28} /><span>{emptyMessage}</span></div>;
  return null;
}

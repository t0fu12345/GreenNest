export default function AdminStatusBadge({ value }) {
  const normalized = String(value ?? '').toLowerCase();
  const positive = ['published', 'resolved', 'admin', 'featured', 'active', 'yes'].includes(normalized);
  const warning = ['draft', 'pending'].includes(normalized);
  const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown';
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${positive ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : warning ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>{label}</span>;
}

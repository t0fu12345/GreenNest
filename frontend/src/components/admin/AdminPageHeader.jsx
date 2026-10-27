import { ShieldCheck } from 'lucide-react';

const currentDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());

export default function AdminPageHeader({ title, description }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"><ShieldCheck size={14} /> System operational</span>
        </div>
        {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
      </div>
      <time className="text-xs font-semibold text-slate-400">{currentDate}</time>
    </div>
  );
}

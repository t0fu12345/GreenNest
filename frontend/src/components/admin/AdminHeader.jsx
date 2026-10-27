import { LogOut } from 'lucide-react';

export default function AdminHeader({ user, onLogout }) {
  const name = user?.name || user?.fullName || 'GreenNest Admin';
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return (
    <header className="flex min-h-[86px] items-center justify-end gap-4 border-b border-slate-200 bg-white px-4 sm:px-7">
      <div className="grid size-11 place-items-center rounded-full border-2 border-emerald-400 bg-emerald-50 text-sm font-extrabold text-emerald-800">{initials}</div>
      <div className="hidden sm:block">
        <p className="text-sm font-extrabold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">Administrator</p>
      </div>
      <button type="button" onClick={onLogout} className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
        <LogOut size={16} /> Log out
      </button>
    </header>
  );
}

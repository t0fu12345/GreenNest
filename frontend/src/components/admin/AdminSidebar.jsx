import { BarChart3, Flower2, Images, Leaf, Mail, Sprout, Users } from 'lucide-react';

const items = [
  ['overview', 'Overview', BarChart3],
  ['plants', 'Plants', Sprout],
  ['gardeners', 'Gardeners', Users],
  ['collections', 'Collections', Flower2],
  ['gallery', 'Gallery', Images],
  ['contacts', 'Contacts', Mail],
  ['users', 'Users', Users],
];

export default function AdminSidebar({ active, onChange, badges = {} }) {
  return (
    <aside className="w-full shrink-0 border-b border-emerald-900/10 bg-[#c9eed5] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[290px] lg:border-b-0 lg:border-r">
      <div className="flex h-[86px] items-center gap-3 border-b border-emerald-900/10 px-6">
        <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500 text-white shadow-[0_8px_18px_rgba(16,185,129,.28)]"><Leaf size={24} /></span>
        <div>
          <div className="flex items-center gap-2 text-xl font-extrabold text-emerald-950">GreenNest <span className="rounded bg-emerald-700 px-2 py-0.5 text-[10px] text-white">ADMIN</span></div>
          <p className="mt-1 text-xs font-semibold text-emerald-800">Garden Manager v2.4</p>
        </div>
      </div>
      <nav aria-label="Admin modules" className="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:overflow-visible lg:p-5">
        {items.map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            aria-current={active === key ? 'page' : undefined}
            onClick={() => onChange(key)}
            className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition lg:w-full ${active === key ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-950 hover:bg-white/50'}`}
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {badges[key] !== undefined && <span className={`rounded-full px-2 py-0.5 text-xs ${active === key ? 'bg-white/20' : 'bg-emerald-100'}`}>{badges[key]}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

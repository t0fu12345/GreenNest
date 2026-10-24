import { useEffect, useState } from 'react';
import { Flower2, Images, Mail, Sprout, UserRoundCheck, Users } from 'lucide-react';
import AdminDataTable from '../../components/admin/AdminDataTable';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminStatusBadge from '../../components/admin/AdminStatusBadge';
import plantApi from '../../services/plantApi';
import contactApi from '../../services/contactApi';

const contactColumns = [
  { key: 'fullName', label: 'Sender', render: (row) => <div><strong className="block text-slate-950">{row.fullName}</strong><small className="text-slate-400">{row.email}</small></div> },
  { key: 'subject', label: 'Subject' },
  { key: 'message', label: 'Message', render: (row) => <span className="line-clamp-2 max-w-xl">{row.message}</span> },
  { key: 'status', label: 'Status', render: (row) => <AdminStatusBadge value={row.status} /> },
];
const plantColumns = [
  { key: 'name', label: 'Plant', render: (row) => <div><strong className="block text-slate-950">{row.name}</strong><em className="text-xs text-slate-400">{row.scientificName}</em></div> },
  { key: 'category', label: 'Category' },
  { key: 'care', label: 'Care', render: (row) => `${row.light || '—'} · ${row.watering || '—'}` },
  { key: 'status', label: 'Status', render: (row) => <AdminStatusBadge value={row.status} /> },
];

export default function OverviewPage({ stats, statsLoading, statsError }) {
  const [plants, setPlants] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([plantApi.getPlants({ limit: 4, status: 'published' }), contactApi.getContacts({ limit: 5 })])
      .then(([plantResponse, contactResponse]) => { if (active) { setPlants(plantResponse.data || []); setContacts(contactResponse.data || []); } })
      .catch((requestError) => { if (active) setError(requestError?.message || 'Unable to load overview records.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const cards = [
    ['Plants', stats?.totalPlants, `${stats?.publishedPlants || 0} published · ${stats?.draftPlants || 0} drafts`, Sprout, 'bg-emerald-50 text-emerald-600'],
    ['Gardeners', stats?.totalGardeners, 'Expert profiles', UserRoundCheck, 'bg-amber-50 text-amber-600'],
    ['Collections', stats?.totalCollections, 'Curated sets', Flower2, 'bg-yellow-50 text-yellow-600'],
    ['Gallery', stats?.totalGalleryImages, 'Managed images', Images, 'bg-orange-50 text-orange-600'],
    ['Contact messages', stats?.pendingContacts, `${stats?.resolvedContacts || 0} resolved`, Mail, 'bg-rose-50 text-rose-600'],
    ['User accounts', stats?.totalAccounts, `${stats?.totalAdmins || 0} administrators`, Users, 'bg-cyan-50 text-cyan-600'],
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Admin Overview" description="A live view of GreenNest content and community data." />
      {statsError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{statsError}</div>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {cards.map(([label, value, note, Icon, tone]) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,.045)]"><div className="flex items-start justify-between"><p className="text-sm font-semibold text-slate-500">{label}</p><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon size={19} /></span></div><strong className="mt-3 block text-3xl font-extrabold text-slate-950">{statsLoading ? '—' : (value ?? 0)}</strong><p className="mt-3 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">{note}</p></article>)}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="p-5"><h2 className="text-lg font-extrabold text-slate-950">Recent Plants</h2><p className="mt-1 text-sm text-slate-500">Recently published botanical records.</p></div><AdminDataTable columns={plantColumns} rows={plants} loading={loading} error={error} emptyMessage="No recent plants." /></section>
      <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="p-5"><h2 className="text-lg font-extrabold text-slate-950">Recent Contacts</h2><p className="mt-1 text-sm text-slate-500">Latest messages from GreenNest visitors.</p></div><AdminDataTable columns={contactColumns} rows={contacts} loading={loading} error={error} emptyMessage="No contact messages." /></section>
    </div>
  );
}

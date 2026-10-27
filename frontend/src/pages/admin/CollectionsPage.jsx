import AdminResourcePage from '../../components/admin/AdminResourcePage';
import AdminStatusBadge from '../../components/admin/AdminStatusBadge';
import collectionApi from '../../services/collectionApi';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'season', label: 'Season', type: 'select', defaultValue: 'all', options: ['all', 'spring', 'summer', 'autumn', 'winter'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) },
  { name: 'coverImage', label: 'Cover image URL', type: 'url', required: true, wide: true },
  { name: 'plantsText', label: 'Plant IDs (comma separated)', wide: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true, wide: true },
  { name: 'isFeatured', label: 'Featured collection', type: 'checkbox' },
];
const columns = [
  { key: 'title', label: 'Collection', render: (row) => <div className="flex items-center gap-3">{row.coverImage && <img src={row.coverImage} alt="" className="size-11 rounded-xl object-cover" />}<strong className="text-slate-950">{row.title}</strong></div> },
  { key: 'season', label: 'Season', render: (row) => row.season?.[0]?.toUpperCase() + row.season?.slice(1) },
  { key: 'plants', label: 'Plants', render: (row) => row.plants?.length || 0 },
  { key: 'isFeatured', label: 'Visibility', render: (row) => <AdminStatusBadge value={row.isFeatured ? 'featured' : 'standard'} /> },
];
const load = ({ filter }) => collectionApi.getCollections({ season: filter === 'all' ? undefined : filter });
const prepare = (value) => ({ title: value.title, description: value.description, coverImage: value.coverImage, season: value.season, isFeatured: Boolean(value.isFeatured), plants: value.plantsText ? value.plantsText.split(',').map((id) => id.trim()).filter(Boolean) : [] });
const toForm = (row) => ({ ...row, plantsText: row.plants?.map((plant) => plant._id || plant).join(', ') || '' });

export default function CollectionsPage(props) {
  return <AdminResourcePage {...props} title="Collection Management" description="Curate seasonal collections and their featured botanical specimens." singular="Collection" columns={columns} fields={fields} load={load} create={collectionApi.createCollection} update={collectionApi.updateCollection} remove={collectionApi.deleteCollection} prepare={prepare} toForm={toForm} filter={{ label: 'Season', defaultValue: 'all', options: ['all', 'spring', 'summer', 'autumn', 'winter'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) }} />;
}

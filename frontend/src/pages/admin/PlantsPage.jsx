import AdminResourcePage from '../../components/admin/AdminResourcePage';
import AdminStatusBadge from '../../components/admin/AdminStatusBadge';
import plantApi from '../../services/plantApi';

const fields = [
  { name: 'specimenId', label: 'Specimen ID' },
  { name: 'name', label: 'Common name', required: true },
  { name: 'scientificName', label: 'Scientific name', required: true },
  { name: 'category', label: 'Category', required: true },
  { name: 'biome', label: 'Biome', type: 'select', required: true, defaultValue: 'tropical', options: ['tropical', 'subtropical', 'arid', 'temperate'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) },
  { name: 'careLevel', label: 'Care level', type: 'select', defaultValue: 'Easy', options: ['Easy', 'Easy to Moderate', 'Moderate', 'Challenging'].map((value) => ({ value, label: value })) },
  { name: 'light', label: 'Light requirements', required: true },
  { name: 'watering', label: 'Watering requirements', required: true },
  { name: 'soil', label: 'Soil' },
  { name: 'origin', label: 'Origin' },
  { name: 'heroImage', label: 'Hero image URL', type: 'url', required: true, wide: true },
  { name: 'description', label: 'Description', type: 'textarea', wide: true },
  { name: 'toxicityDetails', label: 'Toxicity details', wide: true },
  { name: 'isToxicToPets', label: 'Toxic to pets', type: 'checkbox' },
  { name: 'status', label: 'Status', type: 'select', defaultValue: 'published', options: [{ value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }] },
];

const columns = [
  { key: 'name', label: 'Plant / scientific name', render: (row) => <div className="flex items-center gap-3">{row.images?.hero && <img src={row.images.hero} alt="" className="size-11 rounded-xl object-cover" />}<div><strong className="block text-slate-950">{row.name}</strong><em className="text-xs text-slate-400">{row.scientificName}</em></div></div> },
  { key: 'category', label: 'Category' },
  { key: 'care', label: 'Light & water', render: (row) => <span>{row.light}<br /><small className="text-slate-400">{row.watering}</small></span> },
  { key: 'toxicity', label: 'Pet safety', render: (row) => row.toxicity?.isToxicToPets ? 'Caution advised' : 'Pet friendly' },
  { key: 'status', label: 'Status', render: (row) => <AdminStatusBadge value={row.status} /> },
];

const loadPlants = ({ search, filter, page, limit }) => plantApi.getPlants({ search, status: filter === 'all' ? undefined : filter, page, limit });
const prepare = (value) => ({
  specimenId: value.specimenId || undefined, name: value.name, scientificName: value.scientificName,
  category: value.category, biome: value.biome, careLevel: value.careLevel, light: value.light,
  watering: value.watering, soil: value.soil, origin: value.origin, description: value.description,
  status: value.status, images: { hero: value.heroImage, gallery: value.images?.gallery || [] },
  toxicity: { isToxicToPets: Boolean(value.isToxicToPets), details: value.toxicityDetails },
});
const toForm = (row) => ({ ...row, heroImage: row.images?.hero || '', isToxicToPets: row.toxicity?.isToxicToPets || false, toxicityDetails: row.toxicity?.details || '' });

export default function PlantsPage(props) {
  return <AdminResourcePage {...props} title="Plant Management" description="Manage botanical records, care requirements, safety, and publishing status." singular="Plant" columns={columns} fields={fields} load={loadPlants} create={plantApi.createPlant} update={plantApi.updatePlant} remove={plantApi.deletePlant} prepare={prepare} toForm={toForm} filter={{ label: 'Plant status', param: 'filter', defaultValue: 'all', options: [{ value: 'all', label: 'All statuses' }, { value: 'published', label: 'Published' }, { value: 'draft', label: 'Draft' }] }} />;
}

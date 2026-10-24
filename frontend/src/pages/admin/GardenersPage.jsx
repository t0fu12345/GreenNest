import AdminResourcePage from '../../components/admin/AdminResourcePage';
import gardenerApi from '../../services/gardenerApi';

const fields = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'specialization', label: 'Specialization', required: true },
  { name: 'contactEmail', label: 'Email', type: 'email', required: true },
  { name: 'experienceYears', label: 'Years of experience', type: 'number', defaultValue: 5 },
  { name: 'avatar', label: 'Avatar URL', type: 'url', wide: true },
  { name: 'associatedPlantsText', label: 'Related plant IDs (comma separated)', wide: true },
  { name: 'bio', label: 'Biography', type: 'textarea', wide: true },
];
const columns = [
  { key: 'name', label: 'Gardener', render: (row) => <div className="flex items-center gap-3">{row.avatar && <img src={row.avatar} alt="" className="size-10 rounded-full object-cover" />}<strong className="text-slate-950">{row.name}</strong></div> },
  { key: 'specialization', label: 'Specialization' },
  { key: 'contactEmail', label: 'Email' },
  { key: 'experienceYears', label: 'Experience', render: (row) => `${row.experienceYears || 0} years` },
  { key: 'associatedPlants', label: 'Related plants', render: (row) => row.associatedPlants?.length || 0 },
];
const load = () => gardenerApi.getGardeners();
const prepare = (value) => ({ name: value.name, specialization: value.specialization, contactEmail: value.contactEmail, experienceYears: Number(value.experienceYears), avatar: value.avatar, bio: value.bio, associatedPlants: value.associatedPlantsText ? value.associatedPlantsText.split(',').map((id) => id.trim()).filter(Boolean) : [] });
const toForm = (row) => ({ ...row, associatedPlantsText: row.associatedPlants?.map((plant) => plant._id || plant).join(', ') || '' });

export default function GardenersPage(props) {
  return <AdminResourcePage {...props} title="Gardener Management" description="Manage expert profiles, specialties, experience, and related plants." singular="Gardener" columns={columns} fields={fields} load={load} create={gardenerApi.createGardener} update={gardenerApi.updateGardener} remove={gardenerApi.deleteGardener} prepare={prepare} toForm={toForm} />;
}

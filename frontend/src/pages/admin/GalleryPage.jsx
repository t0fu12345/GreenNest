import AdminResourcePage from '../../components/admin/AdminResourcePage';
import galleryApi from '../../services/galleryApi';

const fields = [
  { name: 'imageUrl', label: 'Image URL', type: 'url', required: true, wide: true },
  { name: 'alt', label: 'Alternative text', required: true },
  { name: 'credit', label: 'Credit', defaultValue: 'Pinterest' },
  { name: 'aspectRatio', label: 'Aspect ratio', type: 'select', defaultValue: 'tall', options: ['tall', 'wide', 'square', 'large'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) },
  { name: 'plantId', label: 'Related plant ID' },
  { name: 'caption', label: 'Caption', type: 'textarea', required: true, wide: true },
];
const columns = [
  { key: 'imageUrl', label: 'Image', render: (row) => <div className="flex items-center gap-3"><img src={row.imageUrl} alt={row.alt || ''} className="size-12 rounded-xl object-cover" /><strong className="max-w-52 truncate text-slate-950">{row.caption}</strong></div> },
  { key: 'alt', label: 'Alt text' },
  { key: 'credit', label: 'Credit' },
  { key: 'aspectRatio', label: 'Aspect ratio' },
  { key: 'plant', label: 'Related plant', render: (row) => row.plant?.name || '—' },
];
const load = ({ filter, page, limit }) => galleryApi.getGallery({ aspectRatio: filter === 'all' ? undefined : filter, page, limit });
const prepare = (value) => ({ imageUrl: value.imageUrl, alt: value.alt, caption: value.caption, credit: value.credit, aspectRatio: value.aspectRatio, plant: value.plantId || undefined });
const toForm = (row) => ({ ...row, plantId: row.plant?._id || row.plant || '' });

export default function GalleryPage(props) {
  return <AdminResourcePage {...props} title="Gallery Management" description="Manage gallery imagery, captions, credits, and linked plants." singular="Gallery Image" columns={columns} fields={fields} load={load} create={galleryApi.createGalleryItem} update={galleryApi.updateGalleryItem} remove={galleryApi.deleteGalleryItem} prepare={prepare} toForm={toForm} filter={{ label: 'Aspect ratio', defaultValue: 'all', options: ['all', 'tall', 'wide', 'square', 'large'].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) })) }} />;
}

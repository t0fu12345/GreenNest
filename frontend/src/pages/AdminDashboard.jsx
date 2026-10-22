import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import adminApi from '../services/adminApi';
import plantApi from '../services/plantApi';
import gardenerApi from '../services/gardenerApi';
import collectionApi from '../services/collectionApi';
import galleryApi from '../services/galleryApi';
import contactApi from '../services/contactApi';
import { AdminHeader, AdminSidebar, EditorModal, Overview, ResourcePanel } from '../components/admin/AdminUi';

const emptyData = { plants: [], gardeners: [], collections: [], gallery: [], contacts: [], users: [] };
const definitions = {
  plants: {
    title: 'Quản lý Cây trồng',
    fields: [
      { key: 'name', label: 'Tên cây', required: true },
      { key: 'scientificName', label: 'Tên khoa học', required: true },
      { key: 'specimenId', label: 'Mã specimen', required: true },
      { key: 'category', label: 'Danh mục', required: true },
      { key: 'biome', label: 'Biome', type: 'select', options: ['tropical', 'subtropical', 'arid', 'temperate'], required: true },
      { key: 'light', label: 'Ánh sáng', required: true },
      { key: 'watering', label: 'Tưới nước', required: true },
      { key: 'imageUrl', label: 'URL ảnh', required: true },
      { key: 'status', label: 'Trạng thái', type: 'select', options: ['published', 'draft'], required: true },
      { key: 'isToxicToPets', label: 'Độc với thú cưng', type: 'select', options: ['false', 'true'] },
    ],
    columns: [{ key: 'name', label: 'Tên cây' }, { key: 'scientificName', label: 'Khoa học' }, { key: 'category', label: 'Danh mục' }, { key: 'status', label: 'Trạng thái', status: true }],
  },
  gardeners: {
    title: 'Quản lý Chuyên gia',
    fields: [{ key: 'name', label: 'Họ tên', required: true }, { key: 'specialization', label: 'Chuyên môn', required: true }, { key: 'contactEmail', label: 'Email', type: 'email', required: true }, { key: 'avatar', label: 'URL avatar' }, { key: 'bio', label: 'Giới thiệu', type: 'textarea' }, { key: 'experienceYears', label: 'Số năm kinh nghiệm', type: 'number' }, { key: 'associatedPlants', label: 'ID cây liên quan (cách nhau dấu phẩy)' }],
    columns: [{ key: 'name', label: 'Chuyên gia' }, { key: 'specialization', label: 'Chuyên môn' }, { key: 'contactEmail', label: 'Email' }, { key: 'experienceYears', label: 'Kinh nghiệm', format: row => (row.experienceYears || 0) + ' năm' }],
  },
  collections: {
    title: 'Quản lý Bộ sưu tập',
    fields: [{ key: 'title', label: 'Tiêu đề', required: true }, { key: 'description', label: 'Mô tả', type: 'textarea', required: true }, { key: 'coverImage', label: 'URL ảnh bìa', required: true }, { key: 'season', label: 'Mùa', type: 'select', options: ['all', 'spring', 'summer', 'autumn', 'winter'], required: true }, { key: 'isFeatured', label: 'Nổi bật', type: 'select', options: ['true', 'false'] }, { key: 'plants', label: 'ID cây (cách nhau dấu phẩy)' }],
    columns: [{ key: 'title', label: 'Bộ sưu tập' }, { key: 'season', label: 'Mùa' }, { key: 'isFeatured', label: 'Nổi bật', format: row => row.isFeatured ? 'Có' : 'Không' }],
  },
  gallery: {
    title: 'Quản lý Thư viện',
    fields: [{ key: 'imageUrl', label: 'URL ảnh', required: true }, { key: 'alt', label: 'Alt text', required: true }, { key: 'caption', label: 'Caption', required: true }, { key: 'credit', label: 'Nguồn' }, { key: 'aspectRatio', label: 'Tỷ lệ', type: 'select', options: ['tall', 'wide', 'square', 'large'], required: true }, { key: 'plant', label: 'ID cây liên quan' }],
    columns: [{ key: 'imageUrl', label: 'Ảnh', image: true }, { key: 'caption', label: 'Caption' }, { key: 'credit', label: 'Nguồn' }, { key: 'aspectRatio', label: 'Tỷ lệ' }],
  },
  contacts: {
    title: 'Tin nhắn Liên hệ',
    fields: [],
    columns: [{ key: 'fullName', label: 'Khách hàng' }, { key: 'email', label: 'Email' }, { key: 'subject', label: 'Chủ đề' }, { key: 'status', label: 'Trạng thái', status: true }],
  },
  users: {
    title: 'Quản lý Tài khoản',
    fields: [],
    columns: [{ key: 'fullName', label: 'Họ tên' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role', status: true }, { key: 'createdAt', label: 'Ngày tạo', format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString('vi-VN') : '—' }],
  },
};

function normalizePlant(item) {
  return { ...item, imageUrl: item.imageUrl || item.images?.hero || '' };
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [data, setData] = useState(emptyData);
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const response = await adminApi.getDashboardStats();
      setStats(response.data);
      setErrors(current => ({ ...current, overview: '' }));
    } catch (error) {
      setErrors(current => ({ ...current, overview: error.message || 'Lỗi kết nối' }));
    }
  }, []);

  const loadResource = useCallback(async (resource) => {
    setLoading(current => ({ ...current, [resource]: true }));
    try {
      let response;
      if (resource === 'plants') response = await plantApi.getPlants({ limit: 100 });
      if (resource === 'gardeners') response = await gardenerApi.getGardeners();
      if (resource === 'collections') response = await collectionApi.getCollections();
      if (resource === 'gallery') response = await galleryApi.getGallery({ limit: 100 });
      if (resource === 'contacts') response = await contactApi.getContacts({ limit: 100 });
      if (resource === 'users') response = await adminApi.getUsers({ limit: 100 });
      const payload = response?.data;
      const rows = resource === 'gallery' ? payload?.gallery || [] : Array.isArray(payload) ? payload : [];
      setData(current => ({ ...current, [resource]: resource === 'plants' ? rows.map(normalizePlant) : rows }));
      setErrors(current => ({ ...current, [resource]: '' }));
    } catch (error) {
      setErrors(current => ({ ...current, [resource]: error.message || 'Lỗi kết nối' }));
    } finally {
      setLoading(current => ({ ...current, [resource]: false }));
    }
  }, []);

  useEffect(() => {
    loadStats();
    Object.keys(emptyData).forEach(loadResource);
  }, [loadResource, loadStats]);

  const openCreate = () => {
    if (!definitions[active]?.fields?.length) return;
    const initial = definitions[active].fields.reduce((result, field) => ({ ...result, [field.key]: field.key === 'status' ? 'published' : field.key === 'aspectRatio' ? 'tall' : field.key === 'season' ? 'all' : '' }), {});
    setEditor({ resource: active, value: initial, isNew: true });
  };

  const openEdit = row => {
    const value = { ...row };
    if (Array.isArray(value.associatedPlants)) value.associatedPlants = value.associatedPlants.map(item => item._id || item).join(', ');
    if (Array.isArray(value.plants)) value.plants = value.plants.map(item => item._id || item).join(', ');
    if (value.toxicity) value.isToxicToPets = String(Boolean(value.toxicity.isToxicToPets));
    setEditor({ resource: active, value, isNew: false });
  };
  const updateEditor = (key, value) => setEditor(current => ({ ...current, value: { ...current.value, [key]: value } }));
  const apiOffline = Boolean(errors[active]);

  const submitEditor = async event => {
    event.preventDefault();
    const { resource, value, isNew } = editor;
    setSaving(true);
    try {
      let payload = { ...value };
      if (resource === 'plants') {
        payload = { ...payload, images: { hero: value.imageUrl }, toxicity: { isToxicToPets: value.isToxicToPets === true || value.isToxicToPets === 'true' } };
        delete payload.imageUrl;
        delete payload.isToxicToPets;
      }
      if (resource === 'collections') payload.isFeatured = value.isFeatured === true || value.isFeatured === 'true';
      if (resource === 'gardeners' && typeof payload.associatedPlants === 'string') payload.associatedPlants = payload.associatedPlants.split(',').map(item => item.trim()).filter(Boolean);
      if (resource === 'collections' && typeof payload.plants === 'string') payload.plants = payload.plants.split(',').map(item => item.trim()).filter(Boolean);
      const id = value._id;
      if (resource === 'plants') {
        if (isNew) await plantApi.createPlant(payload);
        else await plantApi.updatePlant(id, payload);
      }
      if (resource === 'gardeners') {
        if (isNew) await gardenerApi.createGardener(payload);
        else await gardenerApi.updateGardener(id, payload);
      }
      if (resource === 'collections') {
        if (isNew) await collectionApi.createCollection(payload);
        else await collectionApi.updateCollection(id, payload);
      }
      if (resource === 'gallery') {
        if (isNew) await galleryApi.createGalleryItem(payload);
        else await galleryApi.updateGalleryItem(id, payload);
      }
      setEditor(null);
      setToast('Đã lưu thay đổi.');
      await Promise.all([loadResource(resource), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể lưu thay đổi.');
    } finally {
      setSaving(false);
    }
  };

  const deleteRow = async row => {
    if (!window.confirm('Bạn có chắc muốn xóa mục này?')) return;
    try {
      const id = row._id || row.id;
      if (active === 'plants') await plantApi.deletePlant(id);
      if (active === 'gardeners') await gardenerApi.deleteGardener(id);
      if (active === 'collections') await collectionApi.deleteCollection(id);
      if (active === 'gallery') await galleryApi.deleteGalleryItem(id);
      if (active === 'contacts') await contactApi.deleteContact(id);
      if (active === 'users') await adminApi.deleteUser(id);
      setToast('Đã xóa thành công.');
      await Promise.all([loadResource(active), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể xóa dữ liệu.');
    }
  };

  const toggleStatus = async row => {
    try {
      await contactApi.updateContactStatus(row._id, row.status === 'pending' ? 'resolved' : 'pending');
      await Promise.all([loadResource('contacts'), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể cập nhật trạng thái.');
    }
  };

  const toggleRole = async row => {
    try {
      await adminApi.updateUserRole(row._id, row.role === 'admin' ? 'user' : 'admin');
      await Promise.all([loadResource('users'), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể cập nhật role.');
    }
  };

  const currentDefinition = definitions[active];
  const createAllowed = active !== 'overview' && ['plants', 'gardeners', 'collections', 'gallery'].includes(active) && !apiOffline;
  const resourceRows = useMemo(() => data[active] || [], [active, data]);

  return <div className="min-h-screen bg-[#f8faf6] font-sans text-slate-800 lg:flex">
    <AdminSidebar active={active} onSelect={value => { setActive(value); setSearch(''); }} user={user} onLogout={() => { logout(); navigate('/login'); }} />
    <div className="min-w-0 flex-1">
      <AdminHeader active={active} pendingContacts={stats?.pendingContacts} user={user} onCreate={openCreate} createAllowed={createAllowed} />
      <main className="mx-auto max-w-7xl p-5 sm:p-8">
        {toast && <div role="status" className="mb-5 flex items-center justify-between rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-800">{toast}<button onClick={() => setToast('')} aria-label="Đóng thông báo">✕</button></div>}
        {active === 'overview' ? <Overview stats={stats} error={errors.overview} onOpenContacts={() => setActive('contacts')} /> : <ResourcePanel title={currentDefinition.title} rows={resourceRows} fields={currentDefinition.columns} loading={loading[active]} error={errors[active]} offline={apiOffline} search={search} onSearch={setSearch} onEdit={currentDefinition.fields.length ? openEdit : null} onDelete={deleteRow} onToggleStatus={active === 'contacts' ? toggleStatus : null} onToggleRole={active === 'users' ? toggleRole : null} />}
      </main>
    </div>
    <EditorModal title={(editor?.isNew ? 'Thêm ' : 'Cập nhật ') + (definitions[editor?.resource]?.title || '')} fields={definitions[editor?.resource]?.fields || []} value={editor?.value} onChange={updateEditor} onClose={() => setEditor(null)} onSubmit={submitEditor} saving={saving} />
  </div>;
}

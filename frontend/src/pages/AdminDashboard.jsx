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
    filterOptions: [
      ['all', 'Tất cả'],
      ['published', 'Đã xuất bản'],
      ['draft', 'Bản nháp']
    ],
    fields: [
      { key: 'name', label: 'Tên cây (Common Name)', required: true },
      { key: 'scientificName', label: 'Tên khoa học (Botanical Name)', required: true },
      { key: 'specimenId', label: 'Mã định danh (Specimen ID)', required: true },
      { key: 'category', label: 'Nhóm phân loại (Category)', required: true },
      { key: 'biome', label: 'Môi trường sinh trưởng (Biome)', type: 'select', options: ['tropical', 'subtropical', 'arid', 'temperate'], required: true },
      { key: 'light', label: 'Yêu cầu ánh sáng', required: true },
      { key: 'watering', label: 'Nhu cầu tưới nước', required: true },
      { key: 'imageUrl', label: 'URL hình ảnh (Hero Image)', required: true },
      { key: 'status', label: 'Trạng thái phát hành', type: 'select', options: ['published', 'draft'], required: true },
      { key: 'isToxicToPets', label: 'Độc tính với thú cưng', type: 'select', options: ['false', 'true'] },
      { key: 'careLevel', label: 'Mức độ chăm sóc', type: 'select', options: ['Easy', 'Moderate', 'Challenging'] },
      { key: 'shortDesc', label: 'Mô tả ngắn', type: 'textarea' },
    ],
    columns: [
      { key: 'imageUrl', label: 'Ảnh', image: true },
      { key: 'name', label: 'Tên cây' },
      { key: 'scientificName', label: 'Tên khoa học' },
      { key: 'category', label: 'Danh mục' },
      { key: 'biome', label: 'Hệ sinh thái' },
      { key: 'status', label: 'Trạng thái', status: true }
    ],
  },
  gardeners: {
    title: 'Quản lý Chuyên gia',
    filterOptions: [],
    fields: [
      { key: 'name', label: 'Họ và tên chuyên gia', required: true },
      { key: 'specialization', label: 'Lĩnh vực chuyên môn', required: true },
      { key: 'contactEmail', label: 'Email liên hệ', type: 'email', required: true },
      { key: 'avatar', label: 'URL ảnh đại diện (Avatar)' },
      { key: 'experienceYears', label: 'Số năm kinh nghiệm', type: 'number' },
      { key: 'bio', label: 'Tiểu sử chuyên môn', type: 'textarea' },
      { key: 'associatedPlants', label: 'ID cây liên quan (cách nhau bằng dấu phẩy)' },
    ],
    columns: [
      { key: 'avatar', label: 'Ảnh', image: true },
      { key: 'name', label: 'Chuyên gia' },
      { key: 'specialization', label: 'Chuyên môn' },
      { key: 'contactEmail', label: 'Email' },
      { key: 'experienceYears', label: 'Kinh nghiệm', format: (row) => `${row.experienceYears || 0} năm` }
    ],
  },
  collections: {
    title: 'Quản lý Bộ sưu tập',
    filterOptions: [
      ['all', 'Tất cả các mùa'],
      ['spring', 'Mùa xuân'],
      ['summer', 'Mùa hạ'],
      ['autumn', 'Mùa thu'],
      ['winter', 'Mùa đông']
    ],
    fields: [
      { key: 'title', label: 'Tiêu đề bộ sưu tập', required: true },
      { key: 'coverImage', label: 'URL ảnh bìa', required: true },
      { key: 'season', label: 'Mùa đặc trưng', type: 'select', options: ['all', 'spring', 'summer', 'autumn', 'winter'], required: true },
      { key: 'isFeatured', label: 'Bộ sưu tập nổi bật', type: 'select', options: ['true', 'false'] },
      { key: 'description', label: 'Mô tả chi tiết', type: 'textarea', required: true },
      { key: 'plants', label: 'Danh sách ID cây (cách nhau dấu phẩy)' },
    ],
    columns: [
      { key: 'coverImage', label: 'Ảnh bìa', image: true },
      { key: 'title', label: 'Bộ sưu tập' },
      { key: 'season', label: 'Mùa', format: (row) => row.season?.toUpperCase() || 'ALL' },
      { key: 'isFeatured', label: 'Nổi bật', status: true }
    ],
  },
  gallery: {
    title: 'Quản lý Thư viện',
    filterOptions: [
      ['all', 'Tất cả tỷ lệ'],
      ['tall', 'Khổ đứng (Tall)'],
      ['wide', 'Khổ ngang (Wide)'],
      ['square', 'Khổ vuông (Square)'],
      ['large', 'Khổ lớn (Large)']
    ],
    fields: [
      { key: 'imageUrl', label: 'URL ảnh tác phẩm', required: true },
      { key: 'alt', label: 'Thẻ alt mô tả', required: true },
      { key: 'caption', label: 'Chú thích ảnh', required: true },
      { key: 'credit', label: 'Nguồn tác giả / Nhiếp ảnh' },
      { key: 'aspectRatio', label: 'Tỷ lệ hiển thị', type: 'select', options: ['tall', 'wide', 'square', 'large'], required: true },
      { key: 'plant', label: 'ID cây liên kết (Tùy chọn)' },
    ],
    columns: [
      { key: 'imageUrl', label: 'Ảnh', image: true },
      { key: 'caption', label: 'Chú thích' },
      { key: 'credit', label: 'Nguồn tác giả' },
      { key: 'aspectRatio', label: 'Tỷ lệ' }
    ],
  },
  contacts: {
    title: 'Tin nhắn Liên hệ',
    filterOptions: [
      ['all', 'Tất cả'],
      ['pending', 'Chờ xử lý'],
      ['resolved', 'Đã xử lý']
    ],
    fields: [],
    columns: [
      { key: 'fullName', label: 'Khách hàng' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Chủ đề' },
      { key: 'message', label: 'Nội dung' },
      { key: 'status', label: 'Trạng thái', status: true },
      { key: 'createdAt', label: 'Thời gian', format: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString('vi-VN') : '—' }
    ],
  },
  users: {
    title: 'Quản lý Tài khoản',
    filterOptions: [
      ['all', 'Tất cả vai trò'],
      ['user', 'Thành viên'],
      ['admin', 'Quản trị viên']
    ],
    fields: [],
    columns: [
      { key: 'fullName', label: 'Họ tên' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Vai trò', status: true },
      { key: 'createdAt', label: 'Ngày tạo', format: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString('vi-VN') : '—' }
    ],
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
  const [filterValues, setFilterValues] = useState({});
  const [pages, setPages] = useState({});
  const [editor, setEditor] = useState(null);
  const [editorError, setEditorError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const response = await adminApi.getDashboardStats();
      setStats(response.data);
      setErrors((current) => ({ ...current, overview: '' }));
    } catch (error) {
      setErrors((current) => ({ ...current, overview: error.message || 'Lỗi kết nối máy chủ' }));
    }
  }, []);

  const loadResource = useCallback(async (resource) => {
    setLoading((current) => ({ ...current, [resource]: true }));
    try {
      let response;
      if (resource === 'plants') response = await plantApi.getPlants({ limit: 100 });
      if (resource === 'gardeners') response = await gardenerApi.getGardeners();
      if (resource === 'collections') response = await collectionApi.getCollections();
      if (resource === 'gallery') response = await galleryApi.getGallery({ limit: 100 });
      if (resource === 'contacts') response = await contactApi.getContacts({ limit: 100 });
      if (resource === 'users') response = await adminApi.getUsers({ limit: 100 });

      const payload = response?.data;
      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.plants)
        ? payload.plants
        : Array.isArray(payload?.gallery)
        ? payload.gallery
        : Array.isArray(payload?.users)
        ? payload.users
        : Array.isArray(payload?.messages)
        ? payload.messages
        : [];

      setData((current) => ({
        ...current,
        [resource]: resource === 'plants' ? rows.map(normalizePlant) : rows
      }));
      setErrors((current) => ({ ...current, [resource]: '' }));
    } catch (error) {
      setErrors((current) => ({ ...current, [resource]: error.message || 'Lỗi kết nối máy chủ' }));
    } finally {
      setLoading((current) => ({ ...current, [resource]: false }));
    }
  }, []);

  useEffect(() => {
    loadStats();
    Object.keys(emptyData).forEach(loadResource);
  }, [loadResource, loadStats]);

  const openCreate = () => {
    if (!definitions[active]?.fields?.length) return;
    const initial = definitions[active].fields.reduce((result, field) => {
      let defaultVal = '';
      if (field.key === 'status') defaultVal = 'published';
      if (field.key === 'aspectRatio') defaultVal = 'tall';
      if (field.key === 'season') defaultVal = 'all';
      if (field.key === 'biome') defaultVal = 'tropical';
      if (field.key === 'isToxicToPets') defaultVal = 'false';
      if (field.key === 'isFeatured') defaultVal = 'false';
      if (field.key === 'careLevel') defaultVal = 'Easy';
      return { ...result, [field.key]: defaultVal };
    }, {});

    setEditorError('');
    setEditor({ resource: active, value: initial, isNew: true });
  };

  const openEdit = (row) => {
    const value = { ...row };
    if (Array.isArray(value.associatedPlants)) {
      value.associatedPlants = value.associatedPlants.map((item) => item._id || item).join(', ');
    }
    if (Array.isArray(value.plants)) {
      value.plants = value.plants.map((item) => item._id || item).join(', ');
    }
    if (value.toxicity) {
      value.isToxicToPets = String(Boolean(value.toxicity.isToxicToPets));
    }
    if (typeof value.isFeatured === 'boolean') {
      value.isFeatured = String(value.isFeatured);
    }
    setEditorError('');
    setEditor({ resource: active, value, isNew: false });
  };

  const updateEditor = (key, val) => {
    setEditor((current) => ({ ...current, value: { ...current.value, [key]: val } }));
  };

  const apiOffline = Boolean(errors[active]);

  const submitEditor = async (event) => {
    event.preventDefault();
    const { resource, value, isNew } = editor;
    setSaving(true);
    setEditorError('');

    try {
      let payload = { ...value };
      if (resource === 'plants') {
        payload = {
          ...payload,
          images: { hero: value.imageUrl, gallery: [] },
          toxicity: { isToxicToPets: value.isToxicToPets === true || value.isToxicToPets === 'true' }
        };
        delete payload.imageUrl;
        delete payload.isToxicToPets;
      }
      if (resource === 'collections') {
        payload.isFeatured = value.isFeatured === true || value.isFeatured === 'true';
        if (typeof payload.plants === 'string') {
          payload.plants = payload.plants.split(',').map((item) => item.trim()).filter(Boolean);
        }
      }
      if (resource === 'gardeners' && typeof payload.associatedPlants === 'string') {
        payload.associatedPlants = payload.associatedPlants.split(',').map((item) => item.trim()).filter(Boolean);
      }
      if (resource === 'gallery') {
        if (!payload.plant || !payload.plant.trim()) {
          delete payload.plant;
        }
      }

      const id = value._id || value.id;
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
      setToast('Đã lưu thay đổi thành công.');
      await Promise.all([loadResource(resource), loadStats()]);
    } catch (error) {
      setEditorError(error.message || 'Lỗi khi lưu dữ liệu lên máy chủ.');
      setToast(error.message || 'Không thể lưu thay đổi.');
    } finally {
      setSaving(false);
    }
  };

  const deleteRow = async (row) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này khỏi cơ sở dữ liệu?')) return;
    try {
      const id = row._id || row.id;
      if (active === 'plants') await plantApi.deletePlant(id);
      if (active === 'gardeners') await gardenerApi.deleteGardener(id);
      if (active === 'collections') await collectionApi.deleteCollection(id);
      if (active === 'gallery') await galleryApi.deleteGalleryItem(id);
      if (active === 'contacts') await contactApi.deleteContact(id);
      if (active === 'users') await adminApi.deleteUser(id);

      setToast('Đã xóa dữ liệu thành công.');
      await Promise.all([loadResource(active), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể xóa dữ liệu.');
    }
  };

  const toggleStatus = async (row) => {
    try {
      const nextStatus = row.status === 'pending' ? 'resolved' : 'pending';
      await contactApi.updateContactStatus(row._id, nextStatus);
      setToast(`Đã chuyển trạng thái sang: ${nextStatus === 'resolved' ? 'Đã giải quyết' : 'Chờ xử lý'}`);
      await Promise.all([loadResource('contacts'), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể cập nhật trạng thái tin nhắn.');
    }
  };

  const toggleRole = async (row) => {
    try {
      const nextRole = row.role === 'admin' ? 'user' : 'admin';
      await adminApi.updateUserRole(row._id, nextRole);
      setToast(`Đã chuyển vai trò người dùng sang: ${nextRole.toUpperCase()}`);
      await Promise.all([loadResource('users'), loadStats()]);
    } catch (error) {
      setToast(error.message || 'Không thể cập nhật quyền người dùng.');
    }
  };

  const currentDefinition = definitions[active];
  const createAllowed = active !== 'overview' && ['plants', 'gardeners', 'collections', 'gallery'].includes(active) && !apiOffline;
  const resourceRows = useMemo(() => data[active] || [], [active, data]);

  const activeFilter = filterValues[active] || 'all';
  const setModuleFilter = (val) => {
    setFilterValues((curr) => ({ ...curr, [active]: val }));
    setPages((curr) => ({ ...curr, [active]: 1 }));
  };

  const activePage = pages[active] || 1;
  const setModulePage = (p) => {
    setPages((curr) => ({ ...curr, [active]: p }));
  };

  return (
    <div className="min-h-screen bg-[#f8faf6] font-sans text-slate-800 lg:flex antialiased">
      <AdminSidebar
        active={active}
        onSelect={(value) => {
          setActive(value);
          setSearch('');
        }}
        user={user}
        onLogout={() => {
          logout();
          navigate('/login');
        }}
      />

      <div className="min-w-0 flex-1 flex flex-col">
        <AdminHeader
          active={active}
          pendingContacts={stats?.pendingContacts}
          user={user}
          onCreate={openCreate}
          createAllowed={createAllowed}
          search={search}
          onSearch={setSearch}
          onLogout={() => {
            logout();
            navigate('/login');
          }}
          onOpenContacts={() => {
            setActive('contacts');
            setSearch('');
          }}
        />

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8 flex-1">
          {toast && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-900 shadow-xs"
            >
              <span>🌿 {toast}</span>
              <button
                type="button"
                onClick={() => setToast('')}
                className="text-emerald-700 hover:text-emerald-900 p-1"
                aria-label="Đóng thông báo"
              >
                ✕
              </button>
            </div>
          )}

          {active === 'overview' ? (
            <Overview
              stats={stats}
              error={errors.overview}
              onOpenContacts={() => {
                setActive('contacts');
                setSearch('');
              }}
            />
          ) : (
            <ResourcePanel
              title={currentDefinition.title}
              rows={resourceRows}
              fields={currentDefinition.columns}
              loading={loading[active]}
              error={errors[active]}
              offline={apiOffline}
              search={search}
              onSearch={setSearch}
              filterValue={activeFilter}
              filterOptions={currentDefinition.filterOptions}
              onFilterChange={setModuleFilter}
              page={activePage}
              pageSize={10}
              onPageChange={setModulePage}
              onEdit={currentDefinition.fields.length ? openEdit : null}
              onDelete={deleteRow}
              onToggleStatus={active === 'contacts' ? toggleStatus : null}
              onToggleRole={active === 'users' ? toggleRole : null}
            />
          )}
        </main>
      </div>

      <EditorModal
        title={`${editor?.isNew ? 'Thêm ' : 'Cập nhật '} ${definitions[editor?.resource]?.title?.replace('Quản lý ', '') || ''}`}
        fields={definitions[editor?.resource]?.fields || []}
        value={editor?.value}
        onChange={updateEditor}
        onClose={() => {
          setEditor(null);
          setEditorError('');
        }}
        onSubmit={submitEditor}
        saving={saving}
        error={editorError}
      />
    </div>
  );
}

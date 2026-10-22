import React from 'react';

export const MODULES = [
  ['overview', '📊', 'Tổng quan'],
  ['plants', '🪴', 'Cây trồng'],
  ['gardeners', '👨‍🌾', 'Chuyên gia'],
  ['collections', '📚', 'Bộ sưu tập'],
  ['gallery', '🖼️', 'Thư viện'],
  ['contacts', '✉️', 'Liên hệ'],
  ['users', '👤', 'Người dùng'],
];

export function AdminSidebar({ active, onSelect, user, onLogout }) {
  return <aside className="w-full shrink-0 bg-emerald-800 text-white lg:min-h-screen lg:w-64">
    <div className="flex items-center gap-3 border-b border-white/15 px-6 py-6">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-300 text-xl">🌿</span>
      <div><strong className="block text-lg">GreenNest</strong><span className="text-xs text-emerald-100">ADMIN PORTAL</span></div>
    </div>
    <nav className="flex overflow-x-auto p-3 lg:flex-col" aria-label="Quản trị">
      {MODULES.map(([id, icon, label]) => <button key={id} type="button" aria-current={active === id ? 'page' : undefined}
        onClick={() => onSelect(id)}
        className={'flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ' + (active === id ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-50 hover:bg-white/10')}>
        <span>{icon}</span>{label}
      </button>)}
    </nav>
    <div className="hidden border-t border-white/15 p-5 lg:block">
      <p className="truncate text-sm font-semibold">{user?.name || user?.email || 'Administrator'}</p>
      <p className="mb-3 text-xs text-emerald-200">Quản trị viên</p>
      <button type="button" onClick={onLogout} className="text-sm text-emerald-100 underline hover:text-white">Đăng xuất</button>
    </div>
  </aside>;
}

export function AdminHeader({ active, pendingContacts, user, onCreate, createAllowed }) {
  const label = MODULES.find(([id]) => id === active)?.[2] || 'Tổng quan';
  return <header className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 bg-white px-5 py-4 sm:px-8">
    <div><p className="text-sm font-medium text-emerald-700">GreenNest / Quản trị</p><h1 className="text-2xl font-bold text-slate-900">{active === 'overview' ? 'Tổng quan Quản trị' : label}</h1></div>
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-800">✉️ {pendingContacts || 0} chờ xử lý</span>
      <span className="hidden text-sm text-slate-600 sm:block">{user?.name || user?.email}</span>
      {createAllowed && <button type="button" onClick={onCreate} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-800">+ Thêm mới</button>}
    </div>
  </header>;
}

export function Status({ value }) {
  const resolved = ['resolved', 'published', 'admin'].includes(String(value));
  return <span className={'rounded-full px-2.5 py-1 text-xs font-bold ' + (resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800')}>{value || '—'}</span>;
}

export function Overview({ stats, error, onOpenContacts }) {
  const cards = [
    ['🪴', 'Cây trồng', stats?.totalPlants, 'published: ' + (stats?.publishedPlants ?? '—')],
    ['👨‍🌾', 'Chuyên gia', stats?.totalGardeners, 'hồ sơ chuyên môn'],
    ['📚', 'Bộ sưu tập', stats?.totalCollections, 'mùa & nổi bật'],
    ['🖼️', 'Thư viện', stats?.totalGalleryImages, 'hình ảnh'],
    ['✉️', 'Liên hệ', stats?.pendingContacts, 'tin chưa xử lý'],
    ['👤', 'Tài khoản', stats?.totalAccounts, (stats?.totalAdmins ?? '—') + ' admin'],
  ];
  if (error) return <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">Không thể tải dữ liệu quản trị: {error}</section>;
  return <section className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([icon, label, value, hint]) => <article key={label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100"><div className="mb-4 flex items-center justify-between"><span className="text-2xl">{icon}</span><span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span></div><p className="text-3xl font-bold text-slate-900">{value ?? '—'}</p><p className="mt-1 text-sm text-slate-500">{hint}</p></article>)}</div>
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-emerald-100"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-slate-900">Tin nhắn gần đây</h2><button type="button" onClick={onOpenContacts} className="text-sm font-semibold text-emerald-700">Xem tất cả</button></div>{(stats?.recentContacts || []).length ? <ul className="space-y-3">{stats.recentContacts.map(item => <li key={item._id} className="border-b border-slate-100 pb-3 last:border-0"><p className="font-semibold text-slate-800">{item.fullName}</p><p className="truncate text-sm text-slate-500">{item.subject || item.message}</p></li>)}</ul> : <p className="text-sm text-slate-500">Chưa có tin nhắn.</p>}</section>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-emerald-100"><h2 className="mb-4 font-bold text-slate-900">Người dùng mới</h2>{(stats?.recentUsers || []).length ? <ul className="space-y-3">{stats.recentUsers.map(item => <li key={item._id} className="flex justify-between border-b border-slate-100 pb-3 last:border-0"><span><b className="block text-slate-800">{item.fullName}</b><small className="text-slate-500">{item.email}</small></span><span className="text-xs text-slate-400">Mới</span></li>)}</ul> : <p className="text-sm text-slate-500">Chưa có dữ liệu.</p>}</section>
    </div>
  </section>;
}

export function ResourcePanel({ title, rows, fields, loading, error, offline, search, onSearch, onEdit, onDelete, onToggleStatus, onToggleRole }) {
  const visible = rows.filter(row => !search || fields.some(field => String(row[field.key] || '').toLowerCase().includes(search.toLowerCase())));
  return <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100 sm:p-6">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold text-slate-900">{title}</h2><input value={search} onChange={event => onSearch(event.target.value)} placeholder="Tìm kiếm trong mục này…" className="rounded-xl border border-emerald-200 px-3 py-2 text-sm outline-none focus:border-emerald-600" /></div>
    {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">Không thể tải dữ liệu: {error}</p>}
    {offline && <p className="mb-4 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">Backend chưa sẵn sàng; thao tác thay đổi đang bị khóa.</p>}
    <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-emerald-100 text-xs uppercase text-slate-500"><tr>{fields.map(field => <th key={field.key} className="px-3 py-3">{field.label}</th>)}<th className="px-3 py-3 text-right">Hành động</th></tr></thead><tbody>
      {loading ? <tr><td colSpan={fields.length + 1} className="p-8 text-center text-slate-500">Đang tải…</td></tr> : visible.length ? visible.map(row => <tr key={row._id || row.id} className="border-b border-slate-100 last:border-0">{fields.map(field => <td key={field.key} className="max-w-60 px-3 py-3 text-slate-700">{field.status ? <Status value={row[field.key]} /> : field.image ? <img className="h-10 w-10 rounded-lg object-cover" src={row[field.key]} alt="" /> : <span className="line-clamp-2">{field.format ? field.format(row) : row[field.key] || '—'}</span>}</td>)}<td className="whitespace-nowrap px-3 py-3 text-right">{onToggleStatus && <button disabled={offline} onClick={() => onToggleStatus(row)} className="mr-2 text-emerald-700 disabled:text-slate-300">Đổi trạng thái</button>}{onToggleRole && <button disabled={offline} onClick={() => onToggleRole(row)} className="mr-2 text-emerald-700 disabled:text-slate-300">Đổi role</button>}{onEdit && <button disabled={offline} onClick={() => onEdit(row)} className="mr-2 text-blue-700 disabled:text-slate-300">Sửa</button>}<button disabled={offline} onClick={() => onDelete(row)} className="text-red-600 disabled:text-slate-300">Xóa</button></td></tr>) : <tr><td colSpan={fields.length + 1} className="p-8 text-center text-slate-500">Không có dữ liệu phù hợp.</td></tr>}
    </tbody></table></div>
  </section>;
}

export function EditorModal({ title, fields, value, onChange, onClose, onSubmit, saving }) {
  if (!value) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/45 p-4"><form onSubmit={onSubmit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">{title}</h2><button type="button" onClick={onClose} className="text-slate-500">✕</button></div><div className="grid gap-4 sm:grid-cols-2">{fields.map(field => <label key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}><span className="mb-1 block text-sm font-semibold text-slate-700">{field.label}</span>{field.type === 'select' ? <select required={field.required} value={value[field.key] ?? ''} onChange={event => onChange(field.key, event.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5">{field.options.map(option => <option key={option} value={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea required={field.required} value={value[field.key] ?? ''} onChange={event => onChange(field.key, event.target.value)} className="min-h-24 w-full rounded-xl border border-slate-200 p-2.5" /> : <input required={field.required} type={field.type || 'text'} value={value[field.key] ?? ''} onChange={event => onChange(field.key, event.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5" />}</label>)}</div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-slate-600">Hủy</button><button disabled={saving} className="rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white disabled:bg-slate-300">{saving ? 'Đang lưu…' : 'Lưu thay đổi'}</button></div></form></div>;
}

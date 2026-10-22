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
  return (
    <aside className="w-full shrink-0 bg-[#0f3d28] text-white lg:min-h-screen lg:w-64 flex flex-col justify-between shadow-md">
      <div>
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-400 text-slate-900 text-xl font-bold shadow-sm">
            🌿
          </span>
          <div>
            <strong className="block text-lg font-bold tracking-tight text-white">GreenNest</strong>
            <span className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">ADMIN CMS PORTAL</span>
          </div>
        </div>

        <nav className="flex overflow-x-auto p-3 gap-1 lg:flex-col lg:gap-1.5" aria-label="Quản trị">
          {MODULES.map(([id, icon, label]) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelect(id)}
                className={
                  'flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition-all ' +
                  (isActive
                    ? 'bg-white text-emerald-900 shadow-sm font-bold'
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white')
                }
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-5 bg-black/10">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="truncate text-sm font-semibold text-white">{user?.name || user?.email || 'Quản trị viên'}</p>
            <p className="text-xs text-emerald-200">Vai trò: Admin</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-xs text-emerald-100 px-3 py-1.5 font-medium transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AdminHeader({ active, pendingContacts, user, onCreate, createAllowed, search, onSearch, onLogout, onOpenContacts }) {
  const label = MODULES.find(([id]) => id === active)?.[2] || 'Tổng quan';

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 bg-white/95 backdrop-blur-sm px-5 py-3.5 sm:px-8 shadow-xs">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">GreenNest CMS</p>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {active === 'overview' ? 'Tổng quan Quản trị' : label}
          </h1>
        </div>

        {active !== 'overview' && onSearch && (
          <div className="hidden md:block ml-4">
            <input
              type="text"
              value={search || ''}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={`Tìm trong ${label.toLowerCase()}…`}
              className="w-64 rounded-xl border border-emerald-200 bg-[#f8faf6] px-3.5 py-1.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenContacts}
          className="flex items-center gap-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200 transition px-3.5 py-1.5 text-xs font-bold text-yellow-900"
          title="Xem liên hệ chờ xử lý"
        >
          <span>✉️</span>
          <span>{pendingContacts || 0} chờ xử lý</span>
        </button>

        <span className="hidden sm:inline-block text-xs font-medium text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1">
          {user?.name || user?.email || 'Admin'}
        </span>

        {createAllowed && (
          <button
            type="button"
            onClick={onCreate}
            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-sm font-bold text-white shadow-sm transition active:scale-95"
          >
            + Thêm mới
          </button>
        )}

        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}

export function StatusBadge({ value }) {
  const normalized = String(value || '').toLowerCase();
  const isPositive = ['resolved', 'published', 'admin', 'true', 'active'].includes(normalized);
  const isPending = ['pending', 'draft'].includes(normalized);

  const style = isPositive
    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
    : isPending
    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
    : 'bg-slate-100 text-slate-700 border-slate-200';

  const labelMap = {
    published: 'Đã xuất bản',
    draft: 'Bản nháp',
    pending: 'Chờ xử lý',
    resolved: 'Đã giải quyết',
    admin: 'Quản trị viên',
    user: 'Thành viên',
    true: 'Có',
    false: 'Không'
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${style}`}>
      {labelMap[normalized] || value || '—'}
    </span>
  );
}

export function Overview({ stats, error, onOpenContacts }) {
  const cards = [
    {
      icon: '🪴',
      label: 'Cây trồng',
      value: stats?.totalPlants,
      hint: `Đã xuất bản: ${stats?.publishedPlants ?? '—'} | Bản nháp: ${stats?.draftPlants ?? '—'}`
    },
    {
      icon: '👨‍🌾',
      label: 'Chuyên gia',
      value: stats?.totalGardeners,
      hint: 'Hồ sơ chuyên gia & curator'
    },
    {
      icon: '📚',
      label: 'Bộ sưu tập',
      value: stats?.totalCollections,
      hint: 'Bộ sưu tập theo 4 mùa'
    },
    {
      icon: '🖼️',
      label: 'Thư viện ảnh',
      value: stats?.totalGalleryImages,
      hint: 'Tác phẩm nhiếp ảnh Lightbox'
    },
    {
      icon: '✉️',
      label: 'Liên hệ',
      value: stats?.pendingContacts,
      hint: `Chờ xử lý: ${stats?.pendingContacts ?? '—'} | Đã giải quyết: ${stats?.resolvedContacts ?? '—'}`
    },
    {
      icon: '👤',
      label: 'Tài khoản',
      value: stats?.totalAccounts,
      hint: `Admin: ${stats?.totalAdmins ?? '—'} | Người dùng: ${stats?.totalUsers ?? '—'}`
    },
  ];

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
        <h2 className="font-bold text-base mb-1">Không thể kết nối máy chủ quản trị</h2>
        <p className="text-sm">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl bg-white p-5 shadow-xs ring-1 ring-emerald-100 hover:shadow-md transition-shadow"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value ?? '—'}</p>
            <p className="mt-1.5 text-xs font-medium text-slate-500">{card.hint}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-emerald-100">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Tin nhắn liên hệ gần đây</h2>
            <button
              type="button"
              onClick={onOpenContacts}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
            >
              Xem tất cả →
            </button>
          </div>
          {(stats?.recentContacts || []).length ? (
            <ul className="divide-y divide-slate-100">
              {stats.recentContacts.map((item) => (
                <li key={item._id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm text-slate-800">{item.fullName}</p>
                    <StatusBadge value={item.status} />
                  </div>
                  <p className="truncate text-xs font-medium text-slate-600">{item.subject}</p>
                  <p className="truncate text-xs text-slate-400 mt-0.5">{item.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 py-4 text-center">Chưa có tin nhắn liên hệ nào.</p>
          )}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-xs ring-1 ring-emerald-100">
          <h2 className="mb-4 text-base font-bold text-slate-900">Thành viên mới tham gia</h2>
          {(stats?.recentUsers || []).length ? (
            <ul className="divide-y divide-slate-100">
              {stats.recentUsers.map((item) => (
                <li key={item._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <b className="block text-sm font-semibold text-slate-800">{item.fullName}</b>
                    <small className="text-xs text-slate-500">{item.email}</small>
                  </div>
                  <span className="text-xs text-slate-400">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Mới'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 py-4 text-center">Chưa có dữ liệu người dùng mới.</p>
          )}
        </section>
      </div>
    </section>
  );
}

export function ResourcePanel({
  title,
  rows,
  fields,
  loading,
  error,
  offline,
  search,
  onSearch,
  filterValue,
  filterOptions,
  onFilterChange,
  page = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleRole
}) {
  // Client-side filtering when backend handles local array
  const filteredRows = rows.filter((row) => {
    // Filter status / role if selected
    if (filterValue && filterValue !== 'all') {
      const matchStatus = row.status === filterValue;
      const matchRole = row.role === filterValue;
      const matchSeason = row.season === filterValue;
      if (!matchStatus && !matchRole && !matchSeason) return false;
    }
    // Search query match
    if (!search || !search.trim()) return true;
    const q = search.toLowerCase();
    return fields.some((field) => String(row[field.key] || '').toLowerCase().includes(q));
  });

  const total = totalItems ?? filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = totalItems ? filteredRows : filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-xs ring-1 ring-emerald-100 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <span className="text-xs text-slate-500">Tổng cộng: {total} mục</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterOptions && filterOptions.length > 0 && (
            <div className="flex items-center gap-1 bg-[#f8faf6] p-1 rounded-xl border border-emerald-100">
              {filterOptions.map(([optVal, optLabel]) => (
                <button
                  key={optVal}
                  type="button"
                  onClick={() => onFilterChange(optVal)}
                  className={
                    'rounded-lg px-2.5 py-1 text-xs font-semibold transition ' +
                    (filterValue === optVal
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900')
                  }
                >
                  {optLabel}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            value={search || ''}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Tìm kiếm trong danh sách…"
            className="rounded-xl border border-emerald-200 bg-[#f8faf6] px-3.5 py-1.5 text-xs sm:text-sm outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
          <strong>Lỗi nạp dữ liệu:</strong> {error}
        </div>
      )}

      {offline && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs sm:text-sm font-medium text-amber-900">
          ⚠️ Không thể kết nối cơ sở dữ liệu MongoDB; chế độ thao tác ghi tạm thời bị khóa.
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f8faf6] border-b border-emerald-100 text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              {fields.map((field) => (
                <th key={field.key} className="px-3.5 py-3">
                  {field.label}
                </th>
              ))}
              <th className="px-3.5 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={fields.length + 1} className="p-8 text-center text-slate-500">
                  <span className="inline-block animate-pulse font-medium">Đang tải dữ liệu từ máy chủ…</span>
                </td>
              </tr>
            ) : pagedRows.length ? (
              pagedRows.map((row) => (
                <tr key={row._id || row.id} className="hover:bg-emerald-50/40 transition-colors">
                  {fields.map((field) => (
                    <td key={field.key} className="max-w-64 px-3.5 py-3 text-slate-700 text-xs sm:text-sm">
                      {field.status ? (
                        <StatusBadge value={row[field.key]} />
                      ) : field.image ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover border border-slate-200 bg-slate-50"
                          src={row[field.key] || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'}
                          alt=""
                        />
                      ) : (
                        <span className="line-clamp-2">
                          {field.format ? field.format(row) : row[field.key] || '—'}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-3.5 py-3 text-right text-xs">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {onToggleStatus && (
                        <button
                          type="button"
                          disabled={offline}
                          onClick={() => onToggleStatus(row)}
                          className="rounded-lg bg-emerald-50 px-2 py-1 font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-40 transition"
                        >
                          Đổi trạng thái
                        </button>
                      )}
                      {onToggleRole && (
                        <button
                          type="button"
                          disabled={offline}
                          onClick={() => onToggleRole(row)}
                          className="rounded-lg bg-amber-50 px-2 py-1 font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-40 transition"
                        >
                          Đổi role
                        </button>
                      )}
                      {onEdit && (
                        <button
                          type="button"
                          disabled={offline}
                          onClick={() => onEdit(row)}
                          className="rounded-lg bg-blue-50 px-2 py-1 font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-40 transition"
                        >
                          Sửa
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          disabled={offline}
                          onClick={() => onDelete(row)}
                          className="rounded-lg bg-red-50 px-2 py-1 font-semibold text-red-600 hover:bg-red-100 disabled:opacity-40 transition"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length + 1} className="p-8 text-center text-slate-500">
                  Không tìm thấy dữ liệu phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <span>
            Trang {currentPage} / {totalPages} (Tổng số: {total} mục)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              className="rounded-lg border border-slate-200 px-2.5 py-1 font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              ← Trước
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              className="rounded-lg border border-slate-200 px-2.5 py-1 font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              Sau →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function EditorModal({ title, fields, value, onChange, onClose, onSubmit, saving, error }) {
  if (!value) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <form
        onSubmit={onSubmit}
        noValidate
        className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/10"
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Đóng form"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <strong>Lỗi thao tác:</strong> {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const isFullWidth = field.type === 'textarea' || field.fullWidth;
            return (
              <label key={field.key} className={isFullWidth ? 'sm:col-span-2' : ''}>
                <span className="mb-1 block text-xs font-semibold text-slate-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </span>

                {field.type === 'select' ? (
                  <select
                    value={value[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={value[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={value[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                )}
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2 text-sm font-bold text-white shadow-sm disabled:bg-slate-300 transition"
          >
            {saving ? 'Đang lưu…' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import AdminDataTable from './AdminDataTable';
import AdminEditorModal from './AdminEditorModal';
import AdminPageHeader from './AdminPageHeader';
import AdminPagination from './AdminPagination';

const errorMessage = (error) => error?.message || 'The request could not be completed.';

export default function AdminResourcePage({
  title, description, singular, columns, fields, load, create, update, remove,
  filter, prepare = (value) => value, toForm = (value) => value, onMutated, onToast,
}) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState(filter?.defaultValue || 'all');
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);
  const [values, setValues] = useState({});
  const [mutationError, setMutationError] = useState('');
  const [saving, setSaving] = useState(false);
  const filterParam = filter?.param || 'filter';

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await load({ search, [filterParam]: filterValue, page: pagination.page, limit: 10 });
      const data = Array.isArray(response?.data) ? response.data : [];
      setRows(data);
      setPagination((current) => ({ ...current, ...(response?.pagination || {}), totalPages: response?.pagination?.totalPages || 1 }));
    } catch (requestError) {
      setRows([]);
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [filterParam, filterValue, load, pagination.page, search]);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  const visibleRows = useMemo(() => {
    if (!search.trim()) return rows;
    const term = search.toLowerCase();
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(term));
  }, [rows, search]);

  const openCreate = () => {
    const initial = Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? (field.type === 'checkbox' ? false : '')]));
    setValues(initial); setEditor({ mode: 'create' }); setMutationError('');
  };
  const openEdit = (row) => { setValues(toForm(row)); setEditor({ mode: 'edit', row }); setMutationError(''); };
  const closeEditor = () => { if (!saving) setEditor(null); };

  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setMutationError('');
    try {
      const payload = prepare(values);
      if (editor.mode === 'create') await create(payload); else await update(editor.row._id, payload);
      setEditor(null);
      onToast(`${singular} ${editor.mode === 'create' ? 'created' : 'updated'} successfully.`);
      await Promise.all([fetchRows(), onMutated?.()]);
    } catch (requestError) {
      setMutationError(errorMessage(requestError));
    } finally { setSaving(false); }
  };

  const deleteRow = async (row) => {
    if (!window.confirm(`Delete this ${singular.toLowerCase()}? This action cannot be undone.`)) return;
    try {
      await remove(row._id);
      onToast(`${singular} deleted successfully.`);
      await Promise.all([fetchRows(), onMutated?.()]);
    } catch (requestError) { onToast(errorMessage(requestError), 'error'); }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title={title} description={description} />
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,.05)]">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <label className="relative max-w-md flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><span className="sr-only">Search</span><input value={search} onChange={(event) => { setSearch(event.target.value); setPagination((value) => ({ ...value, page: 1 })); }} placeholder={`Search ${title.toLowerCase()}...`} className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500" /></label>
            {filter && <select aria-label={filter.label} value={filterValue} onChange={(event) => { setFilterValue(event.target.value); setPagination((value) => ({ ...value, page: 1 })); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500">{filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>}
          </div>
          <button type="button" disabled={Boolean(error)} onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"><Plus size={17} /> Add {singular}</button>
        </div>
        <AdminDataTable columns={columns} rows={visibleRows} loading={loading} error={error} emptyMessage={`No ${title.toLowerCase()} found.`} actions={(row) => <div className="flex justify-end gap-3"><button type="button" onClick={() => openEdit(row)} className="font-bold text-emerald-700 hover:text-emerald-900">Edit</button><button type="button" onClick={() => deleteRow(row)} className="font-bold text-red-600 hover:text-red-800">Delete</button></div>} />
        {!loading && !error && <AdminPagination page={pagination.page || 1} totalPages={pagination.totalPages || 1} onPageChange={(page) => setPagination((value) => ({ ...value, page }))} />}
      </section>
      <AdminEditorModal open={Boolean(editor)} title={`${editor?.mode === 'edit' ? 'Edit' : 'Add'} ${singular}`} fields={fields} values={values} error={mutationError} saving={saving} onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))} onClose={closeEditor} onSubmit={submit} />
    </div>
  );
}

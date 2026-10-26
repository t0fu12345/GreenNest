import { X } from 'lucide-react';

export default function AdminEditorModal({ open, title, fields, values, error, saving, onChange, onClose, onSubmit }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="admin-editor-title" className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5"><h2 id="admin-editor-title" className="text-xl font-extrabold text-slate-950">{title}</h2><button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div>
        <form onSubmit={onSubmit} className="grid gap-5 p-6 sm:grid-cols-2">
          {fields.map((field) => <label key={field.name} className={`${field.wide ? 'sm:col-span-2' : ''} grid gap-2 text-sm font-bold text-slate-700`}>
            {field.label}{field.type === 'textarea' ? <textarea required={field.required} rows={4} value={values[field.name] ?? ''} onChange={(e) => onChange(field.name, e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500" /> : field.type === 'select' ? <select required={field.required} value={values[field.name] ?? ''} onChange={(e) => onChange(field.name, e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-emerald-500">{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === 'checkbox' ? <input type="checkbox" checked={Boolean(values[field.name])} onChange={(e) => onChange(field.name, e.target.checked)} className="size-5 accent-emerald-600" /> : <input type={field.type || 'text'} required={field.required} value={values[field.name] ?? ''} onChange={(e) => onChange(field.name, e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-emerald-500" />}
          </label>)}
          {error && <p role="alert" className="sm:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 sm:col-span-2"><button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700">Cancel</button><button type="submit" disabled={saving} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button></div>
        </form>
      </section>
    </div>
  );
}

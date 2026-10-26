import AdminStateView from './AdminStateView';

export default function AdminDataTable({ columns, rows, loading, error, emptyMessage, actions }) {
  const state = loading || error || !rows.length;
  return (
    <div className="overflow-x-auto">
      {state ? <AdminStateView loading={loading} error={error} empty={!loading && !error && !rows.length} emptyMessage={emptyMessage} /> : (
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((column) => <th key={column.key} className="border-y border-slate-200 px-5 py-4 font-extrabold">{column.label}</th>)}{actions && <th className="border-y border-slate-200 px-5 py-4 text-right font-extrabold">Actions</th>}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row._id || row.id} className="border-b border-slate-100 hover:bg-emerald-50/30">{columns.map((column) => <td key={column.key} className="px-5 py-4 text-slate-700">{column.render ? column.render(row) : row[column.key] ?? '—'}</td>)}{actions && <td className="whitespace-nowrap px-5 py-4 text-right">{actions(row)}</td>}</tr>)}</tbody>
        </table>
      )}
    </div>
  );
}

export default function AdminPagination({ page = 1, totalPages = 1, onPageChange }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-sm">
      <span className="text-slate-500">Page {page} of {Math.max(totalPages, 1)}</span>
      <div className="flex gap-2">
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}

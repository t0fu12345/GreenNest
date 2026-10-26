export default function AdminToast({ toast, onClose }) {
  if (!toast) return null;
  return <div role="status" className={`fixed bottom-5 right-5 z-[60] max-w-sm rounded-xl border px-4 py-3 text-sm font-bold shadow-xl ${toast.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-white text-emerald-700'}`} onClick={onClose}>{toast.message}</div>;
}

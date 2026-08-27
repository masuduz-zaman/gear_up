export default function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Returned: "bg-slate-100 text-slate-600 ring-slate-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    "Due soon": "bg-orange-50 text-orange-700 ring-orange-200",
    "Low stock": "bg-orange-50 text-orange-700 ring-orange-200",
    Suspended: "bg-rose-50 text-rose-700 ring-rose-200",
    Maintenance: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

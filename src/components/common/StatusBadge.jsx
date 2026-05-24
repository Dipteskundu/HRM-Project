

const CONFIG = {
  Approved: {
    wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dot:     'bg-emerald-500',
    icon:    null,
  },
  Rejected: {
    wrapper: 'border-red-200 bg-red-50 text-red-600',
    dot:     null,
    // circle-X icon
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="6" />
        <path strokeLinecap="round" d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
      </svg>
    ),
  },
  Pending: {
    wrapper: 'border-amber-200 bg-amber-50 text-amber-700',
    dot:     'bg-amber-500',
    icon:    null,
  },
}

export default function StatusBadge({ status }) {
  const cfg = CONFIG[status] || CONFIG.Pending
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.wrapper}`}>
      {cfg.icon
        ? cfg.icon
        : <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      }
      {status}
    </span>
  )
}

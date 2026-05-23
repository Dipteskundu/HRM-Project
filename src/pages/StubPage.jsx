export default function StubPage({ title }) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm px-10 py-14 text-center">


          {/* Icon */}
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>

          {/* Divider */}
          <div className="mx-auto my-5 h-px w-20 bg-slate-800" />

          {/* Message */}
          <p className="text-sm text-slate-500 leading-relaxed">
            This page is currently under development.<br />
            Check back soon for updates.
          </p>

          {/* Status pill */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">Coming Soon</span>
          </div>

        </div>

      </div>
    </div>
  )
}

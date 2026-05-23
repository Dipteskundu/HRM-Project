export default function StubPage({ title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-500">Coming soon.</div>
    </div>
  )
}


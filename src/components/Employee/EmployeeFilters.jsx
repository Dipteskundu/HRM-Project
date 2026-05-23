export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  dateFilterLabel,
  onOpenDateRange,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  setCurrentPageState,
  STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
}) {
  return (
    <div className="w-full lg:w-auto lg:flex-1 grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.7fr_0.8fr]">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPageState(1)
          }}
          placeholder="Search by ID, Name"
          className="block h-10 w-full rounded-xl border-0 bg-slate-100 py-1.5 pl-9 pr-0 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 transition-all"
        />
      </div>

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => {
            onOpenDateRange?.()
            setCurrentPageState(1)
          }}
          className="flex h-10 w-full items-center justify-between gap-3 rounded-xl border-0 bg-slate-100 pl-3 pr-0 text-sm font-medium text-slate-900 transition-all hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          <span className="truncate text-left">{dateFilterLabel || 'Date Range'}</span>
          <span className="inline-flex items-center gap-2 text-slate-400">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
            </svg>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
      </div>

      <div className="relative w-full">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setCurrentPageState(1)
          }}
          className="block h-10 w-full appearance-none rounded-xl border-0 bg-slate-100 py-1.5 pl-3 pr-0 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 transition-all font-medium"
        >
          <option value="" disabled>Status</option>
          <option value="">Clear selection</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="relative w-full">
        <select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value)
            setCurrentPageState(1)
          }}
          className="block h-10 w-full appearance-none rounded-xl border-0 bg-slate-100 py-1.5 pl-3 pr-0 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 transition-all font-medium"
        >
          <option value="" disabled>Department</option>
          <option value="">Clear selection</option>
          {DEPARTMENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

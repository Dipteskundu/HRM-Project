import { Button } from '../common/index.js'

export default function EmployeeHeader({ onExport, onAdd }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 20v-1a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">Employee Time</div>
            <div className="text-sm text-slate-500">Manage your time logs</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
          <Button variant="secondary" size="md" onClick={onExport}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m7 11 5 5 5-5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
            </svg>
            Export Excel
          </Button>

          <Button variant="primary" size="md" onClick={onAdd}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  )
}

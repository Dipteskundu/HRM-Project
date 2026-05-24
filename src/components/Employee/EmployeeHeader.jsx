import { Button } from '../common/index.js'
import { PiDownloadSimple, PiUserPlusFill, PiUsersFill } from 'react-icons/pi'

export default function EmployeeHeader({ onExport, onAdd }) {
  return (
    <div className="rounded-2xl py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Icon box — white card with border, larger to match design */}
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <PiUsersFill className="h-9 w-9 text-indigo-500" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900">Employee Time</div>
            <div className="text-sm text-slate-500">Manage your time logs</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
          <Button variant="secondary" size="md" onClick={onExport}>
            Export Excel
            <PiDownloadSimple className="h-4 w-4" />
          </Button>

          <Button variant="primary" size="md" onClick={onAdd}>
            <PiUserPlusFill className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  )
}

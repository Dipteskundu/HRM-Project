import { deptStyles } from '../../utils/helpers.js'
import { Button, EmptyState, StatusBadge } from '../common/index.js'

export default function EmployeeTable({
  rows,
  getStatus,
  approve,
  reject,
  undo,
  handleEditOpen,
  handleExportRow,
  handleDeleteRow,
  openMenuId,
  setOpenMenuId,
}) {
  if (rows.length === 0) {
    return <EmptyState title="No time logs found" message="Try changing filters." />
  }

  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-[1200px] w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['ID', 'Employee Name', 'Duration', 'Start Time - End Time', 'Due Hours', 'Department', 'Project', 'Notes', 'Action', ''].map((h, idx) => (
                <th key={idx} className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = getStatus(row)
              return (
                <tr key={row.id} className="border-t border-slate-100 bg-white transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-slate-600">#{row.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-normal text-slate-700">{row.employeeName}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{row.duration}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="leading-tight">
                      <div>{row.startTime}</div>
                      <div>{row.endTime}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{row.dueHours}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${deptStyles(row.department)}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      {row.department}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{row.project}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-sm text-slate-600">{row.notes}</td>
                  
                  {/* Actions Column */}
                  <td className="px-4 py-3">
                    {status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="danger" size="sm" onClick={() => reject(row)}>Reject</Button>
                        <Button variant="primary" size="sm" onClick={() => approve(row)}>Approve</Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3">
                        {status === 'Approved' && <StatusBadge status="Approved" />}
                        {status === 'Rejected' && <StatusBadge status="Rejected" />}
                        <Button variant="ghost" size="sm" onClick={() => undo(row)}>Undo</Button>
                      </div>
                    )}
                  </td>
                  
                  {/* Menu Column */}
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-flex row-menu-container">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500/30"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600" fill="currentColor"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>
                      </button>
                      {openMenuId === row.id && (
                        <div className="absolute right-0 top-full z-30 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                          <button onClick={() => { setOpenMenuId(null); handleEditOpen(row); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 6l4 4" /></svg> Edit Info
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button onClick={() => { setOpenMenuId(null); handleExportRow(row, status); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" /><path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" /></svg> Export Excel
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button onClick={() => { setOpenMenuId(null); handleDeleteRow(row); }} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" /><path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 7l1 14h10l1-14" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4h6v3" /></svg> Delete Info
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="grid gap-4 lg:hidden p-4 bg-slate-50">
        {rows.map((row) => {
          const status = getStatus(row)

          // Avatar initials from employee name
          const initials = row.employeeName
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

          // Use application theme color (avoid random department colors on small devices)
          const avatarColor = 'bg-indigo-100 text-indigo-700'

          return (
            <div key={row.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

              {/* ── Header ── */}
              <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold ${avatarColor}`}>
                    {initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{row.employeeName}</div>
                    <div className="mt-0.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                      #{row.id} &bull; {row.department} Department
                    </div>
                  </div>
                </div>
                {/* Status badge */}
                <StatusBadge status={status} />
              </div>

              {/* Divider */}
              <div className="mx-4 h-px bg-slate-100" />

              {/* ── Body ── */}
              <div className="px-4 pt-3 pb-4 space-y-3">

                {/* Duration + Due Hours */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Duration</div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                      {/* Clock icon */}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M12 7v5l3 3" />
                      </svg>
                      {row.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Due Hours</div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                      {/* History icon */}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {row.dueHours}
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Project</div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                    {/* Briefcase icon */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <path strokeLinecap="round" d="M12 12v4M10 14h4" />
                    </svg>
                    {row.project}
                  </div>
                </div>

                {/* Time Log */}
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Time Log</div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                    {/* Arrow-right-to-bracket icon */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3" />
                    </svg>
                    {row.startTime} – {row.endTime}
                  </div>
                </div>

                {/* Notes box */}
                <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">Notes</div>
                  <p className="text-sm italic text-slate-600">"{row.notes}"</p>
                </div>

                {/* ── Action buttons ── */}
                {status === 'Pending' ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="danger"
                      size="md"
                      className="w-full justify-center"
                      onClick={() => reject(row)}
                    >
                      {/* X icon */}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                      onClick={() => approve(row)}
                    >
                      {/* Check-circle icon */}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      Approve
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <Button variant="secondary" size="sm" onClick={() => undo(row)}>
                      Undo
                    </Button>
                    {/* Three-dot menu for non-pending */}
                    <div className="relative inline-flex row-menu-container">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="currentColor">
                          <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                        </svg>
                      </button>
                      {openMenuId === row.id && (
                        <div className="absolute right-0 bottom-full z-30 mb-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                          <button onClick={() => { setOpenMenuId(null); handleEditOpen(row) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" /></svg>
                            Edit Info
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button onClick={() => { setOpenMenuId(null); handleExportRow(row, status) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12" /><path strokeLinecap="round" strokeLinejoin="round" d="m7 10 5 5 5-5" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" /></svg>
                            Export Excel
                          </button>
                          <div className="h-px bg-slate-100" />
                          <button onClick={() => { setOpenMenuId(null); handleDeleteRow(row) }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" /></svg>
                            Delete Info
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

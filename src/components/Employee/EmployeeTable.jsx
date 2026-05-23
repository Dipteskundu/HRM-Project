import { deptStyles } from '../../utils/helpers.js'

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
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center bg-white rounded-xl">
        <svg viewBox="0 0 24 24" className="mb-4 h-12 w-12 text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
        </svg>
        <h3 className="text-sm font-semibold text-slate-900">No time logs found</h3>
        <p className="mt-1 text-sm text-slate-500">Try changing filters.</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-[1200px] w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-200">
              {['ID', 'Employee Name', 'Duration', 'Start Time - End Time', 'Due Hours', 'Department', 'Project', 'Notes', 'Action', ''].map((h, idx) => (
                <th key={idx} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const status = getStatus(row)
              return (
                <tr key={row.id} className="border-t border-slate-100 bg-white transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-slate-600">#{row.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">{row.employeeName}</td>
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
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => reject(row)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Reject</button>
                        <button onClick={() => approve(row)} className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 shadow-sm">Approve</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3">
                        {status === 'Approved' && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Approved</span>
                        )}
                        {status === 'Rejected' && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Rejected</span>
                        )}
                        <button onClick={() => undo(row)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">Undo</button>
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

      <div className="grid gap-3 lg:hidden p-3 bg-slate-50">
        {rows.map((row) => {
          const status = getStatus(row)
          return (
            <div key={row.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500">#{row.id}</div>
                  <div className="text-sm font-semibold text-slate-900">{row.employeeName}</div>
                  <div className="mt-1 text-xs text-slate-600">{row.startTime} – {row.endTime}</div>
                </div>
                {status === 'Approved' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Approved</span>
                )}
                {status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Rejected</span>
                )}
                {status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Pending</span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div><div className="text-[11px] font-semibold text-slate-500">Duration</div><div className="text-sm text-slate-800">{row.duration}</div></div>
                <div><div className="text-[11px] font-semibold text-slate-500">Due Hours</div><div className="text-sm text-slate-800">{row.dueHours}</div></div>
                <div><div className="text-[11px] font-semibold text-slate-500">Department</div><div className="text-sm text-slate-800">{row.department}</div></div>
                <div><div className="text-[11px] font-semibold text-slate-500">Project</div><div className="text-sm text-slate-800">{row.project}</div></div>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                <div className="text-[11px] font-semibold text-slate-500">Notes</div>
                <div className="mt-0.5 text-sm text-slate-700">{row.notes}</div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                {status === 'Pending' ? (
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => reject(row)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Reject</button>
                    <button onClick={() => approve(row)} className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 shadow-sm">Approve</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => undo(row)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">Undo</button>
                  </div>
                )}
                <div className="relative inline-flex row-menu-container">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-600" fill="currentColor"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>
                  </button>
                  {openMenuId === row.id && (
                    <div className="absolute right-0 bottom-full z-30 mb-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
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
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

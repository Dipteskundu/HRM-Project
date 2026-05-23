export default function EmployeeEditModal({ editOpen, setEditOpen, editingRow, setEditingRow, handleEditSubmit }) {
  if (!editOpen || !editingRow) return null

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={() => { setEditOpen(false); setEditingRow(null); }} />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Edit Info (#{editingRow.id})</h3>
              <button onClick={() => { setEditOpen(false); setEditingRow(null); }} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">Employee Name</label>
                <input name="employeeName" defaultValue={editingRow.employeeName} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. Sadik Hasan" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Department</label>
                  <input name="department" defaultValue={editingRow.department} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. Design" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Project</label>
                  <input name="project" defaultValue={editingRow.project} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. HRM Project" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Date</label>
                  <input type="date" name="date" defaultValue={editingRow.date} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Duration</label>
                  <input name="duration" defaultValue={editingRow.duration} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. 03 hr" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Start Time</label>
                  <input name="startTime" defaultValue={editingRow.startTime} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. 08:30 am" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">End Time</label>
                  <input name="endTime" defaultValue={editingRow.endTime} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. 11:30 am" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Due Hours</label>
                  <input name="dueHours" defaultValue={editingRow.dueHours} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="e.g. 05 hr" />
                </div>
                <div />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Notes</label>
                <textarea name="notes" defaultValue={editingRow.notes} className="mt-1 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30" placeholder="Add notes..." />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => { setEditOpen(false); setEditingRow(null); }} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

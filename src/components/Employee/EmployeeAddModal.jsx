import { useMemo, useRef, useState } from 'react'

function PlusButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/40 text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    </button>
  )
}

export default function EmployeeAddModal({
  addOpen,
  setAddOpen,
  handleAddSubmit,
  previewEmployeeId,
  departmentOptions = [],
  projectOptions = [],
}) {
  if (!addOpen) return null

  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)
  const [extraDepartments, setExtraDepartments] = useState([])
  const [extraProjects, setExtraProjects] = useState([])

  const allDepartments = useMemo(() => [...departmentOptions, ...extraDepartments], [departmentOptions, extraDepartments])
  const allProjects = useMemo(() => [...projectOptions, ...extraProjects], [projectOptions, extraProjects])

  function close() {
    setAddOpen(false)
  }

  function addDepartment() {
    const name = window.prompt('Add new department')
    const v = String(name || '').trim()
    if (!v) return
    setExtraDepartments((prev) => (prev.includes(v) ? prev : [...prev, v]))
  }

  function addProject() {
    const name = window.prompt('Add new project')
    const v = String(name || '').trim()
    if (!v) return
    setExtraProjects((prev) => (prev.includes(v) ? prev : [...prev, v]))
  }

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={close} />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white p-8 text-left shadow-2xl transition-all">
            <div className="mb-8 flex items-start justify-between gap-6">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Employee Information</h3>
              <button onClick={close} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" aria-label="Close">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700">Employee ID</label>
                <input
                  readOnly
                  value={previewEmployeeId ? `#${previewEmployeeId}` : ''}
                  className="mt-2 h-12 w-full max-w-[220px] rounded-xl border border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Type Employee Name<span className="text-red-500">*</span></label>
                <input
                  name="employeeName"
                  required
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="e.g. Sadik Hasan"
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Select Department<span className="text-red-500">*</span></label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative flex-1">
                      <select
                        name="department"
                        required
                        defaultValue=""
                        className="block h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-base font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      >
                        <option value="" disabled>Department</option>
                        {allDepartments.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <PlusButton onClick={addDepartment} label="Add department" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Select Project</label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative flex-1">
                      <select
                        name="project"
                        defaultValue=""
                        className="block h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-base font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      >
                        <option value="" disabled>Project</option>
                        {allProjects.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <PlusButton onClick={addProject} label="Add project" />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Select Start Time<span className="text-red-500">*</span></label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      ref={startTimeRef}
                      name="startTime"
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-base font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      placeholder="e.g. 10:15 am"
                      defaultValue="08:30 am"
                    />
                    <PlusButton
                      onClick={() => startTimeRef.current?.focus()}
                      label="Pick start time"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Select End Time</label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      ref={endTimeRef}
                      name="endTime"
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-base font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      placeholder="e.g. 08:15 pm"
                      defaultValue="11:30 am"
                    />
                    <PlusButton
                      onClick={() => endTimeRef.current?.focus()}
                      label="Pick end time"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-end gap-6">
                <button
                  type="button"
                  onClick={close}
                  className="text-base font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

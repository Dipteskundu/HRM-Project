import { useRef, useState } from 'react'
import { Button, FormInput, FormSelect, Modal } from '../common/index.js'

function PlusButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-indigo-500/40 text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
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
  const startTimeRef = useRef(null)
  const endTimeRef   = useRef(null)
  const [extraDepartments, setExtraDepartments] = useState([])
  const [extraProjects,    setExtraProjects]    = useState([])

  const allDepartments = [...departmentOptions, ...extraDepartments]
  const allProjects = [...projectOptions, ...extraProjects]

  function close() { setAddOpen(false) }

  function addDepartment() {
    const v = String(window.prompt('Add new department') || '').trim()
    if (v) setExtraDepartments(prev => prev.includes(v) ? prev : [...prev, v])
  }
  function addProject() {
    const v = String(window.prompt('Add new project') || '').trim()
    if (v) setExtraProjects(prev => prev.includes(v) ? prev : [...prev, v])
  }

  return (
    <Modal open={addOpen} onClose={close} title="Employee Information" maxWidth="max-w-4xl">
      <form onSubmit={handleAddSubmit} className="space-y-6">
        <FormInput
          label="Employee ID"
          readOnly
          value={previewEmployeeId ? `#${previewEmployeeId}` : ''}
          className="max-w-[220px] bg-slate-50 font-semibold"
        />

        <FormInput
          label="Type Employee Name"
          required
          name="employeeName"
          placeholder="e.g. Sadik Hasan"
        />

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Department<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <FormSelect
                name="department"
                required
                defaultValue=""
                placeholder="Department"
                options={allDepartments}
                wrapperClassName="flex-1"
              />
              <PlusButton onClick={addDepartment} label="Add department" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Select Project</label>
            <div className="flex items-center gap-3">
              <FormSelect
                name="project"
                defaultValue=""
                placeholder="Project"
                options={allProjects}
                wrapperClassName="flex-1"
              />
              <PlusButton onClick={addProject} label="Add project" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Start Time<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <FormInput
                ref={startTimeRef}
                name="startTime"
                required
                placeholder="e.g. 10:15 am"
                defaultValue="08:30 am"
                wrapperClassName="flex-1"
              />
              <PlusButton onClick={() => startTimeRef.current?.focus()} label="Pick start time" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Select End Time</label>
            <div className="flex items-center gap-3">
              <FormInput
                ref={endTimeRef}
                name="endTime"
                placeholder="e.g. 08:15 pm"
                defaultValue="11:30 am"
                wrapperClassName="flex-1"
              />
              <PlusButton onClick={() => endTimeRef.current?.focus()} label="Pick end time" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-end gap-6">
          <Button variant="ghost" size="lg" onClick={close}>Cancel</Button>
          <Button variant="primary" size="lg" type="submit">Add Employee</Button>
        </div>
      </form>
    </Modal>
  )
}

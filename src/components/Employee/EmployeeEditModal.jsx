import { Button, FormInput, FormTextarea, Modal } from '../common/index.js'

export default function EmployeeEditModal({ editOpen, setEditOpen, editingRow, setEditingRow, handleEditSubmit }) {
  if (!editOpen || !editingRow) return null

  function close() { setEditOpen(false); setEditingRow(null) }

  return (
    <Modal open={editOpen} onClose={close} title={`Edit Info (#${editingRow.id})`} maxWidth="max-w-lg">
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <FormInput
          label="Employee Name"
          name="employeeName"
          defaultValue={editingRow.employeeName}
          placeholder="e.g. Sadik Hasan"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Department" name="department" defaultValue={editingRow.department} placeholder="e.g. Design" />
          <FormInput label="Project"    name="project"    defaultValue={editingRow.project}    placeholder="e.g. HRM Project" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Date"     name="date"     type="date" defaultValue={editingRow.date} />
          <FormInput label="Duration" name="duration" defaultValue={editingRow.duration} placeholder="e.g. 03 hr" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Start Time" name="startTime" defaultValue={editingRow.startTime} placeholder="e.g. 08:30 am" />
          <FormInput label="End Time"   name="endTime"   defaultValue={editingRow.endTime}   placeholder="e.g. 11:30 am" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Due Hours" name="dueHours" defaultValue={editingRow.dueHours} placeholder="e.g. 05 hr" />
          <div />
        </div>

        <FormTextarea label="Notes" name="notes" defaultValue={editingRow.notes} placeholder="Add notes..." />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button variant="primary" type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}

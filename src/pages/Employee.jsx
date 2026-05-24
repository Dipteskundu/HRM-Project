import { useMemo, useState, useCallback, useEffect } from 'react'
import seed from '../data/employeeData.json'

import { exportEmployeesCsv, range } from '../utils/helpers.js'
import EmployeeHeader from '../components/Employee/EmployeeHeader.jsx'
import EmployeeFilters from '../components/Employee/EmployeeFilters.jsx'
import EmployeeTable from '../components/Employee/EmployeeTable.jsx'
import EmployeeAddModal from '../components/Employee/EmployeeAddModal.jsx'
import EmployeeEditModal from '../components/Employee/EmployeeEditModal.jsx'
import EmployeeDateRangeModal from '../components/Employee/EmployeeDateRangeModal.jsx'

const STORAGE_KEY = 'hrm_employees_v1'
const STATUS_OPTIONS = ['Approved', 'Rejected', 'Pending']
const DEPARTMENT_OPTIONS = ['Design', 'Development', 'Sales', 'Product']
const PROJECT_OPTIONS = ['CRM Project', 'HRM Project']
const DATE_RANGE_OPTIONS = ['All', 'Last 7 Days', 'Last 30 Days', 'Custom']

export default function Employee() {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [dateRangeOpen, setDateRangeOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState({ preset: '', start: '', end: '' })

  const [employees, setEmployees] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && parsed.length) return parsed
      }
    } catch (e) {
      console.error(e)
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    } catch (e) {
      console.error(e)
    }
    return seed
  })

  const [transientStatus, setTransientStatus] = useState({})
  const [openMenuId, setOpenMenuId] = useState(null)

  const previewEmployeeId = useMemo(() => {
    return employees.reduce((m, r) => Math.max(m, Number(r.id) || 0), 1000) + 1
  }, [employees])

  const getStatus = useCallback((row) => {
    return transientStatus[row.id] ?? row.status ?? 'Pending'
  }, [transientStatus])

  function approve(row) {
    setTransientStatus((prev) => ({ ...prev, [row.id]: 'Approved' }))
  }

  function reject(row) {
    setTransientStatus((prev) => ({ ...prev, [row.id]: 'Rejected' }))
  }

  function undo(row) {
    setTransientStatus((prev) => {
      if (!(row.id in prev)) return prev
      const next = { ...prev }
      delete next[row.id]
      return next
    })
  }

  function addEmployee(newRow) {
    setEmployees((prev) => {
      const nextId = prev.reduce((m, r) => Math.max(m, Number(r.id) || 0), 1000) + 1
      const next = [{ ...newRow, id: nextId }, ...prev]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {
        console.error(e)
      }
      return next
    })
  }

  function updateEmployee(id, updates) {
    setEmployees((prev) => {
      const targetId = String(id)
      let changed = false
      const next = prev.map((r) => {
        if (String(r.id) !== targetId) return r
        changed = true
        return { ...r, ...updates, id: r.id }
      })
      if (changed) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (e) {
          console.error(e)
        }
      }
      return next
    })
  }

  function deleteEmployee(id) {
    const targetId = String(id)
    setEmployees((prev) => {
      const next = prev.filter((r) => String(r.id) !== targetId)
      if (next.length !== prev.length) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch (e) {
          console.error(e)
        }
      }
      return next
    })
    setTransientStatus((prev) => {
      if (!(targetId in prev)) return prev
      const next = { ...prev }
      delete next[targetId]
      return next
    })
  }

  const filtered = useMemo(() => {
    let out = employees

    const q = String(searchTerm || '').trim().toLowerCase()
    if (q) {
      out = out.filter((r) => {
        const id = String(r.id ?? '').toLowerCase()
        const name = String(r.employeeName ?? '').toLowerCase()
        return id.includes(q) || name.includes(q)
      })
    }

    if (statusFilter) {
      out = out.filter((r) => {
        const effective = getStatus(r)
        return String(effective) === String(statusFilter)
      })
    }

    if (departmentFilter) {
      out = out.filter((r) => String(r.department) === String(departmentFilter))
    }

    if (dateFilter?.start || dateFilter?.end) {
      const start = dateFilter.start || ''
      const end = dateFilter.end || ''
      out = out.filter((r) => {
        const d = String(r.date || '')
        if (!d) return false
        if (start && d < start) return false
        if (end && d > end) return false
        return true
      })
    }

    return out
  }, [employees, searchTerm, statusFilter, departmentFilter, dateFilter, getStatus])

  const dateFilterLabel = useMemo(() => {
    if (!dateFilter?.preset && !dateFilter?.start && !dateFilter?.end) return 'Date Range'
    if (dateFilter?.preset && dateFilter.preset !== 'Custom') return dateFilter.preset
    const s = dateFilter?.start || 'Start'
    const e = dateFilter?.end || 'End'
    return `${s} → ${e}`
  }, [dateFilter])

  const [currentPageState, setCurrentPageState] = useState(1)
  const pageSize = 8

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(Math.max(1, currentPageState), totalPages)
  
  const rows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  function downloadCsv(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleExport() {
    const csv = exportEmployeesCsv(filtered.map((row) => ({ ...row, status: getStatus(row) })))
    downloadCsv(csv, 'employee-time.csv')
  }

  function handleExportRow(row, status) {
    const csv = exportEmployeesCsv([{ ...row, status }])
    downloadCsv(csv, `employee-time-log-${row.id}.csv`)
  }

  function handleDeleteRow(row) {
    const ok = window.confirm(`Delete time log #${row.id}?`)
    if (!ok) return
    deleteEmployee(row.id)
    setCurrentPageState(1)
  }

  function handleEditOpen(row) {
    setEditingRow(row)
    setEditOpen(true)
  }

  function handleAddSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const employeeName = String(form.get('employeeName') || '').trim()
    const department = String(form.get('department') || '').trim()
    const project = String(form.get('project') || '').trim()
    const startTime = String(form.get('startTime') || '').trim()
    const endTime = String(form.get('endTime') || '').trim()
    if (!employeeName || !department || !startTime) return

    const resolvedProject = project || PROJECT_OPTIONS[0] || 'Project'

    addEmployee({
      employeeName,
      department,
      project: resolvedProject,
      duration: '03 hr',
      startTime,
      endTime: endTime || '11:30 am',
      dueHours: '05 hr',
      notes: 'Working on Data Management...',
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10),
    })
    setAddOpen(false)
    setCurrentPageState(1)
    e.currentTarget.reset()
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    if (!editingRow) return
    const form = new FormData(e.currentTarget)
    const employeeName = String(form.get('employeeName') || '').trim()
    const department = String(form.get('department') || '').trim()
    const project = String(form.get('project') || '').trim()
    if (!employeeName || !department || !project) return

    updateEmployee(editingRow.id, {
      employeeName,
      department,
      project,
      date: String(form.get('date') || editingRow.date || '').trim(),
      duration: String(form.get('duration') || '').trim(),
      startTime: String(form.get('startTime') || '').trim(),
      endTime: String(form.get('endTime') || '').trim(),
      dueHours: String(form.get('dueHours') || '').trim(),
      notes: String(form.get('notes') || '').trim(),
    })
    setEditOpen(false)
    setEditingRow(null)
  }

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!e.target.closest('.row-menu-container')) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  return (
    <div className="space-y-6">
      <EmployeeHeader onExport={handleExport} onAdd={() => setAddOpen(true)} />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Filters row */}
        <div className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm font-bold text-slate-900">Employee Time Logs</div>
          <EmployeeFilters
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            dateFilterLabel={dateFilterLabel}
            onOpenDateRange={() => setDateRangeOpen(true)}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
            setCurrentPageState={setCurrentPageState}
            STATUS_OPTIONS={STATUS_OPTIONS}
            DEPARTMENT_OPTIONS={DEPARTMENT_OPTIONS}
          />
        </div>

        {/* Table — full width, no extra padding */}
        <div className="border-t border-slate-100 overflow-hidden">
          <EmployeeTable
            rows={rows} getStatus={getStatus}
            approve={approve} reject={reject} undo={undo}
            handleEditOpen={handleEditOpen} handleExportRow={handleExportRow} handleDeleteRow={handleDeleteRow}
            openMenuId={openMenuId} setOpenMenuId={setOpenMenuId}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100">
              <button type="button" onClick={() => setCurrentPageState(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-50">← Previous</button>
              <div className="flex items-center gap-1">
                {Math.max(1, currentPage - 2) > 1 && (
                  <><button type="button" onClick={() => setCurrentPageState(1)} className={`h-8 w-8 rounded-md text-sm transition-colors ${currentPage === 1 ? 'border border-slate-200 bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>1</button><span className="px-1 text-slate-400">…</span></>
                )}
                {range(Math.max(1, currentPage - 2), Math.min(totalPages, currentPage + 2)).map((page) => (
                  <button key={page} type="button" onClick={() => setCurrentPageState(page)} className={`h-8 w-8 rounded-md text-sm transition-colors ${page === currentPage ? 'border border-slate-200 bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>{page}</button>
                ))}
                {Math.min(totalPages, currentPage + 2) < totalPages && (
                  <><span className="px-1 text-slate-400">…</span><button type="button" onClick={() => setCurrentPageState(totalPages)} className={`h-8 w-8 rounded-md text-sm transition-colors ${currentPage === totalPages ? 'border border-slate-200 bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>{totalPages}</button></>
                )}
              </div>
              <button type="button" onClick={() => setCurrentPageState(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-50">Next →</button>
            </div>
          )}
      </div>

      <EmployeeAddModal
        addOpen={addOpen}
        setAddOpen={setAddOpen}
        handleAddSubmit={handleAddSubmit}
        previewEmployeeId={previewEmployeeId}
        departmentOptions={DEPARTMENT_OPTIONS}
        projectOptions={PROJECT_OPTIONS}
      />
      <EmployeeEditModal editOpen={editOpen} setEditOpen={setEditOpen} editingRow={editingRow} setEditingRow={setEditingRow} handleEditSubmit={handleEditSubmit} />

      <EmployeeDateRangeModal
        open={dateRangeOpen}
        onClose={() => setDateRangeOpen(false)}
        value={dateFilter}
        options={DATE_RANGE_OPTIONS}
        onApply={(next) => {
          setDateFilter(next)
          setCurrentPageState(1)
        }}
      />
    </div>
  )
}

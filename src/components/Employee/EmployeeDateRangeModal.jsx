import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/* ── helpers ── */
function isoToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function addDays(iso, days) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function clampRange(start, end) {
  if (!start && !end) return { start: '', end: '' }
  if (start && end && start > end) return { start: end, end: start }
  return { start: start || '', end: end || '' }
}
function toDisplay(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${m}/${d}/${y}`
}

const DAY_NAMES  = ['Su','Mo','Tu','We','Th','Fr','Sa']
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December']

/* ── Floating calendar rendered via portal ── */
function CalendarPortal({ value, onChange, onClose, anchorRef }) {
  const today = isoToday()
  const initial = value || today
  const [year,  setYear]  = useState(Number(initial.slice(0, 4)))
  const [month, setMonth] = useState(Number(initial.slice(5, 7)) - 1)
  const [pos,   setPos]   = useState({ top: 0, left: 0 })
  const calRef = useRef(null)

  /* Position the calendar below the anchor field */
  useEffect(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const calH = 320 // approx calendar height
    const spaceBelow = window.innerHeight - rect.bottom
    const top = spaceBelow >= calH
      ? rect.bottom + 6
      : rect.top - calH - 6
    setPos({ top, left: rect.left })
  }, [anchorRef])

  /* Close on outside click */
  useEffect(() => {
    function handler(e) {
      if (calRef.current && !calRef.current.contains(e.target) &&
          anchorRef.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorRef])

  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevMonthDays - i, current: false })
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, current: true })
  const trailing = 42 - cells.length
  for (let d = 1; d <= trailing; d++)
    cells.push({ day: d, current: false })

  const selectedDay = value && value.slice(0, 7) === `${year}-${String(month + 1).padStart(2, '0')}`
    ? Number(value.slice(8)) : null
  const todayDay = today.slice(0, 7) === `${year}-${String(month + 1).padStart(2, '0')}`
    ? Number(today.slice(8)) : null

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1)
  }
  function selectDay(d) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    onChange(iso)
    onClose()
  }

  return createPortal(
    <div
      ref={calRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999, width: 280 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-2xl p-4"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800">
          {MONTH_NAMES[month]} {year}
          <svg viewBox="0 0 20 20" fill="currentColor" className="inline ml-1 h-3.5 w-3.5 text-slate-500">
            <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
          <button type="button" onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cell, i) => {
          const isSel   = cell.current && cell.day === selectedDay
          const isToday = cell.current && cell.day === todayDay
          return (
            <button
              key={i}
              type="button"
              disabled={!cell.current}
              onClick={() => cell.current && selectDay(cell.day)}
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors
                ${!cell.current
                  ? 'text-slate-300 cursor-default'
                  : isSel
                    ? 'bg-indigo-600 text-white font-semibold'
                    : isToday
                      ? 'border-2 border-indigo-400 text-indigo-600 font-semibold hover:bg-indigo-50'
                      : 'text-slate-700 hover:bg-slate-100 font-medium'
                }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
        <button type="button" onClick={() => { onChange(''); onClose() }}
          className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
          Clear
        </button>
        <button type="button" onClick={() => { onChange(today); onClose() }}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          Today
        </button>
      </div>
    </div>,
    document.body
  )
}

/* ── Date field with floating calendar ── */
function DateField({ label, value, onChange }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div ref={triggerRef}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className={`flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-base font-medium transition-colors
            ${open ? 'border-indigo-400 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <span className={value ? 'text-slate-700' : 'text-slate-400'}>
            {value ? toDisplay(value) : 'mm/dd/yyyy'}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            <circle cx="8" cy="15" r="1" fill="currentColor" />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
            <circle cx="16" cy="15" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>

      {open && (
        <CalendarPortal
          value={value}
          onChange={onChange}
          onClose={() => setOpen(false)}
          anchorRef={triggerRef}
        />
      )}
    </div>
  )
}

/* ── Main modal ── */
export default function EmployeeDateRangeModal({
  open,
  onClose,
  value,
  onApply,
  options = ['All', 'Last 7 Days', 'Last 30 Days', 'Custom'],
}) {
  const initial = useMemo(() => ({
    preset: value?.preset || '',
    start:  value?.start  || '',
    end:    value?.end    || '',
  }), [value])

  const [preset, setPreset] = useState(initial.preset)
  const [start,  setStart]  = useState(initial.start)
  const [end,    setEnd]    = useState(initial.end)

  useEffect(() => {
    if (!open) return
    setPreset(initial.preset)
    setStart(initial.start)
    setEnd(initial.end)
  }, [open, initial.preset, initial.start, initial.end])

  if (!open) return null

  function close() { onClose?.() }

  function applyPreset(nextPreset) {
    const today = isoToday()
    if (nextPreset === 'All')          { setStart(''); setEnd(''); return }
    if (nextPreset === 'Last 7 Days')  { setStart(addDays(today, -6));  setEnd(today); return }
    if (nextPreset === 'Last 30 Days') { setStart(addDays(today, -29)); setEnd(today); return }
  }

  function handlePresetChange(next) {
    setPreset(next)
    applyPreset(next)
  }

  function apply() {
    const next = clampRange(start, end)
    onApply?.({ preset, start: next.start, end: next.end })
    close()
  }

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={close} />

      {/* Modal — centered, fixed height, no overflow clipping */}
      <div className="fixed inset-0 z-10 flex items-start justify-center pt-20 px-4 pb-10 overflow-y-auto">
        <div className="relative w-full max-w-3xl rounded-3xl bg-white p-8 text-left shadow-2xl">

          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute right-5 top-5 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fields */}
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
            {/* Preset */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Date Range</label>
              <div className="relative">
                <select
                  value={preset}
                  onChange={(e) => handlePresetChange(e.target.value)}
                  className="block h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="" disabled>Select</option>
                  {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <DateField label="Start date" value={start} onChange={setStart} />
            <DateField label="End date"   value={end}   onChange={setEnd}   />
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button type="button" onClick={close}
              className="px-5 py-2.5 text-base font-semibold text-slate-600 hover:text-slate-800 transition-colors">
              Cancel
            </button>
            <button type="button" onClick={apply}
              className="rounded-xl bg-indigo-600 px-10 py-2.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40">
              Apply
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

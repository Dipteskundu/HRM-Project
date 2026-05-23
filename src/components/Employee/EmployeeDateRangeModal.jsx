import { useEffect, useMemo, useRef, useState } from 'react'

function isoToday() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10)
}

function addDays(iso, days) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function clampRange(start, end) {
  if (!start && !end) return { start: '', end: '' }
  if (start && end && start > end) return { start: end, end: start }
  return { start: start || '', end: end || '' }
}

function CalendarButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
      </svg>
    </button>
  )
}

export default function EmployeeDateRangeModal({
  open,
  onClose,
  value,
  onApply,
  options = ['All', 'Last 7 Days', 'Last 30 Days', 'Custom'],
}) {
  const startRef = useRef(null)
  const endRef = useRef(null)

  const initial = useMemo(() => {
    return {
      preset: value?.preset || '',
      start: value?.start || '',
      end: value?.end || '',
    }
  }, [value])

  const [preset, setPreset] = useState(initial.preset)
  const [start, setStart] = useState(initial.start)
  const [end, setEnd] = useState(initial.end)

  useEffect(() => {
    if (!open) return
    setPreset(initial.preset)
    setStart(initial.start)
    setEnd(initial.end)
  }, [open, initial.preset, initial.start, initial.end])

  if (!open) return null

  function close() {
    onClose?.()
  }

  function applyPreset(nextPreset) {
    const today = isoToday()
    if (nextPreset === 'All') {
      setStart('')
      setEnd('')
      return
    }
    if (nextPreset === 'Last 7 Days') {
      setStart(addDays(today, -6))
      setEnd(today)
      return
    }
    if (nextPreset === 'Last 30 Days') {
      setStart(addDays(today, -29))
      setEnd(today)
      return
    }
  }

  function handlePresetChange(next) {
    setPreset(next)
    applyPreset(next)
  }

  function apply() {
    const next = clampRange(start, end)
    onApply?.({
      preset,
      start: next.start,
      end: next.end,
    })
    close()
  }

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={close} />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white p-8 text-left shadow-2xl transition-all">
            <button onClick={close} className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors" aria-label="Close">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
              <div>
                <label className="text-sm font-semibold text-slate-700">Date Range</label>
                <div className="relative mt-2">
                  <select
                    value={preset}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="block h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="" disabled>Select</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Start date</label>
                <div className="relative mt-2">
                  <input
                    ref={startRef}
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="block h-12 w-full rounded-xl border border-slate-200 px-4 pr-11 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <CalendarButton
                    label="Pick start date"
                    onClick={() => {
                      const el = startRef.current
                      if (!el) return
                      el.showPicker?.()
                      el.focus()
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">End date</label>
                <div className="relative mt-2">
                  <input
                    ref={endRef}
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="block h-12 w-full rounded-xl border border-slate-200 px-4 pr-11 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                  <CalendarButton
                    label="Pick end date"
                    onClick={() => {
                      const el = endRef.current
                      if (!el) return
                      el.showPicker?.()
                      el.focus()
                    }}
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
                type="button"
                onClick={apply}
                className="rounded-xl bg-indigo-600 px-10 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


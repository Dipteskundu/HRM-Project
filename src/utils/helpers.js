export function daysBetween(dateA, dateB) {
  const a = new Date(dateA)
  const b = new Date(dateB)
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utcB - utcA) / (24 * 60 * 60 * 1000))
}

export function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

export function exportEmployeesCsv(rows) {
  const headers = [
    'id', 'employeeName', 'duration', 'startTime', 'endTime', 
    'dueHours', 'department', 'project', 'notes', 'status', 'date'
  ]
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(','))
  }
  return lines.join('\n')
}

export function deptStyles(department) {
  const map = {
    Design: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Development: 'bg-blue-50 text-blue-700 border-blue-200',
    Product: 'bg-amber-50 text-amber-700 border-amber-200',
    Sales: 'bg-purple-50 text-purple-700 border-purple-200',
  }
  return map[department] || 'bg-slate-50 text-slate-700 border-slate-200'
}

export function range(from, to) {
  const out = []
  for (let i = from; i <= to; i += 1) out.push(i)
  return out
}

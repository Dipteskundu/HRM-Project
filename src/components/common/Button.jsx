/**
 * Button — reusable button with variant support.
 *
 * variants: 'primary' | 'secondary' | 'ghost' | 'danger'
 * sizes:    'sm' | 'md' | 'lg'
 */

const BASE = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'

const VARIANTS = {
  primary:   'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500/40',
  secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:ring-indigo-500/30',
  ghost:     'text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:ring-slate-300',
  danger:    'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400/30',
  dark:      'bg-slate-900 text-white shadow-sm hover:bg-slate-700 focus:ring-slate-500/40',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

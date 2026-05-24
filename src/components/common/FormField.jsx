

const INPUT_BASE =
  'w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors'


export function FormLabel({ children, required, className = '' }) {
  return (
    <label className={`block text-sm font-semibold text-slate-700 ${className}`}>
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  )
}


export function FormInput({ label, required, className = '', wrapperClassName = '', ...props }) {
  return (
    <div className={wrapperClassName}>
      {label && <FormLabel required={required} className="mb-2">{label}</FormLabel>}
      <input
        required={required}
        className={`${INPUT_BASE} h-12 ${className}`}
        {...props}
      />
    </div>
  )
}


export function FormSelect({ label, required, options = [], placeholder, className = '', wrapperClassName = '', ...props }) {
  return (
    <div className={wrapperClassName}>
      {label && <FormLabel required={required} className="mb-2">{label}</FormLabel>}
      <div className="relative">
        <select
          required={required}
          className={`block h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors ${className}`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt
            const label = typeof opt === 'object' ? opt.label : opt
            return <option key={value} value={value}>{label}</option>
          })}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 7.97a.75.75 0 0 1 1.06 0L10 11.69l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}


export function FormTextarea({ label, required, className = '', wrapperClassName = '', ...props }) {
  return (
    <div className={wrapperClassName}>
      {label && <FormLabel required={required} className="mb-2">{label}</FormLabel>}
      <textarea
        required={required}
        className={`${INPUT_BASE} min-h-24 py-3 ${className}`}
        {...props}
      />
    </div>
  )
}


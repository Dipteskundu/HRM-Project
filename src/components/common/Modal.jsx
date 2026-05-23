import CloseButton from './CloseButton.jsx'

/**
 * Modal — backdrop + centered card wrapper used by all modals.
 *
 * Props:
 *   open       — boolean, controls visibility
 *   onClose    — called when backdrop or close button is clicked
 *   title      — optional string shown in the header
 *   maxWidth   — Tailwind max-w class, default 'max-w-lg'
 *   children   — modal body content
 */
export default function Modal({
  open,
  onClose,
  title,
  maxWidth = 'max-w-lg',
  children,
}) {
  if (!open) return null

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Scroll container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className={`relative w-full ${maxWidth} transform overflow-hidden rounded-3xl bg-white p-8 text-left shadow-2xl transition-all`}>

            {/* Header */}
            {(title || onClose) && (
              <div className="mb-6 flex items-start justify-between gap-4">
                {title && (
                  <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                )}
                {onClose && (
                  <CloseButton
                    onClick={(e) => { e.stopPropagation(); onClose() }}
                    className="ml-auto flex-shrink-0"
                  />
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

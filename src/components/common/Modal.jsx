import CloseButton from './CloseButton.jsx'


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
      
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className={`relative w-full ${maxWidth} transform rounded-3xl bg-white p-8 text-left shadow-2xl transition-all sm:my-8`}>

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

            <div className="max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {children}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


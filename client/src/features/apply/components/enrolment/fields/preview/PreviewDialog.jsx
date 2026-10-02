import { useEffect, useRef } from 'react'
import { CloseIcon } from '@/shared/components/icons'

// Full-size look at an uploaded file in a modal <dialog> (Esc, the close button or a click on the
// backdrop closes it). Images show whole; PDFs open in the browser's own viewer.
export function PreviewDialog({ src, name, pdf, onClose }) {
  const ref = useRef(null)
  // No close() on cleanup: it fires `close` (→ onClose), and React's dev double-run would shut the
  // dialog at once. Removing an open dialog from the page closes it anyway.
  useEffect(() => {
    if (!ref.current.open) ref.current.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label={`Preview of ${name}`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-full max-w-4xl rounded-3xl bg-surface p-0 shadow-elevated backdrop:bg-secondary/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line-soft px-5 py-3.5">
        <p className="min-w-0 flex-1 truncate font-heading font-semibold text-secondary">{name}</p>
        <button
          type="button" onClick={onClose} aria-label="Close preview" autoFocus
          className="grid size-9 shrink-0 place-items-center rounded-full text-ink-subtle ring-1 ring-line transition hover:text-secondary hover:ring-secondary"
        >
          <CloseIcon className="size-4.5" />
        </button>
      </div>
      <div className="grid place-items-center bg-surface-alt p-4">
        {pdf ? (
          <iframe src={src} title={name} className="h-[75vh] w-full rounded-xl bg-surface" />
        ) : (
          <img src={src} alt={name} className="max-h-[75vh] max-w-full rounded-xl object-contain" />
        )}
      </div>
    </dialog>
  )
}

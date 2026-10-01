import { useState } from 'react'
import { TrashIcon } from '@/shared/components/icons'

// Two-step delete: the first click asks, the second archives (the course leaves the site and this list).
export function ArchiveButton({ title, onConfirm, pending }) {
  const [asking, setAsking] = useState(false)

  if (asking) {
    return (
      <span className="flex items-center gap-1">
        <button type="button" onClick={onConfirm} disabled={pending} className="rounded-lg bg-danger px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-danger-hover disabled:opacity-60">
          {pending ? 'Deleting…' : 'Delete'}
        </button>
        <button type="button" onClick={() => setAsking(false)} className="rounded-lg px-2 py-1.5 text-xs font-semibold text-ink-muted hover:bg-surface-muted">
          Keep
        </button>
      </span>
    )
  }
  return (
    <button type="button" onClick={() => setAsking(true)} aria-label={`Delete ${title}`} title="Delete" className="grid size-9 place-items-center rounded-lg bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white">
      <TrashIcon className="size-4.5" />
    </button>
  )
}

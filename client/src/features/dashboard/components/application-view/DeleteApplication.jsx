import { useState } from 'react'
import { TrashIcon } from '@/shared/components/icons'

const pill = 'inline-flex items-center gap-2 rounded-pill px-5 py-2.5 font-heading font-semibold transition'

// Header delete button: first click asks "Delete for good?", the second deletes.
export function DeleteApplication({ onConfirm, pending }) {
  const [asking, setAsking] = useState(false)
  if (!asking) {
    return (
      <button type="button" onClick={() => setAsking(true)} className={`${pill} bg-danger-soft text-danger-ink hover:bg-danger hover:text-white`}>
        <TrashIcon className="size-4.5" /> Delete
      </button>
    )
  }
  return (
    <span className="flex items-center gap-2">
      <span className="text-sm text-ink-muted">Delete for good?</span>
      <button type="button" onClick={onConfirm} disabled={pending} className={`${pill} bg-danger text-white hover:bg-danger-hover disabled:opacity-60`}>
        {pending ? 'Deleting…' : 'Delete'}
      </button>
      <button type="button" onClick={() => setAsking(false)} className={`${pill} text-secondary ring-1 ring-line hover:bg-surface-muted`}>
        Keep
      </button>
    </span>
  )
}

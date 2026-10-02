import { useState } from 'react'
import { ImageIcon, TrashIcon } from '@/shared/components/icons'

// The paper form's "Agent's Stamp" box: the agent adds a photo or scan of their stamp, shown inside the
// box. UI only, like the document picker: the image stays in this page and is not saved with the draft.
export function AgentStamp({ className = '' }) {
  const [url, setUrl] = useState('')
  const show = (next) => setUrl((old) => {
    if (old) URL.revokeObjectURL(old)
    return next
  })
  const pick = (e) => {
    const file = e.target.files[0]
    if (file) show(URL.createObjectURL(file))
    e.target.value = ''
  }

  return (
    <div className={className}>
      <p id="agent-stamp-label" className="font-heading text-sm font-semibold text-secondary">Agent's stamp</p>
      <div className="mt-1.5 flex flex-wrap items-start gap-3">
        <label className="relative grid h-36 w-full max-w-sm cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-secondary bg-surface transition hover:bg-surface-alt has-focus-visible:shadow-focus-success">
          <span className="absolute right-3 top-2 text-sm text-ink-disabled">Agent's Stamp</span>
          {url ? (
            <img src={url} alt="Agent's stamp" className="max-h-28 max-w-[85%] object-contain" />
          ) : (
            <span className="flex flex-col items-center gap-1.5 text-center text-sm text-ink-subtle">
              <ImageIcon className="size-6 text-secondary-muted" />
              Add a photo or scan of the stamp
            </span>
          )}
          <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={pick} aria-labelledby="agent-stamp-label" className="sr-only" />
        </label>
        {url && (
          <button type="button" onClick={() => show('')}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-ink-subtle transition hover:bg-danger-soft hover:text-danger-ink">
            <TrashIcon className="size-4" /> Remove
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-ink-subtle">JPG or PNG. Leave blank if you are not applying through an agent.</p>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useTaxonomyMutations } from '../../hooks/useTaxonomyMutations'
import { controlClass } from './fields/fieldStyles'

// Small panel under the "+" button: create a study area / level without leaving the course form.
// On success the new item is passed to onCreated (which selects it) and the panel closes.
export function QuickAddTaxonomy({ type, page, onCreated, onClose }) {
  const [label, setLabel] = useState('')
  const { create } = useTaxonomyMutations(type)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // A plain div (not a nested <form>): Enter in the name field adds the item.
  const add = () => {
    if (!label.trim()) return
    create.mutate({ label: label.trim() }, { onSuccess: (item) => { onCreated(item); onClose() } })
  }

  return (
    <div role="dialog" aria-label={`New ${page.noun}`} className="absolute top-full right-0 z-40 mt-2 grid w-80 max-w-[calc(100vw-3rem)] gap-3 rounded-xl bg-surface p-4 shadow-elevated ring-1 ring-line motion-safe:animate-[fade-in_120ms_ease-out]">
      <p className="font-heading text-sm font-semibold text-secondary">New {page.noun}</p>
      <input
        autoFocus
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        placeholder={page.placeholder}
        aria-label={`Name of the new ${page.noun}`}
        maxLength={80}
        className={controlClass}
      />
      {create.isError && <p role="alert" className="text-sm text-danger-ink">{create.error.message}</p>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="h-9 rounded-lg px-3 text-sm font-semibold text-ink-muted hover:bg-surface-muted">Cancel</button>
        <button type="button" onClick={add} disabled={!label.trim() || create.isPending} className="h-9 rounded-lg bg-secondary px-4 text-sm font-semibold text-white hover:bg-secondary-dark disabled:opacity-50">
          {create.isPending ? 'Adding…' : 'Add'}
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { PlusIcon } from '@/shared/components/icons'
import { controlClass } from '../course-form/fields/fieldStyles'

// "Add a study area / level": type a name; Enter or the button adds it.
export function AddTaxonomyForm({ page, mutation }) {
  const [label, setLabel] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!label.trim()) return
    mutation.mutate({ label: label.trim() }, { onSuccess: () => setLabel('') })
  }

  return (
    <form onSubmit={submit} className="grid gap-4 border-b border-line px-5 py-5 sm:px-7">
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1 basis-60">
          <span className="mb-1.5 block font-heading text-sm font-semibold text-secondary">New {page.noun}</span>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder={page.placeholder} maxLength={80} className={controlClass} />
        </label>
        <button type="submit" disabled={!label.trim() || mutation.isPending} className="flex h-11 items-center gap-2 rounded-xl bg-secondary px-5 font-heading text-sm font-semibold text-white transition hover:bg-secondary-dark disabled:opacity-50">
          <PlusIcon className="size-4" /> {mutation.isPending ? 'Adding…' : `Add ${page.noun}`}
        </button>
      </div>
      {mutation.isError && <p role="alert" className="text-sm text-danger-ink">{mutation.error.message}</p>}
    </form>
  )
}

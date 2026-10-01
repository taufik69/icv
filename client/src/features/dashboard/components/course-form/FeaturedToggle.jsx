import { useId } from 'react'

// "Show on home page" checkbox: featured courses appear in "Our popular courses" on the home page.
export function FeaturedToggle({ checked, onChange }) {
  const id = useId()
  return (
    <div className="flex items-start gap-3 rounded-xl bg-surface-alt p-4 ring-1 ring-line">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-describedby={`${id}-hint`} className="mt-0.5 size-5 shrink-0 accent-secondary" />
      <div>
        <label htmlFor={id} className="font-heading text-sm font-semibold text-secondary">Show on home page</label>
        <p id={`${id}-hint`} className="mt-0.5 text-xs text-ink-subtle">Adds the course to "Our popular courses" (up to 8 are shown). Only active courses appear.</p>
      </div>
    </div>
  )
}

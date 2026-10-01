import { lazy, Suspense, useId } from 'react'
import { labelClass } from '../course-form/fields/fieldStyles'

const RichTextEditor = lazy(() => import('./RichTextEditor').then((m) => ({ default: m.RichTextEditor })))

// Labelled rich text field. The editor loads on demand; a same-sized placeholder holds its place meanwhile.
export function RichTextField({ label, hint, value, onChange, placeholder }) {
  const id = useId()
  return (
    <div>
      <p id={`${id}-label`} className={labelClass}>{label}</p>
      <Suspense fallback={<div className="skeleton h-72 rounded-xl" />}>
        <RichTextEditor labelledBy={`${id}-label`} value={value} onChange={onChange} placeholder={placeholder} describedBy={hint ? `${id}-hint` : undefined} />
      </Suspense>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-subtle">{hint}</p>}
    </div>
  )
}

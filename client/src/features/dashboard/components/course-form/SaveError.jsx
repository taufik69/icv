import { useEffect, useRef } from 'react'

// Fields whose messages don't already name them (required-field messages do: "Course title is required").
const LABELS = { externalUrl: 'External page', 'detail.guideUrl': 'Course guide link', summary: 'Card summary' }
const withLabel = (field, msg) => {
  const text = Array.isArray(msg) ? msg.join(', ') : msg
  const label = LABELS[field]
  return label && !text.startsWith(label) ? `${label}: ${text}` : text
}

// Save problems: the form's own checks or the API's answer, with each field problem named.
export function SaveError({ error }) {
  const ref = useRef(null)
  useEffect(() => {
    if (error) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [error])
  if (!error) return null
  const details = Object.entries(error.details ?? {})
  return (
    <div ref={ref} role="alert" className="rounded-2xl bg-danger-soft px-5 py-4 text-danger-ink ring-1 ring-danger/30">
      <p className="font-semibold">{details.length ? "Couldn't save. Fix these and try again:" : `Couldn't save: ${error.message}`}</p>
      {details.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm">
          {details.map(([field, msg]) => <li key={field}>{withLabel(field, msg)}</li>)}
        </ul>
      )}
    </div>
  )
}

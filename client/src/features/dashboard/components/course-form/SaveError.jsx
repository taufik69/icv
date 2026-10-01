import { useEffect, useRef } from 'react'

// API error after a save: the message, then each field problem the server reported.
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
          {details.map(([field, msg]) => <li key={field}>{Array.isArray(msg) ? msg.join(', ') : msg}</li>)}
        </ul>
      )}
    </div>
  )
}

import { labelClass } from './fieldStyles'

// Label + control + optional hint. Every dashboard field is wrapped in this.
export function FieldShell({ id, label, hint, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {children}
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-subtle">{hint}</p>}
    </div>
  )
}

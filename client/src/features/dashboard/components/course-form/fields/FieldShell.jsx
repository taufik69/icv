import { RequiredMark } from './RequiredMark'
import { labelClass } from './fieldStyles'

// Label + control + optional hint. Every dashboard field is wrapped in this.
// `required` adds a red asterisk; the control's own `required` attribute tells screen readers.
// `error` shows in red under the field (id `${id}-error`, for the control's aria-describedby).
export function FieldShell({ id, label, hint, required, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <RequiredMark />}
      </label>
      {children}
      {error && <p id={`${id}-error`} data-error className="mt-1.5 text-sm text-danger-ink">{error}</p>}
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-ink-subtle">{hint}</p>}
    </div>
  )
}

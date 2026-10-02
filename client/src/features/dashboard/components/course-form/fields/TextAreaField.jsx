import { useId } from 'react'
import { FieldShell } from './FieldShell'
import { controlClass } from './fieldStyles'

export function TextAreaField({ label, hint, className, required, error, rows = 4, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} required={required} error={error} className={className}>
      <textarea id={id} required={required} rows={rows} aria-invalid={error ? true : undefined} aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined} className={`${controlClass} resize-y leading-relaxed`} {...props} />
    </FieldShell>
  )
}

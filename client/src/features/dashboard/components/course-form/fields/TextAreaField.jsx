import { useId } from 'react'
import { FieldShell } from './FieldShell'
import { controlClass } from './fieldStyles'

export function TextAreaField({ label, hint, className, required, rows = 4, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} required={required} className={className}>
      <textarea id={id} required={required} rows={rows} aria-describedby={hint ? `${id}-hint` : undefined} className={`${controlClass} resize-y leading-relaxed`} {...props} />
    </FieldShell>
  )
}

import { useId } from 'react'
import { FieldShell } from './FieldShell'
import { controlClass } from './fieldStyles'

export function TextAreaField({ label, hint, className, rows = 4, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} className={className}>
      <textarea id={id} rows={rows} aria-describedby={hint ? `${id}-hint` : undefined} className={`${controlClass} resize-y leading-relaxed`} {...props} />
    </FieldShell>
  )
}

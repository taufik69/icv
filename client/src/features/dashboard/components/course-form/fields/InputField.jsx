import { useId } from 'react'
import { FieldShell } from './FieldShell'
import { controlClass } from './fieldStyles'

// Text input with optional leading icon and trailing slot (e.g. a show-password button).
export function InputField({ label, hint, className, icon: LeadIcon, trailing, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} className={className}>
      <div className="relative flex items-center">
        {LeadIcon && <LeadIcon className="pointer-events-none absolute left-3.5 size-4.5 text-ink-subtle" />}
        <input
          id={id}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${controlClass} ${LeadIcon ? 'pl-10' : ''} ${trailing ? 'pr-12' : ''}`}
          {...props}
        />
        {trailing && <div className="absolute right-1.5">{trailing}</div>}
      </div>
    </FieldShell>
  )
}

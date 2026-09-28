import { useId } from 'react'
import { ChevronDownIcon } from '@/shared/components/icons'
import { FieldShell } from './FieldShell'
import { controlClass } from './fieldStyles'

// options = [{ value, label }]
export function SelectField({ label, hint, className, options, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} className={className}>
      <div className="relative">
        <select id={id} className={`${controlClass} appearance-none pr-10`} {...props}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
      </div>
    </FieldShell>
  )
}

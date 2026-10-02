import { useId } from 'react'
import { FieldShell } from './FieldShell'
import { SelectMenu } from './SelectMenu'

// Labelled dashboard dropdown. options = [{ value, label, hint?, Icon? }]. Calls onChange({ target: { value } })
// so it plugs into the form's bind() like a native field.
export function SelectField({ label, hint, className, required, error, options, value, onChange, placeholder }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} required={required} error={error} className={className}>
      <SelectMenu
        id={id}
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={(v) => onChange({ target: { value: v } })}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
    </FieldShell>
  )
}

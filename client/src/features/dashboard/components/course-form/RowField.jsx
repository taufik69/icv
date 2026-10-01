import { useId } from 'react'
import { controlClass } from './fields/fieldStyles'
import { SelectMenu } from './fields/SelectMenu'
import { RequiredMark } from './fields/RequiredMark'

// One cell of a RowList row: a dropdown (column has `options`) or a text input. Its label shows on phones,
// where rows are stacked cards; from sm up the column heading above the table labels it instead.
export function RowField({ column: c, rowStarted, value, onChange }) {
  const id = useId()
  const required = c.required && rowStarted // an untouched (blank) row doesn't block saving
  const control = c.options ? (
    <SelectMenu id={id} size="sm" value={value} options={c.options} onChange={onChange} aria-labelledby={`${id}-label`} />
  ) : (
    <input id={id} required={required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={c.placeholder} inputMode={c.inputMode} className={`${controlClass} text-sm`} />
  )

  return (
    <div className="min-w-0">
      <label id={`${id}-label`} htmlFor={id} className="mb-1 block text-xs font-semibold text-secondary sm:sr-only">
        {c.label}{c.required && <RequiredMark />}
      </label>
      {control}
    </div>
  )
}

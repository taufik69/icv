import { useId } from 'react'
import { controlClass } from './fields/fieldStyles'
import { RequiredMark } from './fields/RequiredMark'

// One cell of a RowList row: a select (column has `options`) or a text input. Its label shows on phones,
// where rows are stacked cards; from sm up the column heading above the table labels it instead.
export function RowField({ column: c, value, onChange }) {
  const id = useId()
  const control = c.options ? (
    <select id={id} required={c.required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={`${controlClass} text-sm`}>
      {c.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  ) : (
    <input id={id} required={c.required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={c.placeholder} inputMode={c.inputMode} className={`${controlClass} text-sm`} />
  )

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-secondary sm:sr-only">
        {c.label}{c.required && <RequiredMark />}
      </label>
      {control}
    </div>
  )
}

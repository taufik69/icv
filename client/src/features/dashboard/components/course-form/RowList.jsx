import { PlusIcon, TrashIcon } from '@/shared/components/icons'
import { controlClass } from './fields/fieldStyles'
import { RequiredMark } from './fields/RequiredMark'

// Repeatable rows of objects (glance facts, fees, units). columns = [{ key, label, options?, required? }];
// a column with `options` renders a select; `required` columns get an asterisk and must be filled in every row. `blank` is the shape of a new row.
export function RowList({ columns, rows, onChange, addLabel, blank, widths = 'sm:grid-cols-[12rem_minmax(0,1fr)]' }) {
  const update = (i, key, value) => onChange(rows.map((row, j) => (j === i ? { ...row, [key]: value } : row)))
  const remove = (i) => onChange(rows.filter((_, j) => j !== i))

  return (
    <div>
      <div className={`mb-1.5 ${rows.length ? 'sm:grid' : ''} hidden gap-2 pr-11 text-sm font-semibold text-secondary ${widths}`}>
        {columns.map((c) => <span key={c.key}>{c.label}{c.required && <RequiredMark />}</span>)}
      </div>
      <ul className="grid gap-2.5">
        {rows.map((row, i) => (
          // Rows have no stable id; index keys are fine because inputs are fully controlled.
          <li key={i} className="flex items-start gap-2">
            <div className={`grid min-w-0 flex-1 gap-2 ${widths}`}>
              {columns.map((c) =>
                c.options ? (
                  <select key={c.key} aria-label={c.label} required={c.required} value={row[c.key] ?? ''} onChange={(e) => update(i, c.key, e.target.value)} className={`${controlClass} text-sm`}>
                    {c.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input key={c.key} aria-label={c.label} required={c.required} value={row[c.key] ?? ''} onChange={(e) => update(i, c.key, e.target.value)} placeholder={c.placeholder} inputMode={c.inputMode} className={`${controlClass} text-sm`} />
                ),
              )}
            </div>
            <button type="button" onClick={() => remove(i)} aria-label={`Remove row ${i + 1}`} className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white">
              <TrashIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...rows, { ...blank }])} className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 font-heading text-sm font-semibold text-secondary hover:bg-primary-soft">
        <PlusIcon className="size-4 text-primary-hover" /> {addLabel}
      </button>
    </div>
  )
}

import { PlusIcon, TrashIcon } from '@/shared/components/icons'
import { RequiredMark } from './fields/RequiredMark'
import { RowField } from './RowField'

// Repeatable rows of objects (glance facts, fees, units). columns = [{ key, label, options?, required? }];
// `required` columns get an asterisk and must be filled in every row; `blank` is the shape of a new row.
// sm+: a table (headings once, a trash button per row). Phones: each row is a small card titled
// "<itemLabel> n" with a Remove button, and every field carries its own label.
export function RowList({ columns, rows, onChange, addLabel, blank, itemLabel = 'Row', widths = 'sm:grid-cols-[12rem_minmax(0,1fr)]' }) {
  const update = (i, key, value) => onChange(rows.map((row, j) => (j === i ? { ...row, [key]: value } : row)))
  const remove = (i) => onChange(rows.filter((_, j) => j !== i))
  // A row counts as started once any text cell has a value; only then are its required cells enforced.
  const started = (row) => columns.some((c) => !c.options && String(row[c.key] ?? '').trim())

  return (
    <div>
      <div className={`mb-1.5 ${rows.length ? 'sm:grid' : ''} hidden gap-2 pr-11 text-sm font-semibold text-secondary ${widths}`}>
        {columns.map((c) => <span key={c.key}>{c.label}{c.required && <RequiredMark />}</span>)}
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:gap-2.5">
        {rows.map((row, i) => (
          // Rows have no stable id; index keys are fine because inputs are fully controlled.
          <li key={i} className="rounded-xl bg-surface-alt p-3 ring-1 ring-line sm:flex sm:items-start sm:gap-2 sm:bg-transparent sm:p-0 sm:ring-0">
            <div className="mb-2 flex items-center justify-between sm:hidden">
              <span className="font-heading text-sm font-semibold text-secondary">{itemLabel} {i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="flex items-center gap-1.5 rounded-lg bg-danger-soft px-2.5 py-1.5 text-xs font-semibold text-danger-ink">
                <TrashIcon className="size-3.5" /> Remove
              </button>
            </div>
            <div className={`grid min-w-0 flex-1 grid-cols-1 gap-2 ${widths}`}>
              {columns.map((c) => <RowField key={c.key} column={c} rowStarted={started(row)} value={row[c.key]} onChange={(v) => update(i, c.key, v)} />)}
            </div>
            <button type="button" onClick={() => remove(i)} aria-label={`Remove ${itemLabel.toLowerCase()} ${i + 1}`} className="mt-1 hidden size-9 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white sm:grid">
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

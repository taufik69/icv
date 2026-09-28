import { GripIcon, PlusIcon, TrashIcon } from '@/shared/components/icons'
import { controlClass } from './fields/fieldStyles'

// Repeatable two-column rows (at-a-glance facts, units). Visual only: add/remove do nothing yet.
export function RowList({ columns, rows, addLabel, widths = 'sm:grid-cols-[12rem_minmax(0,1fr)]' }) {
  return (
    <div>
      <div className={`mb-1.5 ${rows.length ? 'sm:grid' : ''} hidden gap-3 pl-8 pr-11 text-sm font-semibold text-secondary ${widths}`}>
        {columns.map((c) => <span key={c}>{c}</span>)}
      </div>
      <ul className="grid gap-2.5">
        {rows.map((row) => (
          <li key={row[0]} className="flex items-start gap-2">
            <GripIcon aria-label="Drag to reorder" className="mt-3 size-5 shrink-0 cursor-grab text-ink-disabled" />
            <div className={`grid min-w-0 flex-1 gap-2 ${widths}`}>
              {row.map((value, i) => (
                <input key={columns[i]} aria-label={columns[i]} defaultValue={value} className={`${controlClass} text-sm`} />
              ))}
            </div>
            <button type="button" aria-label="Remove row" className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger-ink">
              <TrashIcon className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-3 ml-7 flex items-center gap-2 rounded-lg px-3 py-2 font-heading text-sm font-semibold text-secondary hover:bg-primary-soft">
        <PlusIcon className="size-4 text-primary-hover" /> {addLabel}
      </button>
    </div>
  )
}

import { CheckIcon } from '@/shared/components/icons'

// Units as two-column tiles: code above title, with a Core / Elective tag.
export function UnitsGrid({ units }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {units.map((u) => (
        <li key={u.code + u.title} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-muted text-secondary">
            <CheckIcon className="size-3.5" strokeWidth="3" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs">
              <span className="font-condensed font-semibold tracking-wide text-secondary">{u.code}</span>
              <span className={u.type === 'Core' ? 'text-secondary-muted' : 'text-ink-subtle'}>{u.type}</span>
            </p>
            <p className="mt-1 text-sm leading-snug text-ink">{u.title}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

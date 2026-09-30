import { CheckIcon } from '@/shared/components/icons'

// Longer facet values as a checkbox list with counts; zero-result rows are dimmed but stay clickable.
export function FilterCheckList({ options, selected, onToggle }) {
  return (
    <ul className="space-y-0.5">
      {options.map(({ value, count }) => {
        const checked = selected.includes(value)
        return (
          <li key={value}>
            <label className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition hover:bg-white ${count || checked ? 'text-secondary' : 'text-ink-disabled'}`}>
              <input type="checkbox" checked={checked} onChange={() => onToggle(value)} className="peer sr-only" />
              <span
                aria-hidden="true"
                className={`grid size-4.5 shrink-0 place-items-center rounded-sm border transition peer-focus-visible:shadow-focus ${
                  checked ? 'border-secondary bg-secondary text-white' : 'border-line-strong bg-white'
                }`}
              >
                {checked && <CheckIcon className="size-3" strokeWidth="3" />}
              </span>
              <span className="min-w-0 flex-1">{value}</span>
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-md text-xs font-semibold tabular-nums transition ${
                  checked ? 'bg-secondary text-white' : count ? 'bg-secondary/8 text-secondary-muted' : 'bg-secondary/4 text-ink-disabled'
                }`}
              >
                {count}
              </span>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

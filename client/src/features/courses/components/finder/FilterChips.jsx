// Short facet values as toggle pills, each with its result count.
export function FilterChips({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(({ value, count }) => {
        const on = selected.includes(value)
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(value)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ring-1 transition ${
              on
                ? 'bg-secondary text-white ring-secondary'
                : count
                  ? 'bg-white text-secondary ring-line hover:ring-secondary/40'
                  : 'bg-white text-ink-disabled ring-line-soft'
            }`}
          >
            {value}
            <span className={`text-xs tabular-nums ${on ? 'text-white/90' : 'text-secondary-muted'}`}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}

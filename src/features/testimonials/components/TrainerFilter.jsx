const chip = 'inline-flex items-center gap-2 rounded-pill px-4 py-2 font-heading text-sm font-semibold ring-1 transition'
const on = 'bg-secondary text-white ring-secondary shadow-brand'
const off = 'bg-surface text-secondary ring-line hover:ring-primary'

// Segmented chips: "All" + one per trainer, each with its review count.
export function TrainerFilter({ trainers, counts, total, active, onChange }) {
  const options = [{ key: null, label: 'All reviews', count: total }, ...trainers.map((t) => ({ key: t, label: `Mentions ${t}`, count: counts[t] }))]

  return (
    <div role="group" aria-label="Filter reviews by trainer" className="flex flex-wrap gap-2">
      {options.map(({ key, label, count }) => {
        const selected = active === key
        return (
          <button key={label} type="button" aria-pressed={selected} onClick={() => onChange(key)} className={`${chip} ${selected ? on : off}`}>
            {label}
            <span className={`grid min-w-6 place-items-center rounded-pill px-1.5 text-xs ${selected ? 'bg-primary text-on-primary' : 'bg-surface-muted text-ink-subtle'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

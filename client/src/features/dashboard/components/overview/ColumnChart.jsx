import { niceTicks } from '../../lib/chartScale'

// Vertical columns for one measure (single colour, no legend): up to 6 columns, at most 24px wide with a
// rounded top and a square base, value on the cap, label under the baseline, hairline gridlines.
export function ColumnChart({ rows }) {
  if (!rows.length) return <p className="py-8 text-center text-sm text-ink-subtle">Nothing in this period.</p>
  const ticks = niceTicks(Math.max(...rows.map((r) => r.count)))
  const top = ticks.at(-1)
  return (
    <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-2">
      <div className="relative h-44 text-right text-xs text-ink-subtle tabular-nums">
        {ticks.map((t) => <span key={t} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(t / top) * 100}%` }}>{t}</span>)}
      </div>
      <div className="relative h-44">
        {ticks.map((t) => <span key={t} aria-hidden="true" className="absolute inset-x-0 h-px bg-line-soft" style={{ bottom: `${(t / top) * 100}%` }} />)}
        <ul className="relative flex h-full items-end justify-around gap-2">
          {rows.map((r) => (
            <li key={r.label} className="group flex h-full w-full max-w-16 flex-col items-center justify-end">
              <span className="mb-1 font-heading text-sm font-bold text-ink-strong">{r.count}</span>
              <span className="w-full max-w-6 rounded-t-[4px] bg-chart-1 transition-[height,opacity] duration-500 group-hover:opacity-80" style={{ height: `${(r.count / top) * 100}%` }} />
            </li>
          ))}
        </ul>
      </div>
      <span />
      <ul className="mt-2 flex justify-around gap-2">
        {rows.map((r) => <li key={r.label} className="w-full max-w-16 text-center text-[0.6875rem] leading-tight break-words text-ink-muted" title={r.label}>{r.label}</li>)}
      </ul>
    </div>
  )
}

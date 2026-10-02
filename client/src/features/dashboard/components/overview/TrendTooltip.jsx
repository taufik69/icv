import { bucketLabel } from '../../lib/overviewFormat'

// Readout for the crosshair: the bucket's date, then every series' value (value first, name after,
// keyed by a short line in the series colour). Kept inside the chart, flipping left near the right edge.
export function TrendTooltip({ point, series, x, width }) {
  const flip = x > width - 180
  return (
    <div
      role="status"
      style={{ left: x, transform: `translateX(${flip ? 'calc(-100% - 12px)' : '12px'})` }}
      className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-xl bg-surface px-3.5 py-2.5 text-sm shadow-elevated ring-1 ring-line"
    >
      <p className="text-xs text-ink-subtle">{bucketLabel(point.date, true)}</p>
      <ul className="mt-1.5 grid gap-1">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-0.5 w-3 rounded-pill ${s.bg}`} />
            <span className="font-heading font-bold text-ink-strong">{point[s.key]}</span>
            <span className="text-ink-muted">{s.label.toLowerCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

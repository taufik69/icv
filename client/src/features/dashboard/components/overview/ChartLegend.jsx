// Legend for line charts: a short line key in each series' colour, label in ink (never in the series colour).
export function ChartLegend({ series }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-muted">
      {series.map((s) => (
        <li key={s.key} className="flex items-center gap-2">
          <span aria-hidden="true" className={`h-0.5 w-4 rounded-pill ${s.bg}`} />
          {s.label}
        </li>
      ))}
    </ul>
  )
}

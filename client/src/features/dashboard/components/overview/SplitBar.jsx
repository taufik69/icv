// Part-to-whole of two groups as one bar (2px white gap between the parts), with a legend of counts and
// shares beneath. parts = [{ label, count, bg }] (bg = Tailwind fill class, in series order).
export function SplitBar({ parts }) {
  const total = parts.reduce((n, p) => n + p.count, 0)
  if (!total) return <p className="py-8 text-center text-sm text-ink-subtle">No enquiries in this period.</p>
  const pct = (n) => Math.round((n / total) * 100)
  return (
    <div className="grid gap-5">
      <div className="flex h-6 gap-0.5 overflow-hidden rounded-[4px]" role="img" aria-label={parts.map((p) => `${p.label} ${p.count}`).join(', ')}>
        {parts.filter((p) => p.count).map((p) => (
          <div key={p.label} className={`h-full transition-[width] duration-500 ${p.bg}`} style={{ width: `${pct(p.count)}%` }} />
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-2.5">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-3">
            <span aria-hidden="true" className={`size-3 shrink-0 rounded-xs ${p.bg}`} />
            <span className="min-w-0 flex-1 text-sm text-ink">{p.label}</span>
            <span className="font-heading font-bold text-ink-strong">{p.count}</span>
            <span className="w-10 text-right text-sm text-ink-subtle tabular-nums">{pct(p.count)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

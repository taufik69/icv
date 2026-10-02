const R = 14
const C = 2 * Math.PI * R

// Ranked list: position, name (up to two lines) + code, a small ring showing the item's share of all items, and the count.
// rows = [{ label, sub, count }] (already sorted, biggest first).
export function RankList({ rows }) {
  if (!rows.length) return <p className="py-8 text-center text-sm text-ink-subtle">Nothing in this period.</p>
  const total = rows.reduce((n, r) => n + r.count, 0)
  return (
    <ol className="grid grid-cols-1 gap-1">
      {rows.map((r, i) => {
        const share = r.count / total
        return (
          <li key={r.label} className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-surface-alt">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-muted font-heading text-xs font-bold text-secondary">{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-sm leading-snug text-ink" title={r.label}>{r.label}</span>
              <span className="text-xs text-ink-subtle">{r.sub}</span>
            </span>
            <svg viewBox="0 0 36 36" className="size-8 shrink-0 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r={R} fill="none" strokeWidth="4" className="stroke-surface-muted" />
              <circle cx="18" cy="18" r={R} fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${share * C} ${C}`} className="stroke-chart-1" />
            </svg>
            <span className="w-9 shrink-0 text-right">
              <span className="block font-heading font-bold text-ink-strong">{r.count}</span>
              <span className="text-xs text-ink-subtle">{Math.round(share * 100)}%</span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

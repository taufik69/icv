const R = 70
const STROKE = 22
const C = 2 * Math.PI * R

// Part-to-whole for up to 6 parts: a ring with the total in the middle (2px white gaps between parts)
// and a legend with count and share, so no value relies on the colour. parts = [{ label, count, fill, bg }].
export function DonutChart({ parts, totalLabel }) {
  const total = parts.reduce((n, p) => n + p.count, 0)
  if (!total) return <p className="py-8 text-center text-sm text-ink-subtle">Nothing in this period.</p>
  // Each slice starts where the previous one ended; the 2px shorter dash leaves the white gap.
  const arcs = parts.filter((p) => p.count).reduce((done, p) => {
    const start = done.at(-1)?.end ?? 0
    const len = (p.count / total) * C
    return [...done, { ...p, dash: `${Math.max(len - 2, 0.5)} ${C}`, offset: -start, end: start + len }]
  }, [])

  return (
    <div className="grid items-center gap-6 sm:grid-cols-[11rem_minmax(0,1fr)] xl:grid-cols-1 2xl:grid-cols-[11rem_minmax(0,1fr)]">
      <div className="relative mx-auto size-44">
        <svg viewBox="0 0 180 180" className="size-full -rotate-90" role="img" aria-label={parts.map((p) => `${p.label} ${p.count}`).join(', ')}>
          <circle cx="90" cy="90" r={R} fill="none" strokeWidth={STROKE} className="stroke-surface-muted" />
          {arcs.map((a) => (
            <circle key={a.label} cx="90" cy="90" r={R} fill="none" strokeWidth={STROKE} strokeDasharray={a.dash} strokeDashoffset={a.offset} className={`${a.fill} transition-opacity hover:opacity-80`}>
              <title>{`${a.label}: ${a.count}`}</title>
            </circle>
          ))}
        </svg>
        <p className="absolute inset-0 grid place-content-center text-center">
          <span className="font-heading text-3xl leading-none font-bold text-ink-strong">{total}</span>
          <span className="mt-1 text-xs text-ink-subtle">{totalLabel}</span>
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-2">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2.5 text-sm">
            <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-xs ${p.bg}`} />
            <span className="min-w-0 flex-1 truncate text-ink">{p.label}</span>
            <span className="font-heading font-bold text-ink-strong">{p.count}</span>
            <span className="w-9 text-right text-xs text-ink-subtle tabular-nums">{Math.round((p.count / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

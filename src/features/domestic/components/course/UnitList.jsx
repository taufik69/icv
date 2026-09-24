// Units as numbered rows: code chip + title. Rows fade in when the tab changes (keyed by tab).
export function UnitList({ items }) {
  return (
    <ol className="grid gap-2.5">
      {items.map(([code, title], i) => (
        <li
          key={code + title}
          className="group flex items-center gap-4 rounded-2xl bg-surface p-3.5 ring-1 ring-line-soft transition hover:ring-primary motion-safe:animate-[fade-in_400ms_ease-out_both] md:p-4"
        >
          <span className="w-8 shrink-0 text-center font-heading text-sm font-bold text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
          <span className="shrink-0 rounded-lg bg-secondary px-2.5 py-1 font-condensed text-sm font-bold tracking-wide text-primary transition group-hover:bg-primary group-hover:text-on-primary">
            {code}
          </span>
          <span className="min-w-0 leading-snug text-ink">{title}</span>
        </li>
      ))}
    </ol>
  )
}

const chip =
  'rounded-lg bg-secondary px-2.5 py-1 font-condensed text-sm font-bold tracking-wide text-white transition group-hover:bg-secondary-muted group-hover:text-white'

// Units as numbered rows: code chip (linked when the source links it) + title. Rows fade in when the tab changes.
// Phones stack the chip above the title so long titles keep the full row width.
export function UnitList({ items }) {
  return (
    <ol className="grid gap-2.5">
      {items.map(([code, title, href], i) => (
        <li
          key={code + title}
          className="group flex items-center gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line-soft transition hover:ring-secondary/30 motion-safe:animate-[fade-in_400ms_ease-out_both] sm:gap-4 md:p-4"
        >
          <span className="w-6 shrink-0 text-center font-heading text-sm font-bold text-secondary-muted sm:w-8">{String(i + 1).padStart(2, '0')}</span>
          <div className="flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={`shrink-0 underline-offset-2 hover:underline ${chip}`}>
                {code}
              </a>
            ) : (
              <span className={`shrink-0 ${chip}`}>{code}</span>
            )}
            <span className="min-w-0 leading-snug text-secondary">{title}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

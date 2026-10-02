import { Link } from '@tanstack/react-router'
import { overviewRanges } from '../../data/overviewRanges'

// Period switch for the whole overview (it scopes every tile and chart below it). The period lives in the
// URL (?days=), so it survives a reload and can be shared.
export function RangePicker({ days }) {
  return (
    <nav aria-label="Period" className="flex rounded-xl bg-surface p-1 ring-1 ring-line">
      {overviewRanges.map((r) => {
        const on = r.days === days
        return (
          <Link
            key={r.days} to="/dashboard" search={{ days: r.days }} aria-current={on ? 'true' : undefined}
            className={`rounded-lg px-3 py-1.5 font-heading text-sm font-semibold whitespace-nowrap transition ${on ? 'bg-secondary text-white' : 'text-ink-muted hover:text-secondary'}`}
          >
            {r.label}
          </Link>
        )
      })}
    </nav>
  )
}

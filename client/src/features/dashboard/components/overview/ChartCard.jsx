import { useState } from 'react'
import { DataTable } from './DataTable'

// White card for one chart: title, one-line subtitle, and a Chart / Table switch when `table` is given
// ({ caption, columns, rows } for DataTable).
export function ChartCard({ id, title, subtitle, table, className = '', children }) {
  const [asTable, setAsTable] = useState(false)
  return (
    <section aria-labelledby={`${id}-title`} className={`flex min-w-0 flex-col rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-6 ${className}`}>
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={`${id}-title`} className="text-lg leading-snug">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-ink-subtle">{subtitle}</p>}
        </div>
        {table && (
          <button
            type="button" aria-pressed={asTable} onClick={() => setAsTable((v) => !v)}
            className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-ink-muted ring-1 ring-line transition hover:text-secondary hover:ring-line-strong"
          >
            {asTable ? 'Show chart' : 'Show table'}
          </button>
        )}
      </header>
      <div className="mt-5 flex-1">{asTable ? <DataTable {...table} /> : children}</div>
    </section>
  )
}

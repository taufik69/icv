// The table twin of a chart (every chart can switch to it), so no value depends on colour or hover.
// columns = [{ key, label, numeric? }].
export function DataTable({ caption, columns, rows }) {
  return (
    <div className="max-h-72 overflow-auto rounded-xl ring-1 ring-line-soft">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 bg-surface-alt text-xs text-ink-subtle">
          <tr>{columns.map((c) => <th key={c.key} scope="col" className={`px-3.5 py-2 font-semibold ${c.numeric ? 'text-right' : ''}`}>{c.label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key} className={`px-3.5 py-2 text-ink ${c.numeric ? 'text-right tabular-nums' : ''}`}>{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

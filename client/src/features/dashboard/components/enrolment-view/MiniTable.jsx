// Small read-only table (qualifications, English tests). Scrolls sideways on phones instead of
// squashing; `empty` shows when there are no rows.
export function MiniTable({ caption, columns, rows, empty }) {
  if (!rows.length) return <p className="text-ink-disabled">{empty}</p>
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-line">
      <table className="w-full min-w-lg text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface-alt text-xs text-ink-subtle">
          <tr>{columns.map((c) => <th key={c.key} scope="col" className={`px-4 py-2.5 font-semibold ${c.className ?? ''}`}>{c.label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key} className={`px-4 py-3 ${row[c.key] ? 'text-ink' : 'text-ink-disabled'} ${c.className ?? ''}`}>{row[c.key] || '–'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

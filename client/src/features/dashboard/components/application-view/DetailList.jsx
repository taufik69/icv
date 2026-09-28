// Label/value rows; empty values read "Not provided" so gaps in an application are obvious.
export function DetailList({ rows }) {
  return (
    <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
      {rows.map(([label, value, wide]) => (
        <div key={label} className={`min-w-0 ${wide ? 'sm:col-span-2' : ''}`}>
          <dt className="text-sm text-ink-subtle">{label}</dt>
          <dd className={`mt-0.5 break-words ${value ? 'text-ink' : 'text-ink-disabled'}`}>{value || 'Not provided'}</dd>
        </div>
      ))}
    </dl>
  )
}

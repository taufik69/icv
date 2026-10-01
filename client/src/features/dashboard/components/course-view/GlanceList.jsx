import { ViewCard } from './ViewCard'

// Label/value rows. Used for the verbatim "at a glance" table and the typed facts.
export function GlanceList({ id = 'glance', title = 'At a glance', rows }) {
  return (
    <ViewCard id={id} title={title}>
      <dl className="divide-y divide-line-soft">
        {rows.map(({ label, value }) => (
          <div key={label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-sm text-ink-subtle">{label}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </ViewCard>
  )
}

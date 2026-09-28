import { ViewCard } from './ViewCard'

// "At a glance" facts as label/value rows.
export function GlanceList({ glance }) {
  return (
    <ViewCard id="glance" title="At a glance">
      <dl className="divide-y divide-line-soft">
        {glance.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
            <dt className="text-sm text-ink-subtle">{label}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </ViewCard>
  )
}

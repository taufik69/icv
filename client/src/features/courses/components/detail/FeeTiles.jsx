import { InfoIcon } from '@/shared/components/icons'

// Every fee line from the course's glance table; the first (headline) one gets the navy tile.
export function FeeTiles({ rows, note }) {
  return (
    <>
      <p className="-mt-2 mb-5 flex items-center gap-2 text-sm text-ink-muted">
        <InfoIcon className="size-4 shrink-0" />
        {note}
      </p>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`rounded-2xl p-5 ${i ? 'bg-white ring-1 ring-line' : 'bg-secondary text-white'}`}>
            <dt className={`text-sm ${i ? 'text-ink-muted' : 'text-white/70'}`}>{label}</dt>
            <dd className={`mt-1 font-heading text-2xl font-bold ${i ? 'text-secondary' : 'text-white'}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

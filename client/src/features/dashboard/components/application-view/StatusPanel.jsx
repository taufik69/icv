import { applicationStatuses } from '../../data/applicationStatus'
import { formatDate, formatTime } from '../../lib/formatDate'
import { StatusBadge } from '../applications/StatusBadge'

// Where this application is up to. The select is UI only for now.
export function StatusPanel({ item }) {
  return (
    <section aria-labelledby="status-title" className="rounded-2xl bg-secondary p-5 text-white">
      <h2 id="status-title" className="font-heading text-base text-white">Status</h2>
      <div className="mt-3"><StatusBadge status={item.status} /></div>
      <label htmlFor="status-select" className="mt-5 block text-sm text-white/60">Change status</label>
      <select
        id="status-select"
        defaultValue={item.status}
        className="mt-1.5 w-full rounded-xl bg-white/10 px-3.5 py-2.5 text-white ring-1 ring-white/20 focus:ring-primary focus:outline-none"
      >
        {applicationStatuses.map((s) => <option key={s} className="text-ink">{s}</option>)}
      </select>
      <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-white/60">Received</dt><dd>{formatDate(item.receivedAt)}, {formatTime(item.receivedAt)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-white/60">Reference</dt><dd>{item.id.slice(-6).toUpperCase()}</dd></div>
      </dl>
    </section>
  )
}

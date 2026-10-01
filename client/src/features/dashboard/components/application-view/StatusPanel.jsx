import { applicationStatuses } from '../../data/applicationStatus'
import { useSetApplicationStatus } from '../../hooks/useApplicationMutations'
import { formatDate, formatTime } from '../../lib/formatDate'
import { StatusBadge } from '../applications/StatusBadge'

// Where this application is up to. Changing the select saves straight away.
export function StatusPanel({ item }) {
  const setStatus = useSetApplicationStatus()
  return (
    <section aria-labelledby="status-title" className="rounded-2xl bg-secondary p-5 text-white">
      <h2 id="status-title" className="font-heading text-base text-white">Status</h2>
      <div className="mt-3"><StatusBadge status={item.status} /></div>
      <label htmlFor="status-select" className="mt-5 block text-sm text-white/80">Change status</label>
      <select
        id="status-select"
        value={setStatus.isPending ? setStatus.variables.status : item.status}
        disabled={setStatus.isPending}
        onChange={(e) => setStatus.mutate({ id: item.id, status: e.target.value })}
        className="mt-1.5 w-full rounded-xl bg-white/10 px-3.5 py-2.5 text-white ring-1 ring-white/20 focus:ring-primary focus:outline-none disabled:opacity-60"
      >
        {applicationStatuses.map((s) => <option key={s} className="text-ink">{s}</option>)}
      </select>
      <p role="status" className="mt-2 min-h-5 text-xs text-white/80">
        {setStatus.isPending ? 'Saving…' : setStatus.isError ? `Couldn't save: ${setStatus.error.message}` : setStatus.isSuccess ? 'Saved' : ''}
      </p>
      <dl className="mt-4 grid gap-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-white/80">Received</dt><dd>{formatDate(item.receivedAt)}, {formatTime(item.receivedAt)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-white/80">Reference</dt><dd>{item.id.slice(-6).toUpperCase()}</dd></div>
      </dl>
    </section>
  )
}

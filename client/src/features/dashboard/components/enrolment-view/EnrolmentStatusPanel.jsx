import { enrolmentStatuses } from '../../data/enrolmentStatus'
import { useUpdateEnrolment } from '../../hooks/useEnrolmentMutations'
import { formatDate, formatTime } from '../../lib/formatDate'
import { EnrolmentStatusBadge } from '../enrolments/EnrolmentStatusBadge'
import { StaffNote } from './StaffNote'

const when = (iso) => `${formatDate(iso)}, ${formatTime(iso)}`

// Navy side panel: status (saves on change), the staff-only note, then reference and dates.
export function EnrolmentStatusPanel({ item }) {
  const update = useUpdateEnrolment()
  const pendingStatus = update.isPending && update.variables.status
  return (
    <section aria-labelledby="enrol-status-title" className="rounded-2xl bg-secondary p-5 text-white">
      <h2 id="enrol-status-title" className="font-heading text-base text-white">Status</h2>
      <div className="mt-3"><EnrolmentStatusBadge status={item.status} /></div>
      <label htmlFor="enrol-status" className="mt-5 block text-sm text-white/80">Change status</label>
      <select
        id="enrol-status"
        value={pendingStatus || item.status}
        disabled={update.isPending}
        onChange={(e) => update.mutate({ id: item.id, status: e.target.value })}
        className="mt-1.5 w-full rounded-xl bg-white/10 px-3.5 py-2.5 text-white ring-1 ring-white/20 focus:ring-primary focus:outline-none disabled:opacity-60"
      >
        {enrolmentStatuses.map((s) => <option key={s} className="text-ink">{s}</option>)}
      </select>
      <p role="status" className="mt-2 min-h-5 text-xs text-white/80">
        {pendingStatus ? 'Saving…' : update.isError && update.variables?.status ? `Couldn't save: ${update.error.message}` : ''}
      </p>
      <StaffNote item={item} />
      <dl className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between gap-3"><dt className="text-white/80">Reference</dt><dd className="font-semibold tracking-wide">{item.reference}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-white/80">Submitted</dt><dd>{when(item.submittedAt)}</dd></div>
        <div className="flex justify-between gap-3"><dt className="text-white/80">Last updated</dt><dd>{when(item.updatedAt)}</dd></div>
      </dl>
    </section>
  )
}

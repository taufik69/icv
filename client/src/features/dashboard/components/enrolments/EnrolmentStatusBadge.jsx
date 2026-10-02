import { enrolmentStatusTone } from '../../data/enrolmentStatus'

// Enrolment status pill (colours in data/enrolmentStatus.js).
export function EnrolmentStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap ring-1 ${enrolmentStatusTone[status]}`}>
      {status === 'New' && <span className="size-1.5 rounded-full bg-primary-hover" />}
      {status}
    </span>
  )
}

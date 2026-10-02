import { Link } from '@tanstack/react-router'
import { FileTextIcon, PenLineIcon } from '@/shared/components/icons'
import { formatDate, formatTime } from '../../lib/formatDate'
import { StatusBadge } from '../applications/StatusBadge'
import { EnrolmentStatusBadge } from '../enrolments/EnrolmentStatusBadge'

const kinds = {
  enrolment: { Icon: PenLineIcon, label: 'Enrolment', to: '/dashboard/enrolments/$enrolmentId', param: 'enrolmentId', Badge: EnrolmentStatusBadge },
  application: { Icon: FileTextIcon, label: 'Enquiry', to: '/dashboard/applications/$applicationId', param: 'applicationId', Badge: StatusBadge },
}

// Latest enrolments and enquiries together, newest first; each row opens the record.
export function RecentActivity({ items }) {
  if (!items.length) return <p className="py-8 text-center text-sm text-ink-subtle">Nothing submitted yet.</p>
  return (
    <ul className="-mx-2 grid grid-cols-1">
      {items.map((it) => {
        const k = kinds[it.kind]
        return (
          <li key={`${it.kind}-${it.id}`} className="min-w-0">
            <Link to={k.to} params={{ [k.param]: it.id }} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface-alt">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-muted text-secondary">
                <k.Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-heading text-sm font-semibold text-secondary">{it.name}</span>
                <span className="block truncate text-xs text-ink-subtle">{k.label}, {it.detail}</span>
              </span>
              <span className="hidden text-right text-xs text-ink-subtle sm:block">{formatDate(it.at)}<br />{formatTime(it.at)}</span>
              <k.Badge status={it.status} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

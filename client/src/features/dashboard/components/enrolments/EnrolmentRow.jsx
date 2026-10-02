import { Link } from '@tanstack/react-router'
import { EyeIcon } from '@/shared/components/icons'
import { useDeleteEnrolment } from '../../hooks/useEnrolmentMutations'
import { formatDate, formatTime } from '../../lib/formatDate'
import { fullName, initials } from '../../lib/enrolmentView'
import { ArchiveButton } from '../courses/ArchiveButton'
import { enrolGrid } from './enrolGrid'
import { EnrolmentStatusBadge } from './EnrolmentStatusBadge'

// Student (initials, name, reference), course, nationality, submitted, status, actions. Stacks into a
// card below md. Delete asks once, then removes the application and its documents for good.
export function EnrolmentRow({ item }) {
  const { id, reference, course, personal, status, submittedAt } = item
  const name = fullName(item)
  const remove = useDeleteEnrolment()
  const view = { to: '/dashboard/applications/$applicationId', params: { applicationId: id } }

  return (
    <li className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-surface-alt ${enrolGrid} ${status === 'New' ? 'bg-primary-soft/40' : ''}`}>
      <Link {...view} className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-white">{initials(item)}</span>
        <span className="min-w-0">
          <span className="block truncate font-heading font-semibold text-secondary">{name}</span>
          <span className="block truncate text-sm tracking-wide text-ink-subtle">{reference}</span>
        </span>
      </Link>
      <div className="col-span-2 min-w-0 pl-13 md:col-span-1 md:pl-0">
        <p className="truncate text-sm text-ink">{course.title}</p>
        <p className="text-xs text-ink-subtle">
          {course.code}, {course.intakeYear} intake<span className="md:hidden">, {personal.nationality}</span>
        </p>
      </div>
      <span className="hidden truncate text-sm text-ink-muted md:block">{personal.nationality}</span>
      <p className="hidden text-sm md:block">
        <span className="block text-ink">{formatDate(submittedAt)}</span>
        <span className="text-xs text-ink-subtle">{formatTime(submittedAt)}</span>
      </p>
      <div className="pl-13 md:pl-0">
        <EnrolmentStatusBadge status={status} />
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <Link {...view} aria-label={`View application from ${name}`} title="View" className="grid size-9 place-items-center rounded-lg bg-secondary/8 text-secondary transition hover:bg-secondary hover:text-white">
          <EyeIcon className="size-4.5" />
        </Link>
        <ArchiveButton title={`application from ${name}`} pending={remove.isPending} onConfirm={() => remove.mutate(id)} />
      </div>
    </li>
  )
}

import { Link } from '@tanstack/react-router'
import { courseOptions } from '@/features/apply'
import { EyeIcon } from '@/shared/components/icons'
import { useDeleteApplication } from '../../hooks/useApplicationMutations'
import { formatDate, formatTime } from '../../lib/formatDate'
import { ArchiveButton } from '../courses/ArchiveButton'
import { appGrid } from './appGrid'
import { StatusBadge } from './StatusBadge'

const courseTitle = Object.fromEntries(courseOptions.map((c) => [c.code, c.title]))

// Applicant, course, student type, received date, status, actions. Stacks into a card below md.
// Delete asks once, then removes the application for good.
export function ApplicationRow({ item }) {
  const { id, firstName, lastName, email, course, studentType, receivedAt, status } = item
  const name = `${firstName} ${lastName}`
  const remove = useDeleteApplication()

  return (
    <li className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-surface-alt ${appGrid} ${status === 'New' ? 'bg-primary-soft/40' : ''}`}>
      <Link to="/dashboard/applications/$applicationId" params={{ applicationId: id }} className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-white">
          {firstName[0]}{lastName[0]}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-heading font-semibold text-secondary">{name}</span>
          <span className="block truncate text-sm text-ink-subtle">{email}</span>
        </span>
      </Link>
      <div className="col-span-2 min-w-0 pl-13 md:col-span-1 md:pl-0">
        <p className="truncate text-sm text-ink">{courseTitle[course] ?? 'No course chosen'}</p>
        <p className="text-xs text-ink-subtle">{course || 'Not set'}<span className="md:hidden">, {studentType}</span></p>
      </div>
      <span className="hidden text-sm text-ink-muted md:block">{studentType}</span>
      <p className="hidden text-sm md:block">
        <span className="block text-ink">{formatDate(receivedAt)}</span>
        <span className="text-xs text-ink-subtle">{formatTime(receivedAt)}</span>
      </p>
      <div className="pl-13 md:pl-0">
        <StatusBadge status={status} />
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <Link to="/dashboard/applications/$applicationId" params={{ applicationId: id }} aria-label={`View application from ${name}`} title="View" className="grid size-9 place-items-center rounded-lg bg-secondary/8 text-secondary transition hover:bg-secondary hover:text-white">
          <EyeIcon className="size-4.5" />
        </Link>
        <ArchiveButton title={`application from ${name}`} pending={remove.isPending} onConfirm={() => remove.mutate(id)} />
      </div>
    </li>
  )
}

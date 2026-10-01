import { useApplications } from '../../hooks/useApplications'
import { useMinDuration } from '../../hooks/useMinDuration'
import { PageHeader } from '../shell/PageHeader'
import { appGrid } from './appGrid'
import { ApplicationRow } from './ApplicationRow'
import { ApplicationRowsSkeleton } from './ApplicationRowsSkeleton'
import { ApplicationsToolbar } from './ApplicationsToolbar'

const head = `hidden gap-4 border-b border-line px-5 py-3 text-xs font-semibold text-ink-subtle md:grid ${appGrid}`

// Applications from the API, newest first. `filters` = { status?, q? } from the URL. While new results load,
// the rows turn into skeleton rows (shown at least 300ms) while the toolbar stays usable.
export function ApplicationsPage({ filters }) {
  const { items, counts, loading, updating } = useApplications(filters)
  const showSkeleton = useMinDuration(loading || updating)
  const waiting = counts.New ?? 0

  return (
    <>
      <PageHeader
        title="Applications"
        crumbs={{ current: 'Applications' }}
        description={`Sent from the Apply now form on the website. ${waiting ? `${waiting} waiting for a first reply.` : 'Nothing waiting for a reply.'}`}
      />
      <section aria-label="Application list" aria-busy={showSkeleton} className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <ApplicationsToolbar filters={filters} counts={counts} />
        <div className={head}>
          <span>Applicant</span><span>Course</span><span>Student</span><span>Received</span><span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        {showSkeleton ? (
          <ApplicationRowsSkeleton rows={Math.min(Math.max(items.length, 3), 8)} />
        ) : items.length ? (
          <ul className="divide-y divide-line-soft">
            {items.map((item) => <ApplicationRow key={item.id} item={item} />)}
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-ink-muted">
            {filters.status || filters.q ? 'No applications match these filters.' : 'No applications yet. They appear here as soon as someone submits the Apply now form.'}
          </p>
        )}
      </section>
    </>
  )
}

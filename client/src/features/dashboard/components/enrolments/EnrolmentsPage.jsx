import { useEnrolments } from '../../hooks/useEnrolments'
import { useMinDuration } from '../../hooks/useMinDuration'
import { PageHeader } from '../shell/PageHeader'
import { enrolGrid } from './enrolGrid'
import { EnrolmentRow } from './EnrolmentRow'
import { EnrolmentRowsSkeleton } from './EnrolmentRowsSkeleton'
import { EnrolmentsToolbar } from './EnrolmentsToolbar'
import { ListPager } from './ListPager'

const head = `hidden gap-4 border-b border-line px-5 py-3 text-xs font-semibold text-ink-subtle md:grid ${enrolGrid}`

// International enrolment applications from the API, newest first. `filters` = { status?, q?, page? }
// from the URL. While new results load the rows turn into skeleton rows (at least 300ms) and the toolbar
// stays usable.
export function EnrolmentsPage({ filters }) {
  const { items, counts, paging, loading, updating } = useEnrolments(filters)
  const showSkeleton = useMinDuration(loading || updating)
  const waiting = counts.New ?? 0

  return (
    <>
      <PageHeader
        title="Enrolments"
        crumbs={{ current: 'Enrolments' }}
        description={`International enrolment applications from the website. ${waiting ? `${waiting} new, not yet reviewed.` : 'Every application has been picked up.'}`}
      />
      <section aria-label="Enrolment list" aria-busy={showSkeleton} className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <EnrolmentsToolbar filters={filters} counts={counts} />
        <div className={head}>
          <span>Student</span><span>Course</span><span>Nationality</span><span>Submitted</span><span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        {showSkeleton ? (
          <EnrolmentRowsSkeleton rows={Math.min(Math.max(items.length, 3), 8)} />
        ) : items.length ? (
          <ul className="divide-y divide-line-soft">
            {items.map((item) => <EnrolmentRow key={item.id} item={item} />)}
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-ink-muted">
            {filters.status || filters.q ? 'No enrolments match these filters.' : 'No enrolments yet. They appear here as soon as a student submits the enrolment form.'}
          </p>
        )}
        <ListPager paging={paging} filters={filters} />
      </section>
    </>
  )
}

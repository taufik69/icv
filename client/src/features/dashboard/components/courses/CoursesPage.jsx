import { Link } from '@tanstack/react-router'
import { PlusIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { useAdminCourses } from '../../hooks/useAdminCourses'
import { PageHeader } from '../shell/PageHeader'
import { CourseRow } from './CourseRow'
import { CourseRowsSkeleton } from './CourseRowsSkeleton'
import { rowGrid } from './rowGrid'
import { CoursesToolbar } from './CoursesToolbar'

const head = `hidden gap-4 border-b border-line px-5 py-3 text-xs font-semibold text-ink-subtle md:grid ${rowGrid}`

// Course catalogue from the API: market tabs + live search in the URL, status switch, archive.
// While new results load, the current rows fade back instead of the page being replaced.
export function CoursesPage({ filters }) {
  const { courses, counts, loading, updating } = useAdminCourses(filters)

  return (
    <>
      <PageHeader title="Courses" crumbs={{ current: 'Courses' }} description="Everything listed on the domestic and international course pages.">
        <Button as={Link} to="/dashboard/courses/new" variant="secondary">
          <PlusIcon className="size-4.5" /> Add course
        </Button>
      </PageHeader>

      <section aria-label="Course list" aria-busy={loading || updating} className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <CoursesToolbar filters={filters} counts={counts} />
        <div className={head}>
          <span>Course</span><span>Market</span><span>Status</span><span className="text-right">Actions</span>
        </div>
        {loading ? (
          <CourseRowsSkeleton />
        ) : courses.length ? (
          <ul className={`divide-y divide-line-soft transition-opacity ${updating ? 'opacity-50' : ''}`}>
            {courses.map((course) => <CourseRow key={course.id} course={course} />)}
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-ink-muted">
            {filters.q ? `No courses match "${filters.q}". Try a title or a code like CPC40120.` : 'No courses yet. Add one to get started.'}
          </p>
        )}
      </section>
    </>
  )
}

import { Link } from '@tanstack/react-router'
import { PlusIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { courseRows } from '../../data/courseRows'
import { PageHeader } from '../shell/PageHeader'
import { CourseRow } from './CourseRow'
import { rowGrid } from './rowGrid'
import { CoursesToolbar } from './CoursesToolbar'

const head = `hidden gap-4 border-b border-line px-5 py-3 text-xs font-semibold text-ink-subtle md:grid ${rowGrid}`

// Course catalogue list. Static rows for now; search and tabs are visual only.
export function CoursesPage() {
  return (
    <>
      <PageHeader title="Courses" crumbs={{ current: 'Courses' }} description="Everything listed on the domestic and international course pages.">
        <Button as={Link} to="/dashboard/courses/new" variant="secondary">
          <PlusIcon className="size-4.5" /> Add course
        </Button>
      </PageHeader>

      <section aria-label="Course list" className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <CoursesToolbar />
        <div className={head}>
          <span>Course</span><span>Market</span><span>Status</span><span className="text-right">Actions</span>
        </div>
        <ul className="divide-y divide-line-soft">
          {courseRows.map((course) => <CourseRow key={course.to} course={course} />)}
        </ul>
      </section>
    </>
  )
}

import { Link } from '@tanstack/react-router'
import { Parts } from '@/features/courses'
import { ArrowUpRightIcon, PenLineIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { courseOutline } from '../../lib/courseOutline'
import { BlocksRail } from '../course-form/BlocksRail'
import { PageHeader } from '../shell/PageHeader'
import { CourseSummary } from './CourseSummary'
import { GlanceList } from './GlanceList'
import { UnitsTable } from './UnitsTable'
import { ViewCard } from './ViewCard'

// Read-only view of one course, as stored today. Edit opens the (static) course form.
export function CourseViewPage({ course }) {
  return (
    <>
      <PageHeader title={course.title} crumbs={{ trail: [{ label: 'Courses', to: '/dashboard/courses' }] }}>
        <Button as={Link} to="/dashboard/courses/new" variant="ghost">
          <PenLineIcon className="size-4.5" /> Edit course
        </Button>
        <Button as={Link} to={`/${course.market}/${course.slug}`} variant="secondary">
          View on website <ArrowUpRightIcon className="size-4.5" />
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <CourseSummary course={course} />
          {course.overview && (
            <ViewCard id="overview" title="Overview">
              <div className="max-w-3xl">
                <Parts parts={[...course.overview.paragraphs, ...(course.overview.list ? [{ list: course.overview.list }] : [])]} />
              </div>
            </ViewCard>
          )}
          {course.glance && <GlanceList glance={course.glance} />}
          <UnitsTable units={course.units} />
        </div>
        <aside className="hidden lg:block">
          <BlocksRail blocks={courseOutline(course)} caption="Green blocks show on this course page." linked={false} />
        </aside>
      </div>
    </>
  )
}

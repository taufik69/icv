import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon, PenLineIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { useAdminCourse } from '../../hooks/useAdminCourse'
import { factRows } from '../../lib/courseFacts'
import { entryHtml, overviewHtml } from '../../lib/partsToHtml'
import { RichText } from '../rich-text/RichText'
import { courseOutline } from '../../lib/courseOutline'
import { BlocksRail } from '../course-form/BlocksRail'
import { PageHeader } from '../shell/PageHeader'
import { CourseSummary } from './CourseSummary'
import { GlanceList } from './GlanceList'
import { UnitsTable } from './UnitsTable'
import { ViewCard } from './ViewCard'

// Read-only view of one course from the API (any status). Edit opens the course form.
export function CourseViewPage({ market, slug }) {
  const course = useAdminCourse(market, slug)
  return (
    <>
      <PageHeader title={course.title} crumbs={{ trail: [{ label: 'Courses', to: '/dashboard/courses' }] }}>
        <Button as={Link} to="/dashboard/courses/$market/$slug/edit" params={{ market: course.market, slug: course.slug }} variant="ghost">
          <PenLineIcon className="size-4.5" /> Edit course
        </Button>
        <Button as={Link} to="/courses/$market/$slug" params={{ market: course.market, slug: course.slug }} variant="secondary">
          View on website <ArrowUpRightIcon className="size-4.5" />
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <CourseSummary course={course} />
          {course.overview && (
            <ViewCard id="overview" title="Overview">
              <div className="max-w-3xl">
                <RichText html={overviewHtml(course.overview)} />
              </div>
            </ViewCard>
          )}
          <GlanceList id="facts" title="Key facts and fees" rows={factRows(course)} />
          {entryHtml(course.detail) && (
            <ViewCard id="entry" title="Entry requirements">
              <RichText html={entryHtml(course.detail)} className="max-w-3xl" />
            </ViewCard>
          )}
          {course.glance && <GlanceList rows={course.glance} />}
          <UnitsTable units={course.units} />
        </div>
        <aside className="hidden self-stretch lg:block">
          <BlocksRail blocks={courseOutline(course)} caption="Green blocks show on this course page." linked={false} />
        </aside>
      </div>
    </>
  )
}

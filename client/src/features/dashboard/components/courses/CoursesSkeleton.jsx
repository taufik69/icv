import { Link } from '@tanstack/react-router'
import { PlusIcon } from '@/shared/components/icons'
import { Button } from '@/shared/components/ui'
import { PageHeader } from '../shell/PageHeader'
import { CourseRowsSkeleton } from './CourseRowsSkeleton'
import { rowGrid } from './rowGrid'

// Course list while it loads: the real header, then placeholder tabs, search and rows in the table's own grid.
export function CoursesSkeleton() {
  return (
    <>
      <PageHeader title="Courses" crumbs={{ current: 'Courses' }} description="Everything listed on the domestic and international course pages.">
        <Button as={Link} to="/dashboard/courses/new" variant="secondary">
          <PlusIcon className="size-4.5" /> Add course
        </Button>
      </PageHeader>

      <section aria-label="Loading courses" aria-busy="true" className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div className="flex gap-1 rounded-xl bg-surface-muted p-1">
            {['w-16', 'w-24', 'w-28'].map((w) => <span key={w} className={`skeleton h-8 rounded-lg ${w}`} />)}
          </div>
          <span className="skeleton h-9 w-full rounded-xl sm:w-72" />
        </div>
        <div className={`hidden gap-4 border-b border-line px-5 py-3.5 md:grid ${rowGrid}`}>
          {['w-14', 'w-12', 'w-12'].map((w, i) => <span key={i} className={`skeleton h-3 rounded-sm ${w}`} />)}
          <span className="skeleton ml-auto h-3 w-12 rounded-sm" />
        </div>
        <CourseRowsSkeleton />
        <p className="sr-only" role="status">Loading courses…</p>
      </section>
    </>
  )
}

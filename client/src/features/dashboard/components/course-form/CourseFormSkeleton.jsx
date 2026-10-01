import { CardSkeleton } from '../skeleton/CardSkeleton'
import { FieldSkeleton } from '../skeleton/FieldSkeleton'
import { OutlineRailSkeleton } from '../skeleton/OutlineRailSkeleton'
import { PageHeaderSkeleton } from '../skeleton/PageHeaderSkeleton'

const pairs = ['w-24', 'w-28', 'w-16', 'w-20', 'w-12', 'w-28', 'w-32', 'w-24']

// Edit form while the course loads: header with the save button, then the first sections
// (basics, overview, key facts) in their real field layout, and the outline rail.
export function CourseFormSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading course…</p>
      <PageHeaderSkeleton actions={['w-36']} />
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <CardSkeleton titleWidth="w-40">
            <FieldSkeleton label="w-24" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pairs.map((w, i) => <FieldSkeleton key={i} label={w} />)}
            </div>
            <FieldSkeleton label="w-16" />
            <FieldSkeleton label="w-28" rows={3} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="grid grid-cols-1 gap-3">
                  <span className="skeleton h-3.5 w-24 rounded-md" />
                  <span className="skeleton aspect-video rounded-xl" />
                  <FieldSkeleton label="w-16" />
                </div>
              ))}
            </div>
          </CardSkeleton>
          <CardSkeleton titleWidth="w-28">
            <FieldSkeleton label="w-36" rows={7} />
          </CardSkeleton>
          <CardSkeleton titleWidth="w-32">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pairs.slice(0, 6).map((w, i) => <FieldSkeleton key={i} label={w} />)}
            </div>
          </CardSkeleton>
        </div>
        <aside className="hidden lg:block">
          <OutlineRailSkeleton />
        </aside>
      </div>
    </div>
  )
}

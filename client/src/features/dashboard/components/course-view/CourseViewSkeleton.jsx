import { CardSkeleton } from '../skeleton/CardSkeleton'
import { LinesSkeleton } from '../skeleton/LinesSkeleton'
import { OutlineRailSkeleton } from '../skeleton/OutlineRailSkeleton'
import { PageHeaderSkeleton } from '../skeleton/PageHeaderSkeleton'

const factRows = ['w-40', 'w-56', 'w-32', 'w-44', 'w-36', 'w-48']

// Course view while it loads, in the page's own layout: summary (photo + facts), overview,
// key facts, units table, and the outline rail.
export function CourseViewSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading course…</p>
      <PageHeaderSkeleton />
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
            <span className="skeleton block aspect-[21/8] w-full" />
            <div className="p-5 sm:p-7">
              <span className="skeleton block h-7 w-28 rounded-pill" />
              <div className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="grid gap-2">
                    <span className="skeleton h-3 w-20 rounded-md" />
                    <span className="skeleton h-4 w-28 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CardSkeleton titleWidth="w-28">
            <LinesSkeleton count={6} />
          </CardSkeleton>
          <CardSkeleton titleWidth="w-48">
            <dl className="divide-y divide-line-soft">
              {factRows.map((w, i) => (
                <div key={i} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-6">
                  <span className="skeleton h-3.5 w-24 rounded-md" />
                  <span className={`skeleton h-3.5 rounded-md ${w}`} />
                </div>
              ))}
            </dl>
          </CardSkeleton>
          <CardSkeleton titleWidth="w-20">
            <div className="grid gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="skeleton h-4 w-24 shrink-0 rounded-md" />
                  <span className="skeleton h-4 flex-1 rounded-md" />
                  <span className="skeleton h-5 w-16 shrink-0 rounded-pill" />
                </div>
              ))}
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

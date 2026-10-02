import { PageHeader } from '../shell/PageHeader'

const card = 'rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-6'
const Bars = () => (
  <div className="mt-6 grid gap-4">
    {['w-full', 'w-4/5', 'w-3/5', 'w-2/5'].map((w) => (
      <div key={w} className="grid gap-2"><span className="skeleton h-3 w-28 rounded-md" /><span className={`skeleton h-2.5 rounded-r-[4px] ${w}`} /></div>
    ))}
  </div>
)

// First visit to the overview: real header, then tiles and chart cards in their final grid.
export function OverviewSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading overview…</p>
      <PageHeader title="Dashboard" crumbs={{ current: 'Overview' }} description="How enrolments and course enquiries are going, from live website submissions." />
      <div aria-hidden="true" className="mt-8 grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={card}>
              <span className="skeleton block h-3.5 w-32 rounded-md" />
              <span className="skeleton mt-4 block h-9 w-16 rounded-lg" />
              <span className="skeleton mt-4 block h-3 w-40 rounded-md" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className={`${card} xl:col-span-2`}><span className="skeleton block h-5 w-48 rounded-md" /><span className="skeleton mt-6 block h-64 rounded-xl" /></div>
          {[1, 2, 3, 4].map((i) => <div key={i} className={card}><span className="skeleton block h-5 w-40 rounded-md" /><Bars /></div>)}
        </div>
      </div>
    </div>
  )
}

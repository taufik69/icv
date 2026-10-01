import { DashboardBreadcrumbs } from '../shell/DashboardBreadcrumbs'

const trail = [{ label: 'Courses', to: '/dashboard/courses' }]

// PageHeader while a course loads: the real breadcrumb trail, a title bar and button-shaped blocks.
export function PageHeaderSkeleton({ actions = ['w-32', 'w-40'] }) {
  return (
    <header>
      <DashboardBreadcrumbs trail={trail} current="Loading…" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid min-w-0 flex-1 gap-3">
          <span className="skeleton h-9 w-full max-w-xl rounded-lg md:h-10" />
          <span className="skeleton h-4 w-64 max-w-full rounded-md" />
        </div>
        <div className="flex gap-3">
          {actions.map((w, i) => <span key={i} className={`skeleton h-11 rounded-pill ${w}`} />)}
        </div>
      </div>
    </header>
  )
}

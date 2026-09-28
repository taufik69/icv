import { DashboardBreadcrumbs } from './DashboardBreadcrumbs'

// Breadcrumb trail, then title + one-line description on the left and actions on the right.
// `crumbs` = { trail, current }; `current` defaults to the title.
export function PageHeader({ title, description, crumbs, children }) {
  return (
    <header>
      <DashboardBreadcrumbs trail={crumbs?.trail} current={crumbs?.current ?? title} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl md:text-4xl">{title}</h1>
          {description && <p className="mt-1.5 max-w-2xl text-ink-muted">{description}</p>}
        </div>
        {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </header>
  )
}

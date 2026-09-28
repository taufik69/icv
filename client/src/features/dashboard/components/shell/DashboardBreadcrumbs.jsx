import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, LayoutGridIcon } from '@/shared/components/icons'

const Separator = () => (
  <li aria-hidden="true" className="flex">
    <ChevronRightIcon className="size-3.5 text-primary-hover" />
  </li>
)

// Light trail for dashboard pages: Dashboard › ...trail › current. `trail` = [{ label, to }].
export function DashboardBreadcrumbs({ trail = [], current }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3">
      <ol className="flex flex-wrap items-center gap-2 text-sm leading-none text-ink-subtle">
        <li className="flex">
          <Link to="/dashboard/courses" className="inline-flex items-center gap-1.5 text-ink-subtle transition hover:text-secondary">
            <LayoutGridIcon className="size-4" />
            Dashboard
          </Link>
        </li>
        {trail.map((crumb) => (
          <Fragment key={crumb.to}>
            <Separator />
            <li className="flex">
              <Link to={crumb.to} activeOptions={{ exact: true }} className="text-ink-subtle transition hover:text-secondary">
                {crumb.label}
              </Link>
            </li>
          </Fragment>
        ))}
        <Separator />
        <li aria-current="page" className="min-w-0 truncate font-semibold text-secondary">{current}</li>
      </ol>
    </nav>
  )
}

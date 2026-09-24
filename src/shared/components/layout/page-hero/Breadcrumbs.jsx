import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon, HomeIcon } from '@/shared/components/icons'

const Separator = () => (
  <li aria-hidden="true">
    <ChevronRightIcon className="size-3.5 text-primary" />
  </li>
)

// Glass pill trail: Home › ...trail › current. `trail` = [{ label, to }].
export function Breadcrumbs({ trail = [], current }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 font-condensed text-sm tracking-wider text-white/70 uppercase ring-1 ring-white/15 backdrop-blur-md">
        <li>
          <Link to="/" activeOptions={{ exact: true }} className="inline-flex items-center gap-1.5 text-white/70 transition hover:text-primary">
            <HomeIcon className="size-4" />
            Home
          </Link>
        </li>
        {trail.map((crumb) => (
          <Fragment key={crumb.to}>
            <Separator />
            <li>
              <Link to={crumb.to} activeOptions={{ exact: true }} className="text-white/70 transition hover:text-primary">
                {crumb.label}
              </Link>
            </li>
          </Fragment>
        ))}
        <Separator />
        <li aria-current="page" className="text-white">
          {current}
        </li>
      </ol>
    </nav>
  )
}

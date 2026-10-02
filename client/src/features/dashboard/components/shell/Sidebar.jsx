import { Link } from '@tanstack/react-router'
import { BrandLogo } from '@/shared/components/ui'
import { dashboardNav, siteLink } from '../../data/dashboardNav'
import { useMe } from '../../hooks/useAuth'
import { useNewApplicationCount } from '../../hooks/useApplications'
import { useNewEnrolmentCount } from '../../hooks/useEnrolments'
import { SidebarLink } from './SidebarLink'
import { SignOutButton } from './SignOutButton'

const initialsOf = (name = '') => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

// Navy rail, desktop only (phones get MobileTabs). Sticky so it stays put while the form scrolls.
export function Sidebar() {
  const me = useMe()
  const counts = { newApplications: useNewApplicationCount(), newEnrolments: useNewEnrolmentCount() }
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col bg-secondary px-6 py-7 lg:flex">
      <Link to="/dashboard" aria-label="Dashboard overview">
        <BrandLogo className="text-[0.625rem] text-white" />
      </Link>

      <nav aria-label="Dashboard" className="mt-10 grid gap-1">
        {dashboardNav.map((item) => <SidebarLink key={item.to} item={item} badge={counts[item.badge]} />)}
      </nav>

      <div className="mt-auto grid gap-1 border-t border-white/10 pt-5">
        <SidebarLink item={siteLink} />
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-bold text-on-primary">
            {initialsOf(me?.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-heading text-sm font-semibold text-white">{me?.name}</span>
            <span className="block truncate text-xs text-white/85">{me?.email}</span>
          </span>
          <SignOutButton className="size-8 text-white/80 hover:bg-white/10 hover:text-white" />
        </div>
      </div>
    </aside>
  )
}

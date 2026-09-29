import { Link } from '@tanstack/react-router'
import { LogOutIcon } from '@/shared/components/icons'
import { BrandLogo } from '@/shared/components/ui'
import { dashboardNav, siteLink, staffUser } from '../../data/dashboardNav'
import { applicationCounts } from '../../data/applications'
import { SidebarLink } from './SidebarLink'

// Navy rail, desktop only (phones get MobileTabs). Sticky so it stays put while the form scrolls.
export function Sidebar() {
  const counts = { newApplications: applicationCounts.New ?? 0 }
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col bg-secondary px-6 py-7 lg:flex">
      <Link to="/dashboard/courses" aria-label="Course admin home">
        <BrandLogo className="text-[0.625rem] text-white" />
      </Link>

      <nav aria-label="Dashboard" className="mt-10 grid gap-1">
        {dashboardNav.map((item) => <SidebarLink key={item.to} item={item} badge={counts[item.badge]} />)}
      </nav>

      <div className="mt-auto grid gap-1 border-t border-white/10 pt-5">
        <SidebarLink item={siteLink} />
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-heading text-sm font-bold text-on-primary">
            {staffUser.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-heading text-sm font-semibold text-white">{staffUser.name}</span>
            <span className="block truncate text-xs text-white/55">{staffUser.email}</span>
          </span>
          <Link to="/dashboard/login" aria-label="Sign out" className="grid size-8 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white">
            <LogOutIcon className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}

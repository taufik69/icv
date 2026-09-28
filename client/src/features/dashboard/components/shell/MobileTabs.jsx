import { Link } from '@tanstack/react-router'
import { LogOutIcon } from '@/shared/components/icons'
import { dashboardNav } from '../../data/dashboardNav'

// Phones/tablets: navy top bar + a scrollable tab row in place of the sidebar (no drawer state needed).
export function MobileTabs() {
  return (
    <div className="sticky top-0 z-20 bg-secondary lg:hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <img src="/images/icv-logo-white.webp" alt="International College of Victoria" width="240" height="110" className="h-9 w-auto" />
        <Link to="/dashboard/login" aria-label="Sign out" className="grid size-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
          <LogOutIcon className="size-4.5" />
        </Link>
      </div>
      <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto px-3">
        {dashboardNav.map(({ label, to, Icon, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact }}
            className="flex shrink-0 items-center gap-2 border-b-3 border-transparent px-3 pt-1 pb-2.5 font-heading text-sm font-semibold text-white/65 data-[status=active]:border-primary data-[status=active]:text-white"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

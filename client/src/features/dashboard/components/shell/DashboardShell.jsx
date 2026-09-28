import { Outlet } from '@tanstack/react-router'
import { MobileTabs } from './MobileTabs'
import { Sidebar } from './Sidebar'

// Signed-in frame: sidebar on lg+, top tabs below. Pages render their own PageHeader inside.
export function DashboardShell() {
  return (
    <div className="flex min-h-svh bg-surface-muted">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <MobileTabs />
        <main className="w-full px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

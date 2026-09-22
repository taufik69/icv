import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SiteHeader } from '@/shared/components/layout/header'

// Header is fixed; pages own their layout. Non-hero pages wrap content in PageContainer.
export function RootLayout() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-svh">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

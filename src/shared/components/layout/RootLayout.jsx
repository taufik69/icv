import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SiteFooter } from '@/shared/components/layout/footer'
import { SiteHeader } from '@/shared/components/layout/header'

// Header is fixed; pages own their layout. Non-hero pages wrap content in PageContainer.
export function RootLayout() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-svh overflow-x-clip">
        <Outlet />
      </main>
      <SiteFooter />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

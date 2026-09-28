import { lazy, Suspense, useState } from 'react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { BottomNav } from '@/shared/components/layout/bottom-nav'
import { ContactFab } from '@/shared/components/layout/contact-fab'
import { SiteFooter } from '@/shared/components/layout/footer'
import { SiteHeader } from '@/shared/components/layout/header'

const MobileMenu = lazy(() => import('@/shared/components/layout/header/MobileMenu'))

// Header is fixed; pages own their layout. Non-hero pages wrap content in PageContainer.
// The mobile menu drawer is owned here so both the header hamburger and BottomNav open it.
// The staff dashboard has its own chrome, so it skips the site header, footer and floating buttons.
export function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isDashboard = useRouterState({ select: (s) => s.location.pathname.startsWith('/dashboard') })
  const openMenu = () => setMenuOpen(true)

  if (isDashboard) return <Outlet />

  return (
    <>
      <SiteHeader onOpenMenu={openMenu} />
      <main className="min-h-svh overflow-x-clip">
        <Outlet />
      </main>
      <SiteFooter />
      <BottomNav menuOpen={menuOpen} onOpenMenu={openMenu} />
      <ContactFab />
      {menuOpen && (
        <Suspense fallback={null}>
          <MobileMenu onClose={() => setMenuOpen(false)} />
        </Suspense>
      )}
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}

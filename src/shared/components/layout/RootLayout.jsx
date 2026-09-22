import { lazy, Suspense, useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { BottomNav } from '@/shared/components/layout/bottom-nav'
import { ContactFab } from '@/shared/components/layout/contact-fab'
import { SiteFooter } from '@/shared/components/layout/footer'
import { SiteHeader } from '@/shared/components/layout/header'

const MobileMenu = lazy(() => import('@/shared/components/layout/header/MobileMenu'))

// Header is fixed; pages own their layout. Non-hero pages wrap content in PageContainer.
// The mobile menu drawer is owned here so both the header hamburger and BottomNav open it.
export function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenu = () => setMenuOpen(true)

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

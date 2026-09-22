import { useRouterState } from '@tanstack/react-router'
import { MenuIcon } from '@/shared/components/icons'
import { Container } from '@/shared/components/ui'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { DesktopNav } from './DesktopNav'
import { HeaderActions } from './HeaderActions'
import { Logo } from './Logo'

// Full-width bar at the top; on scroll it becomes a floating bar, 98% wide (1% gap each side, 16px radius).
// data-floating drives child styles via `group-data-[floating=true]/header:*`.
// Phones (< md): once scrolled the header slides away — BottomNav takes over navigation.
export function SiteHeader({ onOpenMenu }) {
  const floating = useScrolled()
  const isHome = useRouterState({ select: (s) => s.location.pathname === '/' })

  const bar = isHome ? 'bg-transparent' : 'bg-secondary'
  const shell = floating
    ? 'max-w-[98%] rounded-2xl bg-secondary/90 shadow-brand ring-1 ring-white/10 backdrop-blur-md'
    : `max-w-full rounded-none ${bar}`

  return (
    <header
      data-floating={floating}
      className={`group/header fixed inset-x-0 top-0 z-40 transition-[padding,translate,opacity] duration-700 ease-in-out ${floating ? 'pt-3 max-md:pointer-events-none max-md:-translate-y-full max-md:opacity-0' : 'pt-0'}`}
    >
      {isHome && !floating && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-secondary-dark/60 to-transparent" />
      )}
      <div className={`relative mx-auto transition-all duration-700 ease-in-out ${shell}`}>
        <Container
          className={`flex items-center gap-6 transition-[padding] duration-700 ease-in-out ${floating ? 'py-2' : 'py-3 md:py-4'}`}
        >
          <Logo />
          <DesktopNav />
          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <HeaderActions />
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-md bg-ink-strong/35 text-white backdrop-blur-md group-data-[floating=true]/header:bg-white/15 group-data-[floating=true]/header:hover:bg-white/25 xl:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </Container>
      </div>
    </header>
  )
}

import { useRouterState } from '@tanstack/react-router'
import { MenuIcon } from '@/shared/components/icons'
import { Container } from '@/shared/components/ui'
import { hasHeroBanner } from '@/shared/config/navigation'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { DesktopNav } from './DesktopNav'
import { HeaderActions } from './HeaderActions'
import { Logo } from './Logo'

// Full-width bar at the top; on scroll it becomes a light floating bar, 98% wide (1% gap each side, pill shape).
// data-floating drives child styles via `group-data-[floating=true]/header:*`.
// Phones get the same floating pill (logo + menu button); BottomNav adds quick tabs at the bottom.
export function SiteHeader({ onOpenMenu }) {
  const floating = useScrolled()
  const overHero = useRouterState({ select: (s) => hasHeroBanner(s.location.pathname) })

  const bar = overHero ? 'bg-transparent' : 'bg-secondary'
  const shell = floating
    ? 'max-w-[96%] md:max-w-[98%] rounded-full bg-surface/95 shadow-elevated ring-1 ring-line-soft backdrop-blur-md'
    : `max-w-full rounded-none ${bar}`

  return (
    <header
      data-floating={floating}
      className={`group/header fixed inset-x-0 top-0 z-40 transition-[padding,translate,opacity] duration-700 ease-in-out ${floating ? 'pt-2 md:pt-3' : 'pt-0'}`}
    >
      {overHero && !floating && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-secondary-dark/60 to-transparent" />
      )}
      <div className={`relative mx-auto transition-all duration-700 ease-in-out ${shell}`}>
        <Container
          className={`flex items-center gap-4 transition-[padding] duration-700 ease-in-out ${floating ? 'py-1.5 md:py-2' : 'py-3 md:py-4'}`}
        >
          <Logo />
          <DesktopNav floating={floating} />
          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <HeaderActions />
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/40 transition hover:bg-white/10 group-data-[floating=true]/header:ring-0 group-data-[floating=true]/header:bg-secondary group-data-[floating=true]/header:hover:bg-secondary-dark xl:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </Container>
      </div>
    </header>
  )
}

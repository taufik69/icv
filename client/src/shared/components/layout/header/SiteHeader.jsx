import { useRouterState } from '@tanstack/react-router'
import { MenuIcon } from '@/shared/components/icons'
import { Container } from '@/shared/components/ui'
import { hasHeroBanner } from '@/shared/config/navigation'
import { useScrolled } from '@/shared/hooks/useScrolled'
import { DesktopNav } from './DesktopNav'
import { HeaderActions } from './HeaderActions'
import { Logo } from './Logo'
import { TopStrip } from './TopStrip'

// Full-width bar at the top; on scroll it becomes a light floating pill, 98% wide.
// Home page: lg+ TopStrip utility row (folds away on scroll) + `edge` nav (logo left | nav + actions right).
// Other pages: `classic` nav (icon + label, underline) centred between logo and actions.
// data-floating drives child styles via `group-data-[floating=true]/header:*`.
// Phones get the same floating pill (logo + menu button); BottomNav adds quick tabs at the bottom.
export function SiteHeader({ onOpenMenu }) {
  const floating = useScrolled()
  const path = useRouterState({ select: (s) => s.location.pathname })
  const overHero = hasHeroBanner(path)
  const edge = path === '/'
  const variant = edge ? 'edge' : 'classic'

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
        {edge && <TopStrip />}
        <Container className={`flex gap-4 ${edge ? 'items-stretch' : 'items-center'} ${edge && !floating ? 'xl:border-b xl:border-white/15' : ''}`}>
          <div className={`flex items-center transition-[padding] duration-700 ease-in-out ${floating ? 'py-1.5 md:py-2' : 'py-3 md:py-3.5'}`}>
            <Logo />
          </div>
          <DesktopNav floating={floating} variant={variant} />
          <div className={`ml-auto flex items-center gap-2 ${edge ? 'xl:ml-2' : 'xl:ml-0'}`}>
            <HeaderActions edge={edge} />
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

import { useNavigate, useRouterState } from '@tanstack/react-router'
import { bottomNavItems } from '@/shared/config/bottomNav'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { BottomNavItem } from './BottomNavItem'

const SECTIONS = bottomNavItems.filter((i) => i.section).map((i) => i.section)

// Full-width tab bar docked to the bottom edge (safe-area aware), phones only (< md). On the home page the active
// tab follows scroll position (scroll-spy); elsewhere no tab is lit. "Menu" opens the same drawer as the header hamburger.
export function BottomNav({ menuOpen, onOpenMenu }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const current = useActiveSection(SECTIONS, pathname)
  const onHome = pathname === '/'
  const activeId = menuOpen ? 'menu' : onHome ? (bottomNavItems.find((i) => i.section === current)?.id ?? 'home') : null

  const goToSection = async (section) => {
    if (pathname !== '/') await navigate({ to: '/' })
    const el = section && document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-0.5 border-t border-white/10 bg-secondary/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-elevated backdrop-blur-xl md:hidden motion-safe:animate-[fade-in_400ms_ease-out]"
    >
      {bottomNavItems.map((item) => (
        <BottomNavItem
          key={item.id}
          item={item}
          active={activeId === item.id}
          href={item.kind === 'link' ? item.href : undefined}
          onClick={item.kind === 'menu' ? onOpenMenu : item.kind === 'section' ? () => goToSection(item.section) : undefined}
        />
      ))}
    </nav>
  )
}

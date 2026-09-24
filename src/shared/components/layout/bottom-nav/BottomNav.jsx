import { useNavigate, useRouterState } from '@tanstack/react-router'
import { bottomNavItems } from '@/shared/config/bottomNav'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { BottomNavItem } from './BottomNavItem'

const SECTIONS = bottomNavItems.filter((i) => i.section).map((i) => i.section)

// Floating glass tab bar, phones only (< md), centred with 1rem gaps (max 24rem). On the home page the active
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
      className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto flex w-[calc(100%-2rem)] max-w-sm items-center justify-between gap-0.5 rounded-3xl bg-secondary/90 px-1.5 py-2 shadow-elevated ring-1 ring-white/15 backdrop-blur-xl md:hidden motion-safe:animate-[fade-in_400ms_ease-out]"
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

import { useNavigate, useRouterState } from '@tanstack/react-router'
import { bottomNavItems } from '@/shared/config/bottomNav'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { BottomNavItem } from './BottomNavItem'

const SECTIONS = bottomNavItems.filter((i) => i.section).map((i) => i.section)

// Floating tab bar, phones only (< md); 98% wide / rounded-2xl to match the floating header. Active tab follows scroll position (scroll-spy);
// "Menu" opens the same drawer as the header hamburger.
export function BottomNav({ menuOpen, onOpenMenu }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const current = useActiveSection(SECTIONS, pathname)
  const activeId = menuOpen ? 'menu' : (bottomNavItems.find((i) => i.section === current)?.id ?? 'home')

  const goToSection = async (section) => {
    if (pathname !== '/') await navigate({ to: '/' })
    const el = section && document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-[1%] bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-between gap-1 rounded-2xl bg-secondary/90 p-1.5 shadow-brand ring-1 ring-white/10 backdrop-blur-md md:hidden motion-safe:animate-[fade-in_400ms_ease-out]"
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

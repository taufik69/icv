import { mainNav } from '@/shared/config/navigation'
import { NavItem } from './NavItem'

// xl+: one centred capsule holding the text-only items — frosted glass over the hero / navy bar,
// a soft grey track inside the light floating bar. The current section is a solid pill (see NavItem).
export function DesktopNav({ floating }) {
  const capsule = floating ? 'bg-surface-muted ring-line-soft' : 'bg-white/8 ring-white/15 backdrop-blur-md'
  return (
    <nav aria-label="Main" className="hidden flex-1 justify-center xl:flex">
      <div className={`flex items-center gap-0.5 rounded-pill p-1 ring-1 transition-colors duration-700 ${capsule}`}>
        {mainNav.map((item) => (
          <NavItem key={item.label} item={item} floating={floating} />
        ))}
      </div>
    </nav>
  )
}

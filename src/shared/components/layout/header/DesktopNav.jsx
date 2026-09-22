import { mainNav } from '@/shared/config/navigation'
import { NavItem } from './NavItem'

export function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden flex-1 items-center gap-2 xl:flex">
      {mainNav.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
    </nav>
  )
}

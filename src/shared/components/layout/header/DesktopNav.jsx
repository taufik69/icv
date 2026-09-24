import { mainNav } from '@/shared/config/navigation'
import { NavItem } from './NavItem'

// xl+: centred row; hairline dividers appear on the floating bar to separate logo / nav / actions.
export function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1.5 xl:flex">
      <span aria-hidden="true" className="mr-2 hidden h-8 w-px bg-line group-data-[floating=true]/header:block" />
      {mainNav.map((item) => (
        <NavItem key={item.label} item={item} />
      ))}
      <span aria-hidden="true" className="ml-2 hidden h-8 w-px bg-line group-data-[floating=true]/header:block" />
    </nav>
  )
}

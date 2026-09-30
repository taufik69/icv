import { Fragment } from 'react'
import { mainNav } from '@/shared/config/navigation'
import { NavItem } from './NavItem'

const Divider = ({ className = '' }) => <span aria-hidden="true" className={`h-6 w-px bg-line ${className}`} />

// xl+ main nav (look set by SiteHeader):
// edge (home) — text items right-aligned beside the actions, stretched to the bar's full height so the
//   current-section indicator sits on the header's bottom edge;
// classic (other pages) — centred icon + label row; on the floating bar hairline dividers separate
//   logo | pages | International & Contact | actions.
export function DesktopNav({ floating, variant }) {
  if (variant === 'edge') {
    return (
      <nav aria-label="Main" className="ml-auto hidden items-stretch xl:flex">
        {mainNav.map((item) => <NavItem key={item.label} item={item} floating={floating} variant="edge" />)}
      </nav>
    )
  }
  return (
    <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
      {floating && <Divider className="mr-2" />}
      {mainNav.map((item, i) => (
        <Fragment key={item.label}>
          {floating && i === 4 && <Divider className="mx-1" />}
          <NavItem item={item} floating={floating} variant="classic" />
        </Fragment>
      ))}
      {floating && <Divider className="ml-2" />}
    </nav>
  )
}

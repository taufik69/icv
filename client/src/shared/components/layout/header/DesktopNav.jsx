import { Fragment } from 'react'
import { mainNav } from '@/shared/config/navigation'
import { NavItem } from './NavItem'

const Divider = ({ className = '' }) => <span aria-hidden="true" className={`h-6 w-px bg-line ${className}`} />

// xl+: centred row. On the floating bar hairline dividers separate logo | pages | International & Contact | actions.
export function DesktopNav({ floating }) {
  return (
    <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-1 xl:flex">
      {floating && <Divider className="mr-2" />}
      {mainNav.map((item, i) => (
        <Fragment key={item.label}>
          {floating && i === 4 && <Divider className="mx-1" />}
          <NavItem item={item} floating={floating} />
        </Fragment>
      ))}
      {floating && <Divider className="ml-2" />}
    </nav>
  )
}

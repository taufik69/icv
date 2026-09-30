import { useRouterState } from '@tanstack/react-router'
import { ChevronDownIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { NavDropdown } from './NavDropdown'
import { navItemStyles } from './navItemStyles'
import { useDropdownDismiss } from './useDropdownDismiss'

// edge: bar on the header's bottom edge. classic: thin underline inside the item (floating bar: current only).
function Indicator({ variant, floating, active, s }) {
  if (variant === 'classic' && floating && !active) return null
  const edge = variant === 'edge'
  const state = active
    ? `scale-x-100 ${edge ? 'bg-primary' : s.onLine}`
    : `scale-x-0 ${s.hover} group-hover/item:scale-x-100 group-focus-visible/item:scale-x-100`
  const shape = edge ? 'inset-x-3.5 bottom-0 h-0.75 rounded-t-sm' : `${s.inset} bottom-0.5 h-0.5 rounded-pill`
  return <span aria-hidden="true" className={`absolute transition-transform duration-300 ${shape} ${state}`} />
}

// One desktop nav entry; look comes from navItemStyles[variant] (edge = home page, classic = other pages).
export function NavItem({ item, floating, variant = 'edge' }) {
  // Active when the current page is this link or one of its internal children.
  const active = useRouterState({
    select: (s) => item.to === s.location.pathname || (!item.passive && !!item.children?.some((c) => !c.hash && c.to === s.location.pathname)),
  })
  const { closed, dismiss, reset } = useDropdownDismiss()
  const v = navItemStyles[variant]
  const s = floating ? v.float : v.top
  const cls = `${v.base} ${active ? s.on : s.idle}`
  const indicator = <Indicator variant={variant} floating={floating} active={active} s={s} />
  const { Icon } = item
  const icon = variant === 'classic' && Icon && <Icon className="size-4.5 shrink-0 opacity-90" />

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} className={cls}>
        {icon}
        {item.label}
        {indicator}
      </AppLink>
    )
  }

  // A parent with its own page (About Us, Domestic, International) is a link; the rest only open the menu.
  const chevron = `${variant === 'edge' ? 'size-3.5 opacity-60' : 'size-4 opacity-70'} transition ${closed ? '' : 'group-hover:rotate-180 group-focus-within:rotate-180'}`
  const trigger = (
    <>
      {icon}
      {item.label}
      <ChevronDownIcon className={chevron} />
      {indicator}
    </>
  )

  return (
    <div className={`group relative ${variant === 'edge' ? 'h-full' : ''}`} onMouseLeave={reset}>
      {item.to ? (
        <AppLink to={item.to} aria-haspopup="true" onClick={dismiss} className={cls}>
          {trigger}
        </AppLink>
      ) : (
        <button type="button" aria-haspopup="true" className={cls}>
          {trigger}
        </button>
      )}
      <NavDropdown items={item.children} closed={closed} onItemClick={dismiss} offset={v.dropdown} />
    </div>
  )
}

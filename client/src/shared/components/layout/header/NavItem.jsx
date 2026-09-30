import { useRouterState } from '@tanstack/react-router'
import { ChevronDownIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { NavDropdown } from './NavDropdown'
import { useDropdownDismiss } from './useDropdownDismiss'

// Text-only items inside the DesktopNav capsule; the current section is a solid pill (white over the hero,
// navy on the light floating bar). Class sets are picked in JS from the header state, so the top-of-page
// styles can never leak onto the floating bar.
const base =
  'group/item flex items-center gap-1 rounded-pill px-4 py-2 font-heading text-[0.9375rem] font-medium whitespace-nowrap transition duration-300'
const styles = {
  top: { idle: 'text-white/80 hover:bg-white/10 hover:text-white', on: 'bg-white text-secondary shadow-card' },
  float: { idle: 'text-secondary/75 hover:bg-surface hover:text-secondary', on: 'bg-secondary text-white shadow-card' },
}

export function NavItem({ item, floating }) {
  // Active when the current page is this link or one of its internal children.
  const active = useRouterState({
    select: (s) => item.to === s.location.pathname || (!item.passive && !!item.children?.some((c) => !c.hash && c.to === s.location.pathname)),
  })
  const { closed, dismiss, reset } = useDropdownDismiss()
  const s = floating ? styles.float : styles.top
  const cls = `${base} ${active ? s.on : s.idle}`
  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} className={cls}>
        {item.label}
      </AppLink>
    )
  }

  // A parent with its own page (About Us, Domestic, International) is a link; the rest only open the menu.
  const chevron = `size-3.5 opacity-60 transition ${closed ? '' : 'group-hover:rotate-180 group-focus-within:rotate-180'}`
  const trigger = (
    <>
      {item.label}
      <ChevronDownIcon className={chevron} />
    </>
  )

  return (
    <div className="group relative" onMouseLeave={reset}>
      {item.to ? (
        <AppLink to={item.to} aria-haspopup="true" onClick={dismiss} className={cls}>
          {trigger}
        </AppLink>
      ) : (
        <button type="button" aria-haspopup="true" className={cls}>
          {trigger}
        </button>
      )}
      <NavDropdown items={item.children} closed={closed} onItemClick={dismiss} />
    </div>
  )
}

import { useRouterState } from '@tanstack/react-router'
import { ChevronDownIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { NavDropdown } from './NavDropdown'

// Class sets are picked in JS from the header state (not with group-data variants), so the top-of-page
// styles can never leak onto the light floating bar.
const base =
  'group/item relative flex items-center gap-2 rounded-pill px-3.5 py-2 font-heading text-sm font-medium whitespace-nowrap transition duration-300'
const styles = {
  // Over the hero / navy bar: no background, just text and an underline that grows on hover.
  top: {
    idle: 'text-white/85 text-shadow-sm hover:text-white',
    on: 'text-white text-shadow-sm',
    line: 'bg-white/70',
    lineOn: 'bg-primary',
  },
  // Light floating bar: soft hover wash, active item gets a green pill + underline.
  float: {
    idle: 'text-secondary hover:bg-surface-muted',
    on: 'bg-primary-soft font-semibold text-secondary',
    line: 'bg-primary-hover',
    lineOn: 'bg-primary-hover',
  },
}

// Underline sits inside the item; hidden (scale-x-0) until hover/focus, always shown when active.
function Underline({ s, active }) {
  const state = active
    ? `scale-x-100 ${s.lineOn}`
    : `scale-x-0 ${s.line} group-hover/item:scale-x-100 group-focus-visible/item:scale-x-100`
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-3.5 bottom-0.5 h-0.5 origin-center rounded-pill transition-transform duration-300 ${state}`}
    />
  )
}

export function NavItem({ item, floating }) {
  const { Icon } = item
  // Active when the current page is this link or one of its internal children.
  const active = useRouterState({
    select: (s) => item.to === s.location.pathname || (!item.passive && !!item.children?.some((c) => !c.hash && c.to === s.location.pathname)),
  })
  const s = floating ? styles.float : styles.top
  const cls = `${base} ${active ? s.on : s.idle}`
  const inner = (
    <>
      {Icon && <Icon className="size-4.5 shrink-0 opacity-90" />}
      {item.label}
    </>
  )
  // Floating idle items already get a hover wash; the underline there marks only the active page.
  const underline = (!floating || active) && <Underline s={s} active={active} />

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} className={cls}>
        {inner}
        {underline}
      </AppLink>
    )
  }

  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cls}>
        {inner}
        <ChevronDownIcon className="size-4 opacity-70 transition group-hover:rotate-180 group-focus-within:rotate-180" />
        {underline}
      </button>
      <NavDropdown items={item.children} />
    </div>
  )
}

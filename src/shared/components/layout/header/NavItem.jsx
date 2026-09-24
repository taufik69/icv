import { useRouterState } from '@tanstack/react-router'
import { ChevronDownIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { NavDropdown } from './NavDropdown'

// Top of page: dark glass pill over the banner. Floating (scrolled): light bar item, soft green when active.
const base = 'relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-heading text-sm font-medium whitespace-nowrap transition'
const F = 'group-data-[floating=true]/header:'
const top = `bg-ink-strong/35 text-white/90 backdrop-blur-md hover:bg-ink-strong/55 hover:text-white ${F}backdrop-blur-none`
// Idle and active floating styles are separate so their colours never compete.
const idle = `${F}bg-transparent ${F}text-secondary ${F}hover:bg-primary-soft ${F}hover:text-secondary`
const on = `ring-1 ring-primary/60 ${F}ring-0 ${F}bg-primary-soft ${F}text-primary-hover ${F}hover:text-primary-hover`

// Green underline under the active item, shown only on the floating bar.
const Underline = () => (
  <span aria-hidden="true" className="absolute inset-x-4 -bottom-1.5 hidden h-0.5 rounded-pill bg-primary-hover group-data-[floating=true]/header:block" />
)

export function NavItem({ item }) {
  const { Icon } = item
  // Active when the current page is this link or one of its internal children.
  const active = useRouterState({
    select: (s) => item.to === s.location.pathname || !!item.children?.some((c) => c.to === s.location.pathname),
  })
  const cls = `${base} ${top} ${active ? on : idle}`
  const inner = (
    <>
      {Icon && <Icon className="size-4.5 shrink-0" />}
      {item.label}
    </>
  )

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} className={cls}>
        {inner}
        {active && <Underline />}
      </AppLink>
    )
  }

  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cls}>
        {inner}
        <ChevronDownIcon className="size-4 opacity-70 transition group-hover:rotate-180 group-focus-within:rotate-180" />
        {active && <Underline />}
      </button>
      <NavDropdown items={item.children} />
    </div>
  )
}

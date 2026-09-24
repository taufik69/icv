import { useRouterState } from '@tanstack/react-router'
import { NavDropdown } from './NavDropdown'

const pill =
  'flex w-full items-center justify-between gap-3 rounded-md bg-ink-strong/35 group-data-[floating=true]/header:bg-white/15 group-data-[floating=true]/header:hover:bg-white/25 px-4 py-2.5 font-heading text-sm font-medium text-white/90 backdrop-blur-md transition hover:bg-ink-strong/55 hover:text-white'

function Dot({ active }) {
  return (
    <span className={`size-1.5 rounded-full transition group-hover:bg-primary group-focus-within:bg-primary ${active ? 'bg-primary' : 'bg-white/40'}`} />
  )
}

export function NavItem({ item }) {
  // Highlight a group when one of its internal links is the current page.
  const active = useRouterState({
    select: (s) => !!item.children?.some((c) => c.to === s.location.pathname),
  })

  if (!item.children) {
    return (
      <a href={item.href} className={`group flex-1 ${pill}`}>
        {item.label}
        <Dot />
      </a>
    )
  }

  return (
    <div className="group relative flex-1">
      <button type="button" aria-haspopup="true" className={`${pill} ${active ? 'text-white ring-1 ring-primary/60' : ''}`}>
        {item.label}
        <Dot active={active} />
      </button>
      <NavDropdown items={item.children} />
    </div>
  )
}

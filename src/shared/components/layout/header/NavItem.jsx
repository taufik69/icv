import { NavDropdown } from './NavDropdown'

const pill =
  'flex w-full items-center justify-between gap-3 rounded-md bg-ink-strong/35 group-data-[floating=true]/header:bg-white/15 group-data-[floating=true]/header:hover:bg-white/25 px-4 py-2.5 font-heading text-sm font-medium text-white/90 backdrop-blur-md transition hover:bg-ink-strong/55 hover:text-white'

function Dot() {
  return (
    <span className="size-1.5 rounded-full bg-white/40 transition group-hover:bg-primary group-focus-within:bg-primary" />
  )
}

export function NavItem({ item }) {
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
      <button type="button" aria-haspopup="true" className={pill}>
        {item.label}
        <Dot />
      </button>
      <NavDropdown items={item.children} />
    </div>
  )
}

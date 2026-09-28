import { ChevronRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

// One submenu row: icon tile (fills green on hover / when current), label with optional course code,
// and a chevron that slides in on hover. `aria-current` (set by AppLink) drives the active styles.
export function NavDropdownItem({ item }) {
  const { Icon } = item
  return (
    <AppLink
      to={item.to}
      href={item.href}
      hash={item.hash}
      className="group/row flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm text-white/85 transition duration-200 hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-primary"
    >
      {Icon && (
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-white ring-1 ring-white/15 transition duration-200 group-hover/row:bg-primary group-hover/row:text-on-primary group-hover/row:ring-primary group-aria-[current=page]/row:bg-primary group-aria-[current=page]/row:text-on-primary group-aria-[current=page]/row:ring-primary">
          <Icon className="size-4.5" />
        </span>
      )}
      <span className="min-w-0 flex-1 leading-snug transition duration-200 group-hover/row:translate-x-0.5 group-aria-[current=page]/row:font-semibold">
        {item.code && <span className="block font-condensed text-xs font-bold tracking-wider text-primary">{item.code}</span>}
        {item.label}
      </span>
      <ChevronRightIcon className="size-4 shrink-0 -translate-x-1 text-primary opacity-0 transition duration-200 group-hover/row:translate-x-0 group-hover/row:opacity-100" />
    </AppLink>
  )
}

import { AppLink } from '@/shared/components/ui'

// Revealed by the parent `group` on hover or keyboard focus (see NavItem).
export function NavDropdown({ items, align = 'left', heading }) {
  return (
    <div
      className={`invisible absolute top-full z-10 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${align === 'right' ? 'right-0' : 'left-0'}`}
    >
      <ul className="w-80 rounded-2xl bg-surface p-2 shadow-elevated ring-1 ring-line-soft">
        {heading && <li className="px-3 pt-2 pb-1 font-condensed text-xs font-bold tracking-[0.2em] text-ink-subtle uppercase">{heading}</li>}
        {items.map((item) => (
          <li key={item.label}>
            <AppLink
              to={item.to}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-ink hover:bg-surface-muted hover:text-secondary aria-[current=page]:bg-primary-soft aria-[current=page]:font-semibold aria-[current=page]:text-secondary"
            >
              {item.code && (
                <span className="block font-condensed text-xs tracking-wider text-ink-subtle">
                  {item.code}
                </span>
              )}
              {item.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

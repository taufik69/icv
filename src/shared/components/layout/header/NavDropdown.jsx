import { NavDropdownItem } from './NavDropdownItem'

// White-tinted glass like the hero quick links: a white sheen over a translucent deep-navy base, so white text
// stays readable over any page. On the floating bar the base turns solid (the bar's own backdrop-filter stops a nested blur).
// Revealed by the parent `group` on hover or keyboard focus (see NavItem): fades in and rises 8px.
export function NavDropdown({ items, align = 'left', heading }) {
  return (
    <div
      className={`invisible absolute top-full z-10 translate-y-2 pt-3 opacity-0 group-data-[floating=true]/header:pt-6 transition duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${align === 'right' ? 'right-0' : 'left-0'}`}
    >
      <ul className="w-80 divide-y divide-white/10 overflow-hidden rounded-2xl bg-secondary-dark/55 bg-linear-to-b from-white/15 to-white/10 p-1.5 shadow-elevated ring-1 ring-white/20 backdrop-blur-xl group-data-[floating=true]/header:bg-secondary-dark">
        {heading && <li className="px-3 pt-2 pb-1 font-condensed text-xs font-bold tracking-[0.2em] text-white/50 uppercase">{heading}</li>}
        {items.map((item) => (
          <li key={item.label}>
            <NavDropdownItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

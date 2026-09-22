const base =
  'flex h-11 min-w-11 items-center justify-center rounded-full px-3 transition-colors duration-200 active:scale-95'

// Icon-only tab that expands to show its label when active (grid-cols 0fr → 1fr animation).
export function BottomNavItem({ item, active, onClick, href }) {
  const { Icon, label } = item
  const Tag = href ? 'a' : 'button'
  const state = active ? 'bg-primary text-on-primary' : 'text-white/70 hover:bg-white/10 hover:text-white'

  return (
    <Tag
      {...(href ? { href } : { type: 'button' })}
      onClick={onClick}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`${base} ${state}`}
    >
      <Icon className="size-5 shrink-0" />
      <span
        className={`grid transition-[grid-template-columns,margin] duration-300 ease-out ${active ? 'ml-2 grid-cols-[1fr]' : 'ml-0 grid-cols-[0fr]'}`}
      >
        <span className="overflow-hidden font-heading text-xs font-semibold whitespace-nowrap">{label}</span>
      </span>
    </Tag>
  )
}

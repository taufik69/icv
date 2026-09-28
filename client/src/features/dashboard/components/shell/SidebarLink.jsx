import { Link } from '@tanstack/react-router'

// Sidebar row. Router sets data-status="active" on the current link; the green bar marks it.
export function SidebarLink({ item, badge }) {
  const { label, to, Icon, exact } = item
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-heading font-semibold text-white/65 transition hover:bg-white/5 hover:text-white data-[status=active]:bg-white/10 data-[status=active]:text-white"
    >
      <span aria-hidden="true" className="absolute inset-y-2 -left-3 w-1 rounded-r-full bg-primary opacity-0 transition group-data-[status=active]:opacity-100" />
      <Icon className="size-5 shrink-0 group-data-[status=active]:text-primary" />
      {label}
      {badge > 0 && (
        <span aria-label={`${badge} new`} className="ml-auto rounded-pill bg-primary px-2 text-xs font-bold text-on-primary">{badge}</span>
      )}
    </Link>
  )
}

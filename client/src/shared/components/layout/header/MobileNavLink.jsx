import { AppLink } from '@/shared/components/ui'

// One submenu row in the drawer: small icon, label (+ course code). Current page = green tint.
export function MobileNavLink({ item, onNavigate }) {
  const { Icon } = item
  return (
    <AppLink
      to={item.to}
      href={item.href}
      hash={item.hash}
      onClick={onNavigate}
      className="group/link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 transition active:scale-[0.98] hover:bg-white/5 hover:text-white aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-primary"
    >
      {Icon && (
        <Icon className="size-4 shrink-0 text-white/40 transition group-hover/link:text-primary group-aria-[current=page]/link:text-primary" />
      )}
      <span className="min-w-0 flex-1 leading-snug">
        {item.code && <span className="block font-condensed text-[0.7rem] font-bold tracking-wider text-primary/80">{item.code}</span>}
        {item.label}
      </span>
    </AppLink>
  )
}

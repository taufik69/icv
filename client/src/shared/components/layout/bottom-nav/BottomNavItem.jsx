import { AppLink } from '@/shared/components/ui'

// Tab: icon over a small label. Active tab = green pill behind the icon + green label.
export function BottomNavItem({ item, active, onClick, href }) {
  const { Icon, label } = item
  const Tag = href ? AppLink : 'button'

  return (
    <Tag
      {...(href ? { href } : { type: 'button' })}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="group flex flex-1 flex-col items-center gap-0.5 rounded-full py-1 transition active:scale-95"
    >
      <span
        className={`grid h-8 w-12 place-items-center rounded-full transition duration-300 ${active ? 'bg-primary text-on-primary shadow-card' : 'text-white/90 group-hover:bg-white/10 group-hover:text-white'}`}
      >
        <Icon className="size-5" />
      </span>
      <span className={`font-heading text-[0.7rem] leading-none font-semibold transition ${active ? 'text-primary' : 'text-white/85'}`}>
        {label}
      </span>
    </Tag>
  )
}

import { ChevronDownIcon, ChevronRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

const rowBase = 'flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-heading text-base font-semibold transition'

function GroupIcon({ Icon, active }) {
  return (
    <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${active ? 'bg-primary text-on-primary' : 'bg-white/10 text-primary'}`}>
      <Icon className="size-5" />
    </span>
  )
}

// Accordion row. Plain links render as a row; groups expand with a grid-rows animation.
export function MobileNavGroup({ item, Icon, open, onToggle, onNavigate }) {
  if (!item.children) {
    return (
      <a href={item.href} onClick={onNavigate} className={`${rowBase} text-white hover:bg-white/5 hover:text-white`}>
        <GroupIcon Icon={Icon} />
        {item.label}
      </a>
    )
  }

  return (
    <div className={`rounded-2xl transition ${open ? 'bg-white/5 ring-1 ring-white/10' : ''}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className={`${rowBase} text-white hover:bg-white/5`}>
        <GroupIcon Icon={Icon} active={open} />
        <span className="flex-1">{item.label}</span>
        <ChevronDownIcon className={`size-5 text-white/60 transition duration-300 ${open ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <ul className="overflow-hidden px-3">
          {item.children.map((child) => (
            <li key={child.label} className="border-t border-white/5 first:border-0">
              <AppLink to={child.to} href={child.href} onClick={onNavigate} className="group flex items-center gap-3 py-3 pl-13 text-sm text-white/75 hover:text-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary">
                <span className="flex-1">
                  {child.code && <span className="mb-0.5 block font-condensed text-xs tracking-wider text-primary/80">{child.code}</span>}
                  {child.label}
                </span>
                <ChevronRightIcon className="size-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

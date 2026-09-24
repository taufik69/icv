import { ChevronDownIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { MobileNavLink } from './MobileNavLink'

const row = 'flex w-full items-center gap-3.5 rounded-2xl p-2 text-left font-heading text-base font-semibold transition active:scale-[0.99]'

// Icon tile: green when this is the current section, soft glass otherwise.
function GroupIcon({ Icon, active }) {
  const tone = active ? 'bg-primary text-on-primary' : 'bg-white/5 text-primary ring-1 ring-white/10'
  return (
    <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition ${tone}`}>
      <Icon className="size-5" />
    </span>
  )
}

// Accordion group in the navy drawer. Plain links render as a row; groups expand (grid-rows animation)
// into an indented list hanging off a thin guide line.
export function MobileNavGroup({ item, active, open, onToggle, onNavigate }) {
  const { Icon } = item
  const label = active ? 'text-primary' : 'text-white'

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} onClick={onNavigate} className={`${row} ${label} hover:bg-white/5 hover:text-white`}>
        <GroupIcon Icon={Icon} active={active} />
        {item.label}
      </AppLink>
    )
  }

  return (
    <div className={`rounded-2xl transition duration-300 ${open ? 'bg-white/5 ring-1 ring-white/10' : ''}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className={`${row} ${label} hover:bg-white/5`}>
        <GroupIcon Icon={Icon} active={active} />
        <span className="flex-1">{item.label}</span>
        <span className={`mr-1 grid size-8 place-items-center rounded-full transition duration-300 ${open ? 'rotate-180 bg-primary text-on-primary' : 'bg-white/5 text-white/60'}`}>
          <ChevronDownIcon className="size-4" />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <ul className="mt-1 mr-2 mb-3 ml-7 space-y-0.5 border-l border-white/10 pl-3">
            {item.children.map((child) => (
              <li key={child.label}>
                <MobileNavLink item={child} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

import { ChevronDownIcon, ChevronRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { MobileNavLink } from './MobileNavLink'

// Flat row: plain line icon, label, chevron in a small circle. Selected (current section or opened group) =
// green bar on the left, soft highlight and a green icon. Rows are separated by hairlines (see MobileMenu's divide-y).
const row = 'relative flex w-full items-center gap-4 px-5 py-4 text-left font-heading text-base font-medium text-white transition active:bg-white/10'
const Bar = () => <span aria-hidden="true" className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-primary" />
const Chevron = ({ Icon, className = '' }) => (
  <span className={`grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-white/85 transition duration-300 ${className}`}>
    <Icon className="size-4" />
  </span>
)

// Accordion row in the navy drawer. Plain links render as a row; groups expand (grid-rows animation)
// into an indented list hanging off a thin guide line.
export function MobileNavGroup({ item, active, open, onToggle, onNavigate }) {
  const { Icon } = item
  // Selected = the current section, or the group the user just opened: green bar, green icon, soft highlight.
  const on = active || open
  const tone = on ? 'bg-white/5' : 'hover:bg-white/5'
  const icon = <Icon className={`size-6 shrink-0 stroke-[1.5] ${on ? 'text-primary' : 'text-white/95'}`} />

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} onClick={onNavigate} className={`${row} ${tone} hover:text-white`}>
        {active && <Bar />}
        {icon}
        <span className="flex-1">{item.label}</span>
        <Chevron Icon={ChevronRightIcon} />
      </AppLink>
    )
  }

  return (
    <div>
      <button type="button" aria-expanded={open} onClick={onToggle} className={`${row} ${tone}`}>
        {on && <Bar />}
        {icon}
        <span className="flex-1">{item.label}</span>
        <Chevron Icon={ChevronDownIcon} className={open ? 'rotate-180' : ''} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <ul className="mr-3 mb-3 ml-8 space-y-0.5 border-l border-white/10 pl-3">
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

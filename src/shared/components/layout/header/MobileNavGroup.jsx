import { ChevronDownIcon, ChevronRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

const row = 'relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-heading text-base font-semibold transition'
const tone = (active) => (active ? 'rounded-pill bg-primary-soft text-primary-hover hover:text-primary-hover' : 'text-white hover:bg-white/5 hover:text-white')

function GroupIcon({ Icon, active }) {
  return (
    <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${active ? 'text-primary-hover' : 'bg-white/10 text-primary'}`}>
      <Icon className="size-5" />
    </span>
  )
}

// Green underline under the active row (same as the desktop floating bar).
const Rail = () => <span aria-hidden="true" className="absolute bottom-1 left-16 h-1 w-24 rounded-pill bg-primary-hover" />

// Accordion row (navy drawer). Plain links render as a row; groups expand with a grid-rows animation.
export function MobileNavGroup({ item, active, open, onToggle, onNavigate }) {
  const { Icon } = item

  if (!item.children) {
    return (
      <AppLink to={item.to} href={item.href} onClick={onNavigate} className={`${row} ${tone(active)}`}>
        {active && <Rail />}
        <GroupIcon Icon={Icon} active={active} />
        {item.label}
      </AppLink>
    )
  }

  return (
    <div className={`rounded-2xl transition ${open ? 'bg-white/5 ring-1 ring-white/10' : ''}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className={`${row} ${tone(active)}`}>
        {active && <Rail />}
        <GroupIcon Icon={Icon} active={active} />
        <span className="flex-1">{item.label}</span>
        <ChevronDownIcon className={`size-5 transition duration-300 ${open ? 'rotate-180' : ''} ${active ? 'text-primary-hover' : open ? 'text-primary' : 'text-white/60'}`} />
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <ul className="overflow-hidden px-2">
          {item.children.map((child) => (
            <li key={child.label} className="py-0.5 first:pt-1 last:pb-2">
              <AppLink
                to={child.to}
                href={child.href}
                hash={child.hash}
                onClick={onNavigate}
                className="group flex items-center gap-3 rounded-xl py-2.5 pr-3 pl-14 text-sm text-white/75 transition hover:bg-white/5 hover:text-primary aria-[current=page]:bg-white/10 aria-[current=page]:font-semibold aria-[current=page]:text-primary"
              >
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

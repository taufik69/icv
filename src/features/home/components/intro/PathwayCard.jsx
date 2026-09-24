import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

const variants = {
  navy: {
    card: 'bg-secondary text-white ring-secondary hover:bg-secondary-dark hover:text-white',
    tile: 'bg-white/10 text-primary',
    cta: 'text-white/70',
    arrow: 'bg-primary text-on-primary',
  },
  light: {
    card: 'bg-surface text-secondary ring-line-soft hover:ring-primary hover:text-secondary',
    tile: 'bg-primary text-on-primary',
    cta: 'text-ink-muted',
    arrow: 'bg-secondary text-white',
  },
}

// Big clickable choice ("I'm a domestic / international student"): icon tile, label, hint, sliding arrow.
export function PathwayCard({ action }) {
  const { Icon } = action
  const v = variants[action.variant]

  return (
    <AppLink
      to={action.to}
      className={`group btn-shine flex items-center gap-4 rounded-2xl p-4 shadow-card ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-elevated sm:p-5 ${v.card}`}
    >
      <span className={`grid size-12 shrink-0 place-items-center rounded-xl transition duration-300 group-hover:-rotate-6 ${v.tile}`}>
        <Icon className="size-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-lg leading-tight font-bold whitespace-nowrap">{action.label}</span>
        <span className={`mt-0.5 block text-sm ${v.cta}`}>{action.cta}</span>
      </span>
      <span className={`grid size-9 shrink-0 place-items-center rounded-full transition duration-300 group-hover:translate-x-1 ${v.arrow}`}>
        <ArrowRightIcon className="size-4" />
      </span>
    </AppLink>
  )
}

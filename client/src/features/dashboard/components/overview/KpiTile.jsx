import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@/shared/components/icons'
import { compact } from '../../lib/overviewFormat'
import { Sparkline } from './Sparkline'

const tone = { up: 'text-success-ink', down: 'text-danger-ink', flat: 'text-ink-subtle', new: 'text-info-ink' }
const arrow = { up: '↑', down: '↓', flat: '', new: '' }

// Stat tile: label, the number, then either a change against the previous period (arrow + words, never
// colour alone) or a plain note, with an optional sparkline and icon. `to` makes the whole tile a link.
export function KpiTile({ label, Icon, value, change, caption, note, trend, to, search }) {
  const body = (
    <>
      <p className="flex items-center gap-2.5 text-sm text-ink-muted">
        {Icon && (
          <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/8 text-secondary transition group-hover:bg-secondary group-hover:text-white">
            <Icon className="size-4" />
          </span>
        )}
        <span className="flex-1">{label}</span>
        {to && <ArrowUpRightIcon aria-hidden="true" className="size-4 text-ink-subtle transition group-hover:text-secondary" />}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="font-heading text-4xl leading-none font-bold text-ink-strong">{compact(value)}</p>
        {trend && <Sparkline values={trend} />}
      </div>
      <p className="mt-3 text-sm text-ink-subtle">
        {change ? (
          <>
            <span className={`font-semibold ${tone[change.direction]}`}>{arrow[change.direction]} {change.text}</span> {caption}
          </>
        ) : note}
      </p>
    </>
  )
  const box = 'group block min-w-0 rounded-2xl bg-surface p-5 ring-1 ring-line transition sm:p-6'
  return to ? <Link to={to} search={search} className={`${box} hover:ring-secondary/40`}>{body}</Link> : <div className={box}>{body}</div>
}

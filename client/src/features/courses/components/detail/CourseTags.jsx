import { GlobeIcon, UserIcon } from '@/shared/components/icons'
import { areaTone } from '../../lib/areaTone'

const pill = 'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1'

// Code, study area (colour-coded) and level; then who the course is for.
export function CourseTags({ summary, markets, marketNames }) {
  const tone = areaTone(summary.area)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`${pill} bg-white font-condensed tracking-wider text-secondary ring-white`}>{summary.code}</span>
      <span className={`${pill} text-white ${tone.pill}`}>
        <span className={`size-2 rounded-full ${tone.dot}`} />
        {summary.area}
      </span>
      <span className={`${pill} bg-white/10 text-white/90 ring-white/20`}>{summary.level}</span>
      <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
      {markets.map((m) => {
        const Icon = m === 'international' ? GlobeIcon : UserIcon
        return (
          <span key={m} className={`${pill} bg-white/10 text-white/90 ring-white/20`}>
            <Icon className="size-3.5 text-white/70" />
            {marketNames[m]}
          </span>
        )
      })}
    </div>
  )
}

import { CheckIcon } from '@/shared/components/icons'

// Soft tone per unit type: a tinted check circle + matching tag (full class strings so Tailwind sees them).
const tones = {
  Core: { check: 'bg-sky/12 text-secondary ring-sky/25', tag: 'bg-sky/10 text-secondary-muted' },
  Elective: { check: 'bg-accent/10 text-accent ring-accent/20', tag: 'bg-accent/8 text-accent' },
}

// Units as two-column tiles: tinted check, code + Core / Elective tag, then the unit title.
export function UnitsGrid({ units }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {units.map((u) => {
        const tone = tones[u.type] ?? tones.Core
        return (
          <li
            key={u.code + u.title}
            className="flex gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-line transition hover:shadow-card hover:ring-line-strong"
          >
            <span className={`grid size-8 shrink-0 place-items-center rounded-full ring-1 ${tone.check}`}>
              <CheckIcon className="size-4" strokeWidth="2.5" />
            </span>
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-condensed font-semibold tracking-wide text-secondary">{u.code}</span>
                <span className={`rounded-full px-2 py-0.5 font-medium ${tone.tag}`}>{u.type}</span>
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink">{u.title}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

import { rplOverview as content } from '@/features/student-info/data/rplContent'
import { BadgeCheckIcon, CheckCircleIcon } from '@/shared/components/icons'
import { DocSection } from '../common/DocSection'

// Lead statement, the five qualities as a check grid, and the two decision principles as navy cards.
export function RplOverview() {
  return (
    <DocSection section={content}>
      <p className="mt-6 border-l-4 border-primary pl-5 font-heading text-xl leading-snug font-semibold text-secondary md:text-2xl">{content.lead}</p>
      <p className="mt-6 leading-relaxed text-ink-muted">{content.text}</p>

      <h3 className="mt-10 text-lg">{content.qualitiesTitle}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {content.qualities.map((q) => (
          <li key={q} className="flex items-start gap-3 rounded-xl bg-surface-muted px-4 py-3 font-medium text-ink ring-1 ring-line-soft">
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary-hover" />
            {q}
          </li>
        ))}
      </ul>

      <h3 className="mt-10 text-lg">{content.principlesTitle}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {content.principles.map((p) => (
          <div key={p.label} className="rounded-2xl bg-secondary p-6 shadow-brand">
            <p className="flex items-center gap-3 font-heading text-lg font-bold text-white">
              <BadgeCheckIcon className="size-6 text-primary" />
              {p.label}
            </p>
            <p className="mt-3 leading-relaxed text-white/75">{p.text}</p>
          </div>
        ))}
      </div>
    </DocSection>
  )
}

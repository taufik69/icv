import { BookOpenIcon, BriefcaseIcon } from '@/shared/components/icons'
import { Parts } from '../common/Parts'

// Career outcomes as chips, then further study pathways (the course's own pathway copy).
export function CareerPanel({ careers, pathways, titles }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-line md:p-7">
      {careers.length > 0 && (
        <>
          <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-secondary">
            <BriefcaseIcon className="size-5 text-secondary-muted" />
            {titles.careerOutcomes}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {careers.map((c) => (
              <li key={c} className="rounded-full bg-surface-muted px-3.5 py-1.5 text-sm font-medium text-secondary ring-1 ring-line">{c}</li>
            ))}
          </ul>
        </>
      )}
      {pathways && (
        <div className={careers.length ? 'mt-7 border-t border-line pt-6' : ''}>
          <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-secondary">
            <BookOpenIcon className="size-5 text-secondary-muted" />
            {titles.pathways}
          </h3>
          <div className="mt-3">
            <Parts parts={pathways} accent="navy" />
          </div>
        </div>
      )}
    </div>
  )
}

import { ChevronDownIcon } from '@/shared/components/icons'
import { Parts } from '../common/Parts'
import { SplitSection } from './SplitSection'

// RPL / credit transfer beside a photo; a "Read More" block (building courses) opens as a native <details>.
export function RplSection({ rpl, image }) {
  return (
    <SplitSection id="rpl-title" title={rpl.title} image={image} flip className="bg-surface-muted">
      <div className="grid gap-4">
        {rpl.sections.map((section, i) =>
          section.collapsible ? (
            <details key={i} className="group rounded-2xl bg-surface ring-1 ring-line-soft open:shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-heading font-semibold text-secondary [&::-webkit-details-marker]:hidden">
                {section.title}
                <ChevronDownIcon className="size-5 text-primary-hover transition group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5">
                <Parts parts={section.parts} />
              </div>
            </details>
          ) : (
            <div key={i} className={section.title ? 'rounded-2xl bg-surface p-5 ring-1 ring-line-soft' : 'text-lg'}>
              {section.title && <h3 className="mb-3 text-lg">{section.title}</h3>}
              <Parts parts={section.parts} />
            </div>
          ),
        )}
      </div>
    </SplitSection>
  )
}

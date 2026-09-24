import { Reveal } from '@/shared/components/ui'
import { DocItem } from './DocItem'

// Numbered section card for long policy-style pages. `scroll-mt` clears the fixed header on anchor jumps.
export function DocSection({ section, number, children }) {
  return (
    <Reveal as="section" id={section.id} aria-labelledby={`${section.id}-title`} className="min-w-0 scroll-mt-28 rounded-3xl bg-surface p-5 break-words shadow-card ring-1 ring-line-soft md:p-10">
      <div className="flex items-start gap-4">
        {number && (
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary font-heading text-base md:size-12 md:rounded-2xl md:text-lg font-extrabold text-primary">
            {number}
          </span>
        )}
        <h2 id={`${section.id}-title`} className="pt-1 text-xl leading-snug sm:text-2xl md:pt-1.5 md:text-3xl">
          {section.title}
        </h2>
      </div>
      {section.intro && <p className="mt-5 text-base leading-relaxed md:text-lg text-ink-muted">{section.intro}</p>}
      {section.items?.length > 0 && (
        <div className="mt-6 grid gap-4">
          {section.items.map((item) => (
            <DocItem key={item.label ?? item.text} item={item} />
          ))}
        </div>
      )}
      {children}
    </Reveal>
  )
}

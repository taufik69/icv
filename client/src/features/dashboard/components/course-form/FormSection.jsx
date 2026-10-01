import { blockById } from '../../data/courseFormBlocks'

// One numbered part of the course form. Title, step number and the "where it shows" line come from
// data/courseFormBlocks.js (by id), so the form and the page outline always match.
export function FormSection({ id, optional, children }) {
  const { step, label, where } = blockById[id]
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-2xl bg-surface ring-1 ring-line">
      <header className="flex items-start gap-4 border-b border-line-soft px-5 py-5 sm:px-7">
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-white">
          {step}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h2 id={`${id}-title`} className="text-xl">
              <span className="sr-only">Part {step}: </span>{label}
            </h2>
            {optional && <span className="rounded-pill bg-surface-muted px-2.5 py-0.5 text-xs text-ink-subtle">Optional</span>}
          </div>
          <p className="mt-1 text-sm text-ink-muted">{where}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-5 p-5 sm:p-7">{children}</div>
    </section>
  )
}

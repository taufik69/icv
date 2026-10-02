// One part of an enrolment, headed by the paper form's section letters on a navy tile (the same tile
// the public form uses), so staff can cross-check against the PDF.
export function SectionCard({ id, letters, title, aside, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-7">
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span aria-hidden="true" className="grid h-9 min-w-9 place-items-center rounded-xl bg-secondary px-2 font-heading text-sm font-bold tracking-wider text-white">
          {letters}
        </span>
        <h2 id={`${id}-title`} className="text-xl">
          <span className="sr-only">Section {letters}:</span> {title}
        </h2>
        {aside && <span className="ml-auto text-sm text-ink-subtle">{aside}</span>}
      </div>
      {children}
    </section>
  )
}

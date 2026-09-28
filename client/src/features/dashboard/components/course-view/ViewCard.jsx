// White card with a heading for one block of the course view page.
export function ViewCard({ id, title, aside, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-7">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`${id}-title`} className="text-xl">{title}</h2>
        {aside && <span className="text-sm text-ink-subtle">{aside}</span>}
      </div>
      {children}
    </section>
  )
}

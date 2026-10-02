// A titled part of a step. From xl the title (and optional description) sits in a column on the left
// and the fields on the right, so long steps scan as a list of parts; below xl they stack.
// `note` is a small tag beside the title, e.g. "If applicable". `wide` keeps the title above at every size,
// for tables (qualifications, English tests) that need the full width.
export function Section({ id, title, description, note, wide = false, children }) {
  const headingId = `enrol-part-${id}`
  return (
    <section aria-labelledby={headingId} className={`grid gap-5 border-t border-line-soft pt-8 first:border-0 first:pt-0 ${wide ? '' : 'xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-10'}`}>
      <div>
        <h3 id={headingId} className="text-lg leading-snug font-bold">{title}</h3>
        {note && <p className="mt-1.5 inline-block rounded-md bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">{note}</p>}
        {description && <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>}
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">{children}</div>
    </section>
  )
}

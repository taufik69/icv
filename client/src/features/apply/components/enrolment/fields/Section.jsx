// A titled part of a step: title (with an optional "If applicable"-style `note` tag beside it and a
// short description under it) on top, the fields in two columns below (one on phones).
export function Section({ id, title, description, note, children }) {
  const headingId = `enrol-part-${id}`
  return (
    <section aria-labelledby={headingId} className="grid gap-5 border-t border-line-soft pt-8 first:border-0 first:pt-0">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 id={headingId} className="text-lg leading-snug font-bold">{title}</h3>
          {note && <p className="rounded-md bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">{note}</p>}
        </div>
        {description && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p>}
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">{children}</div>
    </section>
  )
}

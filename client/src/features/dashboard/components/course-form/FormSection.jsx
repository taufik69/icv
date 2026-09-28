// A form card for one page block. `optional` blocks get a hint that they hide when left empty.
export function FormSection({ id, title, description, optional, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-7">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={`${id}-title`} className="text-xl">{title}</h2>
        {optional && <span className="text-xs text-ink-subtle">Optional, hidden on the page when empty</span>}
      </div>
      {description && <p className="-mt-4 mb-6 text-sm text-ink-muted">{description}</p>}
      <div className="grid gap-5">{children}</div>
    </section>
  )
}

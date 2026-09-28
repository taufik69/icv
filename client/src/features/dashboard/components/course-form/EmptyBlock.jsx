import { PlusIcon } from '@/shared/components/icons'

// An optional page block that has no content yet: says what it adds, and offers to add it.
export function EmptyBlock({ id, title, description }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="flex scroll-mt-28 flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-line px-5 py-5 sm:px-7">
      <div className="min-w-0">
        <h2 id={`${id}-title`} className="text-lg">{title}</h2>
        <p className="mt-0.5 text-sm text-ink-muted">{description}</p>
      </div>
      <button type="button" className="flex items-center gap-2 rounded-pill bg-surface px-4 py-2 font-heading text-sm font-semibold text-secondary ring-1 ring-line transition hover:ring-primary">
        <PlusIcon className="size-4 text-primary-hover" /> Add section
      </button>
    </section>
  )
}

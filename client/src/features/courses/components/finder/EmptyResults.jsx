import { SearchIcon } from '@/shared/components/icons'

// Shown when no course matches; the button removes the search text and every filter.
export function EmptyResults({ content, onClear }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-white px-6 py-16 text-center">
      <SearchIcon className="mx-auto size-8 text-secondary-muted" />
      <h3 className="mt-4 text-xl font-semibold text-secondary">{content.title}</h3>
      <p className="mt-2 text-ink-muted">{content.text}</p>
      <button type="button" onClick={onClear} className="btn-shine mt-6 cursor-pointer rounded-full bg-secondary px-5 py-2.5 font-heading text-sm font-semibold text-white hover:bg-secondary-dark">
        Clear search and filters
      </button>
    </div>
  )
}

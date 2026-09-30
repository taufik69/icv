import { CloseIcon } from '@/shared/components/icons'
import { facetKeys } from '../../lib/filterCourses'

// Everything currently narrowing the list, as removable chips, plus Clear all.
export function ActiveFilters({ content, finder }) {
  const { filters } = finder
  const chips = [
    filters.market !== 'all' && { label: content.marketNames[filters.market], remove: () => finder.set('market', 'all') },
    filters.q.trim() && { label: `“${filters.q.trim()}”`, remove: () => finder.set('q', '') },
    ...facetKeys.flatMap((key) => filters[key].map((value) => ({ label: value, remove: () => finder.toggle(key, value) }))),
  ].filter(Boolean)

  if (!chips.length) return null

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map(({ label, remove }) => (
        <button
          key={label}
          type="button"
          onClick={remove}
          aria-label={`Remove filter ${label}`}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-secondary/8 py-1.5 pr-2 pl-3 text-sm font-medium text-secondary transition hover:bg-secondary/15"
        >
          {label}
          <CloseIcon className="size-3.5" />
        </button>
      ))}
      <button type="button" onClick={finder.clear} className="cursor-pointer px-2 text-sm font-medium text-secondary/85 underline underline-offset-4 hover:text-secondary">
        Clear all
      </button>
    </div>
  )
}

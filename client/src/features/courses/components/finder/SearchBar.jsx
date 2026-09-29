import { CloseIcon, SearchIcon, SlidersIcon } from '@/shared/components/icons'

// Full-width live search under the hero. Below lg a Filters button sits beside it and opens the sheet.
export function SearchBar({ content, finder, onOpenFilters }) {
  const { q } = finder.filters

  return (
    <div className="flex gap-3">
      <div className="relative min-w-0 flex-1">
        <label htmlFor="course-search" className="sr-only">{content.searchLabel}</label>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-subtle" />
        <input
          id="course-search"
          type="search"
          value={q}
          onChange={(e) => finder.set('q', e.target.value)}
          placeholder={content.searchPlaceholder}
          autoComplete="off"
          className="h-14 w-full rounded-2xl bg-white pr-12 pl-12 text-base text-ink ring-1 ring-line outline-none text-ellipsis placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-secondary [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            onClick={() => finder.set('q', '')}
            aria-label="Clear search"
            className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink-subtle transition hover:bg-surface-sunken hover:text-ink"
          >
            <CloseIcon className="size-4" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onOpenFilters}
        className="relative inline-flex h-14 shrink-0 cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 font-heading font-semibold text-secondary ring-1 ring-line lg:hidden"
      >
        <SlidersIcon className="size-5" />
        <span className="max-sm:sr-only">Filters</span>
        {finder.active > 0 && (
          <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-secondary text-xs text-white">{finder.active}</span>
        )}
      </button>
    </div>
  )
}

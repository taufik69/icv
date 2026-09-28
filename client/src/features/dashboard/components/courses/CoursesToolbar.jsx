import { SearchIcon } from '@/shared/components/icons'
import { marketTabs } from '../../data/courseRows'

// Market tabs + search. Visual only: "All" is shown as the selected tab.
export function CoursesToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
      <div role="tablist" aria-label="Market" className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1">
        {marketTabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={Boolean(tab.active)}
            className="flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-1.5 font-heading text-sm font-semibold text-ink-muted transition hover:text-secondary aria-selected:bg-surface aria-selected:text-secondary aria-selected:shadow-raised"
          >
            {tab.label}
            <span className="rounded-pill bg-surface-sunken px-2 text-xs text-ink-subtle">{tab.count}</span>
          </button>
        ))}
      </div>
      <label className="relative w-full sm:w-72">
        <span className="sr-only">Search courses</span>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          type="search"
          placeholder="Search by title or code"
          className="w-full rounded-xl border border-line bg-surface py-2 pr-3.5 pl-10 text-sm placeholder:text-ink-disabled focus:border-primary-hover focus:shadow-focus-success focus:outline-none"
        />
      </label>
    </div>
  )
}

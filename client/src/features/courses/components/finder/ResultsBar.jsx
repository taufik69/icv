import { BookmarkIcon, ChevronDownIcon } from '@/shared/components/icons'

const control = 'inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 transition'

// Result count, the Saved toggle and the sort menu.
export function ResultsBar({ content, finder, total }) {
  const count = finder.saved.saved.length

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p aria-live="polite" className="mr-auto text-sm text-ink-muted">
        <span className="font-heading text-lg font-bold text-secondary">{finder.results.length}</span> of {total} courses
      </p>
      <button
        type="button"
        aria-pressed={finder.savedOnly}
        onClick={() => finder.setSavedOnly((v) => !v)}
        className={`${control} ${finder.savedOnly ? 'bg-secondary text-white ring-secondary' : 'bg-white text-secondary ring-line hover:ring-secondary/40'}`}
      >
        <BookmarkIcon className="size-4" fill={finder.savedOnly ? 'currentColor' : 'none'} />
        <span className="max-sm:sr-only">{content.saved}</span>
        <span className={`tabular-nums ${finder.savedOnly ? 'text-white/70' : 'text-ink-subtle'}`}>{count}</span>
      </button>
      <label className="relative">
        <span className="sr-only">Sort courses</span>
        <select
          value={finder.filters.sort}
          onChange={(e) => finder.set('sort', e.target.value)}
          className={`${control} appearance-none bg-white pr-9 text-secondary ring-line outline-none focus-visible:ring-2 focus-visible:ring-secondary`}
        >
          {content.sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-secondary-muted" />
      </label>
    </div>
  )
}

import { BookmarkIcon } from '@/shared/components/icons'
import { SortMenu } from './SortMenu'

const control = 'inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 transition'

// Result count, the Saved toggle and the sort menu.
export function ResultsBar({ content, finder, total }) {
  const count = finder.saved.saved.length

  return (
    <div className="flex flex-wrap items-center gap-3">
      <p aria-live="polite" className="mr-auto text-sm text-secondary/85">
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
        <span className={`tabular-nums ${finder.savedOnly ? 'text-white/90' : 'text-secondary-muted'}`}>{count}</span>
      </button>
      <SortMenu label={content.sortLabel} options={content.sorts} value={finder.filters.sort} onChange={(v) => finder.set('sort', v)} />
    </div>
  )
}

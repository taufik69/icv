import { useEffect } from 'react'
import { CloseIcon } from '@/shared/components/icons'
import { FilterPanel } from './FilterPanel'

// Phone / tablet filters: a bottom sheet over the results. Esc or the backdrop closes it.
export function FilterSheet({ content, finder, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-60 flex items-end lg:hidden">
      <button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 cursor-default bg-secondary-dark/60" />
      <div role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title" className="relative flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-surface-muted">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="filter-sheet-title" className="text-lg font-semibold text-secondary">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close filters" className="grid size-9 cursor-pointer place-items-center rounded-full text-secondary hover:bg-white">
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 py-5">
          <FilterPanel content={content} finder={finder} />
        </div>
        <div className="flex gap-3 border-t border-line bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={finder.clear} className="cursor-pointer rounded-full px-4 py-3 font-heading text-sm font-semibold text-secondary ring-1 ring-line-strong">
            Clear
          </button>
          <button type="button" onClick={onClose} className="btn-shine flex-1 cursor-pointer rounded-full bg-secondary px-4 py-3 font-heading text-sm font-semibold text-white">
            Show {finder.results.length} courses
          </button>
        </div>
      </div>
    </div>
  )
}

import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from '@/shared/components/icons'

const btn = 'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-heading text-sm font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary aria-disabled:pointer-events-none aria-disabled:opacity-40'

// "Showing 26–50 of 73" + Previous / Next links (the page lives in the URL). Hidden when there is one page.
export function ListPager({ paging, filters }) {
  if (!paging || paging.pages <= 1) return null
  const { page, pages, limit, total } = paging
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  const go = (p) => ({ to: '/dashboard/enrolments', search: { ...filters, page: p > 1 ? p : undefined } })

  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5 text-sm text-ink-muted">
      <p>Showing {from}–{to} of {total}</p>
      <div className="flex items-center gap-2">
        <Link {...go(page - 1)} aria-disabled={page <= 1} className={btn}>
          <ChevronRightIcon className="size-4 rotate-180" /> Previous
        </Link>
        <span className="px-1">Page {page} of {pages}</span>
        <Link {...go(page + 1)} aria-disabled={page >= pages} className={btn}>
          Next <ChevronRightIcon className="size-4" />
        </Link>
      </div>
    </nav>
  )
}

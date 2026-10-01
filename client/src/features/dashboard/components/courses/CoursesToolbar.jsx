import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { SearchIcon } from '@/shared/components/icons'

const tabClass = 'flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-1.5 font-heading text-sm font-semibold text-ink-muted transition hover:text-secondary data-[status=active]:bg-surface data-[status=active]:text-secondary data-[status=active]:shadow-raised'
const DEBOUNCE = 300 // ms after the last keystroke

const tabs = [
  { label: 'All', market: undefined, key: 'all' },
  { label: 'Domestic', market: 'domestic', key: 'domestic' },
  { label: 'International', market: 'international', key: 'international' },
]

// Market tabs (links, so the filter lives in the URL) + live search by title or code: results update a
// moment after typing stops (Enter searches straight away; clearing the box shows everything again).
export function CoursesToolbar({ filters, counts }) {
  const navigate = useNavigate()
  const [text, setText] = useState(filters.q ?? '')

  const search = useCallback(
    (value) => {
      const q = value.trim() || undefined
      if (q !== filters.q) navigate({ to: '/dashboard/courses', search: { ...filters, q }, replace: true })
    },
    [filters, navigate],
  )

  // Runs after typing pauses; a tab click re-runs it too, but then q is unchanged so nothing navigates.
  useEffect(() => {
    const t = setTimeout(() => search(text), DEBOUNCE)
    return () => clearTimeout(t)
  }, [text, search])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
      <nav aria-label="Filter by market" className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1">
        {tabs.map((tab) => (
          <Link key={tab.key} to="/dashboard/courses" search={{ ...filters, market: tab.market }} activeOptions={{ exact: true }} className={tabClass}>
            {tab.label}
            <span className="rounded-pill bg-surface-sunken px-2 text-xs text-ink-subtle">{counts[tab.key] ?? 0}</span>
          </Link>
        ))}
      </nav>
      <form role="search" onSubmit={(e) => { e.preventDefault(); search(text) }} className="relative w-full sm:w-72">
        <label htmlFor="courses-q" className="sr-only">Search courses</label>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          id="courses-q"
          name="q"
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search by title or code"
          autoComplete="off"
          className="w-full rounded-xl border border-line bg-surface py-2 pr-3.5 pl-10 text-sm placeholder:text-ink-disabled focus:border-primary-hover focus:shadow-focus-success focus:outline-none"
        />
      </form>
    </div>
  )
}

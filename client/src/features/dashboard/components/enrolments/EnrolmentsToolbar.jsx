import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { SearchIcon } from '@/shared/components/icons'
import { enrolmentStatuses } from '../../data/enrolmentStatus'

const tabClass = 'flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-1.5 font-heading text-sm font-semibold transition hover:text-secondary'
const tabState = (on) => (on ? 'bg-surface text-secondary shadow-raised' : 'text-ink-muted')
const DEBOUNCE = 300 // ms after the last keystroke

// Status tabs (links, so the filter lives in the URL) + live search: results update a moment after typing
// stops; Enter searches straight away. A new tab or search goes back to page 1.
export function EnrolmentsToolbar({ filters, counts }) {
  const navigate = useNavigate()
  const [text, setText] = useState(filters.q ?? '')
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const tabs = [{ label: 'All', status: undefined, count: total }, ...enrolmentStatuses.map((s) => ({ label: s, status: s, count: counts[s] ?? 0 }))]

  const search = useCallback(
    (value) => {
      const q = value.trim() || undefined
      if (q !== filters.q) navigate({ to: '/dashboard/enrolments', search: { ...filters, q, page: undefined }, replace: true })
    },
    [filters, navigate],
  )

  useEffect(() => {
    const t = setTimeout(() => search(text), DEBOUNCE)
    return () => clearTimeout(t)
  }, [text, search])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
      <nav aria-label="Filter by status" className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1">
        {tabs.map((tab) => (
          <Link key={tab.label} to="/dashboard/enrolments" search={{ q: filters.q, status: tab.status }} aria-current={tab.status === filters.status ? 'page' : undefined} className={`${tabClass} ${tabState(tab.status === filters.status)}`}>
            {tab.label}
            <span className="rounded-pill bg-surface-sunken px-2 text-xs text-ink-subtle">{tab.count}</span>
          </Link>
        ))}
      </nav>
      <form role="search" onSubmit={(e) => { e.preventDefault(); search(text) }} className="relative w-full xl:w-80">
        <label htmlFor="enrolments-q" className="sr-only">Search enrolments</label>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
        <input
          id="enrolments-q" name="q" type="search" value={text} onChange={(e) => setText(e.target.value)} autoComplete="off"
          placeholder="Search name, reference, passport or email"
          className="w-full rounded-xl border border-line bg-surface py-2 pr-3.5 pl-10 text-sm placeholder:text-ink-disabled focus:border-primary-hover focus:shadow-focus-success focus:outline-none"
        />
      </form>
    </div>
  )
}

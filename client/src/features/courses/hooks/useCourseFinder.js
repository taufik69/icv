import { useDeferredValue, useMemo, useState } from 'react'
import { activeFilterCount, facetKeys, facetOptions, filterCourses, marketCounts } from '../lib/filterCourses'
import { useSavedCourses } from './useSavedCourses'

const emptyFacets = Object.fromEntries(facetKeys.map((key) => [key, []]))

// All course finder state. `courses` are summaries from lib/courseSummary.
export function useCourseFinder(courses, initialMarket = 'all') {
  const [filters, setFilters] = useState({ market: initialMarket, q: '', sort: 'recommended', ...emptyFacets })
  const [savedOnly, setSavedOnly] = useState(false)
  const saved = useSavedCourses()
  const deferred = useDeferredValue(filters)

  const set = (key, value) => setFilters((f) => ({ ...f, [key]: value }))
  const toggle = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }))
  const clear = () => {
    setFilters((f) => ({ ...f, market: 'all', q: '', ...emptyFacets }))
    setSavedOnly(false)
  }

  const matched = useMemo(() => filterCourses(courses, deferred), [courses, deferred])
  const results = savedOnly ? matched.filter((c) => saved.isSaved(c.id)) : matched
  const facets = useMemo(
    () => Object.fromEntries(facetKeys.map((key) => [key, facetOptions(courses, deferred, key)])),
    [courses, deferred],
  )
  const markets = useMemo(() => marketCounts(courses, deferred), [courses, deferred])
  const active = activeFilterCount(filters) + (filters.market === 'all' ? 0 : 1)

  return { filters, set, toggle, clear, results, facets, markets, active, saved, savedOnly, setSavedOnly }
}

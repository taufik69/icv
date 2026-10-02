// Pure formatting for the overview: change figures and bucket labels.

// Change against the previous period, as { text, direction } — direction is up | down | flat | new.
export function change(current, previous) {
  if (!previous) return current ? { text: 'New this period', direction: 'new' } : { text: 'No change', direction: 'flat' }
  const pct = Math.round(((current - previous) / previous) * 100)
  if (pct === 0) return { text: 'No change', direction: 'flat' }
  return { text: `${pct > 0 ? '+' : ''}${pct}%`, direction: pct > 0 ? 'up' : 'down' }
}

const dayFmt = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' })
const longDayFmt = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
const monthFmt = new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric', timeZone: 'UTC' })

// Timeline bucket key → short axis label ("2 Oct", "Oct 2026") and a long tooltip label.
export function bucketLabel(key, long = false) {
  const monthly = key.length === 7
  const date = new Date(`${monthly ? `${key}-01` : key}T00:00:00Z`)
  if (monthly) return monthFmt.format(date)
  return (long ? longDayFmt : dayFmt).format(date)
}

// "8" / "1.2K" for tiles and labels.
export const compact = (n) => new Intl.NumberFormat('en-AU', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

// "the previous 30 days" / "the previous 12 months", for change captions.
export const previousPeriod = (days) => (days === 365 ? 'the previous 12 months' : `the previous ${days} days`)

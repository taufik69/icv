import { TIME_ZONE } from './stats.constants.js'

// Bucket keys for a period: 'YYYY-MM-DD' per day, or 'YYYY-MM' per month for a year. Built in the
// Melbourne calendar so they match MongoDB's $dateToString with the same time zone.
const keyFormat = (monthly) => new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', ...(monthly ? {} : { day: '2-digit' }),
})

export const bucketFormat = (monthly) => (monthly ? '%Y-%m' : '%Y-%m-%d')

// Every bucket from `from` to `to`, oldest first, so days with no submissions still show as 0.
export function bucketKeys(from, to, monthly) {
  const fmt = keyFormat(monthly)
  const keys = []
  const step = monthly ? 15 : 1 // half-month steps never skip a month; duplicates are dropped
  for (let t = new Date(from); t <= to; t = new Date(t.getTime() + step * 86_400_000)) {
    const key = fmt.format(t)
    if (keys.at(-1) !== key) keys.push(key)
  }
  const last = fmt.format(to)
  if (keys.at(-1) !== last) keys.push(last)
  return keys
}

// Merge per-bucket counts ({ _id: key, count }) of each series onto the full key list.
export function timeline(keys, series) {
  const maps = Object.fromEntries(Object.entries(series).map(([name, rows]) => [name, new Map(rows.map((r) => [r._id, r.count]))]))
  return keys.map((date) => ({ date, ...Object.fromEntries(Object.keys(maps).map((name) => [name, maps[name].get(date) ?? 0])) }))
}

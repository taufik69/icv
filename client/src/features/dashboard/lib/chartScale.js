// Small helpers for the hand-drawn SVG charts.

// A round top for a count axis and its ticks: 0 … max in up to `count` equal, whole-number steps
// (1, 2, 5 × 10ⁿ), stopping at the first tick that reaches the max. An all-zero series gets 0–1.
export function niceTicks(maxValue, count = 4) {
  const raw = Math.max(maxValue, 1) / count
  const power = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 5, 10].map((m) => m * power).find((s) => s >= raw && Number.isInteger(s)) ?? Math.ceil(raw)
  const ticks = Array.from({ length: count + 1 }, (_, i) => i * step)
  return ticks.slice(0, ticks.findIndex((t) => t >= Math.max(maxValue, 1)) + 1)
}

// Maps a value from [d0, d1] onto [r0, r1].
export const scale = (d0, d1, r0, r1) => (v) => (d1 === d0 ? r0 : r0 + ((v - d0) / (d1 - d0)) * (r1 - r0))

// Up to `max` evenly spaced indexes out of `n`, always including the first and last.
export function spacedIndexes(n, max = 6) {
  if (n <= max) return Array.from({ length: n }, (_, i) => i)
  const step = (n - 1) / (max - 1)
  return [...new Set(Array.from({ length: max }, (_, i) => Math.round(i * step)))]
}

// SVG path through points [[x, y], …].
export const linePath = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')

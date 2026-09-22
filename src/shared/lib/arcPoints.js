// Evenly spaced points on an arc (degrees, 0° = right, 90° = down, screen coordinates).
// Used by the contact FAB: 180° → 270° fans items from the left edge up to the top.
export function arcPoints(count, radius, from = 180, to = 270) {
  const step = count > 1 ? (to - from) / (count - 1) : 0
  return Array.from({ length: count }, (_, i) => {
    const rad = ((from + step * i) * Math.PI) / 180
    return { x: Math.round(radius * Math.cos(rad)), y: Math.round(radius * Math.sin(rad)) }
  })
}

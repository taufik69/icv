import { linePath, scale } from '../../lib/chartScale'

const W = 112
const H = 32

// 12-point-style trend line for a stat tile (decorative: the tile's number and change say the same in words).
export function Sparkline({ values, className = 'stroke-chart-1' }) {
  if (values.length < 2) return null
  const x = scale(0, values.length - 1, 2, W - 4)
  const y = scale(0, Math.max(...values, 1), H - 3, 3)
  const points = values.map((v, i) => [x(i), y(v)])
  const [lx, ly] = points.at(-1)
  return (
    <svg width={W} height={H} aria-hidden="true" className="shrink-0 overflow-visible">
      <path d={linePath(points)} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className={className} />
      <circle cx={lx} cy={ly} r="3.5" strokeWidth="2" className={`${className.replace('stroke-', 'fill-')} stroke-surface`} />
    </svg>
  )
}

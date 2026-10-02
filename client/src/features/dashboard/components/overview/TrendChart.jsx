import { useState } from 'react'
import { useElementWidth } from '../../hooks/useElementWidth'
import { linePath, niceTicks, scale, spacedIndexes } from '../../lib/chartScale'
import { bucketLabel } from '../../lib/overviewFormat'
import { ChartLegend } from './ChartLegend'
import { TrendTooltip } from './TrendTooltip'

const H = 260
const M = { top: 12, right: 12, bottom: 28, left: 36 }

// Lines over time, one per series (same unit, one axis). A crosshair snaps to the nearest bucket and the
// tooltip lists every series there; arrow keys move it when the chart has focus. The tooltip is placed with
// a computed px `style` (like the testimonial carousel), the only inline style here.
// series = [{ key, label, stroke, bg }] (Tailwind classes for the line and the legend key).
export function TrendChart({ data, series, label }) {
  const [ref, width] = useElementWidth()
  const [active, setActive] = useState(null)
  const ticks = niceTicks(Math.max(0, ...data.flatMap((d) => series.map((s) => d[s.key]))))
  const x = scale(0, Math.max(data.length - 1, 1), M.left, Math.max(width - M.right, M.left + 1))
  const y = scale(0, ticks.at(-1), H - M.bottom, M.top)

  const pick = (e) => {
    const box = e.currentTarget.getBoundingClientRect()
    const i = Math.round(((e.clientX - box.left - M.left) / (width - M.left - M.right)) * (data.length - 1))
    setActive(Math.min(data.length - 1, Math.max(0, i)))
  }
  const keys = (e) => {
    const moves = { ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity }
    if (!(e.key in moves)) return
    e.preventDefault()
    setActive((i) => Math.min(data.length - 1, Math.max(0, (i ?? data.length - 1) + moves[e.key])))
  }

  return (
    <div className="grid gap-4">
      <ChartLegend series={series} />
      <div ref={ref} className="relative">
        {width > 0 && (
          <svg
            width={width} height={H} role="img" aria-label={label} tabIndex={0}
            onPointerMove={pick} onPointerLeave={() => setActive(null)} onKeyDown={keys} onBlur={() => setActive(null)}
            className="block touch-pan-y rounded-lg focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} className="stroke-line-soft" strokeWidth="1" />
                <text x={M.left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-ink-subtle text-xs tabular-nums">{t}</text>
              </g>
            ))}
            {spacedIndexes(data.length, width < 520 ? 4 : 7).map((i) => (
              <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'} className="fill-ink-subtle text-xs">
                {bucketLabel(data[i].date)}
              </text>
            ))}
            {active !== null && <line x1={x(active)} x2={x(active)} y1={M.top} y2={H - M.bottom} className="stroke-line-strong" strokeWidth="1" />}
            {series.map((s) => (
              <g key={s.key}>
                <path d={linePath(data.map((d, i) => [x(i), y(d[s.key])]))} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className={s.stroke} />
                {active !== null && <circle cx={x(active)} cy={y(data[active][s.key])} r="4.5" strokeWidth="2" className={`${s.fill} stroke-surface`} />}
              </g>
            ))}
          </svg>
        )}
        {active !== null && <TrendTooltip point={data[active]} series={series} x={x(active)} width={width} />}
      </div>
    </div>
  )
}

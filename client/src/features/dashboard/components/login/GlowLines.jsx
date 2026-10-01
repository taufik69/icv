// Two hairline green arcs with soft glowing nodes sweeping across the photo, like survey lines on a site plan.
const nodes = [
  [530, 90, true],
  [930, 235, false],
  [835, 840, true],
  [590, 985, false],
]

export function GlowLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 1060"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="pointer-events-none absolute inset-0 -z-10 size-full text-primary"
    >
      <path d="M410 -10 C 470 80, 560 60, 700 120 S 980 230, 1010 420" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      <path d="M380 1070 C 520 960, 700 960, 840 830 S 980 700, 1010 690" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
      {nodes.map(([cx, cy, pulse]) => (
        <g key={`${cx}-${cy}`} className={pulse ? 'animate-pulse motion-reduce:animate-none' : ''}>
          <circle cx={cx} cy={cy} r="12" fill="currentColor" fillOpacity="0.12" />
          <circle cx={cx} cy={cy} r="4" fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}

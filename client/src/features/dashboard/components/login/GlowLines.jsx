// Two thin green arcs with glowing nodes sweeping across the photo, like survey lines on a site plan.
const nodes = [
  [530, 90, 'animate-pulse'],
  [930, 235, ''],
  [835, 840, 'animate-pulse'],
  [590, 985, ''],
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
      <path d="M410 -10 C 470 80, 560 60, 700 120 S 980 230, 1010 420" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M380 1070 C 520 960, 700 960, 840 830 S 980 700, 1010 690" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      <path d="M1010 760 C 900 780, 820 900, 700 1070" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
      {nodes.map(([cx, cy, pulse]) => (
        <g key={`${cx}-${cy}`} className={`motion-reduce:animate-none ${pulse}`}>
          <circle cx={cx} cy={cy} r="14" fill="currentColor" fillOpacity="0.18" />
          <circle cx={cx} cy={cy} r="6" fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}

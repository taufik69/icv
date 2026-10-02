// One bar segment per step: current = solid, saved = half tone, rest = track. `tone="dark"` is for the
// navy panel. Purely visual; the step buttons carry the state for screen readers.
const tones = {
  light: { current: 'bg-secondary', done: 'bg-secondary-muted/60', rest: 'bg-line' },
  dark: { current: 'bg-white', done: 'bg-primary', rest: 'bg-white/15' },
}

export function ProgressSegments({ steps, step, saved, tone = 'light', className = '' }) {
  const t = tones[tone]
  return (
    <div aria-hidden="true" className={`grid grid-cols-8 gap-1 ${className}`}>
      {steps.map((s, i) => (
        <span key={s.id} className={`h-1.5 rounded-pill transition ${i === step ? t.current : saved.includes(s.id) ? t.done : t.rest}`} />
      ))}
    </div>
  )
}

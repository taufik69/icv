import { PipelineStage } from './PipelineStage'

// Stages in order (light → dark blue ramp), then the two ways out in two greys. Fixed per status, so a
// status keeps its colour whatever the counts are.
const STAGES = [
  { label: 'New', bg: 'bg-stage-1' },
  { label: 'In review', bg: 'bg-stage-2' },
  { label: 'Offer sent', bg: 'bg-stage-3' },
  { label: 'Enrolled', bg: 'bg-stage-4' },
  { label: 'Declined', bg: 'bg-line-strong', exit: true },
  { label: 'Withdrawn', bg: 'bg-ink-disabled', exit: true },
]

// Where every enrolment application is now: the share that reached "Enrolled" as the headline, one
// segmented bar for the whole flow (2px white gaps), and a cell per status with count and share.
export function PipelineChart({ status }) {
  const total = STAGES.reduce((n, s) => n + (status[s.label] ?? 0), 0)
  if (!total) return <p className="py-8 text-center text-sm text-ink-subtle">No applications yet.</p>
  const share = (n) => Math.round((n / total) * 100)
  const enrolled = status.Enrolled ?? 0

  return (
    <div className="grid gap-5">
      <p className="text-sm text-ink-muted">
        <span className="font-heading text-3xl font-bold text-ink-strong">{share(enrolled)}%</span>{' '}
        <span className="ml-1">enrolled, {enrolled} of {total} applications</span>
      </p>
      <div role="img" aria-label={STAGES.map((s) => `${s.label} ${status[s.label] ?? 0}`).join(', ')} className="flex h-4 gap-0.5 overflow-hidden rounded-[4px]">
        {STAGES.filter((s) => status[s.label]).map((s) => (
          <span key={s.label} title={`${s.label}: ${status[s.label]}`} className={`h-full transition-[width] duration-500 ${s.bg}`} style={{ width: `${(status[s.label] / total) * 100}%` }} />
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {STAGES.map((s, i) => (
          <PipelineStage key={s.label} {...s} step={s.exit ? null : i + 1} count={status[s.label] ?? 0} share={share(status[s.label] ?? 0)} />
        ))}
      </ul>
    </div>
  )
}

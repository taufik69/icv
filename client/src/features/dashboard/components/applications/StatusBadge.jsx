// Application status pill. New is the one staff act on, so it's the only green one.
const tone = {
  New: 'bg-primary-soft text-secondary ring-primary/40',
  Contacted: 'bg-info-soft text-info-ink ring-info/30',
  Enrolled: 'bg-success-soft text-success-ink ring-success/25',
  Closed: 'bg-surface-sunken text-ink-muted ring-line',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-sm font-semibold ring-1 ${tone[status]}`}>
      {status === 'New' && <span className="size-1.5 rounded-full bg-primary-hover" />}
      {status}
    </span>
  )
}

// Mirrors server/src/modules/enrolment/enrolment.constants.js STATUSES. `tone` = badge colours; New is the
// one staff act on, so it's the only green one.
export const enrolmentStatuses = ['New', 'In review', 'Offer sent', 'Enrolled', 'Declined', 'Withdrawn']

export const enrolmentStatusTone = {
  New: 'bg-primary-soft text-secondary ring-primary/40',
  'In review': 'bg-info-soft text-info-ink ring-info/30',
  'Offer sent': 'bg-warning-soft text-warning-ink ring-warning/30',
  Enrolled: 'bg-success-soft text-success-ink ring-success/25',
  Declined: 'bg-danger-soft text-danger-ink ring-danger/25',
  Withdrawn: 'bg-surface-sunken text-ink-muted ring-line',
}

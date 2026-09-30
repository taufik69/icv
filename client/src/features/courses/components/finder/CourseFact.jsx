// One fact on a course card: icon + value, with the label kept for screen readers.
export function CourseFact({ Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex min-w-0 items-center gap-2 text-sm text-secondary/85">
      <Icon className="size-4 shrink-0 text-secondary-muted" />
      <dt className="sr-only">{label}</dt>
      <dd className="min-w-0 truncate" title={value}>{value}</dd>
    </div>
  )
}

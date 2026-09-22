// Initials avatar + name pill joined to a course pill by a small bridge.
export function ReviewAuthor({ review }) {
  const initials = review.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="flex items-center justify-center gap-3 md:justify-start">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft font-heading text-sm font-bold text-secondary">
        {initials}
      </span>
      <div className="flex min-w-0 flex-col items-start">
        <span className="rounded-md bg-secondary px-2.5 py-1 font-heading text-xs font-semibold whitespace-nowrap text-white">
          {review.name}
        </span>
        <svg aria-hidden="true" viewBox="0 -2 14 12" width="14" height="10" className="-my-px ml-3 block fill-current text-surface-muted">
          <path d="M0 -2V0C0 0 5.09 .5 5.09 4C5.09 7.5 0 8 0 8V10H14V8C14 8 8.91 7.5 8.91 4C8.91 .5 14 0 14 0V-2Z" />
        </svg>
        <span className="max-w-full truncate rounded-md bg-surface-muted px-2.5 py-1 text-xs text-ink-muted">
          {review.course}
        </span>
      </div>
    </div>
  )
}

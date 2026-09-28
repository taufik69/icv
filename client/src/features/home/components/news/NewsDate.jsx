import { CalendarIcon } from '@/shared/components/icons'

export function NewsDate({ date, className = '' }) {
  return (
    <p className={`flex items-center gap-1.5 font-condensed text-sm tracking-wide text-ink-subtle ${className}`}>
      <CalendarIcon className="size-4 text-primary" />
      <time>{date}</time>
    </p>
  )
}

import { ArrowRightIcon, ArrowUpRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

// Photo card: whole card opens the course (stretched title link); "APPLY NOW" sits above it as its own link.
export function CourseCard({ course, apply }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:shadow-elevated hover:ring-primary">
      <div className="relative aspect-16/10 overflow-hidden">
        <img {...course.image} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" className="size-full object-cover transition duration-1000 ease-out group-hover:scale-110" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-secondary-dark/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-md bg-primary px-2.5 py-1 font-heading text-xs font-bold text-on-primary">{course.code}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug">
          <AppLink to={course.to} href={course.href} className="text-secondary after:absolute after:inset-0 hover:text-secondary">
            {course.title}
          </AppLink>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{course.text}</p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line-soft pt-5">
          <a href={apply.href} className="btn-shine relative z-10 inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 font-heading text-xs font-semibold tracking-wider text-white transition hover:bg-primary hover:text-on-primary">
            {apply.label}
            <ArrowUpRightIcon className="size-3.5" />
          </a>
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-surface-muted text-secondary transition group-hover:bg-primary group-hover:text-on-primary">
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

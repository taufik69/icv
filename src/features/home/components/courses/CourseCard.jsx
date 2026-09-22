import { ArrowRightIcon } from '@/shared/components/icons'

const audienceStyles = {
  domestic: 'bg-primary text-on-primary',
  international: 'bg-white text-secondary',
}

// Image card: title block sits at the bottom; on hover (mouse) the overview + CTA expand
// and push it up. Touch devices (no hover) always show the full card.
export function CourseCard({ course }) {
  const { Icon, label } = course.category

  return (
    <a
      href={course.href}
      className="group relative block aspect-3/4 overflow-hidden rounded-2xl bg-secondary-dark shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-elevated focus-visible:-translate-y-2"
    >
      <img
        src={course.image}
        alt=""
        width="480"
        height="640"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-linear-to-t from-secondary-dark via-secondary-dark/60 to-secondary-dark/5" />

      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm">
            <Icon className="size-5" />
          </span>
          <span className={`rounded-full px-3 py-1 font-condensed text-xs font-bold tracking-wider uppercase ${audienceStyles[course.audience]}`}>
            {course.audience}
          </span>
        </div>

        <div>
          <p className="font-condensed text-sm tracking-wider text-primary">{course.code}</p>
          <h3 className="mt-1 text-lg leading-snug font-semibold text-white">{course.title}</h3>
          <p className="mt-1 text-xs text-white/70">{label}</p>

          <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-out pointer-fine:grid-rows-[0fr] pointer-fine:opacity-0 pointer-fine:group-hover:grid-rows-[1fr] pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:grid-rows-[1fr] pointer-fine:group-focus-visible:opacity-100">
            <div className="overflow-hidden">
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">{course.overview}</p>
              <span className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-heading text-sm font-semibold text-secondary">
                View course
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

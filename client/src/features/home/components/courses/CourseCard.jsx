import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

const audienceStyles = {
  domestic: 'bg-primary text-on-primary',
  international: 'bg-white text-secondary',
}
const reveal =
  'grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-out pointer-fine:grid-rows-[0fr] pointer-fine:opacity-0 pointer-fine:group-hover:grid-rows-[1fr] pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:grid-rows-[1fr] pointer-fine:group-focus-visible:opacity-100'

// Image card that fills its bento cell (sm+) or keeps a 3:4 ratio in the mobile carousel.
// Hover (mouse only) reveals the overview + CTA; touch devices always see them.
// Featured (2×2) cards show the overview permanently and use larger type.
export function CourseCard({ course, featured = false }) {
  const { Icon, label } = course.category

  return (
    <AppLink
      to={course.to}
      href={course.href}
      className="group relative block aspect-3/4 h-full overflow-hidden rounded-2xl bg-secondary-dark shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-elevated focus-visible:-translate-y-1.5 sm:aspect-auto"
    >
      <img
        src={course.image.portrait}
        srcSet={`${course.image.portrait} 480w, ${course.image.wide} 900w`}
        sizes={featured ? '(min-width: 640px) 50vw, 80vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw'}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-linear-to-t from-secondary-dark via-secondary-dark/55 to-secondary-dark/5" />

      <div className={`relative flex h-full flex-col justify-between text-white ${featured ? 'p-6 md:p-8' : 'p-5'}`}>
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm">
            <Icon className="size-5" />
          </span>
          <span className={`rounded-full px-3 py-1 font-condensed text-xs font-bold tracking-wider uppercase ${audienceStyles[course.audience]}`}>
            {course.audience}
          </span>
        </div>

        <div className={featured ? 'max-w-lg' : ''}>
          <p className="font-condensed text-sm tracking-wider text-primary">{course.code}</p>
          <h3 className={`mt-1 leading-snug font-semibold text-white ${featured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg'}`}>
            {course.title}
          </h3>
          <p className="mt-1 text-xs text-white/70">{label}</p>
          {featured && <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">{course.overview}</p>}

          <div className={reveal}>
            <div className="overflow-hidden">
              {!featured && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">{course.overview}</p>}
              <span className="btn-shine mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-heading text-sm font-semibold text-secondary">
                View course
                <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLink>
  )
}

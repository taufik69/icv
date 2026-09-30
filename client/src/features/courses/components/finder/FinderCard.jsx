import { ArrowRightIcon, CalendarIcon, ClockIcon, GraduationCapIcon, MapPinIcon, PenLineIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'
import { CourseFact } from './CourseFact'
import { SaveButton } from './SaveButton'

const roundAction =
  'btn-shine text-secondary ring-1 ring-line-strong transition hover:bg-secondary hover:text-white hover:ring-secondary'

// Result card: photo (code + student type, save), study area and level, title (stretched link over the card),
// four facts from the course's "at a glance" table, headline fee, then View course and a round Enquire button.
export function FinderCard({ course, marketName, saved, onToggleSave }) {
  const { fee } = course

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition hover:shadow-card">
      <div className="relative aspect-16/10 overflow-hidden bg-secondary-dark">
        <img
          src={course.image.src}
          srcSet={course.image.srcSet}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          width={course.image.width}
          height={course.image.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="rounded-full bg-white/95 px-3 py-1 font-condensed text-xs font-semibold tracking-wide text-secondary tabular-nums">{course.code}</span>
          <span className="rounded-full bg-secondary-dark/75 px-3 py-1 text-xs text-white backdrop-blur-sm">{marketName}</span>
        </div>
      </div>
      <SaveButton title={course.title} saved={saved} onToggle={onToggleSave} />

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-baseline justify-between gap-3 text-xs">
          <span className="font-semibold tracking-wide text-secondary-muted uppercase">{course.area}</span>
          <span className="shrink-0 text-secondary-muted">{course.level}</span>
        </p>
        <h3 className="mt-2 text-lg leading-snug font-bold text-secondary">
          <AppLink to={course.to} href={course.href} className="text-secondary after:absolute after:inset-0 hover:text-secondary">
            {course.title}
          </AppLink>
        </h3>

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
          <CourseFact Icon={ClockIcon} label="Duration" value={course.duration} />
          <CourseFact Icon={MapPinIcon} label="Location" value={course.location} />
          <CourseFact Icon={GraduationCapIcon} label="Delivery" value={course.delivery} />
          <CourseFact Icon={CalendarIcon} label="Intake" value={course.intake} />
        </dl>

        <div className="mt-auto pt-5">
          <div className="min-h-13">
          {fee.amount && (
            <p className="text-sm text-secondary/85">
              From <span className="font-heading text-2xl font-bold text-secondary">{fee.amount}</span> {fee.basis}
            </p>
          )}
          {fee.note && <p className="mt-0.5 text-xs text-secondary-muted">Tuition: {fee.note}</p>}
          </div>

          <div className="relative z-10 mt-4 flex gap-2">
            <AppLink to={course.to} href={course.href} className={`${roundAction} inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 font-heading text-sm font-semibold`}>
              View course
              <ArrowRightIcon className="size-4" />
            </AppLink>
            <AppLink
              href={course.enquire}
              aria-label={`Enquire about ${course.title}`}
              title="Enquire about this course"
              className={`${roundAction} grid size-11 shrink-0 place-items-center rounded-full`}
            >
              <PenLineIcon className="size-4" />
            </AppLink>
          </div>
        </div>
      </div>
    </article>
  )
}

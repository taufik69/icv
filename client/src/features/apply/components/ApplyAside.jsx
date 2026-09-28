import { contactCards } from '@/shared/config/footer'
import { courseOptions } from '../data/applyOptions'

const [, phone, email] = contactCards

// Navy side card that follows the course picked in the form, plus phone/email for people who'd rather talk.
export function ApplyAside({ courseCode }) {
  const course = courseOptions.find((c) => c.code === courseCode)

  return (
    <aside className="relative overflow-hidden rounded-3xl bg-secondary p-7 text-white shadow-brand md:p-9">
      <div aria-hidden="true" className="absolute -right-24 -bottom-24 size-72 rounded-full border-[3rem] border-primary/10" />
      <div className="relative" aria-live="polite">
        <p className="text-sm text-white/60">{course ? "You're applying for" : 'No course picked yet'}</p>
        <p className="mt-2 font-heading text-2xl leading-tight font-bold md:text-3xl">
          {course ? course.title : 'Choose a course in the form, or tell us what you want to study.'}
        </p>
        {course && <span className="mt-3 inline-block rounded-md bg-primary px-2.5 py-0.5 font-heading text-sm font-bold text-on-primary">{course.code}</span>}
      </div>
      <div className="relative mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-white/60">Prefer to talk to someone?</p>
        <ul className="mt-3 grid gap-2">
          {[...phone.lines, ...email.lines].map((line) => (
            <li key={line.href}>
              <a href={line.href} className="font-heading text-lg font-semibold text-white hover:text-primary">{line.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

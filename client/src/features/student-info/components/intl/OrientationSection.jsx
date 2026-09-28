import { orientationSection as content } from '@/features/student-info/data/intlSupport'
import { CheckCircleIcon, PhoneIcon } from '@/shared/components/icons'
import { DocSection } from '../common/DocSection'

const Paras = ({ items }) => items.map((t) => <p key={t.slice(0, 24)} className="mt-4 leading-relaxed text-ink-muted">{t}</p>)

function CheckGrid({ title, items }) {
  return (
    <div className="mt-8 rounded-2xl bg-primary-soft/60 p-5 ring-1 ring-primary/20 md:p-6">
      <h3 className="text-lg leading-snug">{title}</h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3 font-medium text-ink shadow-raised">
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary-hover" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Long support section broken into scannable blocks: kit + help as check grids, counselling numbers as tap-to-call cards.
export function OrientationSection() {
  return (
    <DocSection section={content}>
      <p className="mt-2 font-condensed text-sm font-bold tracking-[0.2em] text-primary-hover uppercase">{content.subtitle}</p>
      <Paras items={content.intro} />
      <CheckGrid title={content.kitTitle} items={content.kit} />
      <Paras items={content.middle} />
      <CheckGrid title={content.helpTitle} items={content.help} />
      <Paras items={content.care} />

      <ul className="mt-5 grid gap-3 md:grid-cols-3">
        {content.counselling.map((c) => (
          <li key={c.name}>
            <a href={`tel:${c.tel}`} className="group flex h-full items-center gap-3 rounded-2xl bg-secondary p-4 text-white shadow-brand transition hover:-translate-y-0.5 hover:bg-secondary-dark hover:text-white">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition group-hover:scale-110">
                <PhoneIcon className="size-4" />
              </span>
              <span>
                <span className="block text-sm text-white/75">{c.name}</span>
                <span className="block font-heading text-lg font-bold">{c.phone}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl border-l-4 border-primary bg-surface-muted px-4 py-3 leading-relaxed text-ink">{content.legal}</p>
      <p className="mt-6 font-heading text-lg leading-snug font-semibold text-secondary">{content.closing}</p>
    </DocSection>
  )
}

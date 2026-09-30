import { ArrowRightIcon, BadgeCheckIcon, BookmarkIcon, DownloadIcon, LayersIcon, SendIcon, ShieldCheckIcon } from '@/shared/components/icons'
import { AppLink } from '@/shared/components/ui'

const pill = 'btn-shine inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-3 font-heading text-sm font-semibold transition'
const outline = `${pill} bg-white text-secondary ring-1 ring-line-strong hover:bg-surface-muted hover:text-secondary`

// Sidebar price + actions card, the same on every course detail page. UI only: Download, Compare and
// Save are buttons without behaviour yet; Enquire / Apply open the enquiry form with this course picked.
export function EnrolCard({ course, content }) {
  const { fee } = course

  return (
    <div className="rounded-3xl bg-white p-6 shadow-elevated ring-1 ring-line">
      <p className="text-sm text-secondary/95">{content.priceLabel}</p>
      <p className="mt-1 font-heading text-4xl leading-none font-bold text-secondary">{fee.amount}</p>
      <p className="mt-2 text-sm text-secondary/95">
        {fee.basis === 'tuition' ? 'Tuition fee' : 'Fee for service'}
        {fee.note && <span className="block text-xs text-secondary-muted">Tuition: {fee.note}</span>}
      </p>
      <p className="mt-3 text-sm text-secondary/95">
        {content.intakeLabel}: <span className="font-semibold text-secondary">{course.intake}</span>
      </p>

      <div className="mt-6 grid gap-2.5">
        <AppLink href={course.enquire} className={`${pill} bg-secondary text-white hover:bg-secondary-dark hover:text-white`}>
          <SendIcon className="size-4" />
          {content.enquire}
        </AppLink>
        <AppLink href={course.enquire} className={outline}>
          {content.apply}
          <ArrowRightIcon className="size-4" />
        </AppLink>
        <button type="button" className={outline}>
          <DownloadIcon className="size-4" />
          {content.guide}
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" className={outline}>
            <LayersIcon className="size-4" />
            {content.compare}
          </button>
          <button type="button" className={outline}>
            <BookmarkIcon className="size-4" />
            {content.save}
          </button>
        </div>
      </div>

      <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-secondary/95">
        {content.badges.map((text, i) => {
          const Icon = i ? BadgeCheckIcon : ShieldCheckIcon
          return (
            <li key={text} className="flex items-center gap-2.5">
              <Icon className={`size-4 shrink-0 ${i ? 'text-secondary-muted' : 'text-primary-hover'}`} />
              {text}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

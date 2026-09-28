import { ArrowUpRightIcon, DownloadIcon, FileTextIcon } from '@/shared/components/icons'

const btn = 'btn-shine inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-heading text-sm font-semibold transition'

// PDF document card: category + icon, title, summary, meta row (date / pages / size), view + download actions.
export function ReportCard({ report: { category, title, text, meta, href, Icon } }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-7 shadow-card ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:shadow-elevated md:p-9">
      <FileTextIcon aria-hidden="true" className="absolute -top-4 -right-4 size-40 text-surface-muted transition duration-500 group-hover:rotate-6" />

      <div className="relative flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-secondary text-primary transition duration-500 group-hover:scale-105">
          <Icon className="size-7" />
        </span>
        <div>
          <p className="font-condensed text-sm font-bold tracking-[0.2em] text-primary-hover uppercase">{category}</p>
          <span className="mt-1 inline-block rounded-pill bg-surface-muted px-2.5 py-0.5 font-condensed text-xs tracking-wider text-ink-subtle">PDF</span>
        </div>
      </div>

      <h3 className="relative mt-6 text-2xl leading-snug">{title}</h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-ink-muted">{text}</p>

      <dl className="relative mt-6 grid grid-cols-3 divide-x divide-line-soft rounded-2xl bg-surface-muted py-3">
        {meta.map((m) => (
          <div key={m.label} className="flex flex-col-reverse px-4">
            <dt className="font-condensed text-xs tracking-widest text-ink-subtle uppercase">{m.label}</dt>
            <dd className="font-heading font-bold text-secondary">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-6 flex flex-wrap gap-3">
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${btn} bg-secondary text-white hover:bg-secondary-dark hover:text-white`}>
          View report
          <ArrowUpRightIcon className="size-4 text-primary" />
          <span className="sr-only">(PDF, opens in a new tab)</span>
        </a>
        <a href={href} download className={`${btn} text-secondary ring-1 ring-line-strong hover:bg-primary hover:text-on-primary hover:ring-primary`}>
          <DownloadIcon className="size-4" />
          Download
          <span className="sr-only">{title} (PDF)</span>
        </a>
      </div>
    </article>
  )
}

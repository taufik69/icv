import { ArrowRightIcon, CoinsIcon } from '@/shared/components/icons'

// Navy card: big scholarship icon, two highlight rows, enquiry + fee schedule CTAs.
export function ScholarshipCard({ content }) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-secondary p-7 shadow-brand md:p-10">
      <span aria-hidden="true" className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-primary/25 blur-3xl" />
      <CoinsIcon aria-hidden="true" className="absolute -right-6 -bottom-6 -z-10 size-48 text-white/5" />

      <span className="grid size-16 place-items-center rounded-2xl bg-primary text-on-primary shadow-card">
        <CoinsIcon className="size-8" />
      </span>
      <p className="mt-6 font-heading text-2xl leading-snug font-bold text-white md:text-3xl">
        {content.cardTitle}
      </p>

      <dl className="mt-8 space-y-3">
        {content.highlights.map(({ label, value, Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
            <Icon className="size-5 shrink-0 text-primary" />
            <div className="flex flex-col-reverse">
              <dt className="font-condensed text-xs tracking-[0.2em] text-white/60 uppercase">{label}</dt>
              <dd className="font-heading font-semibold text-white">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={content.action.href}
          className="group btn-shine inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
        >
          {content.action.label}
          <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
        </a>
        <a
          href={content.feesLink.href}
          className="btn-shine inline-flex items-center rounded-md px-6 py-3 font-heading font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10 hover:text-white"
        >
          {content.feesLink.label}
        </a>
      </div>
    </div>
  )
}

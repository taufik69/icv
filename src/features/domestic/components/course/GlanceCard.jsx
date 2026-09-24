import { ArrowUpRightIcon } from '@/shared/components/icons'

// "AT A GLANCE" facts as a navy card: label / value rows with dividers, then the page's two actions.
export function GlanceCard({ glance, actions }) {
  return (
    <aside aria-labelledby="glance-title" className="overflow-hidden rounded-3xl bg-secondary text-white shadow-brand">
      <h2 id="glance-title" className="flex items-center gap-3 bg-primary px-7 py-4 font-condensed text-lg font-bold tracking-[0.2em] text-on-primary">
        AT A GLANCE
      </h2>
      <dl className="divide-y divide-white/10 px-7">
        {glance.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-baseline gap-4 py-3.5">
            <dt className="text-sm text-white/65">{label}</dt>
            <dd className="text-right font-heading font-semibold text-white">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-2 p-5 pt-3 sm:grid-cols-2">
        {actions.map((a, i) => (
          <a
            key={a.label}
            href={a.href}
            {...(i === 0 ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`btn-shine inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-heading text-sm font-semibold transition ${i === 0 ? 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary' : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 hover:text-white'}`}
          >
            {a.label}
            {i === 0 && <ArrowUpRightIcon className="size-4" />}
          </a>
        ))}
      </div>
    </aside>
  )
}

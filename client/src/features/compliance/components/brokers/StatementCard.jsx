import { ShieldCheckIcon } from '@/shared/components/icons'

// One big, calm statement: pulsing shield seal, year chip, the sentence set large, and two zero counters.
export function StatementCard({ content }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-surface p-8 text-center shadow-elevated ring-1 ring-line-soft md:p-16">
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(var(--color-line-soft)_1px,transparent_1px),linear-gradient(90deg,var(--color-line-soft)_1px,transparent_1px)] bg-size-[40px_40px] mask-radial-from-20% mask-radial-to-70%"
      />

      <span className="relative mx-auto grid size-24 place-items-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-primary/25 motion-safe:animate-ping [animation-duration:2.4s]" />
        <span aria-hidden="true" className="absolute inset-2 rounded-full bg-primary-soft" />
        <span className="relative grid size-16 place-items-center rounded-full bg-secondary text-primary shadow-brand">
          <ShieldCheckIcon className="size-8" />
        </span>
      </span>

      <p className="mt-8 inline-flex items-center gap-2 rounded-pill bg-surface-muted px-4 py-1.5 font-condensed text-sm tracking-[0.2em] text-ink-subtle uppercase ring-1 ring-line-soft">
        <span className="size-2 rounded-full bg-primary" />
        {content.label} · {content.year}
      </p>

      <h2 id="statement-title" className="mx-auto mt-6 max-w-3xl text-3xl leading-tight md:text-5xl">
        {content.statement}
      </h2>

      <dl className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-4">
        {content.counts.map((c) => (
          <div key={c.label} className="flex flex-col-reverse rounded-2xl bg-secondary px-6 py-5 shadow-brand">
            <dt className="font-condensed text-xs tracking-[0.2em] text-white/60 uppercase">{c.label}</dt>
            <dd className="font-heading text-5xl leading-none font-extrabold text-primary md:text-6xl">{c.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

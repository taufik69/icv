// Glass strip of key facts along the bottom of the hero.
export function HeroStats({ stats }) {
  return (
    <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md md:mt-16 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse gap-1 px-5 py-5 md:px-7 md:py-6 ${i > 0 ? 'md:border-l md:border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 md:border-t-0' : ''} ${i % 2 === 1 ? 'border-l border-white/10' : ''}`}
        >
          <dt className="font-condensed text-xs tracking-[0.2em] text-white/60 uppercase">{stat.label}</dt>
          <dd className="font-heading text-2xl font-bold text-white md:text-4xl">
            {stat.value}
            <span aria-hidden="true" className="ml-1 inline-block size-2 rounded-full bg-primary align-top" />
          </dd>
        </div>
      ))}
    </dl>
  )
}

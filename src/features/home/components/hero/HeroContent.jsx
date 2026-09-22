// Mobile: two buttons share one row (flex-auto = width follows label, fluid text, never wraps). sm+: natural width.
const buttonBase =
  'btn-shine inline-flex flex-auto items-center justify-center rounded-md px-2.5 py-3 font-heading text-[clamp(0.625rem,2.6vw,0.875rem)] font-semibold whitespace-nowrap uppercase transition sm:flex-none sm:px-7 sm:py-3.5 sm:text-sm sm:tracking-wide'
const buttonVariants = {
  primary: 'bg-primary text-on-primary shadow-card hover:bg-primary-hover hover:text-on-primary',
  outline: 'bg-white/10 text-white ring-1 ring-white/40 backdrop-blur-md hover:bg-white hover:text-secondary',
}

export function HeroContent({ content }) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 pr-4 pl-2 font-condensed text-xs tracking-[0.2em] text-white uppercase ring-1 ring-white/20 backdrop-blur-md sm:text-sm">
        <span className="relative grid size-2.5 place-items-center">
          <span className="absolute size-full rounded-full bg-primary motion-safe:animate-ping" />
          <span className="size-2 rounded-full bg-primary" />
        </span>
        {content.eyebrow}
      </p>
      <h1 className="mt-6 text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
        {content.headline.map((line, i) => (
          <span key={line} className={`block ${i === content.highlightLine ? 'text-primary' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-6 max-w-xl border-l-2 border-primary pl-4 text-base leading-relaxed text-white/85 md:text-lg">
        {content.description}
      </p>
      <div className="mt-8 flex gap-2 sm:gap-3">
        {content.actions.map((action) => (
          <a key={action.href} href={action.href} className={`${buttonBase} ${buttonVariants[action.variant]}`}>
            {action.label}
          </a>
        ))}
      </div>
      <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-condensed text-xs tracking-widest text-white/60 uppercase sm:text-sm">
        {content.trust.map((t, i) => (
          <span key={t} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-primary" />}
            {t}
          </span>
        ))}
      </p>
    </div>
  )
}

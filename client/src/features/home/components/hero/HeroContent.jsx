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
      <p className="flex items-center gap-3 font-condensed text-xs tracking-[0.25em] text-white/75 uppercase sm:text-sm">
        <span aria-hidden="true" className="h-0.5 w-8 rounded-pill bg-primary" />
        {content.eyebrow}
      </p>
      <h1 className="mt-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
        {content.headline.map((line, i) => (
          <span key={line} className={`${i === content.highlightLine ? 'text-primary' : ''}`}>
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
        {content.description}
      </p>
      <div className="mt-8 flex gap-2 sm:gap-3">
        {content.actions.map((action) => (
          <a key={action.href} href={action.href} className={`${buttonBase} ${buttonVariants[action.variant]}`}>
            {action.label}
          </a>
        ))}
      </div>
    </div>
  )
}

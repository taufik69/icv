import { Reveal } from '@/shared/components/ui'

// Mobile: one row, width follows label, fluid text, never wraps. sm+: fixed min width.
const buttonBase =
  'btn-shine inline-flex flex-auto justify-center rounded-sm px-2.5 py-3 font-condensed text-[clamp(0.6875rem,3.4vw,1rem)] font-bold whitespace-nowrap uppercase shadow-raised transition duration-300 hover:-translate-y-0.5 hover:shadow-card sm:min-w-52 sm:flex-none sm:px-7 sm:py-3.5 sm:text-base sm:tracking-wide'
const buttonVariants = {
  navy: 'bg-secondary text-white hover:bg-secondary-dark hover:text-white',
  green: 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary',
}

export function IntroHeader({ content }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <h2 id="intro-title" className="font-condensed text-3xl font-bold uppercase md:text-4xl">{content.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">{content.subtitle}</p>
      <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-primary" />
      <div className="mt-8 flex justify-center gap-2 sm:gap-5">
        {content.actions.map((action) => (
          <a key={action.href} href={action.href} className={`${buttonBase} ${buttonVariants[action.variant]}`}>
            {action.label}
          </a>
        ))}
      </div>
    </Reveal>
  )
}

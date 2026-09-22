import { Reveal } from '@/shared/components/ui'

const buttonBase =
  'btn-shine inline-flex min-w-52 justify-center rounded-sm px-7 py-3.5 font-condensed text-base font-bold tracking-wide uppercase shadow-raised transition duration-300 hover:-translate-y-0.5 hover:shadow-card'
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
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
        {content.actions.map((action) => (
          <a key={action.href} href={action.href} className={`${buttonBase} ${buttonVariants[action.variant]}`}>
            {action.label}
          </a>
        ))}
      </div>
    </Reveal>
  )
}

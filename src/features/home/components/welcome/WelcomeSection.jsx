import { welcomeContent as content } from '@/features/home/data/welcomeContent'
import { Reveal, SectionEyebrow } from '@/shared/components/ui'
import { WelcomeMedia } from './WelcomeMedia'

const btn =
  'btn-shine inline-flex flex-1 items-center justify-center rounded-md px-3 py-3.5 text-center font-heading text-sm font-semibold transition sm:flex-none sm:px-7 sm:text-base'
const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary',
  outline: 'border-2 border-white/40 text-white hover:border-white hover:text-white',
}

// Full-width navy band; the Melbourne photo bleeds to the right screen edge. The copy box is
// right-aligned in the left column and capped at half the Container (40rem), so its left edge
// lines up with the site Container at every width.
export function WelcomeSection() {
  return (
    <section aria-labelledby="welcome-title" className="grid overflow-hidden bg-secondary lg:grid-cols-2">
      <Reveal
        from="left"
        className="order-last px-5 py-12 md:px-8 md:py-16 lg:order-none lg:ml-auto lg:w-full lg:max-w-[40rem] lg:py-24 lg:pr-16"
      >
        <SectionEyebrow tone="light">{content.eyebrow}</SectionEyebrow>
        <h2 id="welcome-title" className="mt-5 text-3xl leading-tight text-white md:text-4xl">
          {content.title} <span className="text-primary">{content.highlight}</span>
        </h2>
        <p className="mt-5 leading-relaxed text-white/75">{content.text}</p>

        <div className="mt-8 flex gap-3">
          {content.actions.map((a) => (
            <a key={a.href} href={a.href} className={`${btn} ${variants[a.variant]}`}>
              {a.label}
            </a>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
          {content.facts.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2 font-condensed text-sm tracking-wide text-white/80">
              <Icon className="size-4 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
      <WelcomeMedia image={content.image} />
    </section>
  )
}

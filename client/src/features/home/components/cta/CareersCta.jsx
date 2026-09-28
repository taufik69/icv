import { careersCtaContent as content } from '@/features/home/data/careersCtaContent'
import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useInView } from '@/shared/hooks/useInView'
import { FundingOption } from './FundingOption'

// "Smart Training. Real Careers" band: construction photo under a deep navy overlay (lazy, like the footer),
// copy + CTAs on the left, the two funding routes as glass cards on the right (stacked below lg).
export function CareersCta() {
  const [ref, near] = useInView({ rootMargin: '400px 0px' })
  const bg = near ? 'bg-[url(/images/dom-building-site-960.webp)] lg:bg-[url(/images/dom-building-site-1920.webp)]' : ''
  const [line1, line2] = content.title

  return (
    <section
      ref={ref}
      aria-labelledby="careers-cta-title"
      className={`relative isolate overflow-hidden bg-secondary-dark bg-cover bg-center py-20 md:py-28 ${bg}`}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-secondary-dark/92" />

      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow tone="light">{content.eyebrow}</SectionEyebrow>
          <h2 id="careers-cta-title" className="mt-5 text-4xl leading-none text-white uppercase sm:text-5xl lg:text-6xl">
            {line1}
            <span className="block text-primary">{line2}</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{content.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={content.action.href}
              className="group btn-shine inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-heading text-sm font-bold text-on-primary uppercase shadow-card transition hover:bg-primary-hover hover:text-on-primary md:text-base"
            >
              {content.action.label}
              <ArrowRightIcon className="size-4 shrink-0 transition group-hover:translate-x-1" />
            </a>
            <AppLink
              to={content.secondary.to}
              hash={content.secondary.hash}
              className="btn-shine inline-flex items-center justify-center rounded-md px-6 py-3.5 font-heading text-sm font-bold text-white uppercase ring-1 ring-white/40 transition hover:bg-white hover:text-secondary md:text-base"
            >
              {content.secondary.label}
            </AppLink>
          </div>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {content.options.map((option, i) => (
            <Reveal as="li" key={option.tag} from="right" delay={i * 120}>
              <FundingOption option={option} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

import { Container, Reveal } from '@/shared/components/ui'
import { useInView } from '@/shared/hooks/useInView'

// "ENROL TODAY RISK-FREE!" band over the original counter photo (fixed on lg), loaded as it nears the viewport.
export function FundingBand({ funding }) {
  const [ref, near] = useInView({ rootMargin: '400px 0px' })
  const bg = near ? 'bg-[url(/images/dom-funding-960.webp)] lg:bg-[url(/images/dom-funding-1920.webp)]' : ''

  return (
    <section ref={ref} aria-labelledby="funding-title" className={`relative isolate overflow-hidden bg-secondary-dark bg-cover bg-center py-20 text-center md:py-28 lg:bg-fixed ${bg}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-secondary-dark/95 via-secondary/80 to-secondary-dark/95" />
      <Container>
        <Reveal from="zoom">
          <h2 id="funding-title" className="font-condensed text-lg font-bold tracking-[0.3em] text-primary">{funding.title}</h2>
          <p className="mt-4 font-heading text-6xl leading-none font-extrabold tracking-tight text-white md:text-8xl">{funding.headline}</p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
            {funding.lines.map((line) => (
              <p key={line} className="rounded-pill bg-white/10 px-5 py-2.5 font-heading font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

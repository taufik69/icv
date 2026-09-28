import { ArrowUpRightIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'

// Closing band: course photo under a navy scrim, big headline, fine print, and the page's final actions.
export function CourseCta({ cta, image }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-secondary-dark py-20 text-center md:py-28">
      <img {...image} sizes="100vw" loading="lazy" decoding="async" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-secondary-dark/90 via-secondary/85 to-secondary-dark/95" />
      <Container>
        <Reveal from="zoom" className="mx-auto max-w-3xl">
          {cta.title && <p className="mb-4 font-condensed text-lg font-bold tracking-[0.25em] text-primary uppercase">{cta.title}</p>}
          <h2 id="cta-title" className="font-heading text-4xl leading-tight font-extrabold text-white md:text-6xl">{cta.headline}</h2>
          <div className="mt-6 space-y-2">
            {cta.lines.map((line) => (
              <p key={line} className="leading-relaxed text-white/75">{line}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {cta.actions.map((a, i) => (
              <a
                key={a.label}
                href={a.href}
                {...(a.href.endsWith('.pdf') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group btn-shine inline-flex items-center gap-2 rounded-md px-7 py-3.5 font-heading font-semibold transition ${i === 0 ? 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary' : 'text-white ring-1 ring-white/40 hover:bg-white/10 hover:text-white'}`}
              >
                {a.label}
                <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

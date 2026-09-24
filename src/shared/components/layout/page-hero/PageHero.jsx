import { Container, SectionEyebrow } from '@/shared/components/ui'
import { Breadcrumbs } from './Breadcrumbs'

// Inner-page banner: full-bleed photo (the page's LCP image) under a navy scrim, breadcrumb, h1, lead.
// Add the route to `heroRoutes` (shared/config/navigation.js) so the header starts transparent over it.
// `children` render below the lead (e.g. a stats strip).
export function PageHero({ id, eyebrow, title, highlight, lead, image, trail, current, children }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-secondary-dark">
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="100vw"
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover object-top"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-dark via-secondary/75 to-secondary/45" />
      <span aria-hidden="true" className="parallax-down pointer-events-none absolute -bottom-32 -left-24 -z-10 size-96 rounded-full bg-primary/20 blur-3xl" />

      <Container className="pt-32 pb-12 md:pt-44 md:pb-16">
        <Breadcrumbs trail={trail} current={current} />
        <div className="mt-8 max-w-3xl motion-safe:animate-[fade-in_700ms_ease-out]">
          <SectionEyebrow tone="light">{eyebrow}</SectionEyebrow>
          <h1 id={id} className="mt-5 text-4xl leading-tight text-white md:text-6xl">
            {title} {highlight && <span className="text-primary">{highlight}</span>}
          </h1>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

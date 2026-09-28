import { whyContent as content } from '@/features/about/data/aboutContent'
import { ArrowRightIcon, MapPinIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { WhyPoint } from './WhyPoint'

// Navy band: copy + 6 highlights on the left, student photo bleeding off the right edge (stacked on top below lg).
export function WhyIcvSection() {
  const { image } = content

  return (
    <section aria-labelledby="why-icv-title" className="relative isolate overflow-hidden bg-secondary">
      <div className="group/media relative aspect-video overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-5/12">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 42vw, 100vw"
          alt={image.alt}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[70%_center] transition duration-1000 ease-out group-hover/media:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-secondary to-transparent to-40% lg:bg-linear-to-r lg:to-30%" />
        <span className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-heading text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
          <MapPinIcon className="size-4 text-primary" />
          {image.caption}
        </span>
      </div>

      <Container className="relative py-16 md:py-24 lg:pointer-events-none">
        <Reveal from="left" className="lg:pointer-events-auto lg:w-7/12 lg:pr-12">
          <SectionEyebrow tone="light">{content.eyebrow}</SectionEyebrow>
          <h2 id="why-icv-title" className="mt-5 text-3xl leading-tight text-white md:text-5xl">
            {content.title} <span className="text-primary">{content.highlight}</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-white/75">{content.text}</p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {content.points.map((point, i) => (
              <WhyPoint key={point.label} point={point} delay={(i % 2) * 100} />
            ))}
          </ul>

          <a
            href={content.action.href}
            className="group btn-shine mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
          >
            {content.action.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </a>
        </Reveal>
      </Container>
    </section>
  )
}

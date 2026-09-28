import { shareCta as content } from '@/features/testimonials/data/reviewsContent'
import { ArrowUpRightIcon, StarIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { reviewSummary as summary } from '@/shared/config/footer'

// Light closing card: faint dot texture, a few drifting stars; links out to Google.
export function ShareCta() {
  return (
    <section aria-labelledby="share-title" className="bg-surface py-16 md:py-20">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-surface-muted px-8 py-14 text-center ring-1 ring-line-soft md:px-16 md:py-20">
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] bg-size-[18px_18px] mask-radial-from-10% mask-radial-to-75%" />
          <StarIcon className="absolute top-8 left-[10%] -z-10 size-10 text-warning/40 motion-safe:animate-float" />
          <StarIcon className="absolute top-1/3 right-[12%] -z-10 size-14 text-warning/35 motion-safe:animate-float-slow" />
          <StarIcon className="absolute bottom-10 left-[22%] -z-10 size-6 text-warning/40 motion-safe:animate-float-slow" />

          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="share-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-muted">{content.text}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={summary.writeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
            >
              <StarIcon className="size-4" />
              Write a review
            </a>
            <a
              href={summary.allHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center gap-2 rounded-md px-7 py-3.5 font-heading font-semibold text-secondary ring-1 ring-line-strong transition hover:bg-secondary hover:text-white hover:ring-secondary"
            >
              All {summary.count} reviews
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

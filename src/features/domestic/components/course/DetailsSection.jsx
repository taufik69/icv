import { Container, Reveal } from '@/shared/components/ui'
import { Parts } from '../common/Parts'
import { PlacementCard } from './PlacementCard'

// "COURSE DETAILS": requirement blocks as cards (2 columns on md), then the work placement card if the course has one.
export function DetailsSection({ title = 'COURSE DETAILS', details, placement, showPlacement }) {
  return (
    <section aria-labelledby="details-title" className="bg-surface-muted py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 id="details-title" className="text-3xl md:text-5xl">{title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-pill bg-primary" />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {details.map((block, i) => (
            <Reveal key={block.title} delay={(i % 2) * 100} className={`h-full ${details.length % 2 && i === details.length - 1 ? 'md:col-span-2' : ''}`}>
              <article className="h-full rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-8">
                <h3 className="flex items-start gap-3 text-xl leading-snug">
                  <span aria-hidden="true" className="mt-2 h-1 w-6 shrink-0 rounded-pill bg-primary" />
                  {block.title}
                </h3>
                <div className="mt-5">
                  <Parts parts={block.parts} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {showPlacement && placement && <PlacementCard placement={placement} />}
      </Container>
    </section>
  )
}

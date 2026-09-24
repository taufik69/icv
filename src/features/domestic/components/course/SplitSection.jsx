import { Container, PhotoFrame, Reveal, SectionEyebrow } from '@/shared/components/ui'

// Photo + copy split used by Career, RPL and similar blocks. `flip` puts the photo on the right.
export function SplitSection({ id, title, image, flip = false, className = 'bg-surface', children }) {
  return (
    <section aria-labelledby={id} className={`py-16 md:py-24 ${className}`}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal from={flip ? 'right' : 'left'} className={flip ? 'lg:order-last' : ''}>
          <PhotoFrame image={{ ...image, sizes: '(min-width: 1024px) 600px, 100vw' }} aspect="aspect-4/3" />
        </Reveal>
        <Reveal from={flip ? 'left' : 'right'} delay={100} className="min-w-0">
          <SectionEyebrow>
            <span id={id}>{title}</span>
          </SectionEyebrow>
          <div className="mt-6">{children}</div>
        </Reveal>
      </Container>
    </section>
  )
}

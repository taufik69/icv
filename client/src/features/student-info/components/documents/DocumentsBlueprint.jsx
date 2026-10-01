import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { DocumentTile } from './DocumentTile'
import { FeaturedDocument } from './FeaturedDocument'

// Document downloads (Forms, Policies) as a blueprint bento (the home page's "Launch your career" layout) on the page's light doodle
// background, with light-tone PlusCards:
// lg:  heading + first document (tall) | the other documents, two per row (an odd last one spans both)
// On lg the featured cell keeps its own height and stays pinned while a long list scrolls (overflow-clip,
// not overflow-hidden, so sticky works). Below lg it stacks: featured cell, then the documents (two per row from sm). `heading` defaults to content.heading.
export function DocumentsBlueprint({ id, content, heading = content.heading }) {
  const action = content.action ?? 'Download'
  const [first, ...rest] = content.docs
  const lastSpans = rest.length % 2 === 1
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby={id} className={`relative overflow-clip bg-surface py-16 md:py-24 ${doodle}`}>
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr]">
        <Reveal from="left" className="lg:sticky lg:top-28 lg:self-start">
          <FeaturedDocument id={id} heading={heading} doc={first} action={action} />
        </Reveal>
        <ul className="grid min-w-0 grid-cols-1 content-start gap-6 sm:grid-cols-2">
          {rest.map((doc, i) => (
            <Reveal as="li" key={doc.title} delay={(i % 2) * 100} className={lastSpans && i === rest.length - 1 ? 'sm:col-span-2' : ''}>
              <DocumentTile doc={doc} action={action} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

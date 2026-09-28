import { PageHero } from '@/shared/components/layout'
import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { DocumentCard } from './DocumentCard'

// Shared layout for document-list pages (Policies, Forms): banner, optional heading, 2-column list of download rows.
export function DocumentsPage({ id, current, content }) {
  const [ref, doodle] = useDoodleBackground()
  const action = content.action ?? 'Download'

  return (
    <>
      <PageHero id={id} current={current} {...content.hero} />
      <section ref={ref} aria-labelledby={content.heading ? `${id}-list` : id} className={`relative overflow-hidden bg-surface py-16 md:py-24 ${doodle}`}>
        <Container>
          {content.heading && (
            <Reveal>
              <h2 id={`${id}-list`} className="text-3xl leading-tight md:text-4xl">
                {content.heading}
              </h2>
              <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />
            </Reveal>
          )}
          <ul className={`grid gap-4 lg:grid-cols-2 ${content.heading ? 'mt-10' : ''}`}>
            {content.docs.map((doc, i) => (
              <li key={doc.title}>
                <Reveal delay={(i % 2) * 100} className="h-full">
                  <DocumentCard doc={doc} index={i} action={action} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

import { PageHero } from '@/shared/components/layout'
import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { SectionNav } from './SectionNav'

// Long-page shell: banner, optional page heading, sticky section nav (lg) beside stacked section cards.
export function DocLayout({ id, current, hero, heading, sections, ids, numbered, children }) {
  const [ref, doodle] = useDoodleBackground()

  return (
    <>
      <PageHero id={id} current={current} {...hero} />
      <div ref={ref} className={`relative bg-surface-muted py-14 md:py-20 ${doodle}`}>
        <Container>
          {heading && (
            <Reveal className="mb-10 md:mb-12">
              <p className="font-heading text-2xl leading-tight font-bold text-secondary md:text-4xl">{heading}</p>
              <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />
            </Reveal>
          )}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
            <SectionNav sections={sections} ids={ids} numbered={numbered} />
            <div className="grid min-w-0 grid-cols-1 gap-6 md:gap-8">{children}</div>
          </div>
        </Container>
      </div>
    </>
  )
}

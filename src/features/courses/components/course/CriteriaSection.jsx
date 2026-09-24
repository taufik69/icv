import { Container, PhotoFrame, Reveal } from '@/shared/components/ui'

// Elements and performance criteria: each element is a card with its number, and its criteria as n.n rows.
export function CriteriaSection({ criteria, image }) {
  return (
    <section aria-labelledby="criteria-title" className="bg-surface py-16 md:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <Reveal from="left" className="lg:sticky lg:top-28">
          <h2 id="criteria-title" className="text-3xl md:text-4xl">{criteria.title}</h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />
          <p className="mt-5 font-condensed text-lg font-bold tracking-[0.15em] text-primary-hover uppercase">{criteria.subtitle}</p>
          <div className="mt-8 hidden lg:block">
            <PhotoFrame image={{ ...image, sizes: '380px' }} aspect="aspect-4/5" />
          </div>
        </Reveal>

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {criteria.elements.map(([element, items], i) => (
            <Reveal as="li" key={element} delay={(i % 2) * 100}>
              <article className="h-full rounded-3xl bg-surface-muted p-6 ring-1 ring-line-soft transition duration-300 hover:bg-surface hover:shadow-card hover:ring-primary">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary font-heading text-xl font-extrabold text-primary">{i + 1}.</span>
                  <h3 className="pt-1 text-lg leading-snug">{element}</h3>
                </div>
                <ul className="mt-5 grid gap-2.5">
                  {items.map((text, j) => (
                    <li key={text} className="flex items-start gap-3 rounded-xl bg-surface px-3.5 py-3 text-sm leading-relaxed text-ink ring-1 ring-line-soft">
                      <span className="shrink-0 font-heading font-bold text-primary-hover">{i + 1}.{j + 1}.</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

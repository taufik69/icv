import { Container } from '@/shared/components/ui'

// Navy band under the transparent header: blueprint photo, title + lead, and study-area shortcuts
// that apply the Study area filter in one tap.
export function FinderHero({ content, finder }) {
  const areas = finder.facets.area

  return (
    <section aria-labelledby="finder-title" className="relative isolate overflow-hidden bg-secondary pt-32 pb-12 text-white md:pt-40 md:pb-16">
      <img
        src="/images/dom-blueprints-1600.webp"
        srcSet="/images/dom-blueprints-800.webp 800w, /images/dom-blueprints-1600.webp 1600w"
        sizes="100vw"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover opacity-15 mix-blend-luminosity"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-secondary-dark/60 to-secondary" />

      <Container>
        <h1 id="finder-title" className="text-4xl leading-none font-bold text-white sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{content.lead}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {areas.map(({ value }) => {
            const on = finder.filters.area.includes(value)
            return (
              <button
                key={value}
                type="button"
                aria-pressed={on}
                onClick={() => finder.toggle('area', value)}
                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ring-1 transition ${
                  on ? 'bg-white text-secondary ring-white' : 'bg-white/5 text-white/80 ring-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                {value}
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

import { CompassIcon } from '@/shared/components/icons'
import { Container } from '@/shared/components/ui'

// Deep navy band under the transparent header: badge, title + lead, and study-area shortcuts
// that apply the Study area filter in one tap.
export function FinderHero({ content, finder }) {
  const areas = finder.facets.area

  return (
    <section aria-labelledby="finder-title" className="relative isolate overflow-hidden bg-secondary-dark pt-32 pb-12 text-white md:pt-40 md:pb-16">
      <Container>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 py-1.5 pr-4 pl-3 text-xs font-semibold tracking-[0.2em] text-white/90 uppercase ring-1 ring-white/15">
          <CompassIcon className="size-4 text-primary" />
          {content.badge}
        </p>
        <h1 id="finder-title" className="text-4xl leading-none font-bold text-white sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{content.lead}</p>

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
                  on ? 'bg-white text-secondary ring-white' : 'bg-white/5 text-white/90 ring-white/20 hover:bg-white/10 hover:text-white'
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

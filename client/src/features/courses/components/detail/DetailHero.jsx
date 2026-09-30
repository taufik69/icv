import { Breadcrumbs } from '@/shared/components/layout'
import { BlueprintGrid, Container } from '@/shared/components/ui'
import { CourseTags } from './CourseTags'
import { FactTiles } from './FactTiles'

// Full-bleed course photo under a navy scrim (same language as the site's PageHero) and a faint blueprint
// grid with dots at the crossings, fading out from the top-left, with light beams running along its lines; sits under the
// transparent header. Content sits in the left column so the sidebar card can overlap the hero's edge.
export function DetailHero({ course, summary, markets, content }) {
  const { hero } = course.images

  return (
    <section aria-labelledby="course-title" className="relative isolate overflow-hidden bg-secondary-dark">
      <img
        src={hero.src}
        srcSet={hero.srcSet}
        sizes="100vw"
        alt=""
        width={hero.width}
        height={hero.height}
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-secondary-dark via-secondary-dark/90 to-secondary/60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-dark/80 to-transparent" />
      <BlueprintGrid />

      <Container className="grid grid-cols-1 gap-x-12 pt-32 pb-12 md:pt-40 lg:grid-cols-[minmax(0,1fr)_22rem] lg:pb-16">
        <div className="min-w-0 motion-safe:animate-[panel-in_600ms_ease-out]">
          <Breadcrumbs trail={content.crumbs} current={course.title} />
          <div className="mt-8">
            <CourseTags summary={summary} markets={markets} marketNames={content.marketNames} />
          </div>
          <h1 id="course-title" className="mt-5 text-4xl leading-[1.05] font-bold text-white md:text-5xl lg:text-6xl">{course.title}</h1>
          <p className="mt-5 line-clamp-3 max-w-2xl text-lg leading-relaxed text-white/95">{course.tagline ?? course.overview.paragraphs[0]}</p>
          <div className="mt-8">
            <FactTiles summary={summary} labels={content.facts} />
          </div>
        </div>
      </Container>
    </section>
  )
}

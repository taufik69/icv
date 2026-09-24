import { Container, PhotoFrame, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { Parts } from '../common/Parts'
import { GlanceCard } from './GlanceCard'

// Overview copy + framed photo on the left; the at-a-glance card sticks beside it on lg.
export function OverviewSection({ course }) {
  const [ref, doodle] = useDoodleBackground()
  const { overview } = course
  const parts = [...overview.paragraphs, ...(overview.list ? [{ list: overview.list }] : [])]

  return (
    <section ref={ref} aria-labelledby="overview-title" className={`relative overflow-clip bg-surface py-16 md:py-24 ${doodle}`}>
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <Reveal from="left">
          <SectionEyebrow>
            <span id="overview-title">OVERVIEW</span>
          </SectionEyebrow>
          <div className="mt-6 text-lg">
            <Parts parts={parts} />
          </div>
          <div className="mt-10">
            <PhotoFrame image={{ ...course.images.overview, sizes: '(min-width: 1024px) 700px, 100vw' }} />
          </div>
        </Reveal>
        <Reveal from="right" delay={100} className="lg:sticky lg:top-28">
          <GlanceCard glance={course.glance} actions={course.actions} />
        </Reveal>
      </Container>
    </section>
  )
}

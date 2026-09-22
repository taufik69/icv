import { Reveal, SectionEyebrow } from '@/shared/components/ui'
import { StudyPoint } from './StudyPoint'
import { VideoCard } from './VideoCard'

function PointColumn({ points, side }) {
  return (
    <div className="space-y-10 lg:space-y-14">
      {points.map((point, i) => (
        <Reveal key={point.title} from={side} delay={i * 100}>
          <StudyPoint point={point} side={side} />
        </Reveal>
      ))}
    </div>
  )
}

// Desktop: points | video | points. Tablet: video on top, two point columns. Mobile: stacked.
export function StudyShowcase({ content }) {
  return (
    <div className="mt-16 md:mt-20">
      <Reveal className="text-center">
        <SectionEyebrow>{content.studyTitle}</SectionEyebrow>
      </Reveal>
      <div className="mt-14 grid items-center gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(0,24rem)_1fr] lg:gap-x-14">
        <PointColumn points={content.points.left} side="left" />
        <Reveal from="zoom" className="order-first px-3 sm:col-span-2 lg:order-none lg:col-span-1">
          <VideoCard video={content.video} />
        </Reveal>
        <PointColumn points={content.points.right} side="right" />
      </div>
    </div>
  )
}

import { Reveal, SectionEyebrow } from '@/shared/components/ui'
import { PathwayCard } from './PathwayCard'

// Left column: eyebrow, heading (middle part green), intro line, then the two pathway cards.
export function IntroHeader({ content }) {
  const [before, highlight, after] = content.title

  return (
    <Reveal from="left">
      <SectionEyebrow>{content.studyTitle}</SectionEyebrow>
      <h2 id="intro-title" className="mt-5 text-3xl leading-tight capitalize sm:text-4xl lg:text-5xl">
        {before}
        <span className="text-primary-hover">{highlight}</span>
        {after}
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">{content.subtitle}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-1 xl:grid-cols-2">
        {content.actions.map((action) => (
          <PathwayCard key={action.to} action={action} />
        ))}
      </div>
    </Reveal>
  )
}

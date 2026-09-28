import { Link } from '@tanstack/react-router'
import { rplFees, rplGuide, rplHero, rplOverview } from '@/features/student-info/data/rplContent'
import { rplProcess } from '@/features/student-info/data/rplSteps'
import { DocLayout } from '../common/DocLayout'
import { DocSection } from '../common/DocSection'
import { RplOverview } from './RplOverview'
import { RplStep } from './RplStep'

const SECTIONS = [rplOverview, rplGuide, rplFees, rplProcess]
const IDS = SECTIONS.map((s) => s.id)

export function RplPage() {
  const [before, linkText, after] = rplFees.text

  return (
    <DocLayout id="rpl-title" current="RPL" hero={rplHero} sections={SECTIONS} ids={IDS}>
      <RplOverview />
      <DocSection section={rplGuide} />
      <DocSection section={rplFees}>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          {before}
          <Link to="/student-info/fee-schedule" className="font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-hover">
            {linkText}
          </Link>
          {after}
        </p>
      </DocSection>
      <DocSection section={rplProcess}>
        <ol className="mt-8">
          {rplProcess.steps.map((step, i) => (
            <RplStep key={step.label} step={step} index={i} last={i === rplProcess.steps.length - 1} />
          ))}
        </ol>
      </DocSection>
    </DocLayout>
  )
}

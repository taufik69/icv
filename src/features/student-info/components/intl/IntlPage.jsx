import { costSection, intlHero, lifeSection, transportSection } from '@/features/student-info/data/intlContent'
import { linksSection, orientationSection } from '@/features/student-info/data/intlSupport'
import { ArrowUpRightIcon } from '@/shared/components/icons'
import { DocLayout } from '../common/DocLayout'
import { DocSection } from '../common/DocSection'
import { LinkCards } from '../common/LinkCards'
import { LifeSection } from './LifeSection'
import { OrientationSection } from './OrientationSection'

const SECTIONS = [lifeSection, transportSection, costSection, orientationSection, linksSection]
const IDS = SECTIONS.map((s) => s.id)
const btn = 'group btn-shine mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary'

export function IntlPage() {
  const { handbook } = costSection

  return (
    <DocLayout id="intl-title" current="International Student Information" hero={intlHero} sections={SECTIONS} ids={IDS} numbered={false}>
      <LifeSection />
      <DocSection section={transportSection}>
        {transportSection.paragraphs.map((t) => (
          <p key={t.slice(0, 24)} className="mt-4 leading-relaxed text-ink-muted">{t}</p>
        ))}
      </DocSection>
      <DocSection section={costSection}>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{costSection.text}</p>
        <a href={costSection.action.href} target="_blank" rel="noopener noreferrer" className={btn}>
          {costSection.action.label}
          <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <p className="mt-6 leading-relaxed text-ink-muted">
          {handbook.text[0]}
          <a href={handbook.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-hover">
            {handbook.text[1]}
          </a>
        </p>
      </DocSection>
      <OrientationSection />
      <DocSection section={linksSection}>
        <p className="mt-4 leading-relaxed text-ink-muted">{linksSection.intro}</p>
        <LinkCards links={linksSection.links} />
      </DocSection>
    </DocLayout>
  )
}

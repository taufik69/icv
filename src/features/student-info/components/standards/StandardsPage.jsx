import { standardsHero, standardsPart1, standardsTitle } from '@/features/student-info/data/standardsContent'
import { standardsPart2 } from '@/features/student-info/data/standardsContentMore'
import { DocLayout } from '../common/DocLayout'
import { DocSection } from '../common/DocSection'

const SECTIONS = [...standardsPart1, ...standardsPart2]
const IDS = SECTIONS.map((s) => s.id)

export function StandardsPage() {
  return (
    <DocLayout id="standards-title" current="Online Service Standards" hero={standardsHero} heading={standardsTitle} sections={SECTIONS} ids={IDS}>
      {SECTIONS.map((section, i) => (
        <DocSection key={section.id} section={section} number={i + 1} />
      ))}
    </DocLayout>
  )
}

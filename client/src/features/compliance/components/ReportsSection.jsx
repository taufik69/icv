import { reportsContent as content } from '@/features/compliance/data/complianceContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { ReportCard } from './ReportCard'

export function ReportsSection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby="reports-title" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
      <Container>
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="reports-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {content.reports.map((report, i) => (
            <li key={report.href}>
              <Reveal delay={i * 100} className="h-full">
                <ReportCard report={report} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

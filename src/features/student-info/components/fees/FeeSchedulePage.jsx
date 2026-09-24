import { feeContent as content } from '@/features/student-info/data/feeContent'
import { fileType } from '@/features/student-info/lib/fileType'
import { ArrowUpRightIcon, CoinsIcon } from '@/shared/components/icons'
import { PageHero } from '@/shared/components/layout'
import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'

// One focused card: the page's single sentence, who it covers, and one big action to open the fee sheet.
export function FeeSchedulePage() {
  const [ref, doodle] = useDoodleBackground()
  const { action } = content
  const [before, after] = content.text.split('here')

  return (
    <>
      <PageHero id="fees-title" current="Fee Schedule – 2026" {...content.hero} />
      <section ref={ref} aria-label="Fees and Charges for 2026" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
        <Container>
          <Reveal from="zoom" className="mx-auto max-w-3xl rounded-3xl bg-surface p-8 text-center shadow-elevated ring-1 ring-line-soft md:p-14">
            <span className="mx-auto grid size-20 place-items-center rounded-3xl bg-secondary text-primary shadow-brand">
              <CoinsIcon className="size-10" />
            </span>
            <p className="mt-8 text-xl leading-relaxed text-ink md:text-2xl">
              {before}
              <a href={action.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline decoration-primary decoration-4 underline-offset-4 hover:text-primary-hover">
                here
              </a>
              {after}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {content.audiences.map((a) => (
                <li key={a} className="rounded-pill bg-primary-soft px-4 py-1.5 font-heading text-sm font-semibold text-secondary">
                  {a}
                </li>
              ))}
            </ul>
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group btn-shine mt-10 inline-flex items-center gap-3 rounded-md bg-primary px-8 py-4 font-heading text-lg font-semibold text-on-primary shadow-card transition hover:bg-primary-hover hover:text-on-primary"
            >
              {action.label}
              <span className="rounded-md bg-secondary/10 px-2 py-0.5 font-condensed text-xs tracking-wider">{fileType(action.href)}</span>
              <ArrowUpRightIcon className="size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

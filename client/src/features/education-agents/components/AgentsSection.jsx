import { agentsList as content } from '@/features/education-agents/data/agentsContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { AgentCards } from './AgentCards'
import { AgentsTable } from './AgentsTable'

// Doodle section: heading + agent count, then a table (md+) or stacked cards (phones).
export function AgentsSection() {
  const [ref, doodle] = useDoodleBackground()
  const { agents } = content

  return (
    <section ref={ref} aria-labelledby="agents-title" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 id="agents-title" className="mt-5 text-3xl leading-tight md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-3 font-condensed text-sm tracking-[0.2em] text-primary-hover uppercase">{content.subtitle}</p>
          </div>
          <p className="rounded-2xl bg-secondary px-5 py-3 text-white shadow-brand">
            <span className="font-heading text-3xl font-extrabold text-primary">{agents.length}</span>
            <span className="ml-2 font-condensed text-xs tracking-[0.2em] text-white/70 uppercase">Agents listed</span>
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <AgentsTable columns={content.columns} agents={agents} caption={`${content.title} – ${content.subtitle}`} />
          <AgentCards agents={agents} />
        </Reveal>
      </Container>
    </section>
  )
}

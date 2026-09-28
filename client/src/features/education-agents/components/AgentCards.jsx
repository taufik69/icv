import { BriefcaseIcon } from '@/shared/components/icons'

// Phones only (< md): one card per agent, same data as AgentsTable.
export function AgentCards({ agents }) {
  return (
    <ul className="space-y-3 md:hidden">
      {agents.map((agent, i) => (
        <li key={agent.company} className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-card ring-1 ring-line-soft">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-primary">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <p className="font-heading text-lg font-bold text-secondary">
              {agent.givenName} {agent.lastName}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink-muted">
              <BriefcaseIcon className="size-4 shrink-0 text-primary-hover" />
              {agent.company}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

import { BriefcaseIcon } from '@/shared/components/icons'

// md+ only. Navy header row, zebra-free rows with a green hover rail.
export function AgentsTable({ columns, agents, caption }) {
  return (
    <div className="hidden overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line-soft md:block">
      <table className="w-full text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-secondary">
          <tr>
            {columns.map((col) => (
              <th key={col} scope="col" className="px-7 py-5 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase first:w-24">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line-soft">
          {agents.map((agent, i) => (
            <tr key={agent.company} className="group transition hover:bg-primary-soft/60">
              <td className="relative px-7 py-5">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-primary transition duration-300 group-hover:scale-y-100" />
                <span className="grid size-9 place-items-center rounded-full bg-surface-muted font-heading text-sm font-bold text-secondary">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </td>
              <td className="px-7 py-5 font-heading font-semibold text-secondary">{agent.givenName}</td>
              <td className="px-7 py-5 font-heading font-semibold text-secondary">{agent.lastName}</td>
              <td className="px-7 py-5">
                <span className="inline-flex items-center gap-3 text-ink">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-hover">
                    <BriefcaseIcon className="size-4" />
                  </span>
                  {agent.company}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { unitRows } from '../../lib/courseUnits'
import { ViewCard } from './ViewCard'

// All units in one table; core units are tagged green.
export function UnitsTable({ units }) {
  const rows = unitRows(units)
  if (!rows.length) return null
  const core = rows.filter((r) => r.type.startsWith('Core')).length

  return (
    <ViewCard id="units" title="Units" aside={`${rows.length} units, ${core} core`}>
      <div className="-mx-5 overflow-x-auto sm:-mx-7">
        <table className="w-full min-w-xl text-left text-sm">
          <thead className="border-y border-line bg-surface-alt text-ink-subtle">
            <tr>
              <th scope="col" className="px-5 py-2.5 font-semibold sm:px-7">Code</th>
              <th scope="col" className="px-3 py-2.5 font-semibold">Unit title</th>
              <th scope="col" className="px-5 py-2.5 font-semibold sm:px-7">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((u) => (
              <tr key={u.code}>
                <td className="px-5 py-3 font-heading font-semibold whitespace-nowrap text-secondary sm:px-7">{u.code}</td>
                <td className="px-3 py-3 text-ink">{u.title}</td>
                <td className="px-5 py-3 sm:px-7">
                  <span className={`rounded-pill px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${u.type.startsWith('Core') ? 'bg-primary-soft text-secondary' : 'bg-surface-sunken text-ink-muted'}`}>{u.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ViewCard>
  )
}

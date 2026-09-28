// Units published as a table (code / title / type / hours). Cards on phones, a table from md.
export function UnitTable({ table }) {
  const { title, columns, rows, total } = table

  return (
    <div>
      <h3 className="font-condensed text-lg font-bold tracking-[0.15em] text-primary-hover">{title}</h3>
      <ul className="mt-4 grid gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row[0]} className="rounded-2xl bg-surface p-4 ring-1 ring-line-soft">
            <p className="flex items-center justify-between gap-3">
              <span className="rounded-lg bg-secondary px-2.5 py-1 font-condensed text-sm font-bold text-primary">{row[0]}</span>
              <span className="rounded-pill bg-primary-soft px-3 py-0.5 text-xs font-semibold text-secondary">{row[2]}</span>
            </p>
            <p className="mt-3 font-medium text-ink">{row[1]}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {[3, 4].map((c) => (
                <div key={c} className="rounded-xl bg-surface-muted px-3 py-2">
                  <dt className="text-xs text-ink-subtle">{columns[c]}</dt>
                  <dd className="font-heading font-bold text-secondary">{row[c]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-2xl bg-surface-muted px-4 py-3 font-heading font-bold text-secondary md:hidden">{total.join(' · ')}</p>
      <div className="mt-4 hidden overflow-hidden rounded-3xl ring-1 ring-line-soft md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-white">
            <tr>{columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-heading font-semibold">{c}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-line-soft bg-surface">
            {rows.map((row) => (
              <tr key={row[0]} className="transition hover:bg-primary-soft/50">
                <td className="px-4 py-3 font-condensed font-bold text-secondary">{row[0]}</td>
                <td className="px-4 py-3 text-ink">{row[1]}</td>
                <td className="px-4 py-3"><span className="rounded-pill bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-secondary">{row[2]}</span></td>
                <td className="px-4 py-3 font-semibold text-secondary">{row[3]}</td>
                <td className="px-4 py-3 font-semibold text-secondary">{row[4]}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-surface-muted font-heading font-bold text-secondary">
            <tr><td colSpan={3} className="px-4 py-3">{total[0]}</td><td className="px-4 py-3">{total[1]}</td><td className="px-4 py-3">{total[2]}</td></tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

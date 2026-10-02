const skills = ['reading', 'writing', 'speaking', 'listening']
const title = (s) => `${s[0].toUpperCase()}${s.slice(1)}`
const score = 'w-full rounded-xl border bg-surface py-2.5 text-center text-xl font-semibold text-ink-strong tabular-nums transition placeholder:text-base placeholder:font-normal placeholder:text-ink-disabled focus:ring-4 focus:ring-secondary/10 focus:outline-none focus-visible:shadow-none'

// The four skill scores side by side, then Overall on its own navy-edged tile, so the result that
// matters most reads first.
export function ScorePanel({ name, row, onChange }) {
  const input = (field, extra = '') => (
    <input
      id={`apply-${name}-${field}`}
      inputMode="decimal"
      placeholder="0.0"
      value={row[field]}
      onChange={onChange(field)}
      className={`${score} ${extra}`}
    />
  )

  return (
    <fieldset className="grid gap-3 rounded-2xl bg-surface-alt p-3 ring-1 ring-line-soft sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:p-4">
      <legend className="sr-only">Scores</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {skills.map((s) => (
          <div key={s} className="grid gap-1.5">
            <label htmlFor={`apply-${name}-${s}`} className="truncate text-center text-xs font-medium text-ink-muted">{title(s)}</label>
            {input(s, 'border-line hover:border-line-strong focus:border-secondary')}
          </div>
        ))}
      </div>
      <div className="grid gap-1.5">
        <label htmlFor={`apply-${name}-overall`} className="text-center text-xs font-semibold text-secondary">Overall score</label>
        {input('overall', 'border-secondary/40 bg-surface text-secondary focus:border-secondary')}
      </div>
    </fieldset>
  )
}

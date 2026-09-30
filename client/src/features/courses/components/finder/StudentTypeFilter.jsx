// Segmented All / Domestic / International switch with how many courses each would show.
export function StudentTypeFilter({ content, finder }) {
  return (
    <fieldset className="pb-5">
      <legend className="mb-3 font-heading text-sm font-semibold text-secondary">{content.marketLabel}</legend>
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-white p-1 ring-1 ring-line">
        {content.markets.map(({ id, label }) => {
          const on = finder.filters.market === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => finder.set('market', id)}
              className={`flex cursor-pointer flex-col items-center rounded-lg px-1 py-2 text-sm font-medium transition ${
                on ? 'bg-secondary text-white' : 'text-secondary/85 hover:bg-surface-muted hover:text-secondary'
              }`}
            >
              {label}
              <span className={`text-xs tabular-nums ${on ? 'text-white/90' : 'text-secondary-muted'}`}>{finder.markets[id]}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

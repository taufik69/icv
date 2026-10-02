// Single choice as two or more option cards (radio dot, title, one-line note). options = [{ value, note }].
export function ChoiceCards({ name, label, options, value, onChange, error, required, className = '' }) {
  const errId = `apply-${name}-error`
  return (
    <fieldset className={className} aria-describedby={error ? errId : undefined}>
      <legend className="text-sm font-semibold text-secondary">
        {label}
        {required && <span aria-hidden="true" className="text-danger"> *</span>}
      </legend>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-surface p-4 ring-1 transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-2 has-checked:ring-secondary has-focus-visible:ring-2 has-focus-visible:ring-secondary ${error ? 'ring-danger' : 'ring-line'}`}
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={onChange} className="peer sr-only" />
            <span aria-hidden="true" className="mt-0.5 size-5 shrink-0 rounded-full ring-1 ring-line-strong ring-inset transition peer-checked:ring-6 peer-checked:ring-secondary" />
            <span>
              <span className="block font-semibold text-ink-strong">{o.value}</span>
              <span className="mt-0.5 block text-sm text-ink-muted">{o.note}</span>
            </span>
          </label>
        ))}
      </div>
      {error && <p id={errId} className="mt-2 text-sm text-danger-ink">{error}</p>}
    </fieldset>
  )
}

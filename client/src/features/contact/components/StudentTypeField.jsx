// Either/or choice as two big radio tiles (the live form uses checkboxes for the same question).
export function StudentTypeField({ label, options, value, error, onChange }) {
  return (
    <fieldset className="sm:col-span-2" aria-describedby={error ? 'studentType-error' : undefined}>
      <legend className="font-heading text-sm font-semibold text-secondary">
        {label}
        <span className="text-danger">*</span>
      </legend>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 font-medium ring-1 transition has-focus-visible:ring-2 has-focus-visible:ring-secondary/40 ${value === opt ? 'bg-secondary/6 text-secondary ring-secondary' : 'bg-surface-muted text-secondary ring-line-soft hover:ring-secondary/30'}`}
          >
            <input type="radio" name="studentType" value={opt} checked={value === opt} onChange={onChange} className="size-4 accent-secondary" />
            {opt}
          </label>
        ))}
      </div>
      {error && <p id="studentType-error" className="mt-1.5 text-sm text-danger">{error}</p>}
    </fieldset>
  )
}

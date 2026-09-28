import { studentTypes } from '../data/applyOptions'

// "Domestic or international?" as a two-way segmented choice (radio inputs underneath).
export function StudentTypeChoice({ value, error, onChange }) {
  return (
    <fieldset className="sm:col-span-2" aria-describedby={error ? 'apply-studentType-error' : undefined}>
      <legend className="font-heading text-sm font-semibold text-secondary">
        Are you a domestic or international student?<span aria-hidden="true" className="text-danger"> *</span>
      </legend>
      <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-xl bg-surface-muted p-1">
        {studentTypes.map((type) => (
          <label
            key={type}
            className="cursor-pointer rounded-lg px-4 py-2.5 text-center font-heading font-semibold text-ink-muted transition has-checked:bg-secondary has-checked:text-white has-focus-visible:shadow-focus-success hover:text-secondary has-checked:hover:text-white"
          >
            <input type="radio" name="studentType" value={type} checked={value === type} onChange={onChange} className="sr-only" />
            {type}
          </label>
        ))}
      </div>
      {error && <p id="apply-studentType-error" className="mt-1.5 text-sm text-danger-ink">{error}</p>}
    </fieldset>
  )
}

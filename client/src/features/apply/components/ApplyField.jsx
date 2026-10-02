// Labelled control with optional required marker and inline error (linked via aria-describedby).
const control = 'mt-1.5 w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-ink transition placeholder:text-ink-disabled focus:border-primary-hover focus:shadow-focus-success focus:outline-none aria-invalid:border-danger'

// `controlClass` swaps the input look (the enrolment form passes its own).
export function ApplyField({ name, label, error, required, as: Tag = 'input', controlClass = control, className = '', children, ...props }) {
  const errId = `apply-${name}-error`
  return (
    <div className={className}>
      <label htmlFor={`apply-${name}`} className="font-heading text-sm font-semibold text-secondary">
        {label}
        {required && <span aria-hidden="true" className="text-danger"> *</span>}
      </label>
      <Tag
        id={`apply-${name}`}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${controlClass} ${Tag === 'textarea' ? 'min-h-28 resize-y' : ''}`}
        {...props}
      >
        {children}
      </Tag>
      {error && <p id={errId} className="mt-1.5 text-sm text-danger-ink">{error}</p>}
    </div>
  )
}

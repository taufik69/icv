// Labelled control with required marker and inline error (linked via aria-describedby).
const control = 'mt-2 w-full rounded-xl bg-surface-muted px-4 py-3 text-ink ring-1 ring-line-soft transition placeholder:text-ink-subtle focus:bg-surface focus:ring-2 focus:ring-primary focus:outline-none aria-invalid:ring-2 aria-invalid:ring-danger'

export function Field({ name, label, error, as = 'input', className = '', children, ...props }) {
  const Tag = as
  const errId = `${name}-error`

  return (
    <div className={className}>
      <label htmlFor={name} className="font-heading text-sm font-semibold text-secondary">
        {label}
        <span className="text-danger">*</span>
      </label>
      <Tag
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${control} ${as === 'textarea' ? 'min-h-32 resize-y' : ''}`}
        {...props}
      >
        {children}
      </Tag>
      {error && <p id={errId} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  )
}

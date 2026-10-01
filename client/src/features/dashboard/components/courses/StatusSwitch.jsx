// Active / inactive switch. Only active courses show on the website. A draft reads "Draft" until switched on.
export function StatusSwitch({ status, onChange, label, disabled }) {
  const active = status === 'active'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={`${label}: ${status}`}
      disabled={disabled}
      onClick={() => onChange(active ? 'inactive' : 'active')}
      className="group flex items-center gap-2.5 rounded-pill py-1 pr-1 text-sm disabled:cursor-wait disabled:opacity-60"
    >
      <span className="relative h-6 w-11 shrink-0 rounded-pill bg-line-strong transition group-aria-checked:bg-primary-hover">
        <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-surface shadow-raised transition-transform group-aria-checked:translate-x-5" />
      </span>
      <span className="w-14 text-left font-semibold text-ink-subtle capitalize group-aria-checked:text-success-ink">{status}</span>
    </button>
  )
}

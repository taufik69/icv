// Active / inactive switch. Inactive courses are hidden from the website. Visual only: no save yet.
export function StatusSwitch({ active, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={`${label}: ${active ? 'active' : 'inactive'}`}
      onClick={() => onChange(!active)}
      className="group flex items-center gap-2.5 rounded-pill py-1 pr-1 text-sm"
    >
      <span className="relative h-6 w-11 shrink-0 rounded-pill bg-line-strong transition group-aria-checked:bg-primary-hover">
        <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-surface shadow-raised transition-transform group-aria-checked:translate-x-5" />
      </span>
      <span className="w-14 text-left font-semibold text-ink-subtle group-aria-checked:text-success-ink">
        {active ? 'Active' : 'Inactive'}
      </span>
    </button>
  )
}

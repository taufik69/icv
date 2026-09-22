export function CourseFilterTabs({ filters, active, onChange }) {
  return (
    <div role="group" aria-label="Filter courses" className="inline-flex rounded-full bg-surface p-1 shadow-card ring-1 ring-line-soft">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={active === filter.id}
          onClick={() => onChange(filter.id)}
          className={`rounded-full px-4 py-2 font-heading text-sm font-semibold transition sm:px-6 ${active === filter.id ? 'bg-secondary text-white shadow-brand' : 'text-ink-muted hover:text-secondary'}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

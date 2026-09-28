import { useActiveSection } from '@/shared/hooks/useActiveSection'

// "On this page" nav for long pages. lg: sticky vertical list with a scroll-spy highlight.
// Below lg: a horizontal row of chips. `sections` and `ids` must be module constants (stable for the hook).
export function SectionNav({ sections, ids, numbered = true }) {
  const active = useActiveSection(ids) ?? ids[0]

  return (
    <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-28">
      <ol className="-mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-3xl lg:bg-surface lg:p-3 lg:shadow-card lg:ring-1 lg:ring-line-soft">
        {sections.map((s, i) => {
          const on = active === s.id
          return (
            <li key={s.id} className="shrink-0 snap-start">
              <a
                href={`#${s.id}`}
                aria-current={on ? 'location' : undefined}
                className={`flex items-center gap-3 rounded-pill px-4 py-2 text-sm font-semibold ring-1 transition lg:rounded-2xl lg:py-2.5 lg:ring-0 ${on ? 'bg-secondary text-white ring-secondary' : 'bg-surface text-secondary ring-line-soft hover:bg-surface-muted'}`}
              >
                {numbered && (
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full font-heading text-xs ${on ? 'bg-primary text-on-primary' : 'bg-surface-muted text-ink-subtle'}`}>
                    {i + 1}
                  </span>
                )}
                <span className="whitespace-nowrap lg:whitespace-normal">{s.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

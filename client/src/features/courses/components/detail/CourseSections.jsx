import { useCourseTabs } from '../../hooks/useCourseTabs'

// Every course section on one page under a sticky pill bar. A tab smooth-scrolls to its section; the
// tab of the section you are reading is filled navy. tabs = [{ id, label, Icon, count?, title, content }].
export function CourseSections({ tabs }) {
  const { active, go, listRef, tabRef } = useCourseTabs(tabs.map((t) => t.id))

  return (
    <div>
      <nav aria-label="Course sections" className="sticky top-22 z-20 -mx-5 bg-surface-muted/85 px-5 py-3 backdrop-blur-md md:top-24 md:mx-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <ul ref={listRef} className="relative flex gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-card ring-1 ring-line [scrollbar-width:none]">
          {tabs.map(({ id, label, Icon, count }) => {
            const on = id === active
            return (
              <li key={id} className="shrink-0">
                <a
                  ref={tabRef(id)}
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={on ? 'true' : undefined}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition duration-300 ease-out active:scale-95 ${
                    on ? 'bg-secondary text-white shadow-brand hover:text-white' : 'text-ink-muted hover:bg-surface-muted hover:text-secondary'
                  }`}
                >
                  <Icon className={`size-4 transition ${on ? 'text-white' : 'text-ink-subtle group-hover:text-secondary'}`} />
                  {label}
                  {count != null && (
                    <span className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums transition ${on ? 'bg-white/15 text-white' : 'bg-surface-muted text-ink-subtle'}`}>{count}</span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {tabs.map(({ id, title, content }) => (
        <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-44 pt-12">
          <h2 id={`${id}-title`} className="text-2xl font-bold text-secondary md:text-3xl">{title}</h2>
          <div className="mt-5">{content}</div>
        </section>
      ))}
    </div>
  )
}

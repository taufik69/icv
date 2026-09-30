import { Reveal } from '@/shared/components/ui'
import { useCourseTabs } from '../../hooks/useCourseTabs'

// Every course section on one page under a sticky pill bar. A tab eases the page to its section; a navy
// pill slides to the tab of the section you are reading, and each section rises in when first seen. tabs = [{ id, label, Icon, count?, title, content }].
export function CourseSections({ tabs }) {
  const { active, go, listRef, tabRef } = useCourseTabs(tabs.map((t) => t.id))

  return (
    <div>
      <nav aria-label="Course sections" className="sticky top-22 z-20 -mx-5 bg-surface-muted/85 px-5 py-3 backdrop-blur-md md:top-24 md:mx-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <ul ref={listRef} className="relative flex gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-card ring-1 ring-line [scrollbar-width:none] [--tab-w:0px] [--tab-x:0px]">
          <li
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 bottom-1.5 left-0 w-(--tab-w) translate-x-(--tab-x) rounded-full bg-secondary shadow-brand transition-[translate,width] duration-500 ease-[cubic-bezier(0.3,0.9,0.3,1)] motion-reduce:transition-none"
          />
          {tabs.map(({ id, label, Icon, count }) => {
            const on = id === active
            return (
              <li key={id} className="relative shrink-0">
                <a
                  ref={tabRef(id)}
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={on ? 'true' : undefined}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-[color,background-color,scale] duration-300 ease-out active:scale-95 ${
                    on ? 'text-white hover:text-white' : 'text-ink-muted hover:bg-surface-muted hover:text-secondary'
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
          <Reveal>
            <h2 id={`${id}-title`} className="text-2xl font-bold text-secondary md:text-3xl">{title}</h2>
            <div className="mt-5">{content}</div>
          </Reveal>
        </section>
      ))}
    </div>
  )
}

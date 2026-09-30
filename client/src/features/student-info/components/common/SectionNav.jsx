import { useSectionNav } from '../../hooks/useSectionNav'

const slide = 'transition-[translate,width,height] duration-500 ease-[cubic-bezier(0.3,0.9,0.3,1)] motion-reduce:transition-none'

// "On this page" nav for long pages. lg: sticky vertical list; below lg: a horizontal row of chips. A navy
// pill slides to the section being read; a click eases the page there. `ids` must be a module constant.
export function SectionNav({ sections, ids, numbered = true }) {
  const { active, go, listRef, itemRef } = useSectionNav(ids)

  return (
    <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-28">
      <ol
        ref={listRef}
        className="relative -mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [--ind-h:0px] [--ind-w:0px] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-3xl lg:bg-surface lg:p-3 lg:shadow-card lg:ring-1 lg:ring-line-soft"
      >
        <li
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 h-(--ind-h) w-(--ind-w) translate-x-(--ind-x) translate-y-(--ind-y) rounded-pill bg-secondary shadow-brand lg:rounded-2xl ${slide}`}
        />
        {sections.map((s, i) => {
          const on = active === s.id
          return (
            <li key={s.id} className="relative shrink-0 snap-start">
              <a
                ref={itemRef(s.id)}
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={on ? 'location' : undefined}
                className={`flex items-center gap-3 rounded-pill px-4 py-2 text-sm font-semibold ring-1 transition-[color,background-color,box-shadow,scale] duration-300 active:scale-97 lg:rounded-2xl lg:py-2.5 lg:ring-0 ${
                  on ? 'text-white ring-transparent hover:text-white' : 'bg-surface text-secondary ring-line-soft hover:bg-surface-muted'
                }`}
              >
                {numbered && (
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full font-heading text-xs transition-colors duration-300 ${on ? 'bg-white/15 text-white' : 'bg-surface-muted text-secondary-muted'}`}>
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

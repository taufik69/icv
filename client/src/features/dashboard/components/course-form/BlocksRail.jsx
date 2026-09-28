import { CheckCircleIcon } from '@/shared/components/icons'

// The course page as a spine of blocks, top to bottom. Filled blocks are green and will show on the page;
// empty optional blocks stay hollow because the page skips them. With `linked`, each item jumps to its section.
export function BlocksRail({ blocks, caption = 'Green blocks appear on the course page.', linked = true }) {
  return (
    <nav aria-label="Page outline" className="sticky top-8 rounded-2xl bg-secondary p-5 text-white">
      <h2 className="font-heading text-base text-white">Page outline</h2>
      <p className="mt-1 text-xs text-white/60">{caption}</p>
      <ol className="relative mt-5 grid gap-1 before:absolute before:inset-y-3 before:left-[0.6875rem] before:w-px before:bg-white/15">
        {blocks.map(({ id, label, required, filled }) => (
          <li key={id}>
            <a href={linked ? `#${id}` : undefined} className="group relative flex items-center gap-3 rounded-lg py-1.5 pr-2 text-sm text-white/70 hover:text-white">
              {filled ? (
                <CheckCircleIcon className="size-6 shrink-0 rounded-full bg-secondary text-primary" />
              ) : (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary">
                  <span className="size-3 rounded-full border-2 border-white/35 group-hover:border-white/70" />
                </span>
              )}
              <span className={filled ? 'text-white' : ''}>{label}</span>
              {required && <span className="ml-auto text-xs text-white/40">Required</span>}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

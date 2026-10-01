import { CheckCircleIcon } from '@/shared/components/icons'

// The outline's steps on the navy spine: green check = filled, hollow ring = empty, highlighted = the section
// on screen now. With `linked`, each step jumps to its section (and calls `onPick`, e.g. to close a sheet).
export function OutlineList({ blocks, active, linked = true, onPick }) {
  return (
    <ol className="relative grid gap-1 before:absolute before:inset-y-3 before:left-[0.6875rem] before:w-px before:bg-white/15">
      {blocks.map(({ id, label, required, filled }) => {
        const current = id === active
        return (
          <li key={id}>
            <a
              href={linked ? `#${id}` : undefined}
              onClick={onPick}
              aria-current={current ? 'location' : undefined}
              className={`group relative -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition ${
                current ? 'bg-white/10 text-white' : 'text-white/85 hover:text-white'
              }`}
            >
              {filled ? (
                <CheckCircleIcon className={`size-6 shrink-0 rounded-full bg-secondary text-primary ${current ? 'ring-2 ring-primary/40' : ''}`} />
              ) : (
                <span className={`grid size-6 shrink-0 place-items-center rounded-full bg-secondary ${current ? 'ring-2 ring-white/30' : ''}`}>
                  <span className={`size-3 rounded-full border-2 ${current ? 'border-white' : 'border-white/35 group-hover:border-white/70'}`} />
                </span>
              )}
              <span className={filled || current ? 'font-semibold text-white' : ''}>{label}</span>
              {required && <span className="ml-auto text-xs text-white/80">Required</span>}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

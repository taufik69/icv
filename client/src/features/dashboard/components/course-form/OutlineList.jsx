import { Fragment } from 'react'
import { CheckCircleIcon } from '@/shared/components/icons'

// The outline's steps on the navy spine: green check = filled, numbered ring = empty part (dot = imported block), highlighted = the section
// on screen now. With `linked`, each step jumps to its section (and calls `onPick`, e.g. to close a sheet).
export function OutlineList({ blocks, active, linked = true, onPick }) {
  return (
    <ol className="relative grid gap-1 before:absolute before:inset-y-3 before:left-[0.6875rem] before:w-px before:bg-white/15">
      {blocks.map(({ id, step, label, required, filled }, i) => {
        const current = id === active
        const firstImported = !step && blocks[i - 1]?.step
        return (
          <Fragment key={id}>
            {firstImported && (
              <li role="presentation" className="relative mt-3 mb-1 bg-secondary py-1 pl-9 text-xs font-semibold text-white/70">Also on this page</li>
            )}
            <li>
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
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full border bg-secondary font-heading text-[0.6875rem] font-bold ${current ? 'border-white text-white' : 'border-white/35 text-white/70 group-hover:border-white/70'}`}>
                    {step ?? <span className="size-1.5 rounded-full bg-current" />}
                  </span>
                )}
                <span className={filled || current ? 'font-semibold text-white' : ''}>{label}</span>
                {required && <span className="ml-auto text-xs text-white/80">Required</span>}
              </a>
            </li>
          </Fragment>
        )
      })}
    </ol>
  )
}

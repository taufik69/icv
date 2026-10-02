import { useEffect, useRef } from 'react'
import { LockIcon } from '@/shared/components/icons'
import { ProgressSegments } from './ProgressSegments'

// Below lg: a card with the saved count over the progress bar, then a scrolling row of step chips
// (letters + title) that keeps the current step in view; a chip opens its step once the one before is saved.
export function EnrolmentStepBar({ form }) {
  const { steps, step, saved, canOpen, goTo } = form
  const rowRef = useRef(null)
  const moved = useRef(false)
  useEffect(() => {
    const row = rowRef.current
    const chip = row?.querySelector('[aria-current="step"]')
    if (!chip) return
    // Jump on first render, glide on later step changes.
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: moved.current ? 'smooth' : 'instant' })
    moved.current = true
  }, [step])

  return (
    <nav aria-label="Application steps" className="rounded-3xl bg-surface p-4 shadow-card ring-1 ring-line-soft lg:hidden">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="font-heading font-bold text-secondary">Your application</p>
        <p className="text-ink-subtle">{saved.length} of {steps.length} steps saved</p>
      </div>
      <ProgressSegments steps={steps} step={step} saved={saved} className="mt-3" />
      <ol ref={rowRef} className="relative -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {steps.map((s, i) => (
          <li key={s.id} className="shrink-0">
            <button
              type="button"
              onClick={() => goTo(i)}
              disabled={!canOpen(i)}
              aria-current={i === step ? 'step' : undefined}
              aria-label={`${s.title}${saved.includes(s.id) ? ', saved' : ''}`}
              className={`flex items-center gap-2 rounded-pill px-3 py-1.5 font-heading text-sm font-semibold ring-1 transition disabled:cursor-not-allowed disabled:text-ink-disabled ${i === step ? 'bg-secondary text-white ring-secondary' : 'text-secondary ring-line'}`}
            >
              <span className="text-xs font-bold tracking-wide opacity-70">{s.sections.replaceAll(', ', ' ')}</span>
              {s.title}
              {!canOpen(i) && <LockIcon className="size-3.5" />}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

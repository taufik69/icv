import { CheckIcon, DownloadIcon, LockIcon } from '@/shared/components/icons'
import { paperForm } from '../../data/enrolment/enrolmentForm'
import { ProgressSegments } from './ProgressSegments'
import { SavedNote } from './SavedNote'

// lg+ navy application panel: progress, then every step with its paper form letters. A step opens once
// the step before it is saved; later steps show a lock. Ends with the draft status and the PDF.
export function EnrolmentStepRail({ form }) {
  const { steps, step, saved, canOpen, goTo, savedAt } = form
  return (
    <nav aria-label="Application steps" className="hidden overflow-hidden rounded-3xl bg-secondary text-white shadow-card lg:block">
      <div className="px-5 pt-5 pb-4">
        <p className="font-heading text-lg font-bold">Your application</p>
        <p className="mt-0.5 text-sm text-white/70">{saved.length} of {steps.length} steps saved</p>
        <ProgressSegments steps={steps} step={step} saved={saved} tone="dark" className="mt-3" />
      </div>
      <ol className="grid gap-0.5 px-2 pb-2">
        {steps.map((s, i) => {
          const current = i === step
          const done = saved.includes(s.id)
          const open = canOpen(i)
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={!open}
                aria-current={current ? 'step' : undefined}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition disabled:cursor-not-allowed ${current ? 'bg-white text-secondary' : 'text-white enabled:hover:bg-white/10 disabled:text-white/45'}`}
              >
                <span className={`grid h-8 min-w-11 shrink-0 place-items-center rounded-lg px-1.5 font-heading text-xs font-bold tracking-wide ${current ? 'bg-secondary text-white' : 'ring-1 ring-white/20'}`}>
                  {s.sections.replaceAll(', ', ' ')}
                </span>
                <span className="min-w-0 flex-1 font-heading leading-tight font-semibold">{s.title}</span>
                {done && <CheckIcon aria-label="Saved" className={`size-4.5 shrink-0 ${current ? 'text-secondary' : 'text-primary'}`} />}
                {!open && <LockIcon aria-label="Locked" className="size-4 shrink-0" />}
              </button>
            </li>
          )
        })}
      </ol>
      <div className="grid gap-3 border-t border-white/10 px-5 py-4 text-sm text-white/70">
        <SavedNote savedAt={savedAt} />
        <a href={paperForm.href} download className="inline-flex items-center gap-2 font-heading font-semibold text-white hover:text-white/80">
          <DownloadIcon className="size-4" /> {paperForm.label}
        </a>
      </div>
    </nav>
  )
}

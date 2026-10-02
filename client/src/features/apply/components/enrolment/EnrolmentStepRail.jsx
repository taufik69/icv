import { CheckIcon, DownloadIcon } from '@/shared/components/icons'
import { paperForm } from '../../data/enrolment/enrolmentForm'
import { SavedNote } from './SavedNote'

// lg+ tab list down the side. The tag shows the matching section letters of the paper form.
// A tab opens once the tab before it is saved; later tabs stay locked.
export function EnrolmentStepRail({ form }) {
  const { steps, step, saved, canOpen, goTo, savedAt } = form
  return (
    <nav aria-label="Application steps" className="hidden lg:block">
      <ol className="grid gap-1">
        {steps.map((s, i) => {
          const current = i === step
          const done = saved.includes(s.id)
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={!canOpen(i)}
                aria-current={current ? 'step' : undefined}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition disabled:cursor-not-allowed ${current ? 'bg-secondary text-white shadow-card' : 'text-secondary hover:bg-surface enabled:hover:shadow-card disabled:text-ink-disabled'}`}
              >
                <span className={`grid h-8 min-w-11 shrink-0 place-items-center rounded-lg px-1.5 font-heading text-xs font-bold ${current ? 'bg-white/15' : 'bg-surface ring-1 ring-line'}`}>
                  {s.sections}
                </span>
                <span className="min-w-0 flex-1 font-heading leading-tight font-semibold">{s.title}</span>
                {done && <CheckIcon aria-label="Saved" className={`size-4.5 shrink-0 ${current ? 'text-white' : 'text-secondary-muted'}`} />}
              </button>
            </li>
          )
        })}
      </ol>
      <div className="mt-6 grid gap-3 border-t border-line pt-5 text-sm text-ink-subtle">
        <SavedNote savedAt={savedAt} />
        <a href={paperForm.href} download className="inline-flex items-center gap-2 font-heading font-semibold text-secondary hover:text-secondary-muted">
          <DownloadIcon className="size-4" /> {paperForm.label}
        </a>
      </div>
    </nav>
  )
}

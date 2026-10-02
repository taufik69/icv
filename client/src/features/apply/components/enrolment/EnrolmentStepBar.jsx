// Below lg: "Step 3 of 8" with a segmented bar (one segment per tab, 8 tabs); each segment is a button to an open tab.
export function EnrolmentStepBar({ form }) {
  const { steps, step, current, saved, canOpen, goTo } = form
  return (
    <nav aria-label="Application steps" className="lg:hidden">
      <p className="text-sm text-ink-subtle">
        Step {step + 1} of {steps.length}
        <span className="ml-2 rounded-md bg-surface px-1.5 py-0.5 font-heading text-xs font-bold text-secondary ring-1 ring-line">{current.sections}</span>
      </p>
      <ol className="mt-3 grid grid-cols-8 gap-1.5">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => goTo(i)}
              disabled={!canOpen(i)}
              aria-label={`${s.title}${saved.includes(s.id) ? ', saved' : ''}`}
              aria-current={i === step ? 'step' : undefined}
              className="block w-full py-2 disabled:cursor-not-allowed"
            >
              <span className={`block h-1.5 rounded-pill transition ${i === step ? 'bg-secondary' : saved.includes(s.id) ? 'bg-secondary-muted/60' : 'bg-line'}`} />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

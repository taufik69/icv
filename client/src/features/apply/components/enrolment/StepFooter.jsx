import { ArrowRightIcon } from '@/shared/components/icons'

const errorCountOf = (errors) => Object.keys(errors).length

// Bottom of the open step: what still needs fixing (or why sending failed), then Back | "Next: …" |
// Save and continue (Submit application, in green, on the last step; "Sending…" while it posts).
export function StepFooter({ form }) {
  const { step, steps, isLast, back, errors, sending, sendError } = form
  const failed = isLast && sendError && !errorCountOf(errors)
  const errorCount = errorCountOf(errors)
  const next = steps[step + 1]

  return (
    <footer className="grid gap-4 border-t border-line-soft pt-6">
      {errorCount > 0 && (
        <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">
          {errorCount === 1 ? '1 field needs' : `${errorCount} fields need`} attention before this step can be saved.
        </p>
      )}
      {failed && (
        <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">
          {sendError.status ? `Your application could not be sent: ${sendError.message}` : 'Your application could not be sent. Check your connection and try again.'} Your answers are still saved on this device.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={back} className="inline-flex min-h-12 items-center gap-2 rounded-pill px-5 font-heading font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary">
            <ArrowRightIcon className="size-4 rotate-180" /> Back
          </button>
        )}
        {next && <span className="hidden text-sm text-ink-subtle sm:ml-auto sm:inline">Next: {next.title}</span>}
        <button
          type="submit"
          disabled={sending}
          className={`btn-shine disabled:cursor-wait disabled:opacity-70 inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-pill px-8 font-heading font-semibold transition sm:flex-none ${isLast ? 'bg-primary text-on-primary hover:bg-primary-hover sm:ml-auto' : 'bg-secondary text-white hover:bg-secondary-dark'}`}
        >
          {sending ? 'Sending…' : isLast ? 'Submit application' : 'Save and continue'}
          {!isLast && <ArrowRightIcon className="size-4" />}
        </button>
      </div>
    </footer>
  )
}

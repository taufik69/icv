import { useEffect, useRef } from 'react'
import { ArrowRightIcon, CloseIcon } from '@/shared/components/icons'
import { AboutStep } from './AboutStep'
import { ContactStep } from './ContactStep'
import { CourseStep } from './CourseStep'
import { ExtraStep } from './ExtraStep'
import { StudentTypeStep } from './StudentTypeStep'

const panels = { type: StudentTypeStep, course: CourseStep, contact: ContactStep, about: AboutStep, extra: ExtraStep }

// The enquiry form as one card, a step at a time: header (title, "Step 2 of 5 — Course interest",
// progress bar), the step's question, and Back | Continue (Send enquiry on the last step).
// `onClose` (popup only) adds the × button to the header.
export function EnquiryWizard({ form, onClose }) {
  const { steps, step, current, last, next, back, sending, sendError } = form
  const Panel = panels[current.id]
  const progress = ((step + 1) / steps.length) * 100
  const ref = useRef(null)
  const first = useRef(true)
  // A new step starts at the top of the card (only when that top has scrolled out of view).
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (ref.current?.getBoundingClientRect().top < 96) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  return (
    <form ref={ref} noValidate onSubmit={next} aria-labelledby="enq-heading" className="scroll-mt-28 overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line-soft">
      <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 md:px-8">
        <div>
          <p className="font-heading text-lg font-bold text-secondary">Enquire to ICV</p>
          <p className="text-sm text-ink-subtle">Step {step + 1} of {steps.length} — {current.title}</p>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close enquiry form" className="-mr-2 grid size-10 shrink-0 place-items-center rounded-full text-ink-subtle transition hover:bg-surface-muted hover:text-secondary">
            <CloseIcon className="size-5" />
          </button>
        )}
      </header>
      <div role="progressbar" aria-label="Enquiry progress" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} className="h-1 bg-line-soft">
        <div className="h-full bg-secondary transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div key={current.id} className="grid gap-6 px-6 py-7 md:px-8 motion-safe:animate-[fade-in_250ms_ease-out] [&_p]:text-left">
        <div>
          <h2 id="enq-heading" className="text-2xl leading-snug md:text-3xl">{current.heading}</h2>
          <p className="mt-1.5 text-ink-muted">{current.lead}</p>
        </div>
        <Panel form={form} />
      </div>

      <footer className="grid gap-3 border-t border-line-soft px-6 py-5 md:px-8">
        {last && sendError && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">
            {sendError.status ? `We couldn't send your enquiry: ${sendError.message}.` : "We couldn't reach our server. Check your connection and try again."}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="inline-flex items-center gap-2 rounded-pill px-3 py-2 font-heading font-semibold text-ink-muted transition hover:text-secondary">
              <ArrowRightIcon className="size-4 rotate-180" /> Back
            </button>
          ) : <span />}
          <button type="submit" disabled={sending}
            className={`btn-shine inline-flex min-h-12 items-center gap-2 rounded-pill px-7 font-heading font-semibold transition disabled:cursor-wait disabled:opacity-70 ${last ? 'bg-primary text-on-primary hover:bg-primary-hover' : 'bg-secondary text-white hover:bg-secondary-dark'}`}>
            {sending ? 'Sending…' : last ? 'Send enquiry' : 'Continue'}
            {!sending && <ArrowRightIcon className="size-4" />}
          </button>
        </div>
      </footer>
    </form>
  )
}

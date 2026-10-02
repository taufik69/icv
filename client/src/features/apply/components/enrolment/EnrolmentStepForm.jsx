import { ArrowRightIcon } from '@/shared/components/icons'
import { AgentStep } from './steps/AgentStep'
import { ContactStep } from './steps/ContactStep'
import { CourseStep } from './steps/CourseStep'
import { DeclarationStep } from './steps/DeclarationStep'
import { EducationStep } from './steps/EducationStep'
import { HealthStep } from './steps/HealthStep'
import { PersonalStep } from './steps/PersonalStep'
import { VisaStep } from './steps/VisaStep'

const panels = {
  course: CourseStep, personal: PersonalStep, contact: ContactStep, health: HealthStep,
  education: EducationStep, visa: VisaStep, agent: AgentStep, declaration: DeclarationStep,
}

// The open tab: heading, its fields, then Back | Save and continue (Submit application on the last tab).
export function EnrolmentStepForm({ form }) {
  const { current, step, steps, isLast, save, back, errors } = form
  const Panel = panels[current.id]
  const errorCount = Object.keys(errors).length
  const next = steps[step + 1]

  return (
    <form key={current.id} noValidate onSubmit={save} aria-labelledby="enrol-step-title" className="grid gap-6 motion-safe:animate-[fade-in_250ms_ease-out]">
      <header>
        <h2 id="enrol-step-title" className="text-3xl">{current.title}</h2>
        <p className="mt-1.5 text-ink-muted">{current.lead}</p>
      </header>

      <Panel form={form} />

      <footer className="grid gap-4 border-t border-line-soft pt-6">
        {errorCount > 0 && (
          <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">
            {errorCount === 1 ? '1 field needs' : `${errorCount} fields need`} attention before this step can be saved.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {step > 0 && (
            <button type="button" onClick={back} className="rounded-pill px-6 py-3 font-heading font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary">
              Back
            </button>
          )}
          {next && <span className="hidden text-sm text-ink-subtle sm:ml-auto sm:inline">Next: {next.title}</span>}
          <button
            type="submit"
            className={`btn-shine inline-flex flex-1 items-center justify-center gap-2 rounded-pill px-8 py-3 font-heading font-semibold transition sm:flex-none ${isLast ? 'bg-primary text-on-primary hover:bg-primary-hover sm:ml-auto' : 'bg-secondary text-white hover:bg-secondary-dark'}`}
          >
            {isLast ? 'Submit application' : 'Save and continue'}
            {!isLast && <ArrowRightIcon className="size-4" />}
          </button>
        </div>
      </footer>
    </form>
  )
}

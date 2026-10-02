import { AgentStep } from './steps/AgentStep'
import { ContactStep } from './steps/ContactStep'
import { CourseStep } from './steps/CourseStep'
import { DeclarationStep } from './steps/DeclarationStep'
import { EducationStep } from './steps/EducationStep'
import { HealthStep } from './steps/HealthStep'
import { PersonalStep } from './steps/PersonalStep'
import { VisaStep } from './steps/VisaStep'
import { StepFooter } from './StepFooter'
import { StepHeader } from './StepHeader'

const panels = {
  course: CourseStep, personal: PersonalStep, contact: ContactStep, health: HealthStep,
  education: EducationStep, visa: VisaStep, agent: AgentStep, declaration: DeclarationStep,
}

// The open step: header (paper form letters, title), its parts, then the footer buttons.
export function EnrolmentStepForm({ form }) {
  const { current, step, steps, save } = form
  const Panel = panels[current.id]

  return (
    <form key={current.id} noValidate onSubmit={save} aria-labelledby="enrol-step-title" className="grid gap-8 motion-safe:animate-[fade-in_250ms_ease-out]">
      <StepHeader step={step} total={steps.length} current={current} />
      <div className="grid gap-8">
        <Panel form={form} />
      </div>
      <StepFooter form={form} />
    </form>
  )
}

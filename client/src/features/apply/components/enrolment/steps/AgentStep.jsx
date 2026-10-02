import { heardOptions } from '../../../data/enrolment/enrolmentOptions'
import { AgentStamp } from '../fields/AgentStamp'
import { ChoiceGroup } from '../fields/ChoiceGroup'
import { Field } from '../fields/Field'
import { Section } from '../fields/Section'

// (J) Agent / Marketing and (K) Agent Details, ending with the Agent's Stamp box. Agent fields are required only when "Agent" is picked.
export function AgentStep({ form }) {
  const { values, field } = form
  const viaAgent = values.heard === 'Agent'
  return (
    <>
      <Section id="marketing" title="Agent / marketing">
        <ChoiceGroup {...field('heard')} label="How did you hear about International College of Victoria?" options={heardOptions} required className="sm:col-span-2" />
        {values.heard === 'Other' && <Field {...field('heardOther')} label="Other" placeholder="Tell us where you heard about ICV" className="sm:col-span-2" />}
      </Section>
      <Section id="agent-details" title="Agent details" note={viaAgent ? undefined : 'If applying through an agent'}>
        <Field {...field('agentCompany')} label="Company name" placeholder="e.g. Global Education Services" required={viaAgent} />
        <Field {...field('agentName')} label="Agent's name" placeholder="e.g. Rahul Mehta" required={viaAgent} />
        <Field {...field('agentEmail')} label="Email address" placeholder="agent@example.com" type="email" />
        <Field {...field('agentPhone')} label="Contact number" placeholder="e.g. +61 400 123 456" type="tel" />
        <AgentStamp {...field('agentStamp')} className="sm:col-span-2" />
      </Section>
    </>
  )
}

import { heardOptions } from '../../../data/enrolment/enrolmentOptions'
import { ApplyField } from '../../ApplyField'
import { FormGroup } from '../../FormGroup'
import { AgentStamp } from '../fields/AgentStamp'
import { ChoiceGroup } from '../fields/ChoiceGroup'

// (J) Agent / Marketing and (K) Agent Details, ending with the Agent's Stamp box. Agent fields are required only when "Agent" is picked.
export function AgentStep({ form }) {
  const { values, field } = form
  const viaAgent = values.heard === 'Agent'
  return (
    <>
      <FormGroup title="Agent / marketing">
        <ChoiceGroup {...field('heard')} label="How did you hear about International College of Victoria?" options={heardOptions} required className="sm:col-span-2" />
        {values.heard === 'Other' && <ApplyField {...field('heardOther')} label="Other" placeholder="Tell us where you heard about ICV" className="sm:col-span-2" />}
      </FormGroup>
      <FormGroup title="Agent details" note={viaAgent ? undefined : 'If applying through an agent'}>
        <ApplyField {...field('agentCompany')} label="Company name" placeholder="e.g. Global Education Services" required={viaAgent} />
        <ApplyField {...field('agentName')} label="Agent's name" placeholder="e.g. Rahul Mehta" required={viaAgent} />
        <ApplyField {...field('agentEmail')} label="Email address" placeholder="agent@example.com" type="email" />
        <ApplyField {...field('agentPhone')} label="Contact number" placeholder="e.g. +61 400 123 456" type="tel" />
        <AgentStamp className="sm:col-span-2" />
      </FormGroup>
    </>
  )
}

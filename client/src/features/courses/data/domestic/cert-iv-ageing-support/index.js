import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { units } from './units'

// Copy from icv.edu.au/certificate-iv-in-ageing-support/, verbatim.
export default {
  code: 'CHC43015',
  title: 'Certificate IV in Ageing Support',
  category: 'Community Services',
  images: { hero: images.careBanner, overview: images.ececTeacher, career: images.teacherDrawing, units: images.studying, rpl: images.student, cta: images.community },
  overview: {
    paragraphs: [
      'This qualification reflects the role of support workers who complete specialised tasks and functions in aged services; either in residential, home or community based environments. Workers will take responsibility for their own outputs within defined organisation guidelines and maintain quality service delivery through the development, facilitation and review of individualised service planning and delivery.',
      'Workers may be required to demonstrate leadership and have limited responsibility for the organisation and the quantity and quality of outputs of others within limited parameters.',
      'To achieve this qualification, the candidate must have completed at least 120 hours of work as detailed in the Assessment Requirements of the units of competency.',
    ],
  },
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'ENQUIRE NOW', href: links.enquire }],
  glance: [
    ['Duration', '52 Weeks'],
    ['Delivery Mode', 'Blended (Face-to-Face & Virtual Classroom)'],
    ['Work Placement Requirement', '120 Hrs'],
    ['Application Fee', '$500'],
    ['Tuition Fee', '$4,000'],
  ],
  details: [
    {
      title: 'ENTRY REQUIREMENTS',
      parts: [
        'Whilst there are no entry requirements stipulated in the training package (CHC), ICV requires its participants to meet the following criteria:',
        { list: ['Australian Year 11 or equivalent OR', 'Mature age (at least 20 years of age)', 'Meet the Language Literacy and Numeracy requirements; ICV conducts LLN entry test and a pre-training review at the time of enrolment'] },
      ],
    },
  ],
  units,
  placement: {
    title: 'Work Placement',
    lead: 'Students are required to complete a total of 120 hours of Workplacement.',
    paragraphs: sharedCopy.placement,
    note: 'Additonal Note – students MUST obtain a Police Check before commencing the workplacement.',
  },
  rpl: { title: 'RECOGNITION OF PRIOR LEARNING (RPL)', sections: [{ parts: [sharedCopy.rplShort, 'For more info please contact ICV Team'] }] },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'The following employment pathways are available to the students who complete Certificate IV in Ageing Support successfully:',
      { chips: ['Personal Care Worker', 'Aged Care Activity Worker', 'Care Service Team Leader', 'Care Supervisor (Aged Care)'] },
      { heading: 'Exit Points' },
      { list: ['At any point prior to the completion of the program, a participant may request a Statement of Attainment for an individual unit or units where he/she has been assessed competent'] },
      'At the successful completion of the program – a qualification of CHC43015 Certificate IV in Ageing Support will be issued.',
    ],
  },
  cta: {
    title: 'Enrol Now!!',
    headline: 'Flexible payment plans available',
    lines: ['We offer flexible weekly and monthly payment options for the tuition fee.'],
    actions: [{ label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire }],
  },
}

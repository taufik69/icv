import { images } from '../../images'
import { intlCopy as c } from '../shared'
import { otherRequirements } from './other'
import { units } from './units'

const roles = ['Operational Manager', 'Learning and development consultant', 'Learning and leadership manager.', 'Staff development manager in the training and development department.', 'RTO/ Training manager', 'Workforce Planner', 'Educational Professional working within an RTO']

// Copy from icv.edu.au/diploma-in-management-learning/, verbatim.
export default {
  code: 'BSB80120',
  title: 'Graduate Diploma in Management (Learning)',
  category: 'Management',
  images: { hero: images.collegeStudents, overview: images.student, career: images.teacherDrawing, units: images.graduation, cta: images.community },
  overview: {
    paragraphs: [
      'This qualification reflects the role of individuals who apply highly specialised knowledge and skills in the field of organisational learning and capability development. Individuals in these roles generate and evaluate complex ideas. They also initiate, design and execute major learning and development functions within an organisation. Typically, they would have full responsibility and accountability for the personal output and work of others.',
      'This qualification may apply to leaders and managers in an organisation where learning is used to build organisational capability.',
      { heading: 'Licensing/Regulatory Information' },
      'No licensing, legislative or certification requirements apply to this qualification at the time of publication.',
    ],
  },
  actions: c.actions,
  glance: [
    ['Tuition Fees', '$ 12,000'],
    ['Application fees', '$ 500'],
    ['Material fees', '0'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '52 Weeks'],
    ['Study Mode', 'Full Time in our Melbourne CBD campus.'],
    ['Delivery Mode', 'Face to Face'],
  ],
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: ['Occupational titles depending on packaging options selected may include :', { chips: roles }, { heading: 'EDUCATION PATHWAY' }, 'Bachelors of Business (Administration)'],
  },
  details: [
    {
      title: 'Entry Requirments',
      parts: [
        c.entryIntro('BSB'),
        ...c.minAge(25),
        ...c.englishIntro,
        { list: [...c.ielts, 'PTE score of 50', 'Tertiary studies in medium of English'] },
        ...c.academic('Year 12'),
      ],
    },
    c.additional(),
  ],
  units,
  extras: otherRequirements,
  employment: {
    title: 'Employment Pathways',
    parts: ['After successfully completing the Graduate Diploma of Management (Learning) Employment pathways may include', { chips: roles }],
  },
  cta: c.cta('Brochure-BSB80120-V3.1.2025-March-2025.pdf'),
}

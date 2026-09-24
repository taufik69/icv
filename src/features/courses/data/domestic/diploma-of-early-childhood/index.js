import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { units } from './units'

const TGA = 'https://training.gov.au/training/details'

// Copy from icv.edu.au/diploma-of-early-childhood-education-and-care-2/, verbatim.
export default {
  code: 'CHC50125',
  title: 'Diploma of Early Childhood Education and Care',
  category: 'Early Childhood',
  images: { hero: images.ececTeacher, overview: images.teacherDrawing, career: images.careBanner, units: images.ecec, rpl: images.student, cta: images.teacherDrawing },
  overview: {
    paragraphs: [
      'This qualification reflects the role of educators in early childhood education and care who work in regulated children’s education and care services in Australia. Educators at this level are responsible for designing and implementing curriculum that meets the requirements of an approved learning framework and for maintaining compliance in other areas of service operations. They use specialised knowledge and analyse and apply theoretical concepts to diverse work situations. They may have responsibility for supervision of volunteers or other educators.',
      'Early childhood educators work in long day care centres, family day care, pre-schools or kindergartens.',
    ],
  },
  actions: [
    { label: 'Enrol Now', href: 'https://forms.office.com/Pages/ResponsePage.aspx?id=CTIBEzJH2Em-MC5KLiLDnAs55-L5_y1IphwD4sdJIVFUQVI2OE1WTldIR1VGQ082VkdURlYwWFRVMC4u' },
    { label: 'ENQUIRE NOW', href: links.enquire },
  ],
  glance: [
    ['Start Date', 'Monthly Intake'],
    ['Duration', '9-12 months'],
    ['Delivery Mode', 'Blended (Online and placement)'],
    ['Work Placement Requirement', '280 Hrs'],
    ['Application Fee', '$500'],
    ['FFS ( Fee for Service) Students', '$4,000'],
    ['Payment Options', 'Weekly and Monthly payment plans available'],
  ],
  details: [
    {
      title: 'ENTRY REQUIREMENTS',
      parts: [
        'Entry to this qualification is open to individuals who hold one of the following:',
        { list: [
          { text: 'CHC30121 Certificate III in Early Childhood Education and Care', href: `${TGA}/CHC30121`, after: ' (or its equivalent successor)' },
          { text: 'CHC30113 Certificate III in Early Childhood Education and Care', href: `${TGA}/CHC30113` },
          'An Australian Diploma of Early Childhood Education and Care',
          'An Australian Diploma or Certificate III in Children’s Services',
        ] },
        { sep: 'AND' },
        { list: ['Demonstrate at least 12 months of cumulative employment (full-time equivalent) within the last 5 years in a regulated education and care service in Australia, supported by verifiable evidence.'] },
        { sep: 'OR' },
        { list: [{ before: 'Hold the ', text: 'CHCSS00147 Entry into Diploma of Early Childhood Education and Care', href: `${TGA}/CHCSS00147`, after: '.' }] },
      ],
    },
    {
      title: 'Pathways from the Qualification',
      parts: ['Students who successfully complete this qualification may pathway into further study options:', { list: ['Bachelor of Early Childhood Education or equivalent'] }],
    },
    {
      title: 'In addition, ICV requires its applicants to meet the following criteria:',
      parts: [{ list: ['Applicants must be 18 years of age or above', 'Meet the Language Literacy and Numeracy requirements; ICV conducts LLN entry test and a pre-training review during the enrolment process.'] }],
    },
  ],
  placement: {
    title: 'WORK PLACEMENT',
    paragraphs: [...sharedCopy.placement, 'The students will need to complete 280 Hours of Work Placement'],
    listTitle: 'Additional Requirements before starting work placement:',
    list: ['Working with children check', 'National Police record check (if required by the Childcare Centre / Host Organisation)'],
  },
  units,
  rpl: { title: 'RECOGNITION OF PRIOR LEARNING (RPL)', sections: [{ parts: [sharedCopy.rplShort] }] },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'The following employment pathways are available to the students who complete Diploma of Early Childhood Education and Care successfully:',
      { chips: ['Family Day Care Educator/Coordinator', 'Centre-based Early Childhood Educator', 'Child Development Worker', 'Outside School Hours Educator', 'Playgroup Supervisor', 'Service Director/Centre Director'] },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    headline: 'Enrol today!!',
    lines: ['LIMITED SPOTS AVAILABLE WITH FLEXIBLE PAYMENT PLANS!!'],
    actions: [{ label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire }, { label: 'Enquire Now', href: links.enquire }],
  },
}

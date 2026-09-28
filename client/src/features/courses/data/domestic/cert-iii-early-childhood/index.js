import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { units } from './units'

// Copy from icv.edu.au/certificate-iii-in-early-childhood-education-and-care/, verbatim.
export default {
  code: 'CHC30125',
  title: 'Certificate III in Early Childhood Education and Care',
  category: 'Early Childhood',
  images: { hero: images.ececTeacher, overview: images.ecec, career: images.teacherDrawing, units: images.teacherDrawing, rpl: images.student, cta: images.ecec },
  overview: {
    paragraphs: [
      'This qualification reflects the role of educators in early childhood education and care who work in regulated children’s education and care services in Australia. They support children’s wellbeing, and development in the context of an approved learning framework. Educators use a range of well-developed skills and knowledge using discretion and judgment when carrying out their work in the context of established policies and procedures. They may work independently or under the guidance of others, though in some contexts that guidance may not be on-site.',
      'Early childhood educators work in long day care centres, family day care, pre-schools or kindergartens',
    ],
  },
  actions: [
    { label: 'Course Outline', href: 'https://icv1-my.sharepoint.com/:w:/g/personal/alisha_p_icv_edu_au/EU3rbJwm0v1PqKrc-y4t0mwBaZ9D8O0pCipQzXwts-l0Qg?e=rjJRM9' },
    { label: 'ENQUIRE NOW', href: links.enquire },
  ],
  glance: [
    ['Duration', '6 - 9 months'],
    ['Delivery Mode', 'Blended (Face-to-Face & Virtual Classroom)'],
    ['Work Placement Requirement', '160 Hrs'],
    ['Application fee', '$500'],
    ['Tuition Fee', '$3,000'],
    ['Payment options', 'Weekly and Monthly payment plans available'],
  ],
  details: [
    {
      title: 'ENTRY REQUIREMENTS',
      parts: [
        'Whilst there are no entry requirements stipulated in the training package (CHC), However, ICV requires its applicants to meet the following criteria:',
        { list: ['Applicants must be 18 years of age or above', 'Meet the Language Literacy, Numeracy and Digital skill requirements; ICV conducts LLND entry test and a pre-training review during the enrolment process'] },
        'Students who successfully complete this qualification may pathway into further study options:',
        { list: ['CHC50125 – Diploma in Early Childhood Education and Care'] },
      ],
    },
    {
      title: 'Additional Requirements before starting work placement:',
      parts: [{ list: ['Working with children check', 'National Police record check (if required by the Childcare Centre / Host Organisation)'] }],
    },
  ],
  placement: { paragraphs: sharedCopy.placement },
  units,
  rpl: { title: 'RECOGNITION OF PRIOR LEARNING (RPL)', sections: [{ parts: [sharedCopy.rplShort] }] },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'The following employment pathways are available to the students who complete Certificate III in Early Childhood Education and Care successfully:',
      { chips: ['Family Day Care Educator', 'Centre-based Educator', 'Centre-based Assistant', 'Playgroup Supervisor', 'Recreation Assistant'] },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    headline: 'Enrol Now using our flexible payment options!!',
    lines: ['LIMITED SPOTS AVAILABLE WITH FLEXIBLE PAYMENT PLANS!!'],
    actions: [{ label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire }, { label: 'Enquire Now', href: links.enquire }],
  },
}

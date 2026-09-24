import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { units } from './units'

// Copy from icv.edu.au/diploma-of-building-and-construction-building/, verbatim.
export default {
  code: 'CPC50220',
  title: 'Diploma of Building and Construction (Building)',
  category: 'Building and Construction',
  tagline: 'Are you ready to be a builder?',
  images: { hero: images.construction, overview: images.building2, career: images.siteManager, units: images.graduation, rpl: images.meeting, cta: images.constructionCourses },
  overview: {
    paragraphs: [
      'This qualification reflects the role of building professionals who apply knowledge of structural principles, risk and financial management, estimating, preparing and administering building and construction contracts, selecting contractors, overseeing the work and its quality and managing construction work in building projects including residential and commercial with the following limitations:',
    ],
    list: [
      'Residential construction limited to National Construction Code Class 1 and 10 buildings to a maximum of 3 storeys.',
      'Commercial construction limited to National Construction Code Class 2 to 9 buildings, Type C and B construction.',
    ],
  },
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'ENQUIRE NOW', href: links.enquire }],
  glance: [
    ['Tuition Fee', '0* Fee for Eligible Students'],
    ['Application fees', '$500'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '88 Weeks'],
    ['Study Mode', 'Full-Time'],
    ['Delivery Mode', 'Blended (Face-to-Face & Virtual Classroom)'],
    ['FFS ( Fee for Service) Students', '$15,000'],
  ],
  funding: sharedCopy.buildingFunding,
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: [
      'Occupational titles may include:',
      { chips: ['Builder', 'General Foreperson', 'Building Inspector'] },
      'The construction industry strongly affirms that training and assessment leading to recognition of skills must be undertaken in a real or very closely simulated workplace environment. To achieve this qualification, the candidate must have access to a live building and construction workplace to meet the requirements detailed in the Assessment Requirements of core unit CPCCBC4008 Supervise communication and administration processes for building and construction projects.',
      'Completion of the general construction induction training program specified by the model Code of Practice for Construction Work is required for any person who is to carry out construction work. Achievement of unit CPCCWHS1001 Prepare to work safely in the construction industry meets this requirement.',
      'Builder licensing varies across States and Territories and requirements additional to the attainment of this qualification may be required.',
      { heading: 'Pathways from the qualification' },
      'Students who successfully complete this qualification may pathway into further study options:',
      { list: ['Advanced Diploma of Building and Construction', 'Bachelor of Construction Management and Economics', 'Bachelor or Engineering (Civil Engineering)', 'Bachelor of Construction Management'] },
    ],
  },
  details: [
    {
      title: 'ENTRY REQUIREMENTS',
      parts: [
        'Whilst there are no entry requirements stipulated in the training package (CPC), ICV requires its participants to meet the following criteria:',
        { list: [
          'Australian Year 11 or equivalent OR',
          'Mature age (at least 20 years of age)',
          'Meet the Language Literacy, Numeracy and Digital Skills requirements, ICV conducts LLND entry test at the time of enrolment and a pre-training review at the time of enrolment. The applicant must obtain the required ACSF Level in LLN to enrol in this qualification.',
          'Applicants should possess basic computer and telecommunication skills',
        ] },
      ],
    },
  ],
  units,
  rpl: { title: 'RPL/CREDIT TRANSFER', sections: sharedCopy.buildingRpl },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'This certificate will allow the students to further career in many facets of the building and construction industry such as:',
      { chips: ['Builder', 'Project Manager (Construction)', 'Building and Construction Manager', 'Building Estimator/Scheduler', 'Contract Administrator', 'Site Supervisor'] },
    ],
  },
  cta: {
    ...sharedCopy.skillsFirst,
    actions: [
      { label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire },
      { label: 'COURSE FLYER', href: `${links.uploads}/2024/12/Brochure-CPC50220-Diploma-in-BC-1.pdf` },
    ],
  },
}

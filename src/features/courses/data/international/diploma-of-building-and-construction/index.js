import { images } from '../../images'
import { units } from '../../domestic/diploma-of-building-and-construction/units'
import { intlCopy as c } from '../shared'

// Copy from icv.edu.au/building-and-construction-course-international-student/, verbatim.
// The unit list is identical to the domestic page, so it is shared.
export default {
  code: 'CPC50220',
  title: 'Diploma of Building and Construction (Building)',
  category: 'Building and Construction',
  tagline: 'Are you ready to be a builder?',
  images: { hero: images.buildingSite, overview: images.building2, career: images.carpentry, units: images.graduation, rpl: images.teacherDrawing, cta: images.community },
  overview: {
    paragraphs: ['This qualification reflects the role of building professionals who apply knowledge of structural principles, risk and financial management, estimating, preparing and administering building and construction contracts, selecting contractors, overseeing the work and its quality and managing construction work in building projects including residential and commercial with the following limitations:'],
    list: [
      'Residential construction limited to National Construction Code Class 1 and 10 buildings to a maximum of 3 storeys.',
      'Commercial construction limited to National Construction Code Class 2 to 9 buildings, Type C and B construction.',
    ],
  },
  actions: c.actions,
  glance: [
    ['Tuition Fees', '$ 14,500'],
    ['Application fees', '$ 500'],
    ['Material fees', '$ 500'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '90 Weeks'],
    ['Study Mode', 'Full Time in our Melbourne CBD campus and Trade center in Lalor'],
    ['Delivery Mode', 'Face to Face'],
  ],
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: [
      'Occupational titles depending on packaging options selected may include:',
      { chips: ['Builder', 'General Foreperson', 'Building Inspector'] },
      'This qualification is acceptable to the Victorian Building Authority (VBA) for registration in some of the classifications for Domestic Builder Unlimited (DB-U). The qualification can support relevant registration in other states and territories.',
      { heading: 'Education Pathway:' },
      { list: ['CPC60220 – Advanced Diploma of Building and Construction (Management)', 'Bachelor of Construction Management'] },
    ],
  },
  details: [
    {
      title: 'Entry Requirments',
      parts: [
        c.entryIntro('CPC'),
        ...c.minAge(18),
        ...c.englishIntro,
        { list: [
          ...c.ielts,
          'Pearson Test of English Academic – Score 50, or',
          'Cambridge English: Advanced CAE from Cambridge ESOL Test Scores, or',
          'TOEFL Test of English as a Foreign Language paper-based test – Score 60 -78, or',
          'CELS (all skills) Advanced (English for Academic purposes) certificate from recognised English language centre, or',
          'Senior secondary Certificate of Education completed in Australia, or',
          'Certificate IV or higher completed in Australia, or',
          'Tertiary studies in medium of English',
        ] },
        ...c.academic('Year 12'),
      ],
    },
    c.additional('CV'),
  ],
  units,
  rpl: c.rplFormal,
  employment: {
    title: 'Employment Pathways',
    parts: [
      'This certificate will allow the students to further career in many facets of the building and construction industry such as:',
      { chips: ['Builder', 'Project Manager (Construction)', 'Building and Construction Manager', 'Building Estimator/Scheduler', 'Contract Administrator', 'Site Supervisor'] },
    ],
  },
  cta: c.cta('Brochure-CPC50220-V3.1.2025-March-2025.pdf'),
}

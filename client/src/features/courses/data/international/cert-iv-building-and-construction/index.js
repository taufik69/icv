import { images } from '../../images'
import { units } from '../../domestic/cert-iv-building-and-construction/units'
import { intlCopy as c } from '../shared'

// Copy from icv.edu.au/cpc40120-certificate-iv-in-building-and-construction-int/, verbatim.
// The unit list is identical to the domestic page, so it is shared.
export default {
  code: 'CPC40120',
  title: 'Certificate IV in Building and Construction',
  category: 'Building and Construction',
  tagline: 'Are you ready to be a builder?',
  images: { hero: images.building, overview: images.builder, career: images.carpentry, units: images.graduation, rpl: images.teacherDrawing, cta: images.studentsOutdoors },
  overview: {
    paragraphs: [
      'This qualification reflects the role of builders, site managers and managers of small to medium-sized building businesses who apply knowledge of structural principles, codes, standards and legal requirements to Class 1 and 10, to a maximum of two storeys and Class 2 to 9 Type C constructions, and who plan and supervise safe building and construction work, prepare and administer contracts, and who apply quality principles to building and construction projects.',
      'Building relates to construction and Site Management is about managing the factors around construction, such as the deployment of crews with specialised skills (including builders), product compliance, deployment of contract specialised skills, weather, and site location.',
    ],
  },
  actions: c.actions,
  glance: [
    ['Tuition Fees', '$ 7,500'],
    ['Application fees', '$ 500'],
    ['Material fees', '$ 500'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '40 Weeks'],
    ['Study Mode', 'Full Time in our Melbourne CBD campus and Trade center in Lalor'],
    ['Delivery Mode', 'Face to Face'],
  ],
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: [
      'Occupational titles depending on packaging options selected may include:',
      { chips: ['Registered Builder', 'Construction Supervi sor', 'Site Manager', 'Site Supervisor', 'Leading Hand'] },
      'This qualification is acceptable to the Victorian Building Authority (VBA) for registration in some of the classifications for Domestic Builder Limited (DB-L). The qualification can support relevant registration in other states and territories.',
      'Education Pathway: CPC50220 – Diploma of Building and Construction (Building)',
    ],
  },
  details: [
    {
      title: 'Entry Requirments',
      parts: [
        c.entryIntro('CPC'),
        ...c.minAge(18),
        ...c.englishIntro,
        { list: [...c.ielts, 'Pearson Test of English Academic – Score 50, or', 'Senior secondary Certificate of Education completed in Australia, or', 'Certificate IV or higher completed in Australia, or', 'Tertiary studies in medium of English'] },
        ...c.academic('Year 11'),
      ],
    },
    c.additional(),
  ],
  units: {
    ...units,
    parts: [...units.parts.slice(0, 2), 'Some units in this qualification may have prerequisite requirements, which must be met when packaging the qualification. Users are referred to the list of CPC units with prerequisite unit requirements available in this Training Package for this purpose.'],
  },
  rpl: c.rplFormal,
  employment: {
    title: 'Educational Pathways',
    parts: [
      'Learners who successfully complete this qualification may also pathway into further study options including, but not limited to:',
      { chips: ['Diploma of Building and Construction (Building)', 'Advanced Diploma of Building Design', 'Any other relevant qualification'] },
      { heading: 'SKILL FIRST FUNDING' },
      'Please contact our college to talk to our support team who can assist you with this information.',
    ],
  },
  cta: c.cta('Brochure-CPC40120-V3.1.2025-March-2025.pdf'),
}

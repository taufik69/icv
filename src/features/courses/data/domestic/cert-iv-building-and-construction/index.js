import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { units } from './units'

// Copy from icv.edu.au/certificate-4-building-and-construction/, verbatim.
export default {
  code: 'CPC40120',
  title: 'Certificate IV in Building and Construction',
  category: 'Building and Construction',
  tagline: 'Are you ready to be a builder?',
  images: { hero: images.buildingSite, overview: images.building, career: images.construction, units: images.graduation, rpl: images.worker, cta: images.carpentry },
  overview: {
    paragraphs: [
      'This qualification reflects the role of builders, site managers and managers of small to medium-sized building businesses who apply knowledge of structural principles, codes, standards and legal requirements to Class 1 and 10, to a maximum of two storeys and Class 2 to 9 Type C constructions, and who plan and supervise safe building and construction work, prepare and administer contracts, and who apply quality principles to building and construction projects.',
      'Building relates to construction and Site Management is about managing the factors around construction, such as the deployment of crews with specialised skills (including builders), product compliance, deployment of contract specialised skills, weather, and site location.',
    ],
  },
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'ENQUIRE NOW', href: links.enquire }],
  glance: [
    ['Tuition Fee', '0* Fee for Eligible Students'],
    ['Application Fee', '$500'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '48 Weeks'],
    ['Study Mode', 'Full-Time'],
    ['Delivery Mode', 'Blended (Face-to-Face & Virtual Classroom)'],
    ['FFS ( Fee for Service) Students', '$9,000'],
  ],
  funding: sharedCopy.buildingFunding,
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: [
      'Occupational titles depending on packaging options selected may include:',
      { chips: ['Registered Builder', 'Construction Supervi sor', 'Site Manager', 'Site Supervisor', 'Leading Hand'] },
      'Completion of the general induction training program specified by the National Code of Practice for Induction Training for Construction Work (ASCC 2007) is required before entering a construction work site. Achievement of unit CPCCWHS1001 Prepare to work safely in the construction industry meets this requirement.',
      'Additional units of competency may be required to meet builder registration requirements in various States and Territories.',
    ],
  },
  details: [
    {
      title: 'Entry Requirments',
      parts: [
        'Whilst there are no entry requirements stipulated in the training package (CPC), ICV requires its applicants to meet the following criteria:',
        { list: [
          'Candidate must be aged 18 or above.',
          'Australian Year 11 or equivalent OR Mature age (at least 20 years of age).',
          'Meet the Language Literacy, Numeracy and Digital skills requirements; ICV conducts LLND assessment and a pre-training review at the time of enrolment. The applicant must obtain the required ACSF Level in LLN to enrol in this qualification.',
          'Applicants should possess basic computer and telecommunication skills.',
        ] },
      ],
    },
    {
      title: 'Educational Pathways',
      parts: [
        'Learners who successfully complete this qualification may also pathway into further study options including, but not limited to:',
        { list: ['Diploma of Building and Construction (Building)', 'Advanced Diploma of Building Design', 'Any other relevant qualification'] },
      ],
    },
  ],
  units,
  rpl: {
    title: 'RPL/CREDIT TRANSFER',
    sections: [
      sharedCopy.buildingRpl[0],
      {
        title: 'Read More',
        collapsible: true,
        parts: [
          'formal learning refers to learning that takes place through a structured program of instruction and is linked to the attainment of an AQF qualification or statement of attainment (for example, a certificate, diploma or university degree);',
          'Informal learning refers to learning that takes place through a structured program of instruction, but does not lead to the attainment of an AQF qualification or statement of attainment (for example, in-house professional development programs conducted by a business); and informal learning refers to learning that results through experience of work-related, social, family, hobby or leisure activities.',
          'Learners are encouraged to apply for RPL prior to or immediately after formal enrolment but prior to the facilitated delivery of units to ensure that they do not miss any class/workshop opportunities offered should they be unsuccessful in the RPL process.',
        ],
      },
      sharedCopy.buildingRpl[2],
    ],
  },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'This certificate will allow the students to further career in many facets of the building and construction industry such as:',
      { chips: ['Builder/Construction Manager', 'Building Supervisor', 'Trade Contractor'] },
    ],
  },
  cta: {
    ...sharedCopy.skillsFirst,
    actions: [
      { label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire },
      { label: 'COURSE FLYER', href: `${links.uploads}/2024/12/Brochure-CPC40120-Certificate-IV-in-BC-1.pdf` },
    ],
  },
}

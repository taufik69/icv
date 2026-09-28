import { images } from '../../images'
import { intlCopy as c } from '../shared'
import { units } from './units'

// Copy from icv.edu.au/certificate-iii-in-carpentry-international/, verbatim.
export default {
  code: 'CPC30220',
  title: 'Certificate III in Carpentry',
  category: 'Building and Construction',
  images: { hero: images.carpentryCourse, overview: images.carpentry, career: images.builder, units: images.graduation, rpl: images.teacherDrawing, cta: images.community },
  overview: {
    paragraphs: [
      'This is a trade qualification for carpenters in residential and commercial workplaces. It includes setting out, manufacturing, constructing, assembling, installing and repairing products made using timber and non-timber materials.',
      'State and territory jurisdictions may have different licensing, legislative, regulatory or certification requirements. Relevant state and territory regulatory authorities should be consulted to confirm those requirements.',
      'Completion of the general construction induction training program, specified in the Safe Work Australia model Code of Practice: Construction Work, is required by anyone carrying out construction work. Achievement of CPCWHS1001 Prepare to work safely in the construction industry meets this requirement.',
    ],
  },
  actions: c.actions,
  glance: [
    ['Tuition Fees', '$ 20,250'],
    ['Application fees', '$ 500'],
    ['Material fees', '$1,250'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '104 Weeks'],
    ['Study Mode', 'Full Time in our Melbourne CBD campus and Trade center in Lalor'],
    ['Delivery Mode', 'Face to Face'],
  ],
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: [
      'Occupational titles depending on packaging options selected may include:',
      { chips: ['Carpenter – Commercial', 'Carpenter – Formwork', 'Carpenter – Residential'] },
      'This qualification is acceptable to the Victorian Building Authority (VBA) for registration in some of the classifications for Domestic Builder Limited to carpentry (DB-L). The qualification can support relevant registration in other states and territories.',
      { heading: 'EDUCATION PATHWAY' },
      { list: ['CPC40120 Certificate IV – Building and Construction', 'CPC50220 Diploma of Building & Construction(Building)'] },
      { heading: 'Additional Information' },
      'Completion of the general induction training program specified by the National Code of Practice for Induction Training for Construction Work (ASCC 2007) is required before entering a construction work site. Achievement of unit CPCWHS1001 Prepare to work safely in the construction industry meets this requirement.',
      'Additional units of competency may be required to meet builder registration requirements in various States and Territories.',
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
  units,
  rpl: {
    title: 'RPL/CREDIT TRANSFER',
    sections: [
      {
        title: 'Recognition of prior learning (RPL)',
        parts: [
          'The competencies in this qualification may be attained through the process of Recognition of Prior Learning (RPL). RPL takes into consideration the candidates’ previous training, work and life experience.',
          'Recognition of Prior Learning (RPL) opportunities will be identified and addressed during the pre-training interview process.',
          'Learners will also be provided with an RPL Candidate guide to assist the learner in identifying any Recognition of Prior Learning either through previous training, work, or life experience or to how to prepare a portfolio of evidence.',
        ],
      },
      { title: 'Read More', collapsible: true, parts: [c.rplFormal.sections[1].parts[2]] },
      c.rplFormal.sections[2],
    ],
  },
  employment: {
    title: 'Employment Pathways',
    parts: [
      'This certificate will allow the students to further career in many facets of the building and construction industry such as:',
      { chips: ['Carpenter – Commercial', 'Carpenter – Formwork', 'Carpenter – Residential'] },
    ],
  },
  cta: c.cta('CPC30220-V3.1.2025-March-2025.pdf', 'Ask us about scholarship or our referral programs.'),
}

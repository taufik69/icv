import { images } from '../../images'
import { links } from '../../links'
import { intlCopy as c } from '../shared'
import { units } from './units'

// Copy from icv.edu.au/cpc32320-certificate-iii-in-stonemasonry/, verbatim. The live page has no RPL,
// employment or closing call-to-action sections, so none are shown.
export default {
  code: 'CPC32320',
  title: 'Certificate III in Stonemasonry',
  category: 'Building and Construction',
  tagline: 'Master the Craft of Stonemasonry. Build a Career That Lasts.',
  images: { hero: images.stonemason, overview: images.buildingSite, career: images.meeting, units: images.graduation },
  overview: {
    paragraphs: ['This qualification is designed to meet the needs of stonemasons working with sandstone, limestone, marble and other types of stone and stone products to produce stone monuments, buildings (heritage and new) and building components, such as walls, floors, arches, chimneys, stairs, windows, decorative mouldings, fireplaces and benchtops.'],
  },
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'Enquire Now', href: links.enquire }],
  glance: [
    ['Application fees', '$500'],
    ['Material fee', '$0'],
    ['Tuition Fees', '$10,000'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '64 Weeks including holidays'],
    ['Study Mode', 'Full Time in our Melbourne CBD campus and Trade center in Sunshine'],
    ['Delivery Mode', 'Face to Face'],
  ],
  career: {
    title: 'CAREER OPPORTUNITIES',
    parts: ['Occupational titles may include:', { chips: ['Architectural stonemason', 'Monumental stonemason', 'Heritage stonemason', 'Finisher', 'Bench-top mason', 'Stonemason.'] }],
  },
  details: [
    {
      title: 'Entry Requirements',
      parts: [
        c.entryIntro('CPC'),
        ...c.minAge(18),
        ...c.englishIntro,
        { list: [
          'IELTS band score of overall 6 (Academic) or equivalent in line with Department regulations, or',
          'IELTS overall band score of 5.5 with at least 10 weeks’ ELICOS, or',
          'IELTS overall band score of 5 with at least 20 weeks’ ELICOS, or',
          'Pearson Test of English Academic – Score 50, or',
          'Senior secondary Certificate of Education completed in Australia, or',
          'Certificate IV or higher completed in Australia, or',
          'Tertiary studies in medium of English',
        ] },
        ...c.academic('Year 11'),
      ],
    },
    {
      title: 'Additional Requirements:',
      parts: [{ list: [
        'ICV will conduct LLND assessment on the orientation day to assess student’s Language, Literacy , Numeracy and Digital Skill levels. LLND assessment will be conducted to identify the right level of support required by the students. This support will enable them to complete qualifications successfully in required time.',
        'This LLN assessment is not a barrier to the entry in the course.',
      ] }],
    },
  ],
  units,
}

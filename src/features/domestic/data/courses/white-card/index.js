import { images } from '../../images'
import { links, sharedCopy } from '../../links'
import { criteria } from './criteria'
import { whiteCardDetails } from './details'

// Copy from icv.edu.au/prepare-to-work-safely-in-the-construction-industry/, verbatim.
// Blocks the live page repeats (a second "Who needs a White Card", "Training provider information",
// and the criteria list shown twice) are rendered once.
export default {
  code: 'CPCWHS1001',
  title: 'Prepare to work safely in the construction industry',
  category: 'White Card',
  images: { hero: images.siteManager, overview: images.building, career: images.whiteCard, criteria: images.studentsOutdoors, cta: images.teacherDrawing },
  overview: {
    paragraphs: [
      'This unit of competency specifies the mandatory work health and safety training required prior to undertaking construction work. The unit requires the person to demonstrate personal awareness and knowledge of health and safety legislative requirements in order to work safely and prevent injury or harm to self and others.',
      'It covers identifying and orally reporting common construction hazards, understanding basic risk control measures, and identifying procedures for responding to potential incidents and emergencies. It also covers correctly selecting and fitting common personal protective equipment (PPE) used for construction work.',
    ],
  },
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'ENQUIRE NOW', href: links.enquire }],
  glance: [
    ['Tuition Fee', '150* Enrolment Fee'],
    ['Start Date', 'Monthly Intake'],
    ['Duration', '6 Hours'],
    ['Delivery Mode', 'In Classroom – Suite 2 Level 12 190 Queen St Melbourne VIC 3000'],
    ['FFS ( Fee for Service) Students', '$150.00'],
  ],
  funding: sharedCopy.buildingFunding,
  career: {
    title: 'WHAT IS WHITE CARD?',
    parts: [
      'A White Card is a Construction Induction Card that is issued to a person after successful completion of the Construction Induction. The formal name and code of this course is CPCWHS1001 – Prepare to work safely in the construction industry.',
      'Construction Induction training covers the following areas:',
      { list: ['Rights and responsibilities under WHS/OHS law', 'Common hazards and risks in the construction industry', 'Basic risk management principles'] },
      'The standard of behaviour expected of workers on construction sites In Victoria, Construction Induction Cards (or White Cards) are issued by WorkSafe Victoria. White Cards are national and accepted in every Australian state and territory.',
    ],
  },
  detailsTitle: 'Course Overview',
  details: whiteCardDetails,
  criteria,
  cta: {
    headline: 'Building and Construction Government Funded Courses Available',
    lines: ['This training is delivered with Victorian and Commonwealth Government funding. ( You Must be an Australian Citizen or Permanent Residents residing in Victoria )'],
    actions: [{ label: 'CLICK TO CHECK YOUR ELIGIBILITY', href: links.enquire }, { label: 'Enquire Now', href: links.enquire }],
  },
}

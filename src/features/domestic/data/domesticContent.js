import { images } from './images'
import { links } from './links'

// Copy from icv.edu.au/domestic/, verbatim. (The live "Student Prospectus" button has no link, so it is left out;
// the Certificate IV in Disability card is commented out on the live page, so it is not shown either.)
const hero = {
  title: 'Domestic',
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const domesticContent = {
  hero,
  enquire: { label: 'Enquiry Now', href: links.enquire },
  welcome: {
    eyebrow: 'WELCOME TO ICV',
    title: "Melbourne's Best RTO ( Registered Training organization)",
    text: "Being an accredited RTO demonstrates that our college meets quality standards set by regulatory bodies. This ensures that the education provided is recognized and valued. It signifies that our institution is committed to delivering high-quality training and assessment, which can enhance students' confidence in the education they receive. By excelling in these areas, our college can differentiate itself as a leader in providing high-quality education that meets the needs of today's learners. It demonstrates a commitment to excellence, student success, and continuous improvement.",
    image: images.studentsOutdoors,
  },
  courses: {
    title: 'DOMESTIC COURSES',
    filters: [
      { id: 'all', label: 'ALL' },
      { id: 'building', label: 'BUILDING AND CONSTRUCTION' },
      { id: 'whiteCard', label: 'WHITE CARD' },
      { id: 'ecec', label: 'EARLY CHILDHOOD' },
      { id: 'community', label: 'COMMUNITY SERVICES' },
    ],
    apply: { label: 'APPLY NOW', href: links.enquire },
    items: [
      { code: 'CPC40120', title: 'Certificate IV in Building and Construction', category: 'building', to: '/domestic/cert-iv-building-and-construction', image: images.building, text: 'This qualification reflects the role of builders, site managers and managers of small to medium-sized building businesses' },
      { code: 'CPC50220', title: 'Diploma of Building and Construction (Building)', category: 'building', to: '/domestic/diploma-of-building-and-construction', image: images.builder, text: 'This qualification reflects the role of building professionals who apply knowledge of structural principles, risk and..' },
      { code: 'CPCWHS1001', title: 'Prepare to work safely in the construction industry', category: 'whiteCard', to: '/domestic/white-card', image: images.siteManager, text: 'This unit of competency specifies the mandatory work health and safety training required prior to undertaking construction work.' },
      { code: 'CHC43015', title: 'Certificate IV in Ageing Support', category: 'community', to: '/domestic/cert-iv-ageing-support', image: images.community, text: 'This qualification reflects the role of support workers who complete specialised tasks and functions in aged services..' },
      { code: 'CHC30121', title: 'Certificate III in Early Childhood Education and Care', category: 'ecec', to: '/domestic/cert-iii-early-childhood', image: images.ecec, text: 'This qualification reflects the role of educators in early childhood education and care who work in regulated children’s education and..' },
      { code: 'CHC50121', title: 'Diploma of Early Childhood Education and Care', category: 'ecec', to: '/domestic/diploma-of-early-childhood', image: images.ececTeacher, text: 'Educators at this level are responsible for designing and implementing curriculum that meets the requirements of an approved..' },
    ],
  },
  enrol: {
    title: 'ENROL TODAY RISK FREE',
    subtitle: 'Explore Our Government funded courses available at 0* Tuition Fee.',
    launchTitle: 'LAUNCH YOUR CAREER TO A NEW LEVEL!',
    list: ['Gain Skills and Knowledge to work', 'Flexible Part time- Full time', 'Evening and Weekend Classes', 'Dedicated Trainers and After-Hours Support Available', 'Government funding* and interest-free payment plans available'],
    action: { label: 'ENQUIRE NOW', href: links.enquire },
  },
  study: {
    title: 'STUDY WITH INTERNATIONAL COLLEGE OF VICTORIA',
    text: 'ICV provides its students with a high level of convenience. We are located in Melbourne CBD and have training locations across Melbourne.',
    links: [
      { label: 'Trending Courses', href: 'https://icv.edu.au/popular-course/' },
      { label: 'Enrol Now', href: links.enrol },
      { label: 'Student Wellbeing Services', to: '/about/student-wellbeing' },
    ],
  },
  claim: {
    title: 'CLAIM YOUR CERTIFICATE TODAY!',
    action: { label: 'ENQUIRE NOW', href: links.enquire },
    contactLead: 'Or contact us on',
    phone: { label: '(03) 9942 1836', href: 'tel:0399421836' },
    contactTail: 'to speak to a friendly careers advisor',
  },
}

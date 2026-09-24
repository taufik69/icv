import { BadgeCheckIcon, HammerIcon, HeartIcon, SmileIcon } from '@/shared/components/icons'

const ICV = 'https://icv.edu.au'
const categories = {
  building: { label: 'Building & Construction', Icon: HammerIcon },
  whiteCard: { label: 'White Card', Icon: BadgeCheckIcon },
  community: { label: 'Community Services', Icon: HeartIcon },
  ecec: { label: 'Early Childhood Education & Care', Icon: SmileIcon },
}
const course = (code, title, audience, category, overview, path, image) => ({
  code, title, audience, category: categories[category], overview,
  // Pages rebuilt in this app are internal routes; the rest still link to icv.edu.au.
  ...(path.startsWith('/domestic/') ? { to: path } : { href: `${ICV}${path}` }),
  image: { portrait: `/images/${image}.webp`, wide: `/images/${image}-wide.webp` },
})

export const coursesContent = {
  title: 'Our popular courses',
  subtitle: 'Nationally recognised qualifications in building and construction, community services and early childhood education.',
  filters: [
    { id: 'all', label: 'All courses' },
    { id: 'domestic', label: 'Domestic' },
    { id: 'international', label: 'International' },
  ],
  viewAll: { label: 'View all courses', to: '/domestic' },
  courses: [
    course('CPC30220', 'Certificate III in Carpentry', 'international', 'building',
      'This qualification provides a trade outcome in carpentry, covering work in residential and commercial applications.',
      '/certificate-iii-in-carpentry-international/', 'course-carpentry'),
    course('CPC40120', 'Certificate IV in Building and Construction', 'international', 'building',
      'This qualification reflects the role of builders, site managers and managers of small to medium-sized building businesses.',
      '/cpc40120-certificate-iv-in-building-and-construction-int/', 'course-building-cert4'),
    course('CPC50220', 'Diploma of Building and Construction (Building)', 'international', 'building',
      'This qualification reflects the role of building professionals who apply knowledge of structural principles, risk and financial management.',
      '/building-and-construction-course-international-student/', 'course-building-diploma'),
    course('CPCCWHS1001A', 'Prepare to work safely in the construction industry', 'domestic', 'whiteCard',
      'This unit of competency specifies the mandatory work health and safety training required prior to undertaking construction work.',
      '/domestic/white-card', 'course-white-card'),
    course('CHC43015', 'Certificate IV in Ageing Support', 'domestic', 'community',
      'This qualification reflects the role of support workers who complete specialised tasks and functions in aged services.',
      '/domestic/cert-iv-ageing-support', 'course-ageing'),
    course('CHC43115', 'Certificate IV in Disability', 'domestic', 'community',
      'This qualification reflects the role of workers in a range of community settings and clients’ homes, who provide training and support.',
      '/certificate-iv-in-disability/', 'course-disability'),
    course('CHC30121', 'Certificate III in Early Childhood Education and Care', 'domestic', 'ecec',
      'This qualification reflects the role of educators in early childhood education and care who work in regulated children’s services.',
      '/domestic/cert-iii-early-childhood', 'course-ecec-cert3'),
    course('CHC50121', 'Diploma of Early Childhood Education and Care', 'domestic', 'ecec',
      'Educators at this level are responsible for designing and implementing curriculum in early childhood education and care services.',
      '/domestic/diploma-of-early-childhood', 'course-ecec-diploma'),
  ],
}

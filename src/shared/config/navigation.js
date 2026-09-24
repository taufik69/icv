import { GlobeIcon, GraduationCapIcon, HomeIcon, PhoneIcon, PlaneIcon } from '@/shared/components/icons'

const ICV = 'https://icv.edu.au'

// Pages that open with a full-bleed hero (home, and every inner page using PageHero under these sections):
// the header starts transparent over them.
const heroSections = ['/about', '/student-info', '/domestic', '/international', '/contact']
export const hasHeroBanner = (path) => path === '/' || heroSections.some((p) => path === p || path.startsWith(`${p}/`))

const link = (label, path, code) => ({ label, href: `${ICV}${path}`, code })

export const mainNav = [
  {
    label: 'About Us',
    Icon: HomeIcon,
    children: [
      { label: 'About ICV', to: '/about' },
      { label: 'Message from CEO', to: '/about/ceo-message' },
      { label: 'Why Choose ICV', to: '/about/why-choose-icv' },
      { label: 'Student Wellbeing Centre', to: '/about/student-wellbeing' },
      { label: 'Education Agents', to: '/about/education-agents' },
      { label: 'Compliance and Reports', to: '/about/compliance-reports' },
      { label: 'Brokers and Subcontractors', to: '/about/brokers' },
      { label: 'Testimonials', to: '/about/testimonials' },
    ],
  },
  {
    label: 'Student Info',
    Icon: GraduationCapIcon,
    children: [
      { label: 'Fee Schedule – 2026', to: '/student-info/fee-schedule' },
      { label: 'Policies and Procedures', to: '/student-info/policies' },
      { label: 'Forms', to: '/student-info/forms' },
      { label: 'Online Service Standards', to: '/student-info/online-service-standards' },
      { label: 'RPL', to: '/student-info/rpl' },
      { label: 'International Student Information', to: '/student-info/international-students' },
      { label: 'ESOS Framework', to: '/student-info/esos-framework' },
    ],
  },
  {
    label: 'Domestic',
    Icon: GlobeIcon,
    children: [
      { label: 'Domestic', to: '/domestic' },
      { label: 'Certificate IV in Building and Construction', to: '/domestic/cert-iv-building-and-construction', code: 'CPC40120' },
      { label: 'Diploma of Building and Construction (Building)', to: '/domestic/diploma-of-building-and-construction', code: 'CPC50220' },
      { label: 'Prepare to work safely in the construction industry', to: '/domestic/white-card', code: 'CPCWHS1001' },
      { label: 'Certificate III in Early Childhood Education and Care', to: '/domestic/cert-iii-early-childhood', code: 'CHC30125' },
      { label: 'Diploma of Early Childhood Education and Care', to: '/domestic/diploma-of-early-childhood', code: 'CHC50125' },
      { label: 'Certificate IV in Ageing Support', to: '/domestic/cert-iv-ageing-support', code: 'CHC43015' },
      link('Certificate III in Individual Support', '/chc33021-certificate-iii-in-individual-support-ageing-and-disability/', 'CHC33021'),
    ],
  },
  {
    label: 'International',
    Icon: PlaneIcon,
    children: [
      { label: 'International', to: '/international' },
      { label: 'Certificate III in Carpentry', to: '/international/certificate-iii-in-carpentry', code: 'CPC30220' },
      { label: 'Certificate III in Stonemasonry', to: '/international/certificate-iii-in-stonemasonry', code: 'CPC32320' },
      { label: 'Graduate Diploma in Management (Learning)', to: '/international/graduate-diploma-in-management-learning', code: 'BSB80120' },
      { label: 'Certificate IV in Building and Construction', to: '/international/cert-iv-building-and-construction', code: 'CPC40120' },
      { label: 'Diploma of Building and Construction (Building)', to: '/international/diploma-of-building-and-construction', code: 'CPC50220' },
    ],
  },
  { label: 'Contact Us', to: '/contact', Icon: PhoneIcon },
]

export const portalLinks = [
  { label: 'Student Login', href: 'https://admin.axcelerate.com.au/learnerPortal/' },
  { label: 'Trainer Login', href: 'https://admin.axcelerate.com.au/management/' },
]

export const applyLink = { label: 'Apply Now', href: `${ICV}/enquire-now/` }
export const portalLabel = 'Portal'

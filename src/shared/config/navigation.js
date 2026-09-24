const ICV = 'https://icv.edu.au'

// Pages that open with a full-bleed hero (home, and every inner page using PageHero under these sections):
// the header starts transparent over them.
const heroSections = ['/about', '/student-info']
export const hasHeroBanner = (path) => path === '/' || heroSections.some((p) => path === p || path.startsWith(`${p}/`))

const link = (label, path, code) => ({ label, href: `${ICV}${path}`, code })

export const mainNav = [
  {
    label: 'About Us',
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
    href: `${ICV}/domestic/`,
    children: [
      link('Certificate IV in Building and Construction', '/certificate-4-building-and-construction/', 'CPC40120'),
      link('Diploma of Building and Construction (Building)', '/diploma-of-building-and-construction-building/', 'CPC50220'),
      link('Prepare to work safely in the construction industry', '/prepare-to-work-safely-in-the-construction-industry/', 'CPCWHS1001'),
      link('Certificate III in Early Childhood Education and Care', '/certificate-iii-in-early-childhood-education-and-care/', 'CHC30125'),
      link('Diploma of Early Childhood Education and Care', '/diploma-of-early-childhood-education-and-care-2/', 'CHC50125'),
      link('Certificate IV in Ageing Support', '/certificate-iv-in-ageing-support/', 'CHC43015'),
      link('Certificate III in Individual Support', '/chc33021-certificate-iii-in-individual-support-ageing-and-disability/', 'CHC33021'),
    ],
  },
  {
    label: 'International',
    href: `${ICV}/international/`,
    children: [
      link('Certificate III in Carpentry', '/certificate-iii-in-carpentry-international/', 'CPC30220'),
      link('Certificate III in Stonemasonry', '/cpc32320-certificate-iii-in-stonemasonry/', 'CPC32320'),
      link('Graduate Diploma in Management (Learning)', '/diploma-in-management-learning/', 'BSB80120'),
      link('Certificate IV in Building and Construction', '/cpc40120-certificate-iv-in-building-and-construction-int/', 'CPC40120'),
      link('Diploma of Building and Construction (Building)', '/building-and-construction-course-international-student/', 'CPC50220'),
    ],
  },
  { label: 'Contact Us', href: `${ICV}/contact/` },
]

export const portalLinks = [
  { label: 'Student Login', href: 'https://admin.axcelerate.com.au/learnerPortal/' },
  { label: 'Trainer Login', href: 'https://admin.axcelerate.com.au/management/' },
]

export const applyLink = { label: 'Apply Now', href: `${ICV}/enquire-now/` }

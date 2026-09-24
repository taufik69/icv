const ICV = 'https://icv.edu.au'

// Routes that open with a full-bleed hero: the header starts transparent over them.
export const heroRoutes = ['/', '/about', '/about/ceo-message', '/about/why-choose-icv', '/about/student-wellbeing', '/about/education-agents', '/about/compliance-reports', '/about/brokers', '/about/testimonials']

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
      link('Fee Schedule – 2025', '/fee-schedule/'),
      link('Policies and Procedures', '/policies-and-procedures-2/'),
      link('Forms', '/forms/'),
      link('Online Service Standards', '/online-service-standards/'),
      link('RPL', '/rpl/'),
      link('International Student Information', '/information-for-students-2/'),
      link('ESOS Framework', '/international-student-information/'),
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

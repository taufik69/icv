const ICV = 'https://icv.edu.au'
const link = (label, path, code) => ({ label, href: `${ICV}${path}`, code })

export const mainNav = [
  {
    label: 'About Us',
    children: [
      link('Message from CEO', '/weclome-message-from-ceo/'),
      link('Why Choose ICV', '/why-choose-icv/'),
      link('Student Wellbeing Centre', '/student-wellbeing-centre/'),
      link('Education Agents', '/education-agents/'),
      link('Compliance and Reports', '/compliance-reports/'),
      link('Brokers and Subcontractors', '/brokers/'),
      link('Testimonials', '/testimonials/'),
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

import { BriefcaseIcon, GlobeIcon, HammerIcon, HeartIcon, PlaneIcon, ShieldCheckIcon, SmileIcon } from '@/shared/components/icons'

// Course lists for the Domestic / International menus (split out of navigation.js to keep it short).
const link = (label, path, code, Icon) => ({ label, href: `https://icv.edu.au${path}`, code, Icon })

export const domesticCourses = [
  { label: 'Domestic', to: '/domestic', Icon: GlobeIcon },
  { label: 'Certificate IV in Building and Construction', to: '/domestic/cert-iv-building-and-construction', code: 'CPC40120', Icon: HammerIcon },
  { label: 'Diploma of Building and Construction (Building)', to: '/domestic/diploma-of-building-and-construction', code: 'CPC50220', Icon: HammerIcon },
  { label: 'Prepare to work safely in the construction industry', to: '/domestic/white-card', code: 'CPCWHS1001', Icon: ShieldCheckIcon },
  { label: 'Certificate III in Early Childhood Education and Care', to: '/domestic/cert-iii-early-childhood', code: 'CHC30125', Icon: SmileIcon },
  { label: 'Diploma of Early Childhood Education and Care', to: '/domestic/diploma-of-early-childhood', code: 'CHC50125', Icon: SmileIcon },
  { label: 'Certificate IV in Ageing Support', to: '/domestic/cert-iv-ageing-support', code: 'CHC43015', Icon: HeartIcon },
  link('Certificate III in Individual Support', '/chc33021-certificate-iii-in-individual-support-ageing-and-disability/', 'CHC33021', HeartIcon),
]

export const internationalCourses = [
  { label: 'International', to: '/international', Icon: PlaneIcon },
  { label: 'Certificate III in Carpentry', to: '/international/certificate-iii-in-carpentry', code: 'CPC30220', Icon: HammerIcon },
  { label: 'Certificate III in Stonemasonry', to: '/international/certificate-iii-in-stonemasonry', code: 'CPC32320', Icon: HammerIcon },
  { label: 'Graduate Diploma in Management (Learning)', to: '/international/graduate-diploma-in-management-learning', code: 'BSB80120', Icon: BriefcaseIcon },
  { label: 'Certificate IV in Building and Construction', to: '/international/cert-iv-building-and-construction', code: 'CPC40120', Icon: HammerIcon },
  { label: 'Diploma of Building and Construction (Building)', to: '/international/diploma-of-building-and-construction', code: 'CPC50220', Icon: HammerIcon },
]

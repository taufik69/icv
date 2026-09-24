import {
  BadgeCheckIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatIcon,
  CoinsIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  LayoutGridIcon,
  PhoneIcon,
  PlaneIcon,
  PresentationIcon,
  ScaleIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
} from '@/shared/components/icons'
import { domesticCourses, internationalCourses } from './courseNav'

const ICV = 'https://icv.edu.au'

// Pages that open with a full-bleed hero (home, and every inner page using PageHero under these sections):
// the header starts transparent over them.
const heroSections = ['/about', '/student-info', '/domestic', '/international', '/contact']
export const hasHeroBanner = (path) => path === '/' || heroSections.some((p) => path === p || path.startsWith(`${p}/`))

export const mainNav = [
  {
    label: 'About Us',
    Icon: HomeIcon,
    children: [
      { label: 'About ICV', to: '/about', Icon: InfoIcon },
      { label: 'Message from CEO', to: '/about/ceo-message', Icon: ChatIcon },
      { label: 'Why Choose ICV', to: '/about/why-choose-icv', Icon: BadgeCheckIcon },
      { label: 'Student Wellbeing Centre', to: '/about/student-wellbeing', Icon: HeartIcon },
      { label: 'Education Agents', to: '/about/education-agents', Icon: UsersIcon },
      { label: 'Compliance and Reports', to: '/about/compliance-reports', Icon: ShieldCheckIcon },
      { label: 'Brokers and Subcontractors', to: '/about/brokers', Icon: BriefcaseIcon },
      { label: 'Testimonials', to: '/about/testimonials', Icon: StarIcon },
    ],
  },
  {
    label: 'Courses',
    Icon: BookOpenIcon,
    passive: true, // its links duplicate Domestic / International, so it never shows as the current section
    children: [
      { label: 'Domestic Courses', to: '/domestic', Icon: GlobeIcon },
      { label: 'International Courses', to: '/international', Icon: PlaneIcon },
      { label: 'All Courses', to: '/', hash: 'courses', Icon: LayoutGridIcon },
    ],
  },
  {
    label: 'Student Info',
    Icon: GraduationCapIcon,
    children: [
      { label: 'Fee Schedule – 2026', to: '/student-info/fee-schedule', Icon: CoinsIcon },
      { label: 'Policies and Procedures', to: '/student-info/policies', Icon: ScaleIcon },
      { label: 'Forms', to: '/student-info/forms', Icon: FileTextIcon },
      { label: 'Online Service Standards', to: '/student-info/online-service-standards', Icon: PresentationIcon },
      { label: 'RPL', to: '/student-info/rpl', Icon: BadgeCheckIcon },
      { label: 'International Student Information', to: '/student-info/international-students', Icon: PlaneIcon },
      { label: 'ESOS Framework', to: '/student-info/esos-framework', Icon: ShieldCheckIcon },
    ],
  },
  {
    label: 'Domestic',
    Icon: GlobeIcon,
    children: domesticCourses,
  },
  {
    label: 'International',
    Icon: PlaneIcon,
    children: internationalCourses,
  },
  { label: 'Contact Us', to: '/contact', Icon: PhoneIcon },
]

export const portalLinks = [
  { label: 'Student Login', href: 'https://admin.axcelerate.com.au/learnerPortal/', Icon: GraduationCapIcon },
  { label: 'Trainer Login', href: 'https://admin.axcelerate.com.au/management/', Icon: PresentationIcon },
]

export const applyLink = { label: 'Apply Now', href: `${ICV}/enquire-now/` }
export const portalLabel = 'Portal'

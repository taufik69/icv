import { BookOpenIcon, FileTextIcon, GraduationCapIcon, HomeIcon, LayersIcon, LayoutGridIcon, PenLineIcon, PlusIcon } from '@/shared/components/icons'

// Sidebar + mobile tab items for the staff dashboard. `exact` marks items that are current only on their own path.
// `badge` names a live count the Sidebar fills in (live counts from the API).
export const dashboardNav = [
  { label: 'Dashboard', to: '/dashboard', Icon: LayoutGridIcon, exact: true },
  { label: 'Add course', to: '/dashboard/courses/new', Icon: PlusIcon, exact: true },
  { label: 'Courses', to: '/dashboard/courses', Icon: BookOpenIcon, exact: true },
  { label: 'Study areas', to: '/dashboard/study-areas', Icon: LayersIcon },
  { label: 'Levels', to: '/dashboard/levels', Icon: GraduationCapIcon },
  { label: 'Applications', to: '/dashboard/applications', Icon: FileTextIcon, badge: 'newApplications' },
  { label: 'Enrolments', to: '/dashboard/enrolments', Icon: PenLineIcon, badge: 'newEnrolments' },
]

export const siteLink = { label: 'View website', to: '/', Icon: HomeIcon }


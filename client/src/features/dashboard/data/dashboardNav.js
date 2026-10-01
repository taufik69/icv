import { BookOpenIcon, FileTextIcon, GraduationCapIcon, HomeIcon, LayersIcon, PlusIcon } from '@/shared/components/icons'

// Sidebar + mobile tab items for the staff dashboard. `exact` marks items that are current only on their own path.
// `badge` names a live count the Sidebar fills in (demo counts from data/applications.js).
export const dashboardNav = [
  { label: 'Add course', to: '/dashboard/courses/new', Icon: PlusIcon, exact: true },
  { label: 'Courses', to: '/dashboard/courses', Icon: BookOpenIcon, exact: true },
  { label: 'Study areas', to: '/dashboard/study-areas', Icon: LayersIcon },
  { label: 'Levels', to: '/dashboard/levels', Icon: GraduationCapIcon },
  { label: 'Applications', to: '/dashboard/applications', Icon: FileTextIcon, badge: 'newApplications' },
]

export const siteLink = { label: 'View website', to: '/', Icon: HomeIcon }

// Placeholder signed-in user until auth exists.
export const staffUser = { name: 'Course admin', email: 'admin@icv.edu.au', initials: 'CA' }

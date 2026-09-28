import { GraduationCapIcon, HomeIcon, MenuIcon, PenLineIcon, PhoneIcon } from '@/shared/components/icons'

// Mobile bottom tab bar. `section` = element id used for scroll-spy (null = top of page).
// kind: 'section' scrolls on the home page, 'link' navigates, 'menu' opens the drawer.
export const bottomNavItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon, kind: 'section', section: null },
  { id: 'courses', label: 'Courses', Icon: GraduationCapIcon, kind: 'section', section: 'courses' },
  { id: 'apply', label: 'Apply', Icon: PenLineIcon, kind: 'link', href: 'https://icv.edu.au/enquire-now/' },
  { id: 'contact', label: 'Contact', Icon: PhoneIcon, kind: 'section', section: 'contact' },
  { id: 'menu', label: 'Menu', Icon: MenuIcon, kind: 'menu' },
]

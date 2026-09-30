import { GraduationCapIcon, PresentationIcon } from '@/shared/components/icons'

// Copy for the Student / Trainer portal sign-in (UI only — nothing is sent yet).
export const portalRoles = {
  student: {
    label: 'Student',
    Icon: GraduationCapIcon,
    blurb: 'Classes, assessments and results',
    title: 'Student sign in',
    lead: 'See your timetable, submit assessments and check your results.',
    userLabel: 'Username or student ID',
    userPlaceholder: 'e.g. jsmith24',
    submit: 'Sign in as student',
  },
  trainer: {
    label: 'Trainer',
    Icon: PresentationIcon,
    blurb: 'Rolls, marking and resources',
    title: 'Trainer sign in',
    lead: 'Mark attendance, assess submissions and manage your class resources.',
    userLabel: 'Username or staff email',
    userPlaceholder: 'name@icv.edu.au',
    submit: 'Sign in as trainer',
  },
}

export const portalAside = {
  title: 'Your learning, in one place.',
  lead: 'One portal for ICV students and trainers, on campus or online.',
  image: {
    src: '/images/wellbeing-students-1500.webp',
    srcSet: '/images/wellbeing-students-750.webp 750w, /images/wellbeing-students-1500.webp 1500w',
    alt: '',
  },
}

export const portalHelp = { label: 'Trouble signing in? Call 03 9942 1836', href: 'tel:0399421836' }

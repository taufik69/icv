import {
  BadgeCheckIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HammerIcon,
  MapPinIcon,
  UsersIcon,
} from '@/shared/components/icons'

export const introContent = {
  title: "Let's find the right course for you",
  subtitle:
    'International College of Victoria (ICV) is a registered training organisation delivering hands-on training to both local and international students',
  actions: [
    { label: 'Domestic Student', href: 'https://icv.edu.au/domestic/', variant: 'navy' },
    { label: 'International Student', href: 'https://icv.edu.au/international/', variant: 'green' },
  ],
  studyTitle: 'Study at International College of Victoria',
  points: {
    left: [
      { title: 'Certificate III to Diploma', text: 'Courses across various industry sectors for both local and international students.', Icon: GraduationCapIcon },
      { title: 'In the heart of Melbourne', text: 'Delivery locations across metropolitan Melbourne, close to where you live and work.', Icon: MapPinIcon },
      { title: 'Industry ready', text: 'A personalised approach built on practical skills, so you graduate ready to thrive in your career.', Icon: BriefcaseIcon },
    ],
    right: [
      { title: 'Passionate teachers', text: 'Trainers established in their professions, blending traditional learning with new educational technology.', Icon: UsersIcon },
      { title: 'Real-work environments', text: 'Classrooms and workshops simulate real work, and some courses include an industry work placement.', Icon: HammerIcon },
      { title: 'VET Quality Framework', text: 'As a Registered Training Organisation we meet the training delivery requirements of the VQF.', Icon: BadgeCheckIcon },
    ],
  },
  video: {
    videoId: 'h69D6jiwoHQ',
    title: 'International College of Victoria',
    label: 'Watch our story',
    image: {
      src: '/images/video-card-720.webp',
      srcSet: '/images/video-card-420.webp 420w, /images/video-card-720.webp 720w',
      sizes: '(min-width: 1024px) 360px, (min-width: 640px) 420px, 90vw',
      alt: 'ICV construction students learning on site',
    },
  },
}

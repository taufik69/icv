import { BadgeCheckIcon, GraduationCapIcon, MapPinIcon } from '@/shared/components/icons'

export const welcomeContent = {
  eyebrow: 'Study in Australia',
  title: 'Students around the world are',
  highlight: 'welcome to ICV',
  text: 'Are you planning to study in Australia? At International College of Victoria (ICV) based in Melbourne, we help you achieve your full potential and get the skills you need to succeed, no matter which path you choose.',
  actions: [
    { label: 'Apply Now', href: 'https://icv.edu.au/enquire-now/', variant: 'primary' },
    { label: 'International courses', href: 'https://icv.edu.au/international/', variant: 'outline' },
  ],
  facts: [
    { label: 'Melbourne, Victoria', Icon: MapPinIcon },
    { label: 'CRICOS 03649A', Icon: GraduationCapIcon },
    { label: 'RTO 22581', Icon: BadgeCheckIcon },
  ],
  image: {
    src: '/images/melbourne-skyline-740.webp',
    srcSet: '/images/melbourne-skyline-480.webp 480w, /images/melbourne-skyline-740.webp 740w',
    alt: 'Melbourne city skyline and Princes Bridge at sunrise with hot air balloons',
    caption: 'Study in Melbourne, Australia',
  },
}

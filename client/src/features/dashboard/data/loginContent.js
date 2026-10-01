import { BookOpenIcon, LayersIcon, LockIcon } from '@/shared/components/icons'

// Copy and photo for the staff sign-in page.
export const loginAside = {
  image: {
    src: '/images/dom-site-manager-1024.webp',
    srcSet: '/images/dom-site-manager-640.webp 640w, /images/dom-site-manager-1024.webp 1024w',
    alt: '',
  },
  eyebrow: 'Course administration portal',
  title: 'Manage every course with',
  highlight: 'clarity.',
  lead: 'Update fees, intakes, units and student pathways from one secure workspace.',
  features: [
    { label: 'Course management', Icon: BookOpenIcon, tone: 'bg-secondary' },
    { label: 'Secure', Icon: LockIcon, tone: 'bg-primary/15' },
    { label: 'Centralised', Icon: LayersIcon, tone: 'bg-primary/30' },
  ],
}

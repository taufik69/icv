import { HammerIcon, HeartIcon } from '@/shared/components/icons'

export const careersCtaContent = {
  eyebrow: 'Enrol for 2026',
  title: ['Smart Training.', 'Real Careers.'],
  subtitle:
    'Government Funded Building and Construction courses available and Fee for Service options for our community service students!!',
  action: { label: 'Book now to start your educational journey', href: 'https://icv.edu.au/enquire-now/' },
  secondary: { label: 'Explore courses', to: '/', hash: 'courses' },
  options: [
    {
      tag: 'Government Funded',
      title: 'Building and Construction',
      to: '/domestic',
      Icon: HammerIcon,
      image: '/images/dom-builder-750.webp',
    },
    {
      tag: 'Fee for Service',
      title: 'Community Services',
      to: '/domestic/cert-iv-ageing-support',
      Icon: HeartIcon,
      image: '/images/dom-ecec-teacher-640.webp',
    },
  ],
}

import {
  BadgeCheckIcon,
  BriefcaseIcon,
  CalendarIcon,
  HeartIcon,
  PresentationIcon,
  UsersIcon,
} from '@/shared/components/icons'

// Copy and images from icv.edu.au/about/ (images re-encoded to WebP in public/images/).
export const heroContent = {
  eyebrow: 'About ICV',
  title: 'Building knowledge,',
  highlight: 'building futures',
  lead: 'International College of Victoria is a Melbourne-based training provider helping Domestic and International students build practical skills, recognised qualifications and confident careers.',
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
  stats: [
    { value: '2013', label: 'Established' },
    { value: '10+', label: 'Years of training' },
    { value: '22581', label: 'RTO code' },
    { value: '03649A', label: 'CRICOS code' },
  ],
}

export const whyContent = {
  eyebrow: 'Why ICV',
  title: 'Why study with',
  highlight: 'ICV?',
  text: 'Practical, nationally recognised training delivered by dedicated trainers, in a community that welcomes every background.',
  image: {
    src: '/images/about-student-1200.webp',
    srcSet: '/images/about-student-640.webp 640w, /images/about-student-1200.webp 1200w',
    alt: 'ICV student with a backpack in a bright campus library',
    caption: 'West Melbourne, VIC',
  },
  points: [
    { label: '10+ years in education & training', Icon: CalendarIcon },
    { label: 'Nationally recognised RTO', Icon: BadgeCheckIcon },
    { label: 'Domestic and International students', Icon: UsersIcon },
    { label: 'Flexible learning environment', Icon: PresentationIcon },
    { label: 'Multicultural diversity', Icon: HeartIcon },
    { label: 'Industry partnerships', Icon: BriefcaseIcon },
  ],
  action: { label: 'Join now', href: 'https://icv.edu.au/enquire-now/' },
}

export const accreditationContent = {
  eyebrow: 'Accredited by',
  title: 'Nationally recognised training you can trust',
  text: 'ICV is a registered training organisation delivering qualifications under the Australian Qualifications Framework, and is registered on CRICOS to teach international students.',
  logo: {
    src: '/images/aqf-nrt-logos.webp',
    alt: 'Australian Qualifications Framework and Nationally Recognised Training logos',
  },
  ids: [
    { label: 'ABN', value: '47 159 302 682' },
    { label: 'RTO Code', value: '22581' },
    { label: 'CRICOS Code', value: '03649A' },
  ],
}

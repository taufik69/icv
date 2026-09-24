export const heroContent = {
  eyebrow: 'International College of Victoria',
  headline: ['Welcome to ', 'ICV'],
  highlightLine: 1,
  description:
    'A registered training organisation delivering hands-on training to both local and international students.',
  actions: [
    { label: 'Domestic Student', href: 'https://icv.edu.au/domestic/', variant: 'primary' },
    { label: 'International Student', href: 'https://icv.edu.au/international/', variant: 'outline' },
  ],
  cards: [
    {
      title: 'Our Trending Courses',
      cta: 'Explore courses',
      href: 'https://icv.edu.au/domestic/',
      image: '/images/card-trending.webp',
    },
    {
      title: 'Enrol Now',
      cta: 'Apply now',
      href: 'https://icv.edu.au/enquire-now/',
      image: '/images/card-carpentry.webp',
    },
    {
      title: 'Student Wellbeing Services',
      cta: 'Learn more',
      href: 'https://icv.edu.au/student-wellbeing-centre/',
      image: '/images/card-students.webp',
    },
  ],
  poster: {
    small: '/images/hero-poster-640.webp',
    large: '/images/hero-poster-1280.webp',
  },
  // Background-mode Vimeo embed (muted, looped, no controls)
  video: { vimeoId: '560150239', hash: '9290a15a9f' },
}

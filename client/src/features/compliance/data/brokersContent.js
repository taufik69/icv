// Copy from icv.edu.au/brokers/ ("ICV has no sub-contractors and brokers for 2026").
export const brokersHero = {
  eyebrow: 'Transparency',
  title: 'Brokers and',
  highlight: 'Subcontractors',
  lead: 'Our current position on education brokers and third-party subcontractors.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const brokersStatement = {
  year: '2026',
  label: 'Current status',
  statement: 'ICV has no sub-contractors and brokers for 2026.',
  counts: [
    { value: '0', label: 'Brokers' },
    { value: '0', label: 'Subcontractors' },
  ],
}

export const brokersCta = {
  title: 'Have a question?',
  text: 'Contact us about brokers, subcontractors or any of our compliance information.',
  actions: [
    { label: '03 9942 1836', href: 'tel:0399421836', kind: 'phone' },
    { label: 'info@icv.edu.au', href: 'mailto:info@icv.edu.au', kind: 'mail' },
  ],
}

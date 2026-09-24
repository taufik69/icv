// Copy from icv.edu.au/education-agents/ ("ICV Education Agents List (International) – Current List 2026").
export const heroContent = {
  eyebrow: 'International',
  title: 'Education',
  highlight: 'Agents',
  lead: 'The current list of education agents representing International College of Victoria for international students.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const agentsList = {
  eyebrow: 'International',
  title: 'ICV Education Agents List',
  subtitle: 'Current list 2026',
  columns: ['No.', 'Given name', 'Last name', 'Company name'],
  agents: [
    { givenName: 'Ubaid', lastName: 'Raza', company: 'Ed Link Education and Visa Services' },
    { givenName: 'Saeda', lastName: 'Naz', company: 'NF Consultancy' },
    { givenName: 'Sema', lastName: 'Yazici', company: 'Real International Education' },
  ],
}

export const agentsCta = {
  title: 'Questions about an agent?',
  text: 'Contact our admissions team to confirm an agent or get help with your application.',
  actions: [
    { label: '03 9942 1836', href: 'tel:0399421836', kind: 'phone' },
    { label: 'info@icv.edu.au', href: 'mailto:info@icv.edu.au', kind: 'mail' },
  ],
}

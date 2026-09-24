import { ChartIcon, ShieldCheckIcon } from '@/shared/components/icons'

const UPLOADS = 'https://icv.edu.au/wp-content/uploads/2024/04'

// Documents listed on icv.edu.au/compliance-reports/ (details read from the PDFs themselves).
export const heroContent = {
  eyebrow: 'Transparency',
  title: 'Compliance and',
  highlight: 'Reports',
  lead: 'Independent audit and performance reports for International College of Victoria, available to read or download.',
  trail: [{ label: 'About us', to: '/about' }],
  image: {
    src: '/images/about-banner-1500.webp',
    srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
    width: 1500,
    height: 650,
    alt: 'Smiling ICV students holding books and notes',
  },
}

export const reportsContent = {
  eyebrow: 'Reports',
  title: 'Audit & performance',
  highlight: 'documents',
  reports: [
    {
      category: 'ASQA Audit Report',
      title: 'CRICOS Audit Report 2020',
      text: 'Audit report for Victorian Education and Training Group Pty Ltd, RTO 22581 and CRICOS 03649A.',
      meta: [
        { label: 'Audit date', value: '4 Aug 2020' },
        { label: 'Pages', value: '7' },
        { label: 'Size', value: '389 KB' },
      ],
      href: `${UPLOADS}/ASQA-Audit-Report-2020.pdf`,
      Icon: ShieldCheckIcon,
    },
    {
      category: 'VETStat Report',
      title: '2020 RTO Performance Summary',
      text: 'Results of the 2020 Student Satisfaction and Employer Satisfaction surveys. 71 ICV students took part, a 47.3% response rate.',
      meta: [
        { label: 'Published', value: '16 Oct 2020' },
        { label: 'Pages', value: '10' },
        { label: 'Size', value: '130 KB' },
      ],
      href: `${UPLOADS}/VETStat-Summary-Report-International-College-of-Victoria.pdf`,
      Icon: ChartIcon,
    },
  ],
}

export const complianceCta = {
  title: 'Questions about our compliance?',
  text: 'Our team is happy to help with any question about our registration, audits or reports.',
  actions: [
    { label: '03 9942 1836', href: 'tel:0399421836', kind: 'phone' },
    { label: 'info@icv.edu.au', href: 'mailto:info@icv.edu.au', kind: 'mail' },
  ],
}

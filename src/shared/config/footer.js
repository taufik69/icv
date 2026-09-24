import { FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, XIcon, YoutubeIcon } from '@/shared/components/icons'

const ICV = 'https://icv.edu.au'

export const contactCards = [
  { title: 'Address', Icon: MapPinIcon, lines: [{ label: 'Level 1, 541 King St, West Melbourne VIC 3003', href: 'https://maps.google.com/?cid=8709777154652596728' }] },
  { title: 'Phone number', Icon: PhoneIcon, lines: [{ label: '03 9942 1836', href: 'tel:0399421836' }, { label: '0481 338 352', href: 'tel:0481338352' }] },
  { title: 'Email address', Icon: MailIcon, lines: [{ label: 'info@icv.edu.au', href: 'mailto:info@icv.edu.au' }] },
]

export const quickLinks = [
  ['Home', '/'], ['About Us', '/about'], ['Compliance & Reports', '/about/compliance-reports'], ['Fee Schedule', '/student-info/fee-schedule'],
  ['Forms', '/student-info/forms'], ['Policies and Procedures', '/student-info/policies'],
  ['Information For Students', '/student-info/international-students'], ['USI', 'https://www.usi.gov.au/about-us'],
  ['DHA', 'https://www.homeaffairs.gov.au/'], ['Brokers & Subcontractors', '/about/brokers'],
  ['Online Service Standards', '/student-info/online-service-standards'], ['RPL', '/student-info/rpl'],
  ['Blog', `${ICV}/blog/`], ['Contact Us', `${ICV}/contact/`],
].map(([label, href]) => (href.startsWith('/') ? { label, to: href } : { label, href }))

export const reviewSummary = {
  name: 'International College of Victoria (ICV)',
  rating: 4.8,
  count: 95,
  writeHref: 'https://search.google.com/local/writereview?placeid=ChIJDe6N6a1a1moR-Gnh_yxY33g',
  allHref: 'https://search.google.com/local/reviews?placeid=ChIJDe6N6a1a1moR-Gnh_yxY33g',
}

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/internationalcollegeofvic/', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/internationalcollegeofvic/', Icon: InstagramIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@internationalcollegeofvict5228', Icon: YoutubeIcon },
  { label: 'X (Twitter)', href: 'https://twitter.com/int_college_Vic', Icon: XIcon },
]

export const legal = {
  entity: 'Victorian Education and Training Group Pty Ltd trading as International College Victoria',
  ids: ['ABN 47 159 302 682', 'RTO 22581', 'CRICOS 03649A'],
  acknowledgement:
    'We acknowledge all Aboriginal and Torres Strait Islander Traditional Custodians of Country and recognise their continuing connection to land, sea, culture and community. We pay our respects to Elders past and present.',
  welcome: 'We respect and welcome people of all backgrounds, genders, sexualities, abilities and cultures.',
}

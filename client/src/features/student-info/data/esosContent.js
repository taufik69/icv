import { pageHero } from './hero'

// Copy from icv.edu.au/international-student-information/ (ESOS Framework), verbatim.
// Paragraphs are arrays of segments: strings, or { text, href } where the original had a link.
const ATO = 'https://www.ato.gov.au/individuals-and-families/tax-file-number/what-is-a-tax-file-number'

export const esosHero = pageHero('ESOS', 'Framework')

export const esosSections = [
  {
    id: 'study-and-visa',
    title: 'Your Study and Visa Conditions',
    items: [
      {
        label: 'ESOS Framework',
        paragraphs: [
          ['As an international student in Australia, your rights are protected by law under the Education Services for Overseas Students (ESOS) Framework. This framework ensures you receive the quality of education you expect and that your tuition fees are protected.'],
          ['To learn more, please view the ESOS Framework information ', { text: 'here', href: 'https://www.education.gov.au/esos-framework/resources/international-students-factsheet' }, '.'],
        ],
      },
      {
        label: 'Student (subclass 500) Visa',
        paragraphs: [['It is crucial to understand and comply with the conditions of your student visa.'], ['For complete details, please visit the Department of Home Affairs website for the Student (subclass 500) visa.']],
      },
    ],
  },
  {
    id: 'rights-at-work',
    title: 'Your Rights at Work in Australia',
    intro: 'All people working in Australia, including international students, have workplace rights and protections. These rights are enforced by Australian law and cannot be changed or removed by your employer.',
    items: [
      {
        label: 'Workplace Rights and Pay',
        paragraphs: [
          ['The Fair Work Ombudsman (FWO) is a free government service that provides information and assistance on pay rates, working hours, leave entitlements, and resolving workplace issues.'],
          ['Visit their dedicated page for visa holders and international students, which includes resources in multiple languages.'],
          ['You can also call the FWO within Australia on ', { text: '13 13 94', href: 'tel:131394' }, '. For language assistance, use the Translating and Interpreting Service at ', { text: '13 14 50', href: 'tel:131450' }, '.'],
        ],
      },
      {
        label: 'National Minimum Wage',
        paragraphs: [
          ['To ensure you are being paid correctly, you can use the official Pay and Conditions Tool.'],
          ['You can calculate your correct pay and entitlements using the Pay and Conditions Tool at ', { text: 'www.fairwork.gov.au/pay', href: 'http://www.fairwork.gov.au/pay' }],
        ],
      },
      {
        label: 'Tax File Number (TFN)',
        paragraphs: [
          ['To work and get paid in Australia, you must apply for a Tax File Number (TFN) from the Australian Taxation Office (ATO).'],
          ['You can apply for your TFN online via the ', { text: 'ATO website.', href: ATO }],
        ],
      },
    ],
  },
  {
    id: 'safety-and-wellbeing',
    title: 'Your Safety and Wellbeing',
    intro: 'Your personal safety is a priority. We encourage you to familiarise yourself with the support services available.',
    items: [
      { label: 'Family Safety Pack', paragraphs: [['The Australian Government provides important information regarding Australia’s laws on domestic and family violence, sexual assault, and forced marriage.']] },
      { label: 'Character Requirements', paragraphs: [['As a visa holder, you must obey all Australian laws. Your visa may be at risk if you engage in criminal activity.']] },
    ],
  },
  {
    id: 'your-details',
    title: 'Managing Your Details and Important Links',
    intro: 'It is your responsibility to keep your information up to date and check your visa conditions regularly.',
    links: [
      { label: 'Check your visa details in VEVO', note: 'www.homeaffairs.gov.au/vevo', href: 'https://immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions' },
      { label: 'Update your details in ImmiAccount', note: 'www.homeaffairs.gov.au/immiaccount', href: 'https://immi.homeaffairs.gov.au/help-support/applying-online-or-on-paper/online' },
      { label: 'More information from Home Affairs', note: 'www.homeaffairs.gov.au', href: 'https://www.homeaffairs.gov.au/' },
    ],
  },
]

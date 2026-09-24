import { pageHero } from './hero'

// Copy from icv.edu.au/online-service-standards/ (sections 1–3; 4–7 in standardsContentMore.js).
// item = { label?, text?, points?: (string | { label, text })[] }
export const standardsHero = pageHero('Online Service', 'Standards')
export const standardsTitle = 'ICV Online Service Standards'

export const standardsPart1 = [
  {
    id: 'commitment',
    title: 'Our Commitment to a Quality Online Learning Experience',
    intro: 'ICV is committed to providing a high-quality, supportive, and engaging learning experience for all students studying online. These standards explain our commitments and your rights and responsibilities as a learner. Our services are designed and delivered to comply with the Standards for RTOs 2025, the Australian Consumer Law, and the Privacy Act 1988.',
    items: [],
  },
  {
    id: 'before-you-enrol',
    title: 'Before You Enrol: Ensuring an Informed Choice',
    intro: 'We are committed to providing you with accurate and comprehensive information to help you make an informed decision about your studies.',
    items: [
      { label: '2.1 Marketing and Advertising', text: 'All our marketing materials will provide a realistic overview of the course and will include our RTO Name and Code, and the full training product code and title. We do not guarantee employment outcomes.' },
      { label: '2.2 Pre-Training Review (PTR)', text: 'Before you can enrol, you must complete a Pre-Training Review. This is a crucial step where we work with you to ensure the course is suitable for your individual needs, existing skills, and career goals. This process includes an assessment of your Language, Literacy, and Numeracy (LLN) skills and your digital literacy to ensure you have the required capabilities to succeed in an online environment.' },
      {
        label: '2.3 Pre-Enrolment Information',
        text: 'Before you enrol or pay any fees, we will provide you with clear information on:',
        points: [
          'Course content, duration, delivery modes, and assessment methods.',
          'A full schedule of fees and charges, including tuition fees, material costs, and any other charges.',
          'Our Withdrawal and Refund Policy, and our Complaints and Appeals Policy.',
          'The support services available to you, including academic, technical, and wellbeing support.',
          'The minimum IT requirements for accessing our online platforms (Microsoft Teams and aXcelerate).',
        ],
      },
    ],
  },
  {
    id: 'learner-support',
    title: 'Learner Support: An Integrated Service Framework',
    intro: 'We provide a holistic support system to assist you throughout your learning journey. Our support services are equivalent for both online and on-campus learners.',
    items: [
      {
        label: '3.1 Academic and Administrative Support',
        points: [
          { label: 'Trainers/Assessors', text: 'Are available for queries about learning and assessment via Email, Phone, and Microsoft Teams, Monday to Friday, 9am – 5pm (AEST/AEDT, excluding public holidays). We are committed to responding to queries within 48 business hours.' },
          { label: 'Administrative Staff', text: 'Are available for queries regarding enrolment, fees, and records via phone and email, Monday to Friday, 9am – 5pm. We are committed to responding within 48 business hours.' },
          { label: 'Course Coordinators', text: 'Are available for more complex academic matters by appointment.' },
        ],
      },
      { label: '3.2 IT Support', text: 'For technical issues with our learning platforms, IT support is available via phone and email, Monday to Friday, 10am – 4pm, and Saturday, 10am – 2pm. We are committed to responding within 48 business hours.' },
      {
        label: '3.3 Wellbeing and Accessibility Support',
        points: [
          { label: 'Counselling Services', text: 'Confidential counselling services are available by appointment to support your wellbeing.' },
          { label: 'Reasonable Adjustment', text: 'We are committed to making reasonable adjustments for students with a disability. If you have a disability or specific learning need, we encourage you to discuss this with us so we can work with you to implement appropriate support.' },
        ],
      },
      {
        label: '3.4 Service Level Commitments',
        points: [
          { label: 'Queries', text: 'All email and phone queries to trainers or administration will be responded to within 48 business hours.' },
          { label: 'Assessments', text: 'Assessments will be marked and returned with feedback via aXcelerate within 14 calendar days of submission.' },
        ],
      },
    ],
  },
]

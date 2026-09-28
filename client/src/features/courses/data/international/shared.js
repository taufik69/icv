import { links } from '../links'

// Copy repeated word-for-word across the international course pages on icv.edu.au.
export const intlCopy = {
  minAge: (age) => [{ heading: 'Minimum Age Requirement:' }, `${age} years or older at commencement of course.`],
  englishIntro: [{ heading: 'Minimum English Language Requirement:' }, 'To demonstrate English proficiency, you must provide us with one of the following:'],
  ielts: [
    'IELTS band score of overall 6 (Academic ) or equivalent in line with the Department of Education and department of Home Affairs (DHA) Regulations (For International Students) for specific countries, or',
    'IELTS overall band score of 5.5 when packaged with at least 10 weeks’ English Language Intensive Course for Overseas Students (ELICOS), or',
    'IELTS overall band score of 5 when packaged with at least 20 weeks’ ELICOS, or',
  ],
  academic: (level) => [{ heading: 'Minimum Academic Qualification Requirement:' }, `Australian ${level} or Equivalent`],
  additional: (who = 'ICV') => ({
    title: 'Additional Requirements:',
    parts: [{ list: [
      `${who} will conduct LLN assessment on the orientation day to assess student’s Language, Literacy and Numeracy levels. LLN assessment will be conducted to identify the right level of support required by the students. This support will enable them to complete qualifications successfully in required time.`,
      'This LLN assessment is not a barrier to the entry in the course.',
    ] }],
  }),
  entryIntro: (pkg) => `Whilst there are no entry requirements stipulated in the training package (${pkg}), ICV requires its applicants to meet the following criteria:`,
  rplFormal: {
    title: 'RPL/CREDIT TRANSFER',
    sections: [
      { title: 'Recognition of prior learning (RPL)', parts: ['Learners can demonstrate competency through formal, non-formal and informal learning:'] },
      {
        title: 'Read More',
        collapsible: true,
        parts: [
          'formal learning refers to learning that takes place through a structured program of instruction and is linked to the attainment of an AQF qualification or statement of attainment (for example, a certificate, diploma or university degree);',
          'non-formal learning refers to learning that takes place through a structured program of instruction, but does not lead to the attainment of an AQF qualification or statement of attainment (for example, in-house professional development programs conducted by a business); and informal learning refers to learning that results through experience of work-related, social, family, hobby or leisure activities.',
          'Learners are encouraged to apply for RPL prior to or immediately after formal enrolment but prior to the facilitated delivery of units to ensure that they do not miss any class/workshop opportunities offered should they be unsuccessful in the RPL process.',
        ],
      },
      { title: 'Credit Transfer', parts: ['RTO recognises the AQF Qualifications and Statement of Attainments issued by any other Registered Training Organisation.'] },
    ],
  },
  cta: (flyer, ask = 'Ask us about scholarship or referral programs.') => ({
    title: 'Apply Online Now!',
    headline: ask,
    lines: [],
    actions: [{ label: 'ENQUIRE NOW', href: links.enquire }, { label: 'COURSE FLYER', href: `${links.uploads}/2025/03/${flyer}` }],
  }),
  actions: [{ label: 'Enrol Now', href: links.enrol }, { label: 'ENQUIRE NOW', href: links.enquire }],
  prereqNote: 'An asterisk (*) against a unit code below indicates that there is a pre-requisite requirement that must be met. Prerequisite unit(s) must be assessed before assessment of any unit of competency with an asterisk. Two asterisks (**) against a unit code below indicates that there is multiple pre-requisite requirements that must be met. All prerequisite requirements are packaged in the qualification.',
}

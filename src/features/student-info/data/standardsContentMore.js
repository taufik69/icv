// Copy from icv.edu.au/online-service-standards/ (sections 4–7).
export const standardsPart2 = [
  {
    id: 'learning-environment',
    title: 'The Online Learning Environment',
    items: [
      { label: '4.1 Learning Materials', text: 'We provide interactive learning materials in a variety of formats, including video content, PowerPoint slides, guided content, discussion forums, and downloadable PDFs. All materials are regularly reviewed for currency and accuracy.' },
      {
        label: '4.2 Learner Engagement and Progress',
        text: 'We expect you to actively engage in your course. Our trainers will monitor your progress through the aXcelerate platform.',
        points: [
          { label: 'Early Intervention', text: 'If we notice you are becoming inactive or falling behind, we will proactively contact you to offer support and help you get back on track.' },
          { label: 'Withdrawal for Non-Engagement', text: 'If you are inactive for a continuous period of 8 weeks and do not respond to our attempts to contact you and offer support, you may be deemed to have withdrawn from the course. We will follow a fair process, including multiple contact attempts and issuing a formal ‘Intention to Withdraw’ letter, before any action is taken. You will have the right to appeal this decision.' },
        ],
      },
    ],
  },
  {
    id: 'assessment-integrity',
    title: 'Assessment Integrity',
    items: [
      { label: '5.1 Assessment Methods', text: 'You will be assessed using a minimum of two forms of assessment for each unit of competency. Methods may include written/verbal questions, projects, case studies, observation (via video), and portfolios.' },
      { label: '5.2 Authenticity', text: 'You must submit your own original work for all assessments. ICV uses a range of methods to ensure academic integrity, which may include plagiarism detection software and oral questioning to verify your knowledge.' },
      { label: '5.3 Principles', text: 'All assessments are conducted in line with the Principles of Assessment (Fairness, Flexibility, Validity, Reliability) and the Rules of Evidence (Validity, Sufficiency, Authenticity, Currency).' },
    ],
  },
  {
    id: 'vet-workforce',
    title: 'Our VET Workforce',
    intro: 'All ICV trainers and assessors hold the required credentials as specified in the Standards for RTOs 2025: Credential Policy. They possess current industry skills and undertake regular professional development, including in the field of online training and assessment.',
    items: [],
  },
  {
    id: 'privacy',
    title: 'Information Privacy and Data Security',
    intro: 'ICV is committed to protecting your personal information in accordance with the Privacy Act 1988.',
    items: [
      { label: '7.1 Collection and Use', text: 'We only collect personal information that is necessary for us to provide you with training and to meet our legal and regulatory obligations. Our full Privacy Policy, which is available on our website, provides detailed information on how we manage your data.' },
      { label: '7.2 Data Security', text: 'We take reasonable steps to protect your personal information from misuse, loss, and unauthorised access. All our data is stored on secure cloud servers. We have confirmed that all student personal data is stored on servers located within Australia.' },
      { label: '7.3 Record Keeping', text: 'We retain records of your AQF qualifications for 30 years and your completed assessment items for at least 2 years, as required by our regulator.' },
    ],
  },
]

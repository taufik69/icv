// The eight tabs of the online enrolment form. `sections` are the matching letters on the paper form,
// so staff can cross-check an online application against the PDF.
export const enrolmentSteps = [
  { id: 'course', sections: 'A', title: 'Course', lead: 'Pick the course and the year you want to start.' },
  { id: 'personal', sections: 'B', title: 'Personal details', lead: 'Enter your name exactly as it appears in your passport.' },
  { id: 'contact', sections: 'C, D', title: 'Contact', lead: 'Where we can reach you, and someone to call in an emergency.' },
  { id: 'health', sections: 'E', title: 'Health cover', lead: 'Overseas Student Health Cover (OSHC) and anything that may affect your studies.' },
  { id: 'education', sections: 'F, G', title: 'Education and English', lead: 'Your qualifications and any English test or course you have taken.' },
  { id: 'visa', sections: 'H, I', title: 'Visa', lead: 'Your current Australian visa, and where your application is or will be lodged.' },
  { id: 'agent', sections: 'J, K', title: 'Agent', lead: 'How you heard about ICV, and your agent if you are applying through one.' },
  { id: 'declaration', sections: 'L, M, N', title: 'Documents and declaration', lead: 'Check your documents, then sign the declaration to send your application.' },
]

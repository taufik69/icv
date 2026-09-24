import { pageHero } from './hero'

const UP = 'https://icv.edu.au/wp-content/uploads'
const doc = (title, href) => ({ title, href })

// Copy and files from icv.edu.au/policies-and-procedures-2/ and /forms/ (titles as published).
export const policiesContent = {
  hero: pageHero('Policies and', 'Procedures'),
  action: 'Download',
  docs: [
    doc('Enrolment Policy and Procedure (International Students)', `${UP}/2025/07/Enrolment-Policy-and-Procedure-3.3-International.pdf`),
    doc('Complaints and Appeals Policy and Procedure', `${UP}/2025/07/Complaints-and-Appeals-Policy-V4.5-effective-July-2025-1.pdf`),
    doc('Disciplinary Policy and Procedure', `${UP}/2025/07/Disciplinary-Policy-and-Procedures-V3.0.pdf`),
    doc('Privacy Policy 2025', `${UP}/2025/07/Monitoring-attendance-and-Course-progress-Policy-and-Procedure-International-V5.0.pdf`),
    doc('Monitoring course progress', `${UP}/2025/07/Monitoring-attendance-and-Course-progress-Policy-and-Procedure-International-V5.0-1.pdf`),
    doc('Student Handbook International', `${UP}/2025/07/Student-Handbook-International-V3.1-effective-July-2025-1.pdf`),
    doc('Student Code of Conduct', `${UP}/2025/07/Student-Code-of-Conduct-V5.0.pdf`),
    doc('Credit Transfer Policy and Procedure', `${UP}/2025/07/Credit-Transfer-Policy-and-Procedure-V4.0.pdf`),
    doc('Access and Equity', `${UP}/2025/07/Access-and-Equity-Policy-V3.2.pdf`),
    doc('Fees, charges and refunds Policy and Procedure', `${UP}/2025/07/Fees-charges-and-refunds-Policy-V4.0.pdf`),
    doc('Student Handbook – Domestic', 'https://icv1-my.sharepoint.com/:b:/g/personal/alisha_p_icv_edu_au/IQCSh-cKCZxGS58ysZh4SNedASqShP1m9pE3jO04G6bAXlo?e=3doipN'),
  ],
}

export const formsContent = {
  hero: pageHero('', 'Forms'),
  heading: 'International Student Forms',
  docs: [
    doc('Enrolment Form (International Students)', `${UP}/2025/07/Enrolment-Application-Form-International-V7.2.2025.pdf`),
    doc('Student Request Form', `${UP}/2024/04/STUDENT-REQUEST-FORM-V2.0-1.pdf`),
    doc('Release Letter Request Form', `${UP}/2024/04/Application-for-Letter-of-Release-v2.0.docx`),
    doc('Certificate Request Form', `${UP}/2024/04/Certificate-Request-Form.pdf`),
    doc('Credit Card Authorization Form', `${UP}/2024/04/Credit-Card-Authorisation-Form.pdf`),
    doc('Complaint and Appeal Lodgement Form', `${UP}/2024/04/Complaint-and-Appeal-Lodgement-Form.pdf`),
    doc('Student Change of details form', `${UP}/2025/07/Student-Change-of-Details-Form-V1.2.pdf`),
    doc('Education Agent Broker Feedback Form', `${UP}/2025/07/Education-Agent-Broker-Feedback-Form-V1.5.pdf`),
  ],
}

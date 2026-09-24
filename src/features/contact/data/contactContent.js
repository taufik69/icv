// Copy from icv.edu.au/contact/, verbatim. Contact details come from the shared footer config (same values).
export const contactContent = {
  hero: {
    title: 'CONTACT US',
    image: {
      src: '/images/about-banner-1500.webp',
      srcSet: '/images/about-banner-750.webp 750w, /images/about-banner-1500.webp 1500w',
      width: 1500,
      height: 650,
      alt: 'Smiling ICV students holding books and notes',
    },
  },
  website: { label: 'www.icv.edu.au', href: 'https://icv.edu.au/' },
  map: {
    title: 'International College of Victoria (ICV) on Google Maps',
    src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0272571775067!2d144.9519620750504!3d-37.81283053398333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65aade98dee0d%3A0x78df582cffe169f8!2sInternational%20College%20of%20Victoria%20(ICV)!5e0!3m2!1sen!2sin!4v1713459665715!5m2!1sen!2sin',
  },
  form: {
    title: 'Enrol For Courses Today',
    submit: 'Submit',
    to: 'info@icv.edu.au',
    studentTypes: ['Domestic student', 'International student'],
    courses: [
      'CHC30121 - Certificate III in Early Childhood Education and Care',
      'CHC50121 - Diploma of Early Childhood Education and Care',
      'CHC43115 - Certificate IV in Disability',
      'CHC43015 - Certificate IV in Ageing Support',
      'CPC30220 - Certificate III in Carpentry',
      'CPC40120 - Certificate IV in Building and Construction',
      'CPC50220 - Diploma of Building and Construction (Building)',
      'CPCCWHS1001 - Prepare to Work Safely in the Construction Industry',
    ],
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      studentType: 'Are you a domestic student or an international student?',
      visa: 'What is current visa type/status?',
      location: 'Where are you currently located?',
      course: 'Course Enquiry',
      message: 'Additional Comment',
    },
    placeholderCourse: 'Please Select',
  },
}

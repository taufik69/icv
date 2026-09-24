// Photos from icv.edu.au/domestic/ and the domestic course pages, re-encoded to WebP in public/images/.
const I = '/images/'
const pic = (name, [w, h], alt, small) => ({
  src: `${I}${name}${small ? `-${w}` : ''}.webp`,
  srcSet: small ? `${I}${name}-${small}.webp ${small}w, ${I}${name}-${w}.webp ${w}w` : undefined,
  width: w,
  height: h,
  alt,
})

export const images = {
  studentsOutdoors: pic('dom-students-outdoors', [1500, 1001], 'Student with headphones using a tablet outdoors', 750),
  building: pic('dom-building', [1000, 655], 'Construction workers in hard hats on a building site', 640),
  building2: pic('dom-building-2', [887, 532], 'Construction team in hard hats in front of a crane'),
  builder: pic('dom-builder', [1500, 1000], 'Builder working with timber in a workshop', 750),
  siteManager: pic('dom-site-manager', [1024, 683], 'Two site managers reviewing plans on a timber frame build', 640),
  community: pic('dom-community', [1024, 682], 'Community services worker shaking hands with a client', 640),
  ecec: pic('dom-ecec', [1400, 788], 'Educator helping young children with an activity', 700),
  ececTeacher: pic('dom-ecec-teacher', [1024, 687], 'Teacher and children gathered around a laptop in class', 640),
  teacherDrawing: pic('dom-teacher-drawing', [800, 533], 'Educator drawing with young children'),
  careBanner: pic('dom-care-banner', [860, 420], 'Student writing notes beside a laptop'),
  buildingSite: pic('dom-building-site', [1920, 1080], 'Two builders in hard hats studying plans on site', 960),
  construction: pic('dom-construction', [1600, 1148], 'Building under construction silhouetted at sunset', 800),
  carpentry: pic('dom-carpentry', [872, 697], 'Carpentry students measuring timber with their trainer'),
  graduation: pic('dom-graduation', [800, 534], 'Graduates throwing their caps in the air'),
  worker: pic('dom-blueprints', [1600, 1067], 'Worker in a hard hat and hi-vis vest on a job site', 800),
  meeting: pic('dom-meeting', [900, 1350], 'Two construction professionals reviewing plans under a site canopy', 480),
  constructionCourses: pic('dom-construction-courses', [960, 400], 'Site supervisor and worker in hard hats beside a high-rise'),
  funding: pic('dom-funding', [1920, 615], 'Group of students sitting together holding books', 960),
  student: pic('about-student', [1200, 800], 'ICV student with a backpack in a bright campus library', 640),
  whiteCard: { src: '/images/dom-white-card.webp', width: 370, height: 351, alt: 'Smiling construction worker in a hard hat with his crew' },
  studying: { src: '/images/wellbeing-gallery.webp', width: 682, height: 306, alt: 'Student studying with notes and a laptop' },
}

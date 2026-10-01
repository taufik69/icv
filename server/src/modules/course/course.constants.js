// Allowed values for course fields. Keep in sync with the dashboard form options.
export const MARKETS = ['domestic', 'international']
export const STATUSES = ['draft', 'active', 'inactive', 'archived']
export const STUDY_AREAS = ['building', 'whiteCard', 'ecec', 'community', 'management']
export const LEVELS = ['Short course', 'Certificate III', 'Certificate IV', 'Diploma', 'Graduate Diploma']
export const DELIVERY = ['Face to face', 'Blended', 'In classroom', 'Online']
export const STUDY_MODES = ['Full-Time', 'Part-Time', 'Flexible']
export const FEE_KINDS = ['tuition', 'ffs', 'application', 'material', 'other']
export const UNIT_TYPES = ['core', 'elective']

// Projections. Card = landing grids; finder adds the typed facts and fees.
export const CARD_FIELDS = 'market slug code title level studyArea category summary images.card images.hero order featured externalUrl'
export const FINDER_FIELDS = `${CARD_FIELDS} facts fees`
export const ADMIN_LIST_FIELDS = `${CARD_FIELDS} status updatedAt`

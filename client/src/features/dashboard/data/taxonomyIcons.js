import {
  BadgeCheckIcon, BookOpenIcon, BriefcaseIcon, GlobeIcon, GraduationCapIcon, HammerIcon, HeartIcon, LayersIcon, SmileIcon, UsersIcon,
} from '@/shared/components/icons'

// Icon names a study area can store (server: taxonomy.constants.js ICONS) → icon components.
export const taxonomyIcons = {
  hammer: HammerIcon,
  badge: BadgeCheckIcon,
  smile: SmileIcon,
  heart: HeartIcon,
  briefcase: BriefcaseIcon,
  book: BookOpenIcon,
  graduation: GraduationCapIcon,
  users: UsersIcon,
  globe: GlobeIcon,
  layers: LayersIcon,
}

// The two lists staff manage. `icons` = items carry an icon (study areas only).
export const taxonomyPages = {
  'study-areas': {
    title: 'Study areas',
    noun: 'study area',
    description: 'Groups courses on the website: filter chips, the course finder and card labels.',
    placeholder: 'e.g. Hospitality',
    icons: true,
  },
  levels: {
    title: 'Levels',
    noun: 'level',
    description: 'The qualification level shown on course pages and used by the course finder filter.',
    placeholder: 'e.g. Advanced Diploma',
    icons: false,
  },
}

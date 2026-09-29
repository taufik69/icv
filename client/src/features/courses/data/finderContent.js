import { BookOpenIcon, CalendarIcon, ClockIcon, CoinsIcon, SparklesIcon } from '@/shared/components/icons'

// Copy for the course finder at /courses.
export const finderContent = {
  badge: 'Course finder',
  title: 'Find your course',
  lead: 'Nationally recognised qualifications for domestic and international students. Search by name or code, then narrow the list with the filters.',
  searchLabel: 'Search courses',
  searchPlaceholder: 'Search course name or code',
  marketLabel: 'Student type',
  markets: [
    { id: 'all', label: 'All' },
    { id: 'domestic', label: 'Domestic' },
    { id: 'international', label: 'International' },
  ],
  // `chips` groups are short values shown as toggle pills; `list` groups are longer names with checkboxes.
  facets: [
    { key: 'area', label: 'Study area', variant: 'list' },
    { key: 'level', label: 'Qualification level', variant: 'chips' },
    { key: 'delivery', label: 'Delivery mode', variant: 'chips' },
    { key: 'length', label: 'Course length', variant: 'chips' },
  ],
  sortLabel: 'Sort by',
  sorts: [
    { value: 'recommended', label: 'Recommended', hint: 'Our suggested order', Icon: SparklesIcon },
    { value: 'title', label: 'Name, A to Z', hint: 'Alphabetical by course name', Icon: BookOpenIcon },
    { value: 'fee', label: 'Lowest fee', hint: 'Cheapest headline fee first', Icon: CoinsIcon },
    { value: 'shortest', label: 'Shortest first', hint: 'Quickest to finish', Icon: ClockIcon },
    { value: 'longest', label: 'Longest first', hint: 'Most in-depth first', Icon: CalendarIcon },
  ],
  marketNames: { domestic: 'Domestic', international: 'International' },
  saved: 'Saved',
  empty: {
    title: 'No courses match these filters',
    text: 'Remove a filter or try a different search term.',
  },
  emptySaved: {
    title: 'No saved courses yet',
    text: 'Tap the bookmark on a course to keep it here while you compare.',
  },
}

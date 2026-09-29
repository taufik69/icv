// Copy for the course finder at /courses.
export const finderContent = {
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
  sorts: [
    { id: 'recommended', label: 'Recommended' },
    { id: 'title', label: 'Name, A to Z' },
    { id: 'fee', label: 'Lowest fee' },
    { id: 'shortest', label: 'Shortest first' },
    { id: 'longest', label: 'Longest first' },
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

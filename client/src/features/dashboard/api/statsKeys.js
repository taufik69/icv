// Query keys for dashboard overview numbers.
export const statsKeys = {
  all: ['stats'],
  overview: (days) => [...statsKeys.all, 'overview', days],
}

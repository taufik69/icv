// Flattens a course's units (core/elective tuple lists, or table mode) into { code, title, type } rows.
export function unitRows(units) {
  if (!units) return []
  if (units.table) return units.table.rows.map(([code, title, type]) => ({ code, title, type }))
  const tag = (list = [], type) => list.map(([code, title]) => ({ code, title, type }))
  return [...tag(units.core, 'Core'), ...tag(units.elective, 'Elective')]
}

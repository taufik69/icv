// A course's unit list as table rows: { code, title, type } with the verbatim type label when there is one.
export const unitRows = (units) =>
  (units?.items ?? []).map((u) => ({ code: u.code, title: u.title, type: u.typeLabel ?? (u.type === 'core' ? 'Core' : 'Elective') }))

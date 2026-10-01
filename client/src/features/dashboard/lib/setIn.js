// Immutable set by dotted path: setIn({ a: { b: 1 } }, 'a.b', 2) → { a: { b: 2 } }.
export function setIn(obj, path, value) {
  const [head, ...rest] = path.split('.')
  if (!rest.length) return { ...obj, [head]: value }
  return { ...obj, [head]: setIn(obj?.[head] ?? {}, rest.join('.'), value) }
}

export const getIn = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj)

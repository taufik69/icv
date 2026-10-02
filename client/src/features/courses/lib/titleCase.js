// "SCHOLARSHIP AVAILABLE FOR INTERNATIONAL STUDENTS" → "Scholarship Available For International Students".
// For the live site's all-caps headings: same words, calmer case. Short codes like "ICV" stay as they are.
const KEEP = new Set(['ICV', 'RPL', 'OSHC', 'CRICOS', 'RTO'])

export function titleCase(text) {
  return text.replace(/[A-Za-z][A-Za-z'’]*/g, (word) => (KEEP.has(word) ? word : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`))
}

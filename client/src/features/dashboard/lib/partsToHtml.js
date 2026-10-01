// Imported "Parts" copy → HTML for the rich text editor (string → <p>, { heading } → <h3>,
// { list } / { chips } → <ul>). Used the first time an imported course description is edited.
const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const list = (items) => `<ul>${items.map((item) => `<li><p>${escape(item)}</p></li>`).join('')}</ul>`

export function partsToHtml(parts = []) {
  return parts
    .map((p) => {
      if (typeof p === 'string') return `<p>${escape(p)}</p>`
      if (p.heading) return `<h3>${escape(p.heading)}</h3>`
      if (p.list) return list(p.list)
      if (p.chips) return list(p.chips)
      return ''
    })
    .join('')
}

// A rich text field to show or edit: saved HTML first, else the imported Parts copy converted.
export const richHtml = (html, parts) => html ?? partsToHtml(parts)

export const overviewHtml = (overview) => richHtml(overview?.html, [...(overview?.paragraphs ?? []), ...(overview?.list ? [{ list: overview.list }] : [])])
export const entryHtml = (detail) => richHtml(detail?.entryRequirementsHtml, detail?.entryRequirements)
export const packagingHtml = (units) => richHtml(units?.html, units?.parts)

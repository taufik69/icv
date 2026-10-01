// Plain-text editing for "Parts" copy (see courses common/Parts). Blocks are separated by a blank line:
// a paragraph is plain text, "- " lines make a bullet list, "+ " lines make chips, "## " makes a heading.
const EDITABLE = (p) => typeof p === 'string' || p.list || p.chips || p.heading

export const canEditAsText = (parts = []) => parts.every(EDITABLE)

export function partsToText(parts = []) {
  return parts
    .map((p) => {
      if (typeof p === 'string') return p
      if (p.heading) return `## ${p.heading}`
      if (p.list) return p.list.map((item) => `- ${item}`).join('\n')
      if (p.chips) return p.chips.map((chip) => `+ ${chip}`).join('\n')
      return ''
    })
    .join('\n\n')
}

const allStart = (lines, prefix) => lines.every((l) => l.startsWith(prefix))
const strip = (lines) => lines.map((l) => l.slice(2).trim())

export function textToParts(text = '') {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length)
    .map((lines) => {
      if (allStart(lines, '- ')) return { list: strip(lines) }
      if (allStart(lines, '+ ')) return { chips: strip(lines) }
      if (lines.length === 1 && lines[0].startsWith('## ')) return { heading: lines[0].slice(3).trim() }
      return lines.join(' ')
    })
}

// One item per line, for simple string lists (careers, requirement items).
export const linesToList = (text = '') => text.split('\n').map((l) => l.trim()).filter(Boolean)
export const listToLines = (list = []) => list.join('\n')

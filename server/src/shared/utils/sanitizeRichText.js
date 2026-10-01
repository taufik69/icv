import sanitizeHtml from 'sanitize-html'

// Allow-list for rich text written in the dashboard editor: paragraphs, headings, lists, quotes,
// bold / italic / underline and links. Everything else (scripts, styles, attributes) is dropped.
const options = {
  allowedTags: ['p', 'h3', 'h4', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'br'],
  allowedAttributes: { a: ['href', 'target', 'rel'] },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, rel: 'noopener noreferrer' } }),
    b: 'strong',
    i: 'em',
    h1: 'h3',
    h2: 'h3',
  },
  exclusiveFilter: (frame) => frame.tag === 'p' && !frame.text.trim() && !frame.mediaChildren?.length,
}

export const sanitizeRichText = (html = '') => sanitizeHtml(html, options).trim()

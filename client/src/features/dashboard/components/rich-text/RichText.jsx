import { richTextClass } from './richTextClass'

// Read-only rich text. The HTML is sanitised by the API on save (allow-listed tags only).
export function RichText({ html, className = '' }) {
  return <div className={`${richTextClass} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}

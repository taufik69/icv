// One set of typography styles for rich text, used by both the editor and the read-only view,
// so the description looks the same while typing as it does once saved.
export const richTextClass = [
  // base.css justifies + hyphenates every <p> site-wide; rich text reads better ragged-right.
  'leading-relaxed text-ink [&_p]:text-left [&_p]:hyphens-none [&_li]:text-left',
  '[&>*+*]:mt-4 [&_li+li]:mt-1.5 [&_li>p]:mt-0',
  '[&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-secondary',
  '[&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-secondary',
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:marker:text-primary-hover',
  '[&_strong]:font-semibold [&_strong]:text-ink-strong',
  '[&_a]:font-semibold [&_a]:text-secondary [&_a]:underline [&_a]:decoration-primary [&_a]:decoration-2 [&_a]:underline-offset-2',
  '[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:text-ink-muted',
].join(' ')

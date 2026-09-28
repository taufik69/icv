import { CheckCircleIcon, ChevronDownIcon } from '@/shared/components/icons'

// Renders course copy "parts": string = paragraph, { list }, { chips }, { heading }, { sep: 'AND' | 'OR' },
// { more: parts, label } = collapsible block (native <details>).
// List items may be strings or { before?, text, href, after? } for an inline link.
function Item({ item }) {
  if (typeof item === 'string') return item
  return (
    <>
      {item.before}
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-hover">
        {item.text}
      </a>
      {item.after}
    </>
  )
}

export function Parts({ parts, tone = 'light' }) {
  const text = tone === 'dark' ? 'text-white/75' : 'text-ink-muted'
  const strong = tone === 'dark' ? 'text-white' : 'text-ink'

  return parts.map((part, i) => {
    if (typeof part === 'string') return <p key={i} className={`mt-4 leading-relaxed first:mt-0 ${text}`}>{part}</p>
    if (part.heading) return <h4 key={i} className={`mt-6 font-heading text-lg font-bold ${tone === 'dark' ? 'text-white' : 'text-secondary'}`}>{part.heading}</h4>
    if (part.sep) return <p key={i} className="my-4 flex items-center gap-3 font-condensed text-sm font-bold tracking-[0.3em] text-primary-hover"><span className="h-px flex-1 bg-line" />{part.sep}<span className="h-px flex-1 bg-line" /></p>
    if (part.more) {
      return (
        <details key={i} className="group mt-4 rounded-2xl bg-surface-muted/70 ring-1 ring-line-soft open:bg-surface open:shadow-raised">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-heading text-sm font-semibold text-secondary [&::-webkit-details-marker]:hidden">
            {part.label}
            <ChevronDownIcon className="size-4 text-primary-hover transition group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4">
            <Parts parts={part.more} tone={tone} />
          </div>
        </details>
      )
    }
    if (part.chips) {
      return (
        <ul key={i} className="mt-4 flex flex-wrap gap-2">
          {part.chips.map((c) => (
            <li key={c} className={`rounded-pill px-4 py-2 font-heading text-sm font-semibold ring-1 ${tone === 'dark' ? 'bg-white/10 text-white ring-white/15' : 'bg-primary-soft text-secondary ring-primary/25'}`}>{c}</li>
          ))}
        </ul>
      )
    }
    return (
      <ul key={i} className="mt-4 grid gap-2.5">
        {part.list.map((item, j) => (
          <li key={j} className={`flex items-start gap-3 leading-relaxed ${strong}`}>
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary-hover" />
            <span><Item item={item} /></span>
          </li>
        ))}
      </ul>
    )
  })
}

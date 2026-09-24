// A paragraph made of segments: plain strings, or { text, href } for an inline link (tel: stays in-tab, others open new tab).
export function RichText({ parts, className = 'leading-relaxed text-ink-muted' }) {
  return (
    <p className={className}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <a
            key={i}
            href={part.href}
            {...(part.href.startsWith('tel:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="font-semibold break-words text-secondary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-hover"
          >
            {part.text}
          </a>
        ),
      )}
    </p>
  )
}

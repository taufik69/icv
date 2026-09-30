const tones = {
  light: 'text-white',
  dark: 'text-secondary',
}
// Underline colour: the green brand signature, or `muted` (navy / soft white) where green would crowd the page.
const lines = {
  green: { light: 'border-primary', dark: 'border-primary' },
  muted: { light: 'border-white/40', dark: 'border-secondary' },
}

// Small uppercase label with an underline (green by default).
export function SectionEyebrow({ children, tone = 'dark', accent = 'green', className = '' }) {
  return (
    <p
      className={`inline-block border-b-4 pb-1 font-condensed text-sm tracking-[0.2em] uppercase md:text-base ${lines[accent][tone]} ${tones[tone]} ${className}`}
    >
      {children}
    </p>
  )
}

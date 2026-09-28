const tones = {
  light: 'text-white',
  dark: 'text-secondary',
}

// Small uppercase label with the green underline (brand signature).
export function SectionEyebrow({ children, tone = 'dark', className = '' }) {
  return (
    <p
      className={`inline-block border-b-4 border-primary pb-1 font-condensed text-sm tracking-[0.2em] uppercase md:text-base ${tones[tone]} ${className}`}
    >
      {children}
    </p>
  )
}

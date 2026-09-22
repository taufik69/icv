import { SectionEyebrow } from '@/shared/components/ui'

const buttonBase =
  'btn-shine inline-flex items-center rounded-md px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition'
const buttonVariants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-secondary',
}

export function HeroContent({ content }) {
  return (
    <div className="max-w-3xl">
      <SectionEyebrow tone="light">{content.eyebrow}</SectionEyebrow>
      <h1 className="mt-6 text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
        {content.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{content.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {content.actions.map((action) => (
          <a key={action.href} href={action.href} className={`${buttonBase} ${buttonVariants[action.variant]}`}>
            {action.label}
          </a>
        ))}
      </div>
    </div>
  )
}

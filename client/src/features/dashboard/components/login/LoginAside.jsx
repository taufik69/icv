import { BrandLogo } from '@/shared/components/ui'
import { legal } from '@/shared/config/footer'
import { loginAside as content } from '../../data/loginContent'
import { AsideFeatures } from './AsideFeatures'
import { GlowLines } from './GlowLines'

// lg+ photo panel: ICV trainers on site under a navy scrim, survey-line glow, pitch, feature strip.
export function LoginAside() {
  return (
    <aside className="relative isolate hidden overflow-hidden bg-secondary-dark lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <img
        src={content.image.src}
        srcSet={content.image.srcSet}
        sizes="55vw"
        alt={content.image.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-secondary-dark via-secondary-dark/85 to-secondary/40" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-dark/90 via-transparent to-secondary-dark/40" />
      <GlowLines />
      <BrandLogo eager className="self-start text-[0.8125rem] text-white" />
      <div className="py-12">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {content.eyebrow}
        </p>
        <p className="mt-5 max-w-xl text-left font-heading text-5xl leading-[1.05] font-bold tracking-tight text-white xl:text-6xl">
          {content.title} <span className="text-primary">{content.highlight}</span>
        </p>
        <p className="mt-5 max-w-md text-left text-lg leading-relaxed text-white/80 hyphens-none">{content.lead}</p>
        <AsideFeatures />
      </div>
      <p className="flex gap-5 text-xs text-white/60">
        {legal.ids.slice(1).map((id) => <span key={id}>{id}</span>)}
      </p>
    </aside>
  )
}

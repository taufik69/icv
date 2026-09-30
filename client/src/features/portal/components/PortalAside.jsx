import { BrandLogo } from '@/shared/components/ui'
import { legal } from '@/shared/config/footer'
import { portalAside as content } from '../data/portalContent'

// lg+ photo panel: ICV students under a navy scrim, logo on top, one welcome line at the foot.
export function PortalAside() {
  return (
    <aside className="relative isolate hidden overflow-hidden bg-secondary-dark lg:flex lg:flex-col lg:justify-between lg:p-12">
      <img
        src={content.image.src}
        srcSet={content.image.srcSet}
        sizes="45vw"
        alt={content.image.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover object-[35%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-dark via-secondary-dark/70 to-secondary/40" />
      <BrandLogo eager className="self-start text-[0.8125rem] text-white" />
      <div className="max-w-md">
        <p className="text-left font-heading text-4xl leading-tight font-bold text-white xl:text-5xl">{content.title}</p>
        <p className="mt-4 text-left text-lg leading-relaxed text-white/95">{content.lead}</p>
        <p className="mt-10 flex gap-4 text-sm text-white/85">
          {legal.ids.slice(1).map((id) => <span key={id}>{id}</span>)}
        </p>
      </div>
    </aside>
  )
}

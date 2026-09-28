import { legal } from '@/shared/config/footer'

// Blueprint photo under navy: the building-trades world ICV teaches in, framing the one job of this app.
export function LoginAside() {
  return (
    <aside className="relative hidden overflow-hidden bg-secondary lg:flex lg:flex-col lg:justify-between lg:p-12">
      <img
        src="/images/dom-blueprints-1600.webp"
        srcSet="/images/dom-blueprints-800.webp 800w, /images/dom-blueprints-1600.webp 1600w"
        sizes="45vw"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-linear-to-t from-secondary-dark via-secondary/80 to-secondary/40" />
      <img src="/images/icv-logo-white.webp" alt="International College of Victoria" width="240" height="110" className="relative h-14 w-auto self-start" />
      <div className="relative max-w-md">
        <p className="font-heading text-4xl leading-tight font-bold text-white xl:text-5xl">
          Every course page starts here.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          Edit fees, intakes, units and funding once, and the domestic and international pages update together.
        </p>
      </div>
      <p className="relative text-sm text-white/50">{legal.ids.slice(1).join(', ')}</p>
    </aside>
  )
}

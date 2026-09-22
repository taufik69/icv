import { legal } from '@/shared/config/footer'
import { Container } from '@/shared/components/ui'
import { useInView } from '@/shared/hooks/useInView'
import { ContactStrip } from './ContactStrip'
import { FooterBrand } from './FooterBrand'
import { FooterLinks } from './FooterLinks'
import { FooterReviews } from './FooterReviews'

// Crowd photo (from icv.edu.au) under a navy tint; requested only when the footer nears view.
export function SiteFooter() {
  const [ref, near] = useInView({ rootMargin: '400px 0px' })
  const bg = near ? 'bg-[url(/images/footer-bg-960.webp)] md:bg-[url(/images/footer-bg-1920.webp)]' : ''
  const year = new Date().getFullYear()

  return (
    <footer id="contact" ref={ref} className={`relative overflow-hidden bg-secondary-dark bg-cover bg-bottom ${bg}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-secondary-dark/85 via-secondary-dark/55 to-secondary-dark/15" />
      <Container className="relative pt-16 md:pt-20">
        <ContactStrip />
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[4fr_5fr_4fr] lg:gap-16">
          <FooterBrand />
          <FooterLinks />
          <FooterReviews />
        </div>
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 pt-6 pb-24 text-xs text-white/50 md:pb-6 md:flex-row md:items-center md:justify-between">
          <p>© {year} {legal.entity}. All rights reserved.</p>
          <p className="font-condensed tracking-wider">{legal.ids.join(' · ')}</p>
        </Container>
      </div>
    </footer>
  )
}

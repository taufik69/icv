import { galleryContent as content } from '@/features/wellbeing/data/careerContent'
import { ImageIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'

// Wide photo banner with the gallery intro on a navy gradient.
export function GallerySection() {
  const { image } = content

  return (
    <section id="student-gallery" aria-labelledby="gallery-title" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <Container>
        <Reveal from="zoom" className="group relative isolate overflow-hidden rounded-3xl bg-secondary shadow-brand">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 size-full object-cover object-right transition duration-1000 ease-out group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary via-secondary/80 to-transparent md:bg-linear-to-r md:via-secondary/80 md:to-transparent" />

          <div className="max-w-xl p-8 pt-40 md:p-14">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary text-on-primary shadow-card">
              <ImageIcon className="size-7" />
            </span>
            <SectionEyebrow tone="light" className="mt-6">
              {content.eyebrow}
            </SectionEyebrow>
            <h2 id="gallery-title" className="mt-5 text-3xl leading-tight text-white md:text-4xl">
              {content.title} <span className="text-primary">{content.highlight}</span>
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">{content.text}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

import { TestimonialContent } from './TestimonialContent'

// Mobile: one card in normal flow (height fits the review), re-keyed per slide to fade in.
export function MobileTestimonial({ review }) {
  return (
    <div aria-live="polite" className="rounded-[28px] bg-surface shadow-elevated motion-safe:animate-[fade-in_450ms_ease-out]">
      <TestimonialContent review={review} />
    </div>
  )
}

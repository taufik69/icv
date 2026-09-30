import { ArrowRightIcon, PhoneIcon } from '@/shared/components/icons'

// "Need help choosing?" card under the enrol card: one tap to call a course adviser.
export function HelpCard({ help }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-line">
      <p className="font-heading text-lg font-bold text-secondary">{help.title}</p>
      <p className="mt-1 text-sm text-secondary/95">{help.text}</p>
      <a href={help.phone.href} className="group mt-4 inline-flex items-center gap-2 font-heading font-semibold text-secondary hover:text-secondary">
        <PhoneIcon className="size-4 text-secondary-muted" />
        Call {help.phone.label}
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}

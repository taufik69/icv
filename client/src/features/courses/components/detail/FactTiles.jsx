import { CalendarIcon, ClockIcon, GraduationCapIcon, MapPinIcon } from '@/shared/components/icons'

// Duration / delivery / location / intake as glass tiles on the hero (2×2 on phones).
export function FactTiles({ summary, labels }) {
  const facts = [
    { Icon: ClockIcon, label: labels.duration, value: summary.duration },
    { Icon: GraduationCapIcon, label: labels.delivery, value: summary.delivery },
    { Icon: MapPinIcon, label: labels.location, value: summary.location },
    { Icon: CalendarIcon, label: labels.intake, value: summary.intake },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {facts.map(({ Icon, label, value }) => (
        <div key={label} className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/15 backdrop-blur-md">
          <dt className="flex items-center gap-2 text-xs text-white/95">
            <Icon className="size-4 text-white/95" />
            {label}
          </dt>
          <dd className="mt-1.5 font-heading text-base font-semibold text-white">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

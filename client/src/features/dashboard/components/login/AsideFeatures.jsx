import { loginAside } from '../../data/loginContent'

// Frosted strip of what the workspace offers: one consistent icon style, hairline dividers between.
export function AsideFeatures() {
  return (
    <ul className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/6 py-5 ring-1 ring-white/12 backdrop-blur-md">
      {loginAside.features.map(({ label, Icon }) => (
        <li key={label} className="flex flex-col items-center gap-2.5 px-3 text-center">
          <span className="grid size-11 place-items-center rounded-xl bg-white/8 text-primary ring-1 ring-white/10">
            <Icon className="size-5" />
          </span>
          <span className="text-sm font-medium text-white/90">{label}</span>
        </li>
      ))}
    </ul>
  )
}

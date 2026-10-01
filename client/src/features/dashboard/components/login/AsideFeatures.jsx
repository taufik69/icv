import { loginAside } from '../../data/loginContent'

// Glass strip of what the workspace offers: icon in a soft circle above each label, hairlines between.
export function AsideFeatures() {
  return (
    <ul className="relative mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/15 overflow-hidden rounded-3xl border border-white/20 bg-secondary/40 py-6 shadow-brand backdrop-blur-md">
      <span aria-hidden="true" className="absolute inset-x-1/4 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
      {loginAside.features.map(({ label, Icon, tone }) => (
        <li key={label} className="flex flex-col items-center gap-3 px-3 text-center">
          <span className={`grid size-16 place-items-center rounded-full border border-white/15 text-white ${tone}`}>
            <Icon className="size-7" />
          </span>
          <span className="text-sm font-semibold text-white">{label}</span>
        </li>
      ))}
    </ul>
  )
}

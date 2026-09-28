// Glass tile on navy: fills green on hover (text flips to navy for contrast).
export function ValueCard({ item: { title, text, Icon } }) {
  return (
    <div className="group flex h-full gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:bg-primary hover:ring-primary md:p-7">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary/15 text-primary transition duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary">
        <Icon className="size-6" />
      </span>
      <div>
        <h3 className="text-lg text-white transition-colors duration-500 group-hover:text-on-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-on-primary/80">
          {text}
        </p>
      </div>
    </div>
  )
}

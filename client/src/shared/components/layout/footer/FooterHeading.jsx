export function FooterHeading({ children }) {
  return (
    <h2 className="font-condensed text-base font-bold tracking-widest text-white uppercase">
      {children}
      <span aria-hidden="true" className="mt-2 block h-0.5 w-10 bg-primary" />
    </h2>
  )
}

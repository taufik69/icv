// Two desktop nav looks (see SiteHeader): `edge` on the home page — text items that fill the bar's height,
// the current section marked by a green bar on the header's bottom edge — and `classic` everywhere else —
// icon + label items with an underline (hover / current); on the floating bar the current item is a soft green pill. `top` = over the hero / navy bar,
// `float` = the light floating bar. Class sets are picked in JS so top styles never leak onto the floating bar.
export const navItemStyles = {
  edge: {
    base: 'group/item relative flex h-full items-center gap-1 px-3.5 font-heading text-[0.9375rem] whitespace-nowrap transition-colors duration-300',
    top: { idle: 'font-medium text-white/90 hover:text-white', on: 'font-semibold text-white', hover: 'bg-white/40' },
    float: { idle: 'font-medium text-secondary/85 hover:text-secondary', on: 'font-semibold text-secondary', hover: 'bg-secondary/25' },
    dropdown: 'pt-2',
  },
  classic: {
    base: 'group/item relative flex items-center gap-2 rounded-pill py-2 font-heading text-sm font-medium whitespace-nowrap transition duration-300',
    top: { idle: 'px-3 text-white/95 text-shadow-sm hover:text-white', on: 'px-3 text-white text-shadow-sm', hover: 'bg-white/70', onLine: 'bg-primary', inset: 'inset-x-3' },
    // Floating bar is narrower (and the wordmark wider than the old one), so items tighten up there.
    float: { idle: 'px-2.5 text-secondary hover:bg-surface-muted', on: 'bg-primary-soft px-2.5 font-semibold text-secondary', hover: 'bg-primary-hover', onLine: 'bg-primary-hover', inset: 'inset-x-2.5' },
    dropdown: 'pt-3 group-data-[floating=true]/header:pt-6',
  },
}

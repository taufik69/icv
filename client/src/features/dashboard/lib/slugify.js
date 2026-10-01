// Course title → page address: "Diploma of Building & Construction (Building)" → "diploma-of-building-and-construction-building".
export const slugify = (text = '') =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')

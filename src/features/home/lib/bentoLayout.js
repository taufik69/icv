// Bento spans per card, chosen by how many cards are shown (All / Domestic / International).
// lg = 4 columns, sm = 2 columns (grid-flow-row-dense backfills the sm grid); no holes.
//
// 8 (lg):  A A B C      5 (lg):  A A B C      3 (lg):  A A B C
//          A A B D               A A B D               A A B C
//          E F H H               E E E E
//          G G H H
const BIG = { span: 'sm:col-span-2 lg:row-span-2', featured: true }
const TALL = { span: 'lg:row-span-2', featured: false }
const WIDE = { span: 'lg:col-span-2', featured: false }
const FULL = { span: 'lg:col-span-4', featured: false }
const ONE = { span: '', featured: false }

const patterns = {
  8: [BIG, TALL, ONE, ONE, ONE, ONE, BIG, WIDE],
  5: [BIG, TALL, ONE, ONE, FULL],
  3: [BIG, TALL, TALL],
}

export function bentoLayout(count) {
  return patterns[count] ?? Array.from({ length: count }, () => ONE)
}

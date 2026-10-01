// Bento spans per card, chosen by how many cards are shown (All / Domestic / International), up to 8.
// lg = 4 columns, sm = 2 columns (grid-flow-row-dense backfills the sm grid); every count leaves no holes.
//
// 8 (lg):  A A B C      7:  A A B C      6:  A A B C      5:  A A B C
//          A A B D          A A B D          A A B D          A A B D
//          E F H H          E E F G          E E F F          E E E E
//          G G H H
// 4:  A A B C      3:  A A B C      2:  A A B B      1:  A A A A
//     A A B C          A A B C          A A B B          A A A A
//     D D D D
const BIG = { span: 'sm:col-span-2 lg:row-span-2', featured: true }
const TALL = { span: 'lg:row-span-2', featured: false }
const WIDE = { span: 'lg:col-span-2', featured: false }
const WIDE_SM = { span: 'sm:col-span-2 lg:col-span-2', featured: false } // full sm row: evens out the sm grid
const FULL = { span: 'lg:col-span-4', featured: false }
const FULL_SM = { span: 'sm:col-span-2 lg:col-span-4', featured: false }
const ONE = { span: '', featured: false, compact: true } // single 17rem lg cell: no room for the overview
const HALF = { span: 'sm:col-span-2 lg:col-span-2 lg:row-span-2', featured: true }
const WHOLE = { span: 'sm:col-span-2 lg:col-span-4 lg:row-span-2', featured: true }

const patterns = {
  8: [BIG, TALL, ONE, ONE, ONE, ONE, BIG, WIDE],
  7: [BIG, TALL, ONE, ONE, WIDE, ONE, ONE],
  6: [BIG, TALL, ONE, ONE, WIDE, WIDE_SM],
  5: [BIG, TALL, ONE, ONE, FULL],
  4: [BIG, TALL, TALL, FULL_SM],
  3: [BIG, TALL, TALL],
  2: [HALF, HALF],
  1: [WHOLE],
}

export const MAX_CARDS = 8

export function bentoLayout(count) {
  return patterns[Math.min(count, MAX_CARDS)] ?? []
}

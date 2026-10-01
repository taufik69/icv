# Spec: course database model (MongoDB / Mongoose 9)

Status: **implemented** (server `modules/course`, dashboard courses). Auth, leads and users are out of scope.

## What it must serve
| consumer | reads |
|---|---|
| `/domestic`, `/international` landing grids | card fields, filtered by market + study area |
| `/<market>/$course` course page (icv.edu.au copy) | the full document, verbatim blocks |
| `/courses` finder | card fields + `facts` + `fees` (headline price) |
| **`/courses/$market/$slug` detail page** (opened from a finder card) | see the field map below |
| `/enquire-now` course dropdown | `applyCode`/`code`, title, study area |
| dashboard list / view / new-course form | everything, plus status and order |

## The detail page today, and what it needs from the DB
Walked through `/courses/domestic/cert-iii-early-childhood` (`components/detail/*`, `lib/courseDetail.js`, `lib/courseSummary.js`). Every section is currently **guessed** from the icv.edu.au page copy with regexes:

| page section | shows | read today from | problem |
|---|---|---|---|
| Hero tags | code, study area (coloured), level, student types | `code`; `category`; level parsed from title; markets = other docs with same code | level guessed from title wording |
| Hero lead | tagline, else first overview paragraph | `tagline` / `overview.paragraphs[0]` | ok |
| Fact tiles | duration, delivery, location, next intake | glance rows matched by label regex; location hard-coded "Melbourne CBD"; intake falls back to "Monthly Intake" | label wording changes break it |
| Sidebar price | "Tuition from $3,000", basis | glance `Tuition Fee` / `FFS` rows, string → number | "0* Fee for Eligible Students" isn't a price |
| Sidebar buttons | Enquire / Apply (`?course=`), Download course guide, Compare, Save | `toFormCode(code)` alias table; guide has **no link** | guide URL lives inside `actions` ("Course Outline") or `cta` ("COURSE FLYER") |
| Overview | photo + paragraphs | `images.overview`, `overview.paragraphs` | ok |
| Units (tab count 17) | code, title, Core/Elective | `units.core`/`elective` tuples or `units.table.rows` | two shapes |
| Entry requirements | intro + checklist | first `details[]` whose title matches `/entr[yi]/` (title is "Entry Requirments" on one course) | ECEC's further-study list sits **inside** this block |
| Fees | tiles, tuition first | glance rows whose label matches `/fee\|ffs/` | "Payment options" row is lost |
| Careers | career chips + further study | chips inside `career`/`employment` parts; pathways from a `details[]` titled `/pathway/` | ECEC shows careers but **no pathways** (they're in entry) |
| Related courses | two finder cards | computed: same area → same market | ok, computed |
| **Not shown** | 160 hrs work placement, payment plans, Working-with-children / police check, RPL | glance / `details[]` / `placement` / `rpl` | data exists, no typed field to show it |

**Conclusion:** keep the verbatim page blocks for `/<market>/$course`, and add typed fields that the detail page, finder and dashboard read directly. No regex parsing on the client.

## Collection: `courses` — one document per course page

```
courses
├── identity      market, slug, code, applyCode, title, level, studyArea, category
├── listing       status, order, summary, tagline, externalUrl, images.card
├── facts         duration, delivery, study mode, campus, intake, placement hours, CRICOS
├── fees[]        typed fee lines (tuition, application, FFS, material…) + paymentOptions
├── detail        entryRequirements, additionalRequirements, pathways, careers, guideUrl, related
├── units         one list for tabs and table display
├── page blocks   overview, actions, glance, funding, career, details[], criteria, extras,
│                 placement, rpl, employment, cta   (verbatim icv.edu.au copy; absent = not rendered)
├── images        card, hero, overview, career, criteria, units, rpl, cta
├── seo           metaTitle, metaDescription, ogImage
└── timestamps    createdAt, updatedAt, publishedAt
```

### Identity & listing
| field | type | example / rule |
|---|---|---|
| `market` | enum `domestic` \| `international`, required | |
| `slug` | String, required, `^[a-z0-9-]+$` | `cert-iii-early-childhood` |
| `code` | String, required | `CHC30125` (as shown on the site) |
| `applyCode` | String | only when the apply form differs (`CPCWHS1001` → `CPCCWHS1001`); replaces `toFormCode` |
| `title` | String, required | `Certificate III in Early Childhood Education and Care` |
| `level` | enum `Short course` \| `Certificate III` \| `Certificate IV` \| `Diploma` \| `Graduate Diploma`, required | hero tag, finder facet |
| `studyArea` | enum `building` \| `whiteCard` \| `ecec` \| `community` \| `management`, required | filter chips, finder facet, tag colour (`areaTone`) |
| `category` | String | display label `Early Childhood` |
| `status` | enum `draft` \| `active` \| `inactive` \| `archived`, default `draft` | public API = `active` only; archive = soft delete |
| `order` | Number, default 0 | landing grid position |
| `summary` | String ≤ 300 | card text |
| `tagline` | String | hero lead (falls back to first overview paragraph) |
| `externalUrl` | https URL | catalogue-only course with no page here |
| `publishedAt` | Date | first time status → `active` |

Student types on the hero ("Domestic students") are **computed**: every `active` doc with the same `code`. Not stored.

### `facts` — hero tiles, finder cards and filters
| field | type | ECEC value |
|---|---|---|
| `durationText` | String | `6 - 9 months` |
| `durationWeeks` | Number ≥ 0 | `39` (upper bound; hours-only = 0) — finder length filter + sort |
| `delivery` | enum `Face to face` \| `Blended` \| `In classroom` \| `Online` | `Blended` |
| `deliveryText` | String | `Blended (Face-to-Face & Virtual Classroom)` |
| `studyMode` | enum `Full-Time` \| `Part-Time` \| `Flexible` | — |
| `campus` | String, default `Melbourne CBD` | `Melbourne CBD` |
| `intake` | String, default `Monthly Intake` | `Monthly Intake` |
| `placementHours` | Number | `160` |
| `cricosCode` | String | international only |

### `fees` — Fees section + sidebar price + finder "From $X"
```js
fees: [{
  kind: 'tuition' | 'application' | 'ffs' | 'material' | 'other',
  label: String,          // verbatim: 'Tuition Fee', 'Application fee', 'FFS ( Fee for Service) Students'
  amountCents: Number,    // 300000; absent when the value isn't a price
  text: String,           // verbatim when not a plain amount: '0* Fee for Eligible Students'
}],
paymentOptions: String    // 'Weekly and Monthly payment plans available'
```
- Fees section: lines in `kind` order tuition → ffs → application → material → other.
- Sidebar / finder headline: `tuition.amountCents`, else `ffs.amountCents` with tuition `text` as the note (today's `price()` rule, made explicit).
- Money is integer cents, never floats.

### `detail` — sections that are guessed today
| field | type | ECEC value |
|---|---|---|
| `entryRequirements` | Parts | intro + `{ list: ['Applicants must be 18…', 'Meet the Language Literacy…'] }` |
| `additionalRequirements` | `{ title, items: [String] }` | `Additional Requirements before starting work placement:` → Working with children check, National Police record check |
| `pathways` | Parts | intro + `{ list: ['CHC50125 – Diploma in Early Childhood Education and Care'] }` |
| `pathwayCodes` | [String] | `['CHC50125']` — lets the page link to that course |
| `careers` | [String] | `Family Day Care Educator`, `Centre-based Educator`, … |
| `guideUrl` | URL | "Download course guide" (ECEC: the Course Outline link) |
| `related` | [ObjectId → courses], max 2 | optional manual pick; empty = computed (same area → same market) |

"Parts" = the rich-copy array rendered by `common/Parts`: `string | { list } | { chips } | { heading } | { sep } | { more, label }`. Stored as Mixed, validated per item by zod on write.

### `units` — one shape for tab grid, tabs and table
```js
units: {
  title: 'Format and Packaging Rules',
  parts: Parts,                     // packaging rules copy
  note: String,
  display: 'tabs' | 'table',
  coreLabel: String, electiveLabel: String,  // tabs mode
  tableTitle: String,                         // table mode ('UNITS OF COMPETENCY')
  items: [{
    code: String,                   // verbatim, e.g. 'CPCCBC4010*'
    title: String,
    type: 'core' | 'elective',
    typeLabel: String,              // verbatim cell when it differs ('Elective (Imported')
    href: String,
    hours: Number,                  // table mode
    selfPacedHours: Number,         // table mode
  }],
}
```
Tab count = `items.length` (17 for ECEC); table totals are computed.

### Page blocks (verbatim icv.edu.au copy for `/<market>/$course`; all optional)
| block | shape |
|---|---|
| `overview` | `{ paragraphs: [String] }` — also the detail Overview section |
| `actions` | `[{ label, href }]` |
| `glance` | `[{ label, value }]` — verbatim "at a glance" table |
| `funding` | `{ title, headline, lines: [String] }` |
| `career` | `{ title, parts }` |
| `detailsTitle`, `details` | String, `[{ title, parts }]` |
| `criteria` | `{ title, subtitle, elements: [{ title, items: [String] }] }` |
| `extras` | `{ title, blocks: [{ title, parts }] }` |
| `placement` | `{ title, lead, paragraphs: [String], listTitle, list: [String], note }` |
| `rpl` | `{ title, sections: [{ title, collapsible, parts }] }` |
| `employment` | `{ title, parts }` |
| `cta` | `{ title, headline, lines: [String], actions: [{ label, href }] }` |

### Images
`{ src, srcSet, width, height, alt }` per slot: `card`, `hero`, `overview`, `career`, `criteria`, `units`, `rpl`, `cta`. Paths into `public/images`.

### SEO
`seo: { metaTitle, metaDescription (≤160), ogImage }`; falls back to title / summary / hero.

## Indexes
| index | serves |
|---|---|
| `{ market: 1, slug: 1 }` **unique** | page + detail lookup |
| `{ market: 1, code: 1 }` **unique** | apply `?course=`, one course per code per market |
| `{ code: 1, status: 1 }` | detail hero student types |
| `{ status: 1, market: 1, order: 1 }` | landing grids, dashboard list |
| `{ status: 1, studyArea: 1, level: 1 }` | finder facets, related courses |
| text `{ title: 10, code: 10, summary: 2 }` | finder / dashboard search |

## API responses
| endpoint | projection |
|---|---|
| `GET /courses?market=&area=` | card: `market slug code title level studyArea category summary images.card order externalUrl` |
| `GET /courses/finder` | card + `facts` + `fees` + `images.hero` |
| `GET /courses/:market/:slug` | full doc (minus `status`, `order`) **plus** `markets: [...]` and `related: [card, card]` resolved server-side — one request renders the whole detail page |

## Example — ECEC detail fields (trimmed)
```json
{
  "market": "domestic", "slug": "cert-iii-early-childhood", "code": "CHC30125",
  "title": "Certificate III in Early Childhood Education and Care",
  "level": "Certificate III", "studyArea": "ecec", "category": "Early Childhood", "status": "active",
  "facts": {
    "durationText": "6 - 9 months", "durationWeeks": 39,
    "delivery": "Blended", "deliveryText": "Blended (Face-to-Face & Virtual Classroom)",
    "campus": "Melbourne CBD", "intake": "Monthly Intake", "placementHours": 160
  },
  "fees": [
    { "kind": "tuition", "label": "Tuition Fee", "amountCents": 300000 },
    { "kind": "application", "label": "Application fee", "amountCents": 50000 }
  ],
  "paymentOptions": "Weekly and Monthly payment plans available",
  "detail": {
    "entryRequirements": ["Whilst there are no entry requirements…", { "list": ["Applicants must be 18 years of age or above", "Meet the Language Literacy…"] }],
    "additionalRequirements": { "title": "Additional Requirements before starting work placement:", "items": ["Working with children check", "National Police record check (if required by the Childcare Centre / Host Organisation)"] },
    "pathways": ["Students who successfully complete this qualification may pathway into further study options:", { "list": ["CHC50125 – Diploma in Early Childhood Education and Care"] }],
    "pathwayCodes": ["CHC50125"],
    "careers": ["Family Day Care Educator", "Centre-based Educator", "Centre-based Assistant", "Playgroup Supervisor", "Recreation Assistant"],
    "guideUrl": "https://icv1-my.sharepoint.com/…"
  },
  "units": { "title": "Format and Packaging Rules", "display": "tabs",
    "items": [{ "code": "CHCECE030", "title": "Support inclusion and diversity", "type": "core" }] }
}
```

## Changes from current `server/src/modules/course/course.model.js`
| current | proposed |
|---|---|
| `published: Boolean` | `status` enum + `publishedAt` |
| `filter` | `studyArea` (+ `management`) |
| level / duration / delivery / fee parsed on the client | `level`, `facts`, `fees` |
| entry / pathways / careers found by title regex + chips | `detail.*` |
| no guide link | `detail.guideUrl` |
| `glance` tuples | `[{ label, value }]` |
| `units.core` / `elective` / `table` | `units.items` + `display` |
| `placement: Mixed` | typed |
| — | `applyCode`, `externalUrl`, `seo`, `{ market, code }` unique, text index |

## Decisions to confirm
1. **Typed fields + verbatim blocks side by side.** Some facts appear twice (duration in `facts` and in `glance`). The migration fills both; the dashboard form edits each once. Alternative: drop `glance` and build that table from `facts` + `fees` — less duplication, but the icv.edu.au wording changes.
2. Detail page should **also show** placement hours, payment options and additional requirements (now available)? That's a UI change for later; the model supports it either way.
3. Shared copy (funding, Skills First CTA, RPL) is **copied into each course**; alternative is a `contentBlocks` collection.
4. Units **embedded** per course (alternative: shared unit library by code).
5. One document **per market page**; `studyArea` a **fixed enum**.

## After approval
1. Model + sub-schemas + zod validation.
2. Service + routes above; detail endpoint resolves `markets` and `related`.
3. Seed script: import every `client/src/features/courses/data/<market>/<slug>` + `catalogueExtras`, convert glance/units, fill `facts`/`fees`/`detail` with today's `courseSummary` / `courseDetail` rules, and print rows that need a human check (e.g. "Entry Requirments" spelling, pathways hidden in entry).
4. Client wiring only when you ask.

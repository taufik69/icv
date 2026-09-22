# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
React 19 + Vite 8 (JavaScript, no TypeScript), Tailwind CSS v4 (via `@tailwindcss/vite`, no config file — just `@import 'tailwindcss'` in `src/index.css`), TanStack Query v5, TanStack Router (file-based, via `@tanstack/router-plugin`), Oxlint.

## Commands
```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # serve the build
npm run lint         # oxlint
npm run check:lines  # fails if any .js/.jsx/.css file in src/ exceeds 100 lines
```
No test runner is set up yet. Before finishing any task run: `npm run lint && npm run check:lines && npm run build`.

## Hard rules
- **Every file in `src/` must be ≤100 lines.** Enforced by `scripts/check-lines.js` and a PostToolUse hook in `.claude/settings.json` that blocks after any Edit/Write that breaks it. Aim for ≤80; split early (subcomponents → hooks → `lib/` helpers).
- **Modular:** one component or hook per file, named exports, PascalCase component filenames.
- Tailwind utility classes only — no per-component CSS files or inline style objects.
- **Design tokens only:** style with ICV token utilities (`bg-primary`, `text-ink-muted`, `shadow-card`, `rounded-pill`, `font-heading`…). No raw hex, default palette (`gray-*`, `blue-*`) or arbitrary `[#…]` values. Full token table: `.claude/skills/design-system/SKILL.md`.
- Components never call `fetch`/`apiClient` directly; they use feature hooks.

## Architecture
Import alias `@` → `src/` (set in `vite.config.js` and `jsconfig.json`).

```
src/
├── app/         # App root, providers, router instance (router.js)
├── routes/      # TanStack Router file-based routes — thin wiring only
├── features/    # self-contained domain modules (api, hooks, components)
└── shared/      # cross-feature code: components/{ui,layout}, lib/, hooks/, config/
```

**Routing:** `App` = `QueryProvider` → `RouterProvider`. The Vite plugin generates `src/routeTree.gen.js` from `src/routes/` (JS output via `disableTypes: true`) — never edit it; it's gitignored and excluded from lint/line checks. `src/app/router.js` passes `{ queryClient }` as router context. `routes/__root.jsx` renders `shared/components/layout/RootLayout` (NavBar + Outlet) and `NotFound`. Route files only declare `loader` / `pendingComponent` / `errorComponent` / `component` and pass params to a feature page.

**Layout & home:** `SiteHeader` (`shared/components/layout/header/`) is `fixed`: a full-width bar at the top (transparent over the home hero, navy elsewhere) that becomes a floating navy bar (98% wide, 1% gap each side, `rounded-2xl`) on scroll. It sets `data-floating` on a `group/header`, and children restyle with `group-data-[floating=true]/header:*` (gray items, smaller logo). Nav data lives in `shared/config/navigation.js` (links currently point to live icv.edu.au URLs). Non-hero pages must wrap content in `PageContainer` to clear the header. The home hero (`features/home/components/hero/`) renders a preloaded WebP poster (the LCP image, preloaded in `index.html`), then lazy-loads `HeroVideo` — a Vimeo background iframe controlled via postMessage (`useVimeoPlayback`: fades in on first `play` event, pauses off-screen). Video is skipped for reduced-motion / Save-Data / 2G (`useCanAutoplayVideo`). Hero copy, images and Vimeo id live in `features/home/data/heroContent.js`. Optimised images are in `public/images/`. `MobileMenu` is also lazy-loaded.

**Data flow in a feature** (reference: `src/features/posts/` + `src/routes/posts/`):
`api/<name>Keys.js` (key factory) → `api/<name>Api.js` (calls `shared/lib/apiClient`) → `api/<name>Queries.js` (`queryOptions`) → route `loader` runs `queryClient.ensureQueryData(opts)` → `hooks/use<X>.js` calls `useSuspenseQuery(opts)` → `components/*.jsx`. Because the loader prefetches, components don't handle loading/error — the route's `pendingComponent`/`errorComponent` do. Router `defaultPreloadStaleTime: 0` so Query owns caching; links preload on hover (`defaultPreload: 'intent'`).

- Each feature exposes a public `index.js`. Other code imports only `@/features/<name>`, never deep paths. Features don't import each other's internals — move shared pieces to `src/shared/`.
- `shared/lib/apiClient.js` is the single fetch wrapper (base URL from `VITE_API_BASE_URL`, see `.env.example`; throws on non-2xx).
- `shared/lib/queryClient.js` holds global query defaults (staleTime 60s, retry 1, no refetch on focus) — don't repeat them per hook. Mutations must invalidate their feature's keys.
- Internal navigation uses `<Link>` / `useNavigate`, never `<a href>`.
**Styling:** `src/index.css` imports Tailwind, then `src/styles/tokens/{colors,typography,radius,shadows}.css` (each a Tailwind v4 `@theme` block → utilities), then `src/styles/base.css` (element defaults: Open Sans body, Montserrat navy headings, link colors, focus ring). Fonts load from Google Fonts in `index.html`. Tokens were curated from `design/design-system.source.json` (scrape of icv.edu.au). Green `primary` needs `text-on-primary` (navy) for contrast.

- Shared UI (`Button` — `as="a"` for links, `Container`, `Reveal` — scroll-in animation, `SectionEyebrow` — green-underlined label, `Card`, `Spinner`, `ErrorMessage`). Icons are inline SVG modules in `shared/components/icons/` (built on `Icon`); add new ones to a themed file there.
- Home sections live in `features/home/components/<section>/` with copy/images in `features/home/data/<section>Content.js`. Section images are pre-optimised WebP with `srcSet`, `width`/`height` and `loading="lazy"` (only the hero poster is eager).
- Third-party video uses a facade: a local thumbnail + play button; `shared/components/media/VideoModal` (lazy, portaled to `<body>`, embeds `YouTubeEmbed`) loads only on click, and the YouTube connection is preconnected on hover via `shared/lib/preconnect`. Scroll motion lives in `src/styles/animations.css` (`animate-float`, `parallax-up/down`, `parallax-bg` — CSS scroll-driven, reduced-motion safe); `Reveal` takes `from` = up | left | right | zoom. **Every button/CTA link gets the `btn-shine` utility** (hover sweep, defined in `animations.css`). `Container` is max 1280px (`max-w-7xl`) with 20/32px gutters. Below-the-fold CSS background images are applied only once `useInView` reports the section is near.
- Hover-only UI must degrade for touch: hide/reveal with `pointer-fine:` variants so coarse pointers always see the content (see `CourseCard`). Card rows on mobile use a snap carousel (`snap-x scroll-px-5`), grid from `sm:`.
- All shared UI is exported from `shared/components/ui/index.js`; reuse before creating new UI.

## `.claude/` workspace
- `skills/` — `design-system`, `react-component`, `tanstack-query`, `tanstack-router`, `new-feature`: detailed patterns for the above.
- `agents/` — subagents: `code-reviewer`, `refactor-splitter` (fixes >100-line files), `feature-builder`.
- `commands/` — `/new-feature`, `/new-route`, `/new-component`, `/spec`, `/plan`, `/check-rules`.
- `specs/` — feature specs (what to build); `plans/` — implementation plans (how). Both have `_template.md`. For non-trivial features: spec → plan → build.

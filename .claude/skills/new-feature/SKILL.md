---
name: new-feature
description: Scaffold a new feature module under src/features/<name> with api, hooks, components and a public index.js. Use when the user asks for a new feature, page, or domain area.
---

# New Feature Module

## Structure
```
src/features/<name>/
├── api/
│   ├── <name>Keys.js      # query key factory
│   ├── <name>Api.js       # HTTP calls via apiClient
│   └── <name>Queries.js   # queryOptions factories (used by loaders + hooks)
├── hooks/
│   └── use<Name>.js       # one hook per file
├── components/
│   ├── <Name>Page.jsx     # composes the feature
│   └── <Name>List.jsx ... # small pieces, ≤100 lines each
└── index.js               # public API — only export what other code needs
```

## Steps
1. Check `.claude/specs/` for a spec of this feature; if missing, write one from `_template.md`.
2. For multi-step work write a plan in `.claude/plans/` first.
3. Create files following the `tanstack-query` and `react-component` skills.
4. Add thin route files in `src/routes/` (see `tanstack-router` skill) and a NavBar link if top-level.
5. Other modules import **only** from `@/features/<name>` (the index), never deep paths.
6. Features must not import from other features' internals; share via `src/shared/`.
7. Verify: `npm run lint && npm run check:lines && npm run build`.

Reference implementation: `src/features/posts/`.

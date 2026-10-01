# ICV API

Express 5 + Mongoose 9 backend for the ICV site. Node >= 22.

```bash
cp .env.example .env   # set MONGODB_URI
npm install
npm run dev            # http://localhost:4000/api/v1
npm run lint
```

## Layout

```
src/
├── server.js            # connect DB, listen, graceful shutdown
├── app.js               # express app: helmet, cors, json, morgan, routes, errors
├── config/              # env.js (zod-validated env), db.js (mongoose connect)
├── routes/index.js      # mounts every module router under /api/v1
├── modules/<name>/      # one folder per domain module
│   ├── <name>.model.js        # mongoose schema + model
│   ├── <name>.validation.js   # zod schemas for body/query/params
│   ├── <name>.service.js      # data access + business rules (throws ApiError)
│   ├── <name>.controller.js   # HTTP layer, reads req.valid
│   └── <name>.routes.js       # express Router
└── shared/
    ├── middleware/      # validate, notFound, errorHandler
    └── utils/ApiError.js
```

Errors always respond as `{ error: { message, details? } }`; success as `{ data }`.

## Endpoints

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/health` | `{ status, db }` |
| GET | `/courses?market=&area=` | active course cards |
| GET | `/courses/finder` | active courses with `facts` + `fees` for the course finder |
| GET | `/courses/:market/:slug` | full active course + `markets` (student types) + two `related` courses |
| GET | `/admin/courses?market=&status=&q=` | dashboard list, every status but archived unless asked; `meta.counts` per market (no auth yet) |
| GET | `/admin/courses/page/:market/:slug` | one course, any status (no auth yet) |
| POST | `/admin/courses` | create (no auth yet) |
| PATCH | `/admin/courses/:id` | update; nested blocks are replaced whole (no auth yet) |
| PATCH | `/admin/courses/:id/status` | `{ status }` — draft / active / inactive / archived (no auth yet) |
| DELETE | `/admin/courses/:id` | archive (soft delete) (no auth yet) |
| GET / POST | `/admin/taxonomies/:type` | `type` = `study-areas` \| `levels`: list (with `courses` count per item) / create `{ label, icon? }` (no auth yet) |
| PATCH / DELETE | `/admin/taxonomies/:type/:id` | rename / re-icon; delete answers 409 while any course uses the item (no auth yet) |
| PUT | `/admin/taxonomies/:type/order` | `{ ids }` in the new order (no auth yet) |
| POST | `/admin/uploads/images?folder=courses` | multipart field `image` (JPG/PNG/WebP/AVIF, ≤ 8 MB) → WebP at 640/1280/1920 px in `public/uploads/<folder>/`, served at `/uploads/…`; returns `{ src, srcSet, width, height, alt }` (no auth yet) |
| POST | `/applications` | public, from the website's apply form |
| GET | `/applications?status=&q=` | list, newest first; `meta.counts` per status (no auth yet) |
| GET | `/applications/:id` | one application (no auth yet) |
| PATCH | `/applications/:id` | `{ status }` — New / Contacted / Enrolled / Closed (no auth yet) |
| DELETE | `/applications/:id` | delete (no auth yet) |

Uploaded images live in `server/public/uploads/` (gitignored) — the host needs a persistent disk, and back it up with the database. URLs are absolute, built from `PUBLIC_URL` (defaults to `http://localhost:PORT`), so set it before uploading in production.

Study areas and levels: `npm run seed:taxonomies` creates the defaults (courses validate their `studyArea` / `level` against these). Run it before `seed:courses` on a fresh database.

Course data: `npm run seed:courses` imports every course page from `client/src/features/courses/data` and copies its photos from `client/public/images` into `public/uploads/courses` (image URLs then point at this server) (skips existing market + slug; `-- --force` overwrites). Model: `.claude/specs/course-model.md`.

Demo data: `npm run seed:applications` (skips if applications exist; `-- --force` replaces them).

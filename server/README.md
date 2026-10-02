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
| GET | `/admin/courses?market=&status=&q=` | dashboard list, every status but archived unless asked; `meta.counts` per market |
| GET | `/admin/courses/page/:market/:slug` | one course, any status |
| POST | `/admin/courses` | create |
| PATCH | `/admin/courses/:id` | update; nested blocks are replaced whole |
| PATCH | `/admin/courses/:id/status` | `{ status }` — draft / active / inactive / archived |
| DELETE | `/admin/courses/:id` | archive (soft delete) |
| GET / POST | `/admin/taxonomies/:type` | `type` = `study-areas` \| `levels`: list (with `courses` count per item) / create `{ label, icon? }` |
| PATCH / DELETE | `/admin/taxonomies/:type/:id` | rename / re-icon; delete answers 409 while any course uses the item |
| PUT | `/admin/taxonomies/:type/order` | `{ ids }` in the new order |
| POST | `/admin/uploads/images?folder=courses` | multipart field `image` (JPG/PNG/WebP/AVIF, ≤ 8 MB) → WebP at 640/1280/1920 px in `public/uploads/<folder>/`, served at `/uploads/…`; returns `{ src, srcSet, width, height, alt }` |
| POST | `/applications` | public, from the website's apply form |
| GET | `/applications?status=&q=` | list, newest first; `meta.counts` per status |
| GET | `/applications/:id` | one application |
| PATCH | `/applications/:id` | `{ status }` — New / Contacted / Enrolled / Closed |
| DELETE | `/applications/:id` | delete |
| POST | `/enrolments` | public, the website's enrolment form (multipart: `data` JSON + files) |
| GET | `/enrolments?status=&q=&page=&limit=` | list, newest first; `meta` = total, pages, counts |
| GET | `/enrolments/counts` · `/enrolments/:id` · `/enrolments/:id/files/:fileId` | counts, one application, one uploaded file |
| PATCH / DELETE | `/enrolments/:id` | `{ status, staffNote }` / delete with its files |

Demo enrolments: `npm run seed:enrolments` (8 students with drawn demo files: signature, agent's stamp, passport scan marked SPECIMEN, test-result PDFs; skips if enrolments exist, `-- --force` replaces them and their files).

Tests: `npm test` (node:test; validation unit tests + real HTTP tests against the `icv_test` database, emptied before and after).

Staff sign-in (`src/modules/auth`): every `/admin/*` route and every applications / enrolments route except the public `POST` needs a session cookie (`icv_session`, httpOnly, 7 days).

| Method | Path | Notes |
|---|---|---|
| POST | `/auth/login` | `{ email, password }` → sets the cookie; 5 wrong tries lock the account 15 min |
| POST | `/auth/logout` | clears the cookie |
| GET | `/auth/me` | the signed-in user, or 401 |
| POST | `/auth/forgot-password` | `{ email }` → 202 `{ expiresAt }`; emails a 6-digit code (5 min) in the background, 3 retries; same answer for unknown emails; no new code while one is live |
| POST | `/auth/verify-code` | `{ email, code }` → `{ resetToken }` (10 min); 5 wrong codes cancel it |
| POST | `/auth/reset-password` | `{ resetToken, password }` (10+ chars); ends every older session |

`npm run seed:admin` creates the admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (`-- --reset-password` sets it again). Mail uses `SMTP_*` (Gmail: an App Password in `SMTP_PASS`); without it, in development the code is printed in the server console.

Dashboard overview numbers: `GET /admin/stats?days=7|30|90|365` (`src/modules/stats`; totals vs the previous period, a day-by-day or month-by-month timeline in Melbourne time, enrolment status, top courses / nationalities / sources, enquiry student types, recent activity).

Full enrolment API with payloads: [`docs/enrolment-api.md`](docs/enrolment-api.md). Uploaded enrolment files are private, in `storage/enrolments/` (git-ignored).

Uploaded images live in `server/public/uploads/` (gitignored) — the host needs a persistent disk, and back it up with the database. URLs are absolute, built from `PUBLIC_URL` (defaults to `http://localhost:PORT`), so set it before uploading in production.

Study areas and levels: `npm run seed:taxonomies` creates the defaults (courses validate their `studyArea` / `level` against these). Run it before `seed:courses` on a fresh database.

Course data: `npm run seed:courses` imports every course page from `client/src/features/courses/data` and copies its photos from `client/public/images` into `public/uploads/courses` (image URLs then point at this server) (skips existing market + slug; `-- --force` overwrites). Model: `.claude/specs/course-model.md`.

Demo data: `npm run seed:applications` (skips if applications exist; `-- --force` replaces them).

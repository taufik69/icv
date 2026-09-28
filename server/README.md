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
| GET | `/courses?market=&filter=` | published course cards |
| GET | `/courses/:market/:slug` | full published course |
| POST | `/courses` | create (no auth yet) |
| PATCH | `/courses/:id` | partial update (no auth yet) |
| DELETE | `/courses/:id` | delete (no auth yet) |
| POST | `/applications` | public, from the website's apply form |
| GET | `/applications?status=&q=` | list, newest first; `meta.counts` per status (no auth yet) |
| GET | `/applications/:id` | one application (no auth yet) |
| PATCH | `/applications/:id` | `{ status }` — New / Contacted / Enrolled / Closed (no auth yet) |
| DELETE | `/applications/:id` | delete (no auth yet) |

Demo data: `npm run seed:applications` (skips if applications exist; `-- --force` replaces them).

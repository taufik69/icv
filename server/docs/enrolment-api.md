# Enrolment API

API for the online **Enrolment Application Form – International** (V8.0), the form at `/apply` on the website.

- Base URL: `http://localhost:4000/api/v1` (production: `<PUBLIC_URL>/api/v1`)
- Code: `server/src/modules/enrolment/`
- Success responses are `{ "data": … }`; lists add `"meta"`.
- Errors are `{ "error": { "message", "details"? } }`. `details` maps a field path to a list of messages, e.g. `{ "personal.dob": ["use YYYY-MM-DD"] }`.
- Dates are always `YYYY-MM-DD` strings.

> **Auth:** only `POST /enrolments` is public. Every other route, including the file downloads (passports, visas…), needs a signed-in staff session: the `icv_session` httpOnly cookie set by `POST /auth/login` (send requests with `credentials: 'include'`). Without it the API answers `401 { error: { message: 'Please sign in.' } }`.

## Endpoints

| Method | Path | Who | What it does |
|---|---|---|---|
| POST | `/enrolments` | public | Submit an application (multipart: answers + files) |
| GET | `/enrolments?status=&q=&page=&limit=` | staff | List applications, newest first, with paging and counts per status |
| GET | `/enrolments/counts` | staff | Number of applications per status |
| GET | `/enrolments/:id` | staff | One full application |
| GET | `/enrolments/:id/files/:fileId` | staff | Download or view one uploaded file |
| PATCH | `/enrolments/:id` | staff | Change `status` and/or `staffNote` |
| DELETE | `/enrolments/:id` | staff | Delete the application and its files |

Statuses: `New` (default) · `In review` · `Offer sent` · `Enrolled` · `Declined` · `Withdrawn`

---

## POST /enrolments — submit an application

`Content-Type: multipart/form-data` with these parts:

| Part | Required | Content |
|---|---|---|
| `data` | yes | The answers as **JSON text** (see below) |
| `signature` | yes | Student's signature: 1 JPG/PNG, max 2 MB |
| `agentStamp` | no | Agent's stamp: 1 JPG/PNG, max 2 MB |
| `attachment_<key>` | no | Files for one checklist document: up to 5 PDF/JPG/PNG files, max 10 MB each |

Attachment keys (paper form section M):

| `key` | Multipart field | Document |
|---|---|---|
| `english` | `attachment_english` | Certified evidence of English language proficiency like IELTS, TOEFL, PTE and ELICOS, etc. |
| `year11` | `attachment_year11` | Certified documented evidence of Australian Year 11 or equivalent (with certified translation, if not in English) |
| `passport` | `attachment_passport` | Certified copy of Passport |
| `visa` | `attachment_visa` | Copy of Visa (if applicable) |
| `releaseLetter` | `attachment_releaseLetter` | Release letter from current Institute (if there for less than 6 months) |
| `oshc` | `attachment_oshc` | Evidence of Overseas Health Cover (if applicable) |
| `rpl` | `attachment_rpl` | Certified copies of documents to be assessed for Recognition of Prior Learning (RPL) if required |
| `other` | `attachment_other` | Other (give its name in `attachments[].name`) |

The server checks each file's first bytes, so a file renamed to `.pdf` or `.png` is refused. Files sent for a document that isn't listed in `data.attachments` are refused too.

### `data` JSON

```json
{
  "course": {
    "code": "CPC30220",
    "title": "Certificate III in Carpentry",
    "duration": "64 Weeks",
    "applicationFee": "$500",
    "tuitionFee": "$18,000",
    "materialFee": "$500",
    "manual": false,
    "intakeYear": "2027"
  },
  "personal": {
    "title": "Ms",
    "givenNames": "Priya",
    "lastName": "Sharma",
    "gender": "Female",
    "dob": "2001-04-12",
    "countryOfBirth": "India",
    "nationality": "Indian",
    "firstLanguage": "Hindi",
    "passportNumber": "N1234567",
    "passportExpiry": "2031-08-30"
  },
  "contact": {
    "home": { "address": "12 MG Road, Sector 4", "city": "New Delhi", "country": "India", "postcode": "110001" },
    "australia": { "address": "", "suburb": "", "state": "", "postcode": "" },
    "phone": "",
    "mobile": "+91 98765 43210",
    "email": "priya.sharma@example.com"
  },
  "emergencyContact": { "name": "Anita Sharma", "relationship": "Mother", "number": "+91 98111 22334" },
  "health": {
    "oshc": { "has": false, "provider": "", "membershipNumber": "", "type": "", "expiry": "" },
    "arrangeOshc": { "wanted": true, "duration": "12 Months", "durationOther": "", "type": "Single" },
    "disability": { "has": false, "types": [], "otherMedical": "" }
  },
  "education": {
    "qualifications": [
      { "qualification": "Higher Secondary Certificate", "year": "2019", "country": "India" }
    ],
    "creditTransfer": false,
    "englishTests": [
      { "test": "IELTS Academic", "date": "2025-11-02", "reading": "6.5", "writing": "6.0", "speaking": "7.0", "listening": "6.5", "overall": "6.5" }
    ]
  },
  "visa": {
    "holds": false,
    "type": "",
    "subclass": "",
    "expiry": "",
    "immigrationOffice": "Australian High Commission, New Delhi, India",
    "applicationDate": "2026-12-01"
  },
  "marketing": { "heard": "Agent", "heardOther": "" },
  "agent": { "company": "Global Education Services", "name": "Rahul Mehta", "email": "rahul@globaledu.example", "phone": "+61 400 123 456" },
  "attachments": [
    { "key": "passport", "name": "" },
    { "key": "english", "name": "" }
  ],
  "declaration": { "agreed": true, "signedDate": "2026-10-02" }
}
```

### Field rules

Paper form section letters are in brackets. **Bold** = always required. Any optional text field can be left out or sent as `""`.

| Path | Rule |
|---|---|
| **course.code** (A) | text, max 30 |
| **course.title** | text |
| course.duration, applicationFee, tuitionFee, materialFee | text, as shown on the form (e.g. `"$500"`) |
| course.manual | `true` when the student typed the course in ("My course is not listed") |
| **course.intakeYear** | `"2026"`, `"2027"`… |
| **personal.title** (B) | `Mr` · `Miss` · `Mrs` · `Ms` |
| **personal.givenNames**, **lastName** | text, max 80 |
| **personal.gender** | `Male` · `Female` · `Unspecified` |
| **personal.dob** | date |
| **personal.countryOfBirth**, **nationality** | text |
| personal.firstLanguage | text |
| **personal.passportNumber** | text, max 20 |
| **personal.passportExpiry** | date |
| **contact.home.address**, **city**, **country** (C) | text |
| contact.home.postcode | text |
| contact.australia.address, suburb, postcode | text |
| contact.australia.state | `""` or `ACT` · `NSW` · `NT` · `QLD` · `SA` · `TAS` · `VIC` · `WA` |
| contact.phone | text |
| **contact.mobile** | text |
| **contact.email** | valid email |
| **emergencyContact.name**, **relationship**, **number** (D) | text |
| **health.oshc.has** (E) | boolean. If `true`, **provider** and **membershipNumber** are required |
| health.oshc.type | `""` or `Single` · `Couple` · `Family` |
| health.oshc.expiry | `""` or date |
| **health.arrangeOshc.wanted** | boolean. If `true`, **duration** and **type** are required |
| health.arrangeOshc.duration | `""` or `12 Months` · `Other`. If `wanted` and `Other`, **durationOther** is required |
| **health.disability.has** | boolean. If `true`, give at least one of `types` or `otherMedical` |
| health.disability.types | array of `Hearing` · `Vision` · `Learning` · `Mobility` |
| education.qualifications (F) | up to 6 × `{ qualification, year, country }` |
| **education.creditTransfer** | boolean (`true` = "Yes (attach copies)") |
| education.englishTests (G) | up to 6 × `{ test, date, reading, writing, speaking, listening, overall }`; `date` is `""` or a date |
| **visa.holds** (H) | boolean. If `true`, **type** is required |
| visa.subclass | `""` or up to 3 digits, e.g. `"500"` |
| visa.expiry | `""` or date |
| visa.immigrationOffice (I) | text |
| visa.applicationDate | `""` or date |
| **marketing.heard** (J) | `Agent` · `Google Search` · `Facebook` · `Government Websites` · `Events` · `Other` |
| marketing.heardOther | text |
| agent.company, name (K) | text; **required when `marketing.heard` is `Agent`** |
| agent.email | `""` or valid email |
| agent.phone | text |
| attachments (M) | up to 8 × `{ key, name }`, each key once. `name` = what an `other` document is |
| **declaration.agreed** (N) | must be `true` |
| **declaration.signedDate** | date |

The conditional rules ("If `true` …") are checked once all the basic fields are valid.

### Example request

```bash
curl -X POST http://localhost:4000/api/v1/enrolments \
  -F "data=<data.json" \
  -F signature=@signature.png \
  -F agentStamp=@stamp.png \
  -F attachment_passport=@passport.pdf \
  -F attachment_english=@ielts.pdf
```

From the website (the form keeps the signature and stamp as data URLs, and the checklist files as `File`s):

```js
const body = new FormData()
body.append('data', JSON.stringify(answers))
body.append('signature', await (await fetch(values.signature)).blob(), 'signature.png')
if (values.agentStamp) body.append('agentStamp', await (await fetch(values.agentStamp)).blob(), 'stamp.png')
for (const file of files.passport ?? []) body.append('attachment_passport', file)
await apiClient.post('/enrolments', body) // apiClient sends FormData as multipart
```

### Responses

`201 Created`: the public answer is short and never echoes personal data back.

```json
{
  "data": {
    "id": "6abf5a42a8713070a56bb9f8",
    "reference": "ENR-2026-D9UWZU",
    "status": "New",
    "submittedAt": "2026-10-02T07:16:18.893Z"
  }
}
```

`400 Bad Request` examples:

```json
{ "error": { "message": "Invalid body", "details": { "personal.dob": ["use YYYY-MM-DD"], "declaration.agreed": ["tick the declaration"] } } }
```
```json
{ "error": { "message": "Invalid body", "details": { "health.oshc.provider": ["required"], "health.oshc.membershipNumber": ["required"], "visa.type": ["required"] } } }
```
```json
{ "error": { "message": "Invalid body", "details": { "signature": ["upload an image of the signature"] } } }
```
```json
{ "error": { "message": "passport.png is not a real PNG file" } }
```
```json
{ "error": { "message": "Files sent for documents that are not ticked", "details": { "attachment_visa": ["add it to \"attachments\" too"] } } }
```
```json
{ "error": { "message": "A file is too large (max 10 MB each)", "details": { "attachment_passport": ["LIMIT_FILE_SIZE"] } } }
```
```json
{ "error": { "message": "Send the answers as JSON in the multipart field \"data\"" } }
```

---

## GET /enrolments — list

Query (all optional):

| Param | Default | Meaning |
|---|---|---|
| `status` | all | one of the statuses |
| `q` | — | search in reference, given/last name, passport number, email, course code/title, agent company |
| `page` | `1` | page number |
| `limit` | `25` | rows per page, 1–100 |

```
GET /api/v1/enrolments?status=New&q=priya&page=1&limit=25
```

`200 OK`: short rows, newest first.

```json
{
  "data": [
    {
      "id": "6abf5a42a8713070a56bb9f8",
      "reference": "ENR-2026-D9UWZU",
      "status": "New",
      "submittedAt": "2026-10-02T07:16:18.893Z",
      "updatedAt": "2026-10-02T07:16:18.893Z",
      "course": { "code": "CPC30220", "title": "Certificate III in Carpentry", "intakeYear": "2027" },
      "personal": { "title": "Ms", "givenNames": "Priya", "lastName": "Sharma", "nationality": "Indian" },
      "contact": { "mobile": "+91 98765 43210", "email": "priya.sharma@example.com" },
      "marketing": { "heard": "Agent" },
      "agent": { "company": "Global Education Services" }
    }
  ],
  "meta": { "total": 1, "page": 1, "limit": 25, "pages": 1, "counts": { "New": 1 } }
}
```

`meta.counts` always covers **all** applications (not just this filter), for the status tabs.

## GET /enrolments/counts

```json
{ "data": { "New": 4, "In review": 2, "Offer sent": 1 } }
```

A status with no applications is left out (treat it as 0).

## GET /enrolments/:id — one application

`200 OK`: everything from `data`, plus the stored file details, `reference`, `status`, `staffNote` and timestamps. The checklist `label` is the paper form's wording.

```json
{
  "data": {
    "id": "6abf5a42a8713070a56bb9f8",
    "reference": "ENR-2026-D9UWZU",
    "status": "New",
    "staffNote": "",
    "submittedAt": "2026-10-02T07:16:18.893Z",
    "updatedAt": "2026-10-02T07:16:18.893Z",
    "course": { "code": "CPC30220", "title": "Certificate III in Carpentry", "duration": "64 Weeks", "applicationFee": "$500", "tuitionFee": "$18,000", "materialFee": "$500", "manual": false, "intakeYear": "2027" },
    "personal": { "title": "Ms", "givenNames": "Priya", "lastName": "Sharma", "gender": "Female", "dob": "2001-04-12", "countryOfBirth": "India", "nationality": "Indian", "firstLanguage": "Hindi", "passportNumber": "N1234567", "passportExpiry": "2031-08-30" },
    "contact": { "home": { "address": "12 MG Road, Sector 4", "city": "New Delhi", "country": "India", "postcode": "110001" }, "australia": { "address": "", "suburb": "", "state": "", "postcode": "" }, "phone": "", "mobile": "+91 98765 43210", "email": "priya.sharma@example.com" },
    "emergencyContact": { "name": "Anita Sharma", "relationship": "Mother", "number": "+91 98111 22334" },
    "health": { "oshc": { "has": false, "provider": "", "membershipNumber": "", "type": "", "expiry": "" }, "arrangeOshc": { "wanted": true, "duration": "12 Months", "durationOther": "", "type": "Single" }, "disability": { "has": false, "types": [], "otherMedical": "" } },
    "education": { "qualifications": [{ "qualification": "Higher Secondary Certificate", "year": "2019", "country": "India" }], "creditTransfer": false, "englishTests": [{ "test": "IELTS Academic", "date": "2025-11-02", "reading": "6.5", "writing": "6.0", "speaking": "7.0", "listening": "6.5", "overall": "6.5" }] },
    "visa": { "holds": false, "type": "", "subclass": "", "expiry": "", "immigrationOffice": "Australian High Commission, New Delhi, India", "applicationDate": "2026-12-01" },
    "marketing": { "heard": "Agent", "heardOther": "" },
    "agent": {
      "company": "Global Education Services", "name": "Rahul Mehta", "email": "rahul@globaledu.example", "phone": "+61 400 123 456",
      "stamp": { "id": "1b7e4c90a2f3.png", "name": "stamp.png", "mimeType": "image/png", "size": 18342 }
    },
    "attachments": [
      { "key": "passport", "label": "Certified copy of Passport", "name": "", "files": [{ "id": "e70aa7b8b1dd.pdf", "name": "passport.pdf", "mimeType": "application/pdf", "size": 284113 }] },
      { "key": "english", "label": "Certified evidence of English language proficiency like IELTS, TOEFL, PTE and ELICOS, etc.", "name": "", "files": [{ "id": "eaf9d8236827.pdf", "name": "ielts.pdf", "mimeType": "application/pdf", "size": 120554 }] }
    ],
    "declaration": { "agreed": true, "signedDate": "2026-10-02", "signature": { "id": "c30dd5071c91.png", "name": "signature.png", "mimeType": "image/png", "size": 9120 } }
  }
}
```

`404`: `{ "error": { "message": "Enrolment not found" } }`. A malformed id gives `400` `{ "error": { "message": "Invalid params", "details": { "id": ["invalid id"] } } }`.

## GET /enrolments/:id/files/:fileId — one file

`fileId` is a file's `id` from the application (signature, stamp or attachment), e.g. `e70aa7b8b1dd.pdf`.

```
GET /api/v1/enrolments/6abf5a42a8713070a56bb9f8/files/e70aa7b8b1dd.pdf
```

Returns the raw file with its type, opening in the browser (good for an `<img src>`, `<iframe>` or a "View" link):

```
Content-Type: application/pdf
Content-Disposition: inline; filename*=UTF-8''passport.pdf
Cache-Control: private, no-store
```

Files are stored privately at `server/storage/enrolments/<id>/` (git-ignored, never served as static files).

## PATCH /enrolments/:id — status and staff note

`Content-Type: application/json`. Send `status`, `staffNote`, or both.

```json
{ "status": "In review", "staffNote": "Passport checked" }
```

`200 OK`: the full application (same shape as `GET /enrolments/:id`).

`400` when the status isn't one of the list (or when neither field is sent: `"details": {}`):

```json
{ "error": { "message": "Invalid body", "details": { "status": ["Invalid option: expected one of \"New\"|\"In review\"|\"Offer sent\"|\"Enrolled\"|\"Declined\"|\"Withdrawn\""] } } }
```

## DELETE /enrolments/:id

Deletes the application **and all its uploaded files**. `204 No Content`; `404` if it doesn't exist.

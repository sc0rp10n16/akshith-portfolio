# Edmission World CRM v2 — Project Documentation

**Product:** Edmissions World CRM  
**Repository:** `edmission-world-crm-v2`  
**Firebase project:** `edmission-world-crm`  
**Last updated:** 16 September 2026

This document is the technical and product overview of the CRM. Role-by-role how-tos for staff live under [`docs/`](./docs/INDEX.md). Engineering setup lives in [`docs/LOCAL_DEVELOPMENT.md`](./docs/LOCAL_DEVELOPMENT.md).

---

## 1. What this product is

Edmission World CRM is a **role-based student-admissions CRM**. Staff log in, work a shared lead pipeline, clock attendance, apply for leave, send WhatsApp templates, and (for admins) monitor teams, reports, live screens, and support tickets.

Typical journey:

1. Admin creates **teams** and **users**.
2. Sales managers **import and assign leads** to telecallers.
3. Telecallers **call leads**, update status, schedule follow-ups, and qualify students.
4. Qualified leads are handed to **counselors**, who manage follow-ups, documents, and applications.
5. Receptionists record **walk-ins** and assign a counselor.
6. Overnight automation moves yesterday’s **No Contact** leads back into **Follow-up 1**.

The app is a **private staff tool**, not a public student portal. A leftover “student” dashboard type exists in code but is not a live role.

---

## 2. Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js **15.1** App Router, React **18**, TypeScript |
| Styling | Tailwind CSS, Radix UI, class-variance-authority, lucide-react |
| State / data fetching | TanStack React Query (`QueryProvider`) |
| Auth & database | Firebase Auth, Cloud Firestore, Firebase Storage |
| Server Admin SDK | `firebase-admin` via `firebaseAdmin.ts` + `service_key.json` |
| Forms / validation | react-hook-form, Zod |
| Charts / export | Recharts, xlsx, papaparse, jsPDF |
| Email | Nodemailer (`lib/services/emailService.ts`) |
| Realtime screens | LiveKit (`livekit-client` / `livekit-server-sdk`) and WebRTC helpers |
| Background jobs | Firebase Cloud Functions v2 scheduler (`functions/`) |
| Tests | Vitest + React Testing Library; Playwright E2E |
| Dev server | `next dev --turbopack` on http://localhost:3000 |

**Node:** 20.x LTS recommended (minimum 18.18). **Package manager:** npm only (lockfile and scripts assume npm).

---

## 3. Architecture

```
Browser
  AuthProvider (Firebase Auth + Firestore users/{uid})
  RBAC hooks + role dashboards
  Cookies: session (ID token), user_role
        │
        ▼
Next.js App Router
  middleware.ts          path → allowed roles
  app/(dashboard)/*      role pages
  app/api/*              Route Handlers (Admin SDK)
        │
        ├── Client SDK ──► Firestore / Auth / Storage
        ├── Admin SDK  ──► users, leave, support, LiveKit tokens, WhatsApp
        └── External   ──► WhatsApp API, SMTP, LiveKit Cloud, Google OAuth
        │
        ▼
Cloud Function (asia-south1)
  moveNoContactToFollowUps   00:05 Asia/Kolkata
```

**Route groups** `(auth)` and `(dashboard)` do not appear in the URL.

**Client vs server:**

- Browser code uses `firebase.ts` (public web config).
- API routes and server modules use `firebaseAdmin.ts`. Admin must never ship in the client bundle. `next.config.ts` marks `firebase-admin` as a server-only package and stubs Node `fs` / `path` / `os` on the client.

---

## 4. Getting started

Full walkthrough: [`docs/LOCAL_DEVELOPMENT.md`](./docs/LOCAL_DEVELOPMENT.md).

```bash
npm ci          # or npm install
npm run dev     # http://localhost:3000
```

Most CRM screens work without `.env.local`. Add env vars only for WhatsApp, Google OAuth, SMTP, LiveKit, and support-ticket mail.

### 4.1 Environment variables

Create `.env.local` in the repo root when enabling those features:

```env
WHATSAPP_API_BASE_URL=https://api.example.com/whatsapp
WHATSAPP_API_KEY=xxxx
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-app-password
SMTP_FROM=EdMission HR <hr@example.com>
ADMIN_NOTIFICATION_EMAILS=admin1@example.com,admin2@example.com
SUPPORT_TICKET_EMAIL=admin@klinnai.com

NEXT_PUBLIC_LIVEKIT_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
```

Firebase **client** config is hardcoded in `firebase.ts` (project `edmission-world-crm`). Server routes need **`service_key.json`** at the repo root (Firebase Console → Project settings → Service accounts). Do not commit that file.

### 4.2 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm run start` | Production build and serve |
| `npm run lint` / `npm run lint:strict` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright |
| `npm run validate` | Strict lint + types + unit tests + build |

---

## 5. Authentication and authorization

### 5.1 Login

1. User signs in at `/login` with Firebase email/password (`signInWithEmailAndPassword`).
2. Optional: `POST /api/auth/log-login` writes a `login_logs` row for telecallers and counselors.
3. Client sets cookies via `services/authService.ts`.
4. `AuthProvider` (`hooks/auth/useAuth.tsx`) listens with `onAuthStateChanged` and loads `users/{uid}` from Firestore.
5. `/dashboard` renders the dashboard for that user’s role.

Cookies:

| Cookie | Contents | Lifetime |
|--------|----------|----------|
| `session` | Firebase ID token | 7 days |
| `user_role` | Role from Auth custom claims (fallback `'student'`) | 7 days |

Both use `secure` in production and `sameSite: 'strict'`.

Logout clears those cookies (`clearAuthCookies`).

### 5.2 Roles

Canonical type in `lib/types/user.ts`:

```ts
type UserRole = 'admin' | 'sales_manager' | 'telemarketer' | 'counselor' | 'receptionist';
```

A `User` document stores `uid`, `email`, `role`, `name`, `displayName`, optional `teamId`, optional `isTestAccount`, and timestamps. E2E test accounts with `isTestAccount` are hidden from admin user lists.

### 5.3 Middleware (path RBAC)

`middleware.ts` maps URL prefixes to allowed roles:

| Path prefix | Allowed roles |
|-------------|---------------|
| `/admin` | `admin` |
| `/sales-manager` | `admin`, `sales_manager` |
| `/telemarketer` | `admin`, `sales_manager`, `telemarketer` |
| `/counselor` | `admin`, `counselor` |
| `/receptionist` | `admin`, `counselor`, `receptionist` |
| `/leave` | `telemarketer`, `counselor`, `sales_manager`, `admin` |

No session cookie → redirect to `/login`. Session but no `user_role` → `/api/auth/refresh-session`. Wrong role → `/unauthorized`.

**Known issue:** the bypass flag is inverted:

```ts
const isDevelopment = process.env.NODE_ENV === 'production';
if (isDevelopment) { /* skip auth */ }
```

As written, middleware **skips role checks in production** and **enforces them in development**. README already flags this. Intended behaviour is the opposite: skip only when `NODE_ENV !== 'production'`. Fix before relying on middleware in production. Client-side `ProtectedRoute` and API verifiers still apply.

**Note:** `app/api/auth/create-session.ts`, `verify-session.ts`, and `refresh-session.ts` are Pages Router–style handlers, not `route.ts` files, so they may not be live App Router endpoints even though middleware still redirects to `/api/auth/refresh-session`.

### 5.4 Permission map

`lib/auth/rbac.ts` + `hooks/auth/useRBAC.tsx` (`hasPermission`, `hasRole`).

| Role | Permissions |
|------|-------------|
| **admin** | users, analytics, teams, upload/assign leads, team performance, student applications/documents |
| **sales_manager** | upload/assign leads, team members, team performance, view assigned leads |
| **telemarketer** | view assigned leads, update lead status, track daily quota |
| **counselor** | manage applications, update application status, review documents |
| **receptionist** | currently student-style perms (`view:application_status`, `upload:documents`, `track:progress`) — TODO in code |

Leave has a separate RBAC layer in `lib/leave/leaveRequestRbac.ts`. Admin APIs use `lib/api/verifyAdmin.ts`; leave/support APIs use `lib/api/verifyLeaveUser.ts`.

---

## 6. Product by role

After login, `/dashboard` chooses a dashboard component. Sidebar nav is `components/layout/sidebar.tsx`.

### 6.1 Admin

Org-wide operations.

| Area | Routes |
|------|--------|
| Dashboard | `/dashboard` — KPIs, lead-status chart, live-screen/recording counts, team daily report export |
| Teams | `/admin/teams` |
| Users | `/admin/users`, `/admin/users/create` |
| Leave | `/admin/leave/dashboard`, `/all-requests`, `/manager-requests`, `/calendar`, `/monthly-summary` |
| Leads (shared manager screens) | `/sales-manager/leads`, `/all-leads`, `/dnp-leads` |
| Reports | `/admin/reports/login-activity`, `/counselors`, `/sales-managers`, `/telemarketers` |
| Live screens / recordings | `/admin/live-screens`, `/admin/screen-recordings` (pages exist; sidebar links are currently commented out; dashboard cards still link here) |
| Help | `/admin/help` |

### 6.2 Sales manager

Team lead pipeline and leave approvals.

| Area | Routes |
|------|--------|
| Dashboard | `/dashboard` |
| Team performance | `/sales-manager/teams` |
| Telecaller / counselor stats | `/sales-manager/analytics`, `/sales-manager/analytics/counselors` |
| Assign / all / DNP leads | `/sales-manager/leads`, `/all-leads`, `/dnp-leads` |
| Leave | `/sales-manager/leave/team`, `/my`, `/calendar` |
| Settings (distribution, caps, quotas) | `/sales-manager/settings` |
| Help | `/sales-manager/help` |

### 6.3 Telemarketer (telecaller)

Outbound calling on assigned leads.

| Area | Routes |
|------|--------|
| Dashboard | `/dashboard` |
| My leads | `/telemarketer/leads` |
| Missed follow-ups | `/telemarketer/missed-follow-ups` |
| Quota / performance | `/telemarketer/quota` |
| Attendance | `/attendance` |
| Leave | `/leave/apply`, `/leave/applications`, `/leave/calendar` |
| Calling + help | `/telemarketer/help` |

`/telemarketer/add`, `/assign`, `/myleads`, and `/performance` exist as Access Denied stubs. Live paths are `/leads` and `/quota`.

### 6.4 Counselor

Work qualified students through application.

| Area | Routes |
|------|--------|
| Dashboard | `/dashboard` |
| My leads | `/counselor/myleads` |
| Follow-ups | `/counselor/followups` |
| Applications | `/counselor/applications` |
| Attendance | `/attendance` |
| Leave | `/leave/apply`, `/applications`, `/calendar` |
| Help | `/counselor/help` |

Student details include notes, documents (`DocumentUpload`), and meeting scheduling (`ScheduleMeeting*`, `UpcomingMeetings`).

### 6.5 Receptionist

Front desk walk-ins.

| Area | Routes |
|------|--------|
| Dashboard | `/dashboard` — walk-in create, today’s walk-ins, assign counselor, stats (`ReceptionistDashboard`) |
| Help | `/receptionist/help` |

Sidebar also lists `/receptionist/walkin`, `/today`, and `/documents`. Those `page.tsx` files are **not** under `app/`; the flows live on the dashboard and in `components/receptionist/*`. Help catalogs still point at the missing paths.

### 6.6 Shared staff routes

| Route | Who |
|-------|-----|
| `/settings` | Logged-in staff |
| `/contact/ask-for-help` | Support tickets |
| `/privacy-policy`, `/terms-of-service` | Public |
| `/unauthorized` | RBAC denial |

---

## 7. Lead lifecycle

Leads are the core CRM object (`leads` collection). Canonical statuses (`lib/types/lead.ts`):

```
new → InProgress → NoContact | FollowUp1 | FollowUp2 | FollowUp3 | NeedsFutureFollowUp
                              → Qualified | NotInterested | CounselorAssigned | completed
```

An older snake_case status set still exists in `lib/types/index.ts`. Runtime UI uses the PascalCase set above.

### 7.1 Assignment

- Managers/admins import CSV or enter leads on **Assign Leads** (`/sales-manager/leads`, `LeadManagementContent`).
- Each lead gets `assignedTo` (telecaller) and optional `teamId`.
- Manager **Settings** control distribution (`round_robin` / capacity / performance), `maxLeadsPerDay`, and team quotas.

### 7.2 Telecaller work

On a lead the telecaller can:

- Call / email, add notes, change status
- Schedule a follow-up (`FollowUpScheduler`; statuses in `lib/leads/followups.ts`)
- Mark **No Contact** (DNP)
- **Qualify** and assign a counselor (`CounselorAssignmentDialog`)

Missed follow-ups: `/telemarketer/missed-follow-ups`.

Qualify sets `status: 'Qualified'`, `counselorId` / `counselorName`, `isCounselorAssigned`, and telecaller attribution fields.

### 7.3 DNP / No Contact

- Status `NoContact` = did not pick up / no contact.
- Manager/admin **DNP Leads** (`/sales-manager/dnp-leads`) can search, export, and delete.
- Scheduled function `moveNoContactToFollowUps` (00:05 Asia/Kolkata) finds leads with `status == "NoContact"` and `noContactAt` in yesterday’s window, then sets `FollowUp1`, today’s `followUpDate`, and `noContactAutoMovedAt`.

### 7.4 Counselor work

Counselor book filters `Qualified` / `CounselorAssigned`. Counselors run follow-up stages (`getCounselorFollowUpStage`), upload documents, and drive application status.

Application statuses (`lib/types/application.ts`):

`draft` → `documents_pending` → `under_review` → `additional_docs_required` → `completed`

Application work mostly **mutates leads**, rather than a fully separate applications table.

### 7.5 Lead fields (important)

| Field | Role |
|-------|------|
| `assignedTo`, `teamId` | Telecaller / team ownership |
| `followUpDate`, `notes[]` | Follow-up schedule and history |
| `counselorId`, `counselorName`, `counselorAssignedAt` | Handoff |
| `telecallerId`, `telecallerName` | Who qualified the lead |
| `noContactAt` | Used by the overnight Cloud Function |
| `source` | Lead origin |

---

## 8. Domain modules

### 8.1 Teams

Collection `teams`: `name`, `managerId`, `members[]`, `region`, `status: 'active' | 'inactive'`. Users on a team store `teamId`. Admin creates teams; managers see team performance. Services: `services/teamService.ts`.

### 8.2 Attendance

Telemarketers and counselors clock in/out at `/attendance`. Collection `attendance`. Record status: `active` | `completed` | `auto_closed`. Service: `services/attendanceService.ts`. History and a monthly report are available on that page.

### 8.3 Leave (canonical vs legacy)

**Canonical stack** — Firestore `leave_requests` + `leave_audit_logs`.

- APIs: `/api/leave-requests/**`
- UI: `/leave/*`, `/sales-manager/leave/*`, `/admin/leave/*`
- Types: casual, sick, personal, other
- Status: pending → approved | rejected
- One request per employee per calendar day
- Hierarchy: counselor/telemarketer → team `sales_manager` (else admin); sales_manager → admin
- Email: `lib/leave/leaveRequestNotify.ts` (non-blocking; leave still saves if SMTP fails)

Engineering: [`docs/LEAVE.md`](./docs/LEAVE.md). User routes: [`docs/leave/USER_GUIDE.md`](./docs/leave/USER_GUIDE.md). SMTP: [`docs/LEAVE_SMTP.md`](./docs/LEAVE_SMTP.md).

**Legacy stack** still present: collection `leave_applications`, `/api/leave/**`. Root pages redirect:

- `/leave` → `/leave/apply`
- `/admin/leave` → `/admin/leave/dashboard`
- `/sales-manager/leave` → `/sales-manager/leave/team`

Do not hard-delete leave requests on the new stack. Full legacy removal is still out of scope.

### 8.4 Support tickets

1. Sidebar **Contact → Ask for help** → `/contact/ask-for-help`
2. `POST /api/support/ticket` persists `support_tickets` (status `submitted`)
3. Categories: `bug` | `login_access` | `wrong_or_missing_data` | `other`
4. Email to `SUPPORT_TICKET_EMAIL` (default `admin@klinnai.com`) via the same SMTP path
5. User can list own tickets: `GET /api/support/tickets`

Admin playbook: `docs/admin/14-support-playbook-for-admins.md`.

### 8.5 Reports and quotas

- Admin reports: login activity, counselor / manager / telemarketer quota views
- Team daily export: `lib/reports/teamDailyReport.ts` + `TeamDailyReportExport`
- Telecaller “My Performance”: `/telemarketer/quota`
- Manager settings: distribution algorithm, daily caps, team quotas

### 8.6 Live screens and recordings

Telecallers/counselors can share their screen. Admins view live sessions and archived recordings.

| Piece | Detail |
|-------|--------|
| Providers | LiveKit or WebRTC (`lib/liveScreens.ts`) |
| Room name | `screen_{uid}` |
| Token | `POST /api/livekit/token` |
| Firestore | `screen_share_sessions`, `screen_recordings` |
| Hooks | `hooks/useScreenShare.ts` |

Env: `NEXT_PUBLIC_LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`.

### 8.7 WhatsApp templates

Server routes under `/api/whatsapp/*` call `lib/services/whatsappService.ts`, which POSTs to `{WHATSAPP_API_BASE_URL}/send-template-message` and logs to `whatsapp_messages`.

Routes include: `onboarding`, `collect-documents`, `payment-reminder`, `registration-fee`, `application-started`, `application-confirmation`, `university-details`, `visa-process`, `visa-confirmation`, `happy-journey`, `triggers`.

Trigger cases include `student_registered`, `documents_missing`, `payment_due`.

### 8.8 Google OAuth / Calendar

Root layout wraps the app in `GoogleOAuthProvider`. Client ID and Calendar scopes live in `utils/googleApiConfig.ts`. Meeting UI is mostly local state; Calendar API usage in the product is light.

---

## 9. Data model (Firestore)

There is **no `firestore.rules` file in this repo**. `firebase.json` only wires indexes and Cloud Functions. Security currently depends on Auth + API verifiers + client-side RBAC.

### Collections

| Collection | Purpose |
|------------|---------|
| `users` | Staff accounts (role, teamId) |
| `teams` | Manager + members |
| `leads` | Pipeline |
| `attendance` | Clock in/out |
| `leave_requests` | New leave |
| `leave_audit_logs` | Leave audit trail |
| `leave_applications` | Legacy leave |
| `support_tickets` | Ask-for-help tickets |
| `login_logs` | Login activity |
| `whatsapp_messages` | Template send log |
| `screen_share_sessions` | Live screens |
| `screen_recordings` | Recording metadata |
| `user_locations` | Activity location (`POST /api/activity/location`) |
| `leadImportStats` | Import stats |
| `scheduledImports` | Scheduled CSV imports |
| `telemarketersStats` | Quota/stats docs |

Indexes: `firestore.indexes.json` (heavy on `leads`, plus `attendance`, `users`, `leave_requests`, import collections).

Storage: Firebase Storage for documents and recordings.

---

## 10. HTTP API (App Router)

All of these are `app/api/**/route.ts` unless noted.

### Auth

| Method | Path | Notes |
|--------|------|-------|
| POST | `/api/auth/log-login` | Writes `login_logs` for tele/counselor |

### Admin users

| Method | Path | Notes |
|--------|------|-------|
| POST | `/api/admin/users` | Create Auth user + Firestore `users` |
| PATCH / DELETE | `/api/admin/users/[uid]` | Update / delete |

### Leave (new)

| Method | Path | Notes |
|--------|------|-------|
| GET / POST | `/api/leave-requests` | List / create |
| GET | `/api/leave-requests/[id]` | Detail |
| POST | `/api/leave-requests/[id]/approve` | Approve |
| POST | `/api/leave-requests/[id]/reject` | Reject |
| GET | `/api/leave-requests/me`, `/me/summary` | Own leave |
| GET | `/api/leave-requests/calendar` | Personal calendar |
| GET | `/api/leave-requests/team`, `/summary`, `/calendar`, `/conflicts`, `/members` | Manager |
| GET | `/api/leave-requests/admin`, `/employees`, `/calendar`, `/analytics`, `/summary`, `/summary/export` | Admin |

### Leave (legacy)

`/api/leave`, `/api/leave/[id]/approve|reject|cancel`

### WhatsApp, LiveKit, support, activity

| Method | Path |
|--------|------|
| POST | `/api/whatsapp/{onboarding,collect-documents,...}` |
| POST | `/api/livekit/token` |
| POST | `/api/support/ticket` |
| GET | `/api/support/tickets` |
| POST | `/api/activity/location` |

---

## 11. Cloud Functions

Package: `functions/` (Node 20, separate `package.json`). Deployed via `firebase.json` → `functions` source.

**`moveNoContactToFollowUps`**

- Scheduler: `5 0 * * *` (`00:05`) **Asia/Kolkata**
- Region: `asia-south1`
- Query: `leads` where `status == "NoContact"` and `noContactAt` in yesterday
- Update: `FollowUp1`, `followUpDate` = today, `noContactAutoMovedAt`

Local Functions setup is in [`docs/LOCAL_DEVELOPMENT.md`](./docs/LOCAL_DEVELOPMENT.md) §9.

---

## 12. In-app help system

Staff help is markdown under `docs/{admin,manager,telemarketer,counselor,receptionist,support,calling}/`, rendered in the app.

| Piece | Location |
|-------|----------|
| Catalogs (slug → file) | `lib/docs/catalogs.ts` |
| Markdown → HTML | `lib/docs/markdown.ts` |
| Locales | `en`, `hi`, `te` (`lib/docs/locale.ts`) |
| Switcher | `components/docs/DocLanguageSwitcher.tsx` |
| Hubs | `/{role}/help` and `/{role}/help/[slug]` |

Localized files live in `docs/<folder>/<locale>/<file.md>`. Missing locale falls back to English with a banner. Locale is stored as `crm_help_locale`.

Master staff index: [`docs/INDEX.md`](./docs/INDEX.md).

---

## 13. Project structure

```
app/
  (auth)/login, register
  (dashboard)/          role pages, leave, attendance, help, settings
  api/                  Route Handlers
  layout.tsx            AuthProvider, QueryProvider, GoogleOAuthProvider
components/
  admin/, counselor/, telemarketer/, receptionist/, leave/, leads/, support/, docs/, ui/
hooks/
  auth/                 useAuth, useRBAC
  leave/, useAttendance, useScreenShare, useQueryHooks
lib/
  auth/rbac.ts
  api/                  client wrappers + server verifiers
  docs/                 help catalogs
  firebase/             user helpers
  leave/                new leave domain
  leads/                follow-ups, revert, status
  services/             email, WhatsApp
  support/, reports/, types/
services/               client Firestore: auth, leads, teams, attendance, legacy leave
functions/src/index.ts  scheduled NoContact job
docs/                   staff guides + engineering notes
e2e/                    Playwright
__tests__/              Vitest
middleware.ts           path RBAC
firebase.ts             client SDK
firebaseAdmin.ts        Admin SDK
```

UI primitives are Radix-based under `components/ui/`.

---

## 14. Testing

**Unit / component (Vitest)**

- Config: `vitest.config.ts`, setup: `vitest.setup.ts`
- Environment: jsdom; alias `@` → repo root; Firebase and `next/navigation` mocked
- Include: `__tests__/**/*.test.{ts,tsx}` plus co-located tests (e.g. `lib/auth/rbac.test.ts`, `services/attendanceService.test.ts`)
- Strong coverage on leave (RBAC, schema, analytics, APIs), lead helpers, screen share, login API

**E2E (Playwright)**

- Config: `playwright.config.ts`; Chromium; `webServer: npm run dev`
- Specs: login, dashboard, attendance, admin login activity, admin screen recordings
- Setup: `e2e/auth.setup.ts`, `e2e/helpers.ts`
- Install browsers once: `npx playwright install`

CI-style: `npm run test:ci` (Vitest then Playwright).

---

## 15. Deployment

- App: `npm run build` then `npm run start`, or **Vercel**. Set production env vars (`WHATSAPP_*`, SMTP, LiveKit, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_LIVEKIT_URL`).
- Cookies are `secure` only when `NODE_ENV === 'production'` — use HTTPS in production.
- Functions: Firebase CLI against project `edmission-world-crm` (see `.firebaserc`).
- Firestore indexes deploy from `firestore.indexes.json`. Rules are **not** in-repo; manage them in Firebase Console or add a `firestore.rules` file if the team wants them versioned.

A web app manifest exists (`app/manifest.json`, name “Edmissions World”). `next-pwa` is a dependency but `next.config.ts` does **not** wrap `withPWA`.

---

## 16. Known gaps and caveats

Documented so implementers do not treat them as surprises:

1. **Middleware `NODE_ENV` bypass is inverted** — production currently skips path RBAC. See §5.3.
2. **`user_role` cookie** is filled from Auth **custom claims**, with fallback `'student'`. If claims are not set on the Auth user, middleware may not match Firestore `users.role`.
3. **No Firestore rules in git.** Client SDK can read/write whatever the deployed rules allow.
4. **Receptionist** sidebar routes `/walkin`, `/today`, `/documents` have no matching pages; UX is on the dashboard.
5. **Telemarketer** `/add`, `/assign`, `/myleads`, `/performance` are stubs.
6. **Leave** is dual-stack (new `leave_requests` + legacy `leave_applications`).
7. **Receptionist RBAC** still uses student-style permissions (TODO in `rbac.ts`).
8. **Lead `status` typing** is loose (`status: string` on `Lead`) despite a `LeadStatus` union; `Lead` also has an index signature.
9. **Auth refresh handlers** under `app/api/auth/` may not be App Router–active.
10. **PWA** dependency is unused in Next config.

---

## 17. Related documentation

| Doc | Audience |
|-----|----------|
| [README.md](./README.md) | Quick start |
| [docs/INDEX.md](./docs/INDEX.md) | Staff help map |
| [docs/LOCAL_DEVELOPMENT.md](./docs/LOCAL_DEVELOPMENT.md) | New machine, Functions, tests |
| [docs/LEAVE.md](./docs/LEAVE.md) | Leave engineering |
| [docs/leave/USER_GUIDE.md](./docs/leave/USER_GUIDE.md) | Leave UX by role |
| [docs/LEAVE_SMTP.md](./docs/LEAVE_SMTP.md) | Leave email |
| [docs/admin/](./docs/admin/) | Admin how-tos |
| [docs/manager/](./docs/manager/) | Sales manager how-tos |
| [docs/telemarketer/](./docs/telemarketer/) | Telecaller how-tos |
| [docs/counselor/](./docs/counselor/) | Counselor how-tos |
| [docs/receptionist/](./docs/receptionist/) | Reception how-tos |
| [docs/calling/](./docs/calling/) | Bluetooth / phone + CRM |
| [docs/support/](./docs/support/) | Break-fix ladder and tickets |

---

## 18. License

Not specified. Treat the repository as proprietary unless a license file is added.

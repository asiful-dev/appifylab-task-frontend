# BuddyScript Frontend

Frontend application for the BuddyScript social feed selection task (Appifylab), implemented with Next.js App Router, React, TypeScript, and a feature-oriented architecture.

## 1) Why this frontend architecture

This frontend is designed to satisfy PRD priorities: pixel-faithful UI conversion from provided HTML, secure auth/session flow, scalable feed experience, and maintainable structure.

- **Next.js (App Router)**: modern React architecture with route groups and flexible server/client composition.
- **TypeScript**: compile-time safety across API contracts, form data, and shared models.
- **TanStack React Query**: robust server-state handling for feed pagination, caching, and retries.
- **Zustand**: lightweight client-state store for auth/session and UI state with minimal boilerplate.
- **React Hook Form + Zod**: predictable and type-safe form validation.
- **Tailwind + shadcn patterns**: consistent design system implementation and reusable UI primitives.
- **Native `fetch` API (no Axios)**: explicitly aligned with task guidance and PRD direction.

## 2) Major technology and third-party choices

### Framework and rendering

- **Next.js 16 App Router** for route groups like `(auth)` and `(main)`, plus optimized production builds.
- **React 19** for component-driven UI and concurrent rendering model.

### State and data

- **React Query** for API data lifecycle (loading/error/cache/infinite scroll).
- **Zustand** for lightweight in-memory auth and UI state.

### Forms and validation

- **React Hook Form** for performant form handling.
- **Zod + resolvers** for schema-safe validation.

### UX and utility tooling

- **next-themes** for light/dark mode behavior.
- **sonner** for toast notifications.
- **react-intersection-observer** for feed loading triggers.

## 3) Frontend architectural pattern

High-level flow:

`Route Group -> Feature UI -> API Client (fetch wrapper) -> Backend /api`

Auth/session model:

- Access token is kept in memory.
- Refresh token is handled via secure httpOnly cookie from backend.
- Frontend talks to backend via `NEXT_PUBLIC_API_URL`.

## 4) Folder architecture

```text
frontend/
├─ app/                         # App Router entry points and route groups
│  ├─ (auth)/                   # login/register/forgot/reset flows
│  ├─ (main)/                   # authenticated app area (feed/profile)
│  ├─ globals.css
│  └─ layout.tsx
├─ features/                    # feature-based modules (auth/feed/comments/likes/profile)
├─ shared/
│  ├─ api/                      # API calls and adapters
│  ├─ hooks/                    # reusable hooks
│  ├─ libs/                     # constants/helpers/client wrappers
│  ├─ providers/                # app-level providers
│  ├─ ui-components/            # reusable UI components
│  ├─ utils/                    # pure utilities
│  └─ validators/               # shared validation schemas
├─ public/images/               # static assets
├─ docs/                        # PRD, setup guides, OpenAPI references
└─ types/                       # shared TS types
```

Why this structure:

- `app/` manages route and layout concerns.
- `features/` groups domain code for scaling independent modules.
- `shared/` holds cross-feature contracts/utilities to reduce duplication.

## 5) Local setup and run guide

### Prerequisites

- Node.js 18+
- npm 9+
- Backend API running (default `http://localhost:5000`)

### Step 1: install dependencies

```bash
cd frontend
npm install
```

### Step 2: create env config

```bash
cp .env .env.local
```

Ensure `.env.local` contains:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=BuddyScript
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## 6) Useful scripts

- `npm run dev` — run local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint checks

## 7) Live links

Current deployed links (from project env configuration):

- Frontend app: `https://appifylab-task-frontend-mu.vercel.app`
- Backend API base: `https://appifylab-task-backend-pi.vercel.app/api`
- Backend API docs: `https://appifylab-task-backend-pi.vercel.app/api-docs`
- Backend OpenAPI spec: `https://appifylab-task-backend-pi.vercel.app/api/spec`

## 8) Contract and integration notes

- Base backend path: `/api`
- API success envelope: `{ success: true, data, meta? }`
- API error envelope: `{ success: false, error: { code, message } }`
- Handle auth refresh and 401 paths cleanly in client data layer.

## 9) What this README aligns with

- PRD goals for architecture quality, security, and scalability.
- Selection-task requirement to convert provided auth/feed designs into a production-style app.
- Existing backend API contract and docs-first integration workflow.

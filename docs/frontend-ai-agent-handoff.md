# Frontend AI Agent Handoff Plan (BuddyScript)

Use this document as the single source of truth when prompting your frontend AI agent.

---

## 1) Goal

Build a production-quality frontend (Next.js App Router + TypeScript) that matches the backend API contract exactly, with strong auth/session handling, clean architecture, and minimal rework.

---

## 2) What You Should Provide to the Frontend AI Agent

### Required artifacts

1. **PRD**
   - `docs/BuddyScript_PRD.md`

2. **OpenAPI contract (preferred input)**
   - Runtime JSON from backend endpoint: `GET /api/spec`
   - Save this as `openapi.json` and provide it to the agent.

3. **Swagger source (secondary context)**
   - `src/config/swagger.ts`

4. **Auth behavior notes (critical)**
   - Access token is returned in response body and should be held in memory.
   - Refresh token is httpOnly cookie (`refreshToken`).
   - CSRF cookie (`csrfToken`) is set and must be sent in header `x-csrf-token` for state-changing requests where refresh cookie is present.

5. **Backend route context (optional but useful)**
   - `src/routes/auth.routes.ts`
   - `src/routes/user.routes.ts`
   - `src/routes/post.routes.ts`
   - `src/routes/comment.routes.ts`
   - `src/routes/like.routes.ts`

---

## 3) Important Backend Contract Notes (Do Not Miss)

- **Base API path:** `/api`
- **Docs/spec endpoints:** `/api-docs`, `/api-docs.json`, `/api/spec`
- **Response envelope:**
  - Success: `{ success: true, data: ..., meta?: ... }`
  - Error: `{ success: false, error: { code, message } }`
- **Delete endpoints currently return `200` + message** (not `204`).
- **Rate limiting exists**:
  - Auth routes: stricter
  - API routes: broader cap
  - Frontend should gracefully handle `429`.
- **Forgot/reset password is implemented on backend**:
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`

---

## 4) Copy-Paste Master Prompt for Frontend AI Agent

```text
You are implementing the BuddyScript frontend against an existing backend.

NON-NEGOTIABLE RULES:
1) Use the provided OpenAPI contract as the source of truth. Do not invent fields.
2) Keep API types fully aligned with backend request/response envelopes.
3) Implement auth/session correctly:
   - Access token in memory (not localStorage)
   - Refresh token via httpOnly cookie
   - Send x-csrf-token header for state-changing requests when csrf cookie exists
4) Handle all expected error statuses (400/401/403/404/409/429/500) with user-friendly messages.
5) Build in vertical slices and stop after each slice with:
   - changed files
   - assumptions
   - pending questions
   - run/test commands

PROJECT TARGET:
- Next.js App Router + TypeScript strict
- PRD-aligned UI and flows
- Contract-first API integration

IMPLEMENTATION ORDER:
Phase A: API client layer and shared types from OpenAPI
Phase B: Auth screens and protected route handling (register/login/refresh/logout/forgot/reset)
Phase C: Feed and posts (list/create/update/delete, cursor pagination)
Phase D: Comments/replies/likes and who-liked lists
Phase E: Profile (me, public user, update, avatar upload, password change)
Phase F: polishing (loading/error/empty states, retry behavior, 429 UX)

OUTPUT FORMAT PER PHASE:
1) Files added/updated
2) Why those changes
3) Contract checks performed
4) What remains
```

---

## 5) Suggested Frontend Implementation Plan

## Phase A — Contract + Infrastructure

- Generate typed API layer from `openapi.json` (or manually create strict TS types from contract).
- Implement one HTTP client wrapper with:
  - Bearer token injection
  - standardized response parsing (`success/data/meta`)
  - error normalization (`code`, `message`, `status`)
  - refresh retry flow for `401`
  - CSRF header injection from `csrfToken` cookie for mutating methods

### Acceptance criteria
- Can call `/api/spec`, `/api/auth/login`, `/api/posts` with typed responses.
- No `any` types in API layer.

---

## Phase B — Auth

- Pages/flows:
  - Register
  - Login
  - Silent refresh on app load and token expiry
  - Logout
  - Forgot password
  - Reset password
- Add route guards:
  - redirect unauthenticated users away from protected pages
  - redirect authenticated users away from login/register

### Acceptance criteria
- Full auth journey works without localStorage token persistence.
- CSRF header present on refresh/logout and other mutating calls when cookie exists.

---

## Phase C — Feed + Posts

- Build feed page with cursor pagination.
- Post create (text/image + visibility), update, delete, detail view.
- Keep pagination state based on `meta.nextCursor` and `meta.hasMore`.

### Acceptance criteria
- Cursor paging stable, no duplicate rendering on next page.
- Private/public visibility behaviors align with backend.

---

## Phase D — Comments/Replies/Likes

- Post comments list/create/delete.
- Reply create/list.
- Like toggles and who-liked lists for posts/comments.

### Acceptance criteria
- Counts and UI state are synchronized with backend responses.
- Error states handled for 401/403/404.

---

## Phase E — Profile

- `GET /users/me`
- Update profile
- Upload avatar
- Change password
- Public user profile + user posts

### Acceptance criteria
- Forms are validated client-side and display server validation errors correctly.

---

## Phase F — Quality and UX Hardening

- Add standardized loading/skeleton/empty/error states.
- Handle `429` with retry hints.
- Add network retry policy only for safe requests.
- Ensure accessibility basics (focus states, labels, keyboard navigation).

### Acceptance criteria
- No unhandled promise errors in UI.
- UX remains functional under API failures.

---

## 6) What to Ask the Frontend AI Agent to Deliver Every Time

For each phase, require:

1. **Changed files list**
2. **How each endpoint is mapped**
3. **Known assumptions**
4. **Run commands** (typecheck/lint/build/test)
5. **Any backend mismatch discovered**

This keeps implementation auditable and avoids contract drift.

---

## 7) Quick “Do/Don’t” for Best Output

### Do
- Provide `openapi.json` + PRD together.
- Force phase-by-phase delivery.
- Demand strict type safety and explicit error handling.
- Ask for a “backend mismatch list” at end of each phase.

### Don’t
- Ask for all features in one giant prompt.
- Allow invented payload fields not in contract.
- Skip auth refresh/CSRF details.
- Skip acceptance criteria.

---

## 8) Optional Third-Party Setup (Only if you enable real password reset emails)

Current backend supports forgot/reset API flow; in non-production it can expose token for testing.

If you want real emails from frontend journey:

1. Choose provider (Resend / SendGrid / Mailgun).
2. Verify domain + sender identity.
3. Add provider credentials to backend env.
4. Backend sends reset URL token via email.
5. Frontend uses reset page to submit token + new password.

Note: This is optional for frontend build if backend non-production token response is used for local dev.

---

## 9) Final Handoff Checklist Before You Start Frontend

- [ ] Exported `openapi.json` from `/api/spec`
- [ ] Shared PRD and this file with frontend AI agent
- [ ] Shared auth+CSRF behavior note
- [ ] Confirmed base URL and env names for frontend
- [ ] Requested phase-by-phase output format

---

If the frontend AI agent follows this document, you should get significantly higher quality output with fewer back-and-forth corrections.

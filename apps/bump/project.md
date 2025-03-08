# Bump - Source of Truth Document (React/Vite with Cursor)
**Date**: March 03, 2025  
**Tool**: Cursor (React/Vite)  
**Authors**: You (visionary), Grok 3 (xAI assistant)

## 1. Overview
**Purpose**:  
"Bump" fosters spontaneous in-person connections by helping users share and discover favorite gathering spots, track real-time statuses, and log meetups, blending serendipity with subtle intent, inspired by Boulder's social vibe.

**Goals**:  
- *Core*: Enable place listing, real-time status sharing, and meetup tracking.  
- *MVP Success*: 10 daily check-ins, 5 weekly meetups logged within first month.  
- *Qualitative*: Users report a playful, intuitive interface enhancing connection.  
- *Long-Term*: Add AI-driven insights and impromptu events.

**Target Audience**:  
Individuals in community-oriented locales (e.g., Boulder) who value spontaneous interactions at shared spaces like cafes and parks.

## 2. DB Schema
- **profiles**: `id` (UUID, pk), `email` (string, unique), `phone` (string, unique), `username` (string), `created_at` (timestamp)  
  - Note: Extends `auth.users` for public user data. Both email and phone are required identifiers.
- **auth_otp**: `id` (UUID, pk), `email` (string), `otp` (string), `expires_at` (timestamp), `attempts` (integer, default 0)
  - Stores OTP codes for email verification with rate limiting.
- **places**: `id` (UUID, pk), `name` (string), `google_place_id` (string, unique), `lat` (float), `lng` (float)  
  - Shared Google Maps locations or custom pins.  
- **user_places**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `place_id` (UUID, fk → `places.id`, CASCADE), `visibility` (string, default 'friends')  
  - Links users to their spots.  
- **statuses**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `place_id` (UUID, fk → `places.id`, CASCADE), `activity` (string), `timestamp` (timestamp), `is_active` (boolean, default true)  
  - Tracks check-ins with 2-hour timeout.  
- **meetups**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `friend_name` (string), `place_id` (UUID, fk → `places.id`, CASCADE), `timestamp` (timestamp), `was_intentional` (boolean)  
  - Logs encounters.  
- **friends**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `friend_id` (UUID, fk → `profiles.id`, CASCADE), `hope_to_bump` (string, enum: 'off', 'private', 'shared')  
  - Manages connections and intent.  
- **settings**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `availability_start` (time), `availability_end` (time), `notify_for` (string, enum: 'all', 'hope', 'none'), `do_not_disturb` (boolean)  
  - Stores user preferences.  
- **notifications**: `id` (UUID, pk), `user_id` (UUID, fk → `profiles.id`, CASCADE), `content` (string), `is_read` (boolean, default false), `timestamp` (timestamp)  
  - Persists in-app notifications.

## 3. Style Guide
- **Colors**:  
  - Forest Green: `#2E7D32` (primary), `#E8F5E9` (light).  
  - Sandstone Beige: `#D7CCC8` (background), `#F0ECE0` (alt).  
  - Text: `#212121` (main), `#666666` (light).  
- **Typography**:  
  - Font: "Roboto" (sans-serif).  
  - Sizes: 16px (body), 20px (h1), 14px (small).  
  - Weights: 400 (regular), 700 (bold).  
- **Spacing**:  
  - `space`: [0, 4px, 8px, 16px, 24px, 32px, 48px, 64px].  
- **Radii**:  
  - `radii`: { sm: 4px, md: 8px, lg: 12px }.  
- **Animations**:  
  - Pulse: 0.5s ease-in-out (e.g., check-in button).  
  - Fade: 0.3s linear (e.g., modal entry).  
- **Layout**:  
  - Max-width: 600px (desktop, centered with shadow).  
  - Full-width mobile with no overflow.  
  - Bottom nav: Fixed, evenly spaced, 48px height.

## 4. Pages & User Flows
- **Auth Flow**:
  - *Content*: Email input, OTP verification screen, optional phone number collection
  - *Actions*: Enter email, receive OTP, verify code, optionally add phone
  - *Flow*: Open → Enter email → Receive OTP → Enter code → Verify → Optionally add phone → Create profile
  - *Security*: Rate limit OTP attempts, 6-digit codes, 5-minute expiry
  - *Fallback*: Resend OTP option after 1 minute, max 3 attempts
  - *Phone Collection*: Optional during signup, can be added later in settings

- **Home**:  
  - *Content*: Friends' statuses grouped by place, check-in button.  
  - *Actions*: Join status, check in.  
  - *Flow*: Open → View statuses → "Check In" → Modal → Pick place/activity/privacy → Submit.  
- **Gathering Places**:  
  - *Content*: Card list or map toggle of spots, add/edit options.  
  - *Actions*: Add/edit place, toggle view.  
  - *Flow*: Open → List/Map → "Add" → Autocomplete or pin → Submit.  
- **Friends**:  
  - *Content*: Friend list with "Hope to Bump" toggles, add friend selector.  
  - *Actions*: Add friend, toggle intent, view profile (places/statuses if mutual).  
  - *Flow*: Open → View friends → "Add" → Select user → Submit; Tap friend → Profile → Toggle intent.  
- **Meetups**:  
  - *Content*: Log form (friend autocomplete/custom, place, intentional?), history list.  
  - *Actions*: Log meetup, filter history.  
  - *Flow*: Open → "Log" → Modal → Fill form → Submit → View history.  
- **Settings**:  
  - *Content*: Availability times, notify prefs, "Do Not Disturb," logout.  
  - *Actions*: Update settings, logout.  
  - *Flow*: Open → Adjust prefs → Save.

## 5. Milestones/Action Plan
1. **Initialize Project**:  
  - *Goals*: Set up React/Vite PWA with TypeScript, routing, styled-components, workbox, Vitest in current dir with `.cursorrules` and `.cursortrack.md`.  
  - *Done When*: App runs with routes (Auth, Home, Places, Friends, Meetups, Settings), theme interfaces enforced, tests pass, no build errors.  
  - *Setup*: Run `npm create vite@latest temp-bump --template react-ts` in temp dir, move contents to current dir (`mv temp-bump/* .; mv temp-bump/.* .; rm -rf temp-bump`), install dependencies (`react-router-dom`, `styled-components`, `@react-google-maps/api`, `@supabase/supabase-js`, `workbox-window`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `nodemailer` for OTP), update `package.json` with `"test": "vitest run"`.  
  - *Test Setup*: Create `vitest.config.ts` with jsdom environment, setup file, and coverage config. Create `src/test/setup.ts` for global mocks and test utilities.
2. **Supabase Integration**:  
  - *Goals*: Create Supabase project, apply schema migrations, set up client with polling fallback.  
  - *Done When*: All tables exist, client connects locally (polling) and prod (WebSocket), CRUD tests pass, no build errors.  
3. **Home & Check-In**:  
  - *Goals*: Build Home page with status list (Supabase fetch, grouped by place) and CheckInForm (place/activity/privacy).  
  - *Done When*: Statuses display/update in real-time (prod) or polling (local), check-in works, tests pass, UI approved, no build errors.  
4. **Gathering Places**:  
  - *Goals*: Create Places page with list/map toggle (Supabase fetch), PlaceForm (Google Maps autocomplete/pin).  
  - *Done When*: Places list/map displays, add/edit works, tests pass, UI approved, no build errors.  
5. **Friends & Intent**:  
  - *Goals*: Build Friends page with friend list (Supabase fetch), UserSelector for adding, 'Hope to Bump' toggles.  
  - *Done When*: Friends list loads, add/toggle works, tests pass, UI approved, no build errors.  
6. **Meetups**:  
  - *Goals*: Create Meetups page with log form (friend autocomplete/custom, place, intentional) and history list (Supabase fetch).  
  - *Done When*: Meetups log/display, tests pass, UI approved, no build errors.  
7. **Settings**:  
  - *Goals*: Build Settings page with availability, notify prefs, 'Do Not Disturb' (Supabase fetch/save).  
  - *Done When*: Settings save/load, tests pass, UI approved, no build errors.  
8. **Notifications**:  
  - *Goals*: Add notification bell with history (Supabase fetch/save from `notifications`).  
  - *Done When*: Notifications persist/display, tests pass, UI approved, no build errors.  
9. **Polish & Deploy**:  
  - *Goals*: Add animations (pulse/fade), ensure responsive UI, set up PWA, deploy to Vercel with env vars in dashboard.  
  - *Done When*: UI polished, PWA works offline, deployed, end-to-end tests pass, no build errors.  
- **Future Milestones**: Add here post-blueprint (e.g., "v1.1: AI Insights").

## REMINDER: PLAN, TESTS, & COMMITS
- **Always**: Formulate a plan of action for each step and await confirmation before coding.
- **Always**: Write/run frontend (JS errors) and backend (Supabase CRUD) tests before proposing completion.  
- **Always**: Run `npm run build` and `npm test`—resolve all issues before sign-off (note: `npm test` runs Vitest once, no watch mode).  
- **Always**: Update `.cursortrack.md` after major changes once tests pass; commit (`git commit -m ...`) after approval — no pushes, handled manually.

## AI ASSISTANT GUIDELINES
- **Always**: Notice and learn from user feedback about incorrect assumptions or missing information.
- **Always**: Update rules when user points out issues or missing details.
- **Always**: Ensure documentation contains all necessary information to generate the project from scratch without intervention.
- **Always**: When making changes, consider the complete project lifecycle from initialization to deployment.
- **Always**: Document any assumptions or dependencies that might not be obvious to someone starting fresh.

## Handling External Research
- When needing to research current best practices, library versions, or implementation patterns (especially with the project's 2025 context):
  - Use research APIs or web search to gather up-to-date information
  - Frame research queries to project forward to March 2025 requirements
  - Document search results and reasoning in implementation guides
  - Update dependency lists and implementation patterns based on research findings
  - Ensure all tool recommendations are future-forward and appropriate for 2025 
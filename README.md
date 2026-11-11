# AventIQ — updated prototype

This ZIP keeps the corrected project root from `AventIQ_V2.4_Vercel_Root_Fixed.zip` (the screenshot structure: `app/` contains `globals.css`, `layout.tsx`, and `page.tsx`; components and data/config files remain at repository root).

## Run
```bash
npm install
npm run dev
```
Build check:
```bash
npm run build
```

## Included in this prototype
- Existing opportunity discovery UI and dataset retained (`src/data/opportunities.ts`).
- Mentor marketplace section with illustrative sample mentor cards, skill/topic search, session price/duration, and request-guidance action.
- User/mentor portfolio form with name, headline, education, bio, skills, guidance topics, price, duration, and LinkedIn URL. Form data persists in the current browser's localStorage.
- Mentor room creation opens a Jitsi meeting and stores recent room records locally. Invite URLs can be copied and shared with another participant.
- Consultation Hub room IDs are randomized and the copy button copies a Jitsi invite URL.
- Existing opportunity reviews and ratings remain in localStorage.

## Important limitations
This is a client-side prototype, not a production marketplace. Profile data, reviews, room history and comments are **not synchronized across different users/devices**. Mentor cards are sample data. Authentication, public profiles, real mentor availability/calendar, payment gateway, server-verified commission/payouts, review moderation, and a shared database (e.g. Supabase) still need to be implemented/configured. No payments are collected. Jitsi public meeting rooms are link-accessible; don't share sensitive information and use appropriate moderation/privacy safeguards.

## Vercel
Use repository root as the Root Directory. The project uses Next.js App Router files at `app/` exactly as in the provided screenshot.

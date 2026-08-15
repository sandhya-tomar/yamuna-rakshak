# Yamuna Rakshak — React Edition

Same backend (Supabase), same functionality as the vanilla version — new premium UI
built with React, Tailwind CSS, and Framer Motion.

## Setup

1. **Reuse your existing Supabase project** — no schema changes in Phase A, so if
   you already ran `supabase/schema.sql` from the vanilla project, skip straight to step 3.
   Otherwise run [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL Editor.
2. **Reuse your `.env`** — the variable names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
   are identical to the vanilla project, so you can literally copy that `.env` file here.
   Otherwise: `cp .env.example .env` and fill it in from your Supabase dashboard.
3. **Add your hero photo** (optional but recommended): drop a landscape photo of the
   ghats at `public/hero.jpg`. See `public/README.txt` for free-license sources. Without
   it, the hero still renders correctly using a styled dark gradient.
4. Install and run:
   ```bash
   npm install
   npm run dev
   ```

## What's in Phase A

- Premium navbar with scroll-triggered glass background
- Cinematic hero (photo slot + gradient fallback, floating particles, ripples, drifting fog)
- Live status dashboard — **Total Reports / Cleaned / Open are real, live Supabase data.**
  Volunteers/waste-weight/water-quality are honestly labeled "Coming soon" (see note below)
- Report form, fully functional, same Supabase read/write as before
- Live ghat map (Leaflet) — basic severity-colored markers
- Recent reports grid with status badges and "mark cleaned" action
- Scroll-reveal and hover animations throughout via Framer Motion

## Authentication setup (new)

Reporting and "mark cleaned" now require signing in — this ties every action to
a real volunteer account instead of being fully anonymous.

1. **Run the migration**: in Supabase SQL Editor, run
   [`supabase/auth_schema.sql`](./supabase/auth_schema.sql) (after `schema.sql`,
   if you haven't already run that one).
2. **Disable email confirmation for local testing** (optional but recommended
   while developing): Supabase Dashboard → Authentication → Providers → Email →
   turn off "Confirm email". Otherwise every signup needs a real inbox click
   before it can sign in.
3. **Create your own account**: run the app, click "Sign in" → "Sign up", use
   any email/password (a fake-looking one like `you@example.com` works fine
   with email confirmation off).
4. **Make yourself admin**: in Supabase → Table Editor → `profiles`, find your
   row, change `role` from `volunteer` to `admin`. Refresh the app — you'll now
   see an "Admin" link in the navbar.
5. From the Admin panel you can delete reports and promote/demote other
   volunteers to admin.

## What's in Phase A + Auth

- Everything from Phase A, plus:
- Email/password sign in & sign up (modal)
- Reports and "mark cleaned" require sign-in; anonymous actions are gone
- Navbar shows sign-in state, name, and an Admin link for admin accounts
- Admin panel: delete any report, promote/demote volunteers
- RLS updated so non-admins can only ever flip `cleaned`/`cleaned_at` on a
  report — even a signed-in user can't rewrite someone else's report content

## What's deferred to Phase B

- Interactive map upgrade: heatmap, severity-based marker sizing
- Before/after cleaning image slider
- Testimonials section
- Government initiatives section
- Full footer (newsletter, social links, sitemap)

## Making the "Coming soon" dashboard cards real

To show genuine (not fabricated) numbers for volunteers, waste collected, and water
quality, you'd need new data sources, e.g.:
```sql
create table volunteers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  ghat_id text,
  joined_at timestamptz default now()
);

create table water_quality_readings (
  id uuid primary key default gen_random_uuid(),
  ghat_id text not null,
  bod_mg_l numeric,
  recorded_at timestamptz default now()
);
```
Ask me to wire these up whenever you're ready — happy to design the entry flow
(manual form, CSV import, or IoT sensor webhook) depending on how the data actually
gets collected in your case.

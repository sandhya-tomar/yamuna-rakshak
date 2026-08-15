-- Run this AFTER schema.sql and auth_schema.sql, in the Supabase SQL editor.
--
-- FIXES: "users can update their own profile" had no WITH CHECK clause, so it
-- defaulted to the USING clause (auth.uid() = id) — which only checks WHOSE
-- row is being touched, not WHICH COLUMNS change. Any signed-in volunteer
-- could run `supabase.from('profiles').update({ role: 'admin' }).eq('id', myId)`
-- from the browser console and self-promote to admin.
--
-- Fix: keep letting users edit their own full_name, but lock the `role`
-- column behind a trigger that only admins can pass through. Also adds a
-- policy so admins can update ANY profile's role (needed for promote/demote
-- in the admin panel — the old policy only ever allowed auth.uid() = id).

drop policy if exists "users can update their own profile" on profiles;

create policy "users can update their own profile" on profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "admins can update any profile" on profiles
  for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  ) with check (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create or replace function profiles_lock_role_field()
returns trigger as $$
declare
  is_admin boolean;
begin
  select exists(select 1 from profiles where id = auth.uid() and role = 'admin') into is_admin;
  if not is_admin and new.role is distinct from old.role then
    raise exception 'Only admins may change a profile role';
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_profiles_lock_role on profiles;
create trigger trg_profiles_lock_role
  before update on profiles
  for each row execute function profiles_lock_role_field();

------------------------------------------------------------------
-- reported_by only has a FK to auth.users, which PostgREST can't use to
-- embed a profile's name in a query (it needs a FK pointing at `profiles`
-- specifically). profiles.id is always == auth.users.id, so this second
-- FK is always satisfiable — it just gives Supabase a join path.
------------------------------------------------------------------
alter table reports
  add constraint reports_reported_by_profiles_fkey
  foreign key (reported_by) references profiles(id) on delete set null;

------------------------------------------------------------------
-- Admin audit log — records every moderation action so the admin
-- panel can show a real activity log instead of nothing.
------------------------------------------------------------------
create table if not exists admin_audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references profiles(id) on delete set null,
  action      text not null,        -- 'delete_report' | 'bulk_delete_reports' | 'mark_cleaned' | 'bulk_mark_cleaned' | 'promote' | 'demote'
  target_type text not null,        -- 'report' | 'profile'
  target_id   uuid,
  detail      jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists idx_audit_log_created on admin_audit_log (created_at desc);

alter table admin_audit_log enable row level security;

create policy "admins can read audit log" on admin_audit_log
  for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Only admins may write, and only ever attributed to themselves (no
-- spoofing another admin's actor_id).
create policy "admins can insert audit log entries" on admin_audit_log
  for insert with check (
    actor_id = auth.uid()
    and exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

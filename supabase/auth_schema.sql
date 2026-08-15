-- Run this AFTER schema.sql, in the Supabase SQL editor.
-- Adds authentication: profiles with roles, and ties reports to real users.

create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  role       text not null default 'volunteer' check (role in ('volunteer', 'admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles are publicly readable" on profiles
  for select using (true);

create policy "users can update their own profile" on profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Make the FIRST person to sign up an admin automatically, so you're not
-- locked out of the admin panel. Everyone after that defaults to 'volunteer'.
-- (Run this once, after you've created your own account — see README.)
-- update profiles set role = 'admin' where id = '<your-user-id-here>';

------------------------------------------------------------------
-- Tie reports to real users
------------------------------------------------------------------
alter table reports add column if not exists reported_by uuid references auth.users(id);
alter table reports add column if not exists cleaned_by  uuid references auth.users(id);

drop policy if exists "public insert" on reports;
drop policy if exists "public can update" on reports;

-- Must be signed in, and can only attribute the report to yourself.
create policy "signed-in users can insert their own report" on reports
  for insert with check (auth.uid() = reported_by);

-- Any signed-in user can update (to mark cleaned); the trigger below still
-- locks every other field. Admins get a separate, unrestricted policy.
create policy "signed-in users can update to mark cleaned" on reports
  for update using (auth.uid() is not null) with check (true);

create policy "admins can delete reports" on reports
  for delete using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Replace the immutability trigger: non-admins may only ever change
-- cleaned/cleaned_at/cleaned_by; admins bypass the restriction entirely.
create or replace function reports_lock_immutable_fields()
returns trigger as $$
declare
  is_admin boolean;
begin
  select exists(select 1 from profiles where id = auth.uid() and role = 'admin') into is_admin;
  if is_admin then
    return new;
  end if;

  if new.ghat_id     is distinct from old.ghat_id
     or new.category    is distinct from old.category
     or new.note         is distinct from old.note
     or new.photo_url    is distinct from old.photo_url
     or new.reported_by  is distinct from old.reported_by
     or new.created_at   is distinct from old.created_at then
    raise exception 'Only cleaned/cleaned_at/cleaned_by may be updated after creation';
  end if;
  return new;
end;
$$ language plpgsql;

------------------------------------------------------------------
-- Photo uploads now require sign-in too
------------------------------------------------------------------
drop policy if exists "public can upload photos" on storage.objects;

create policy "signed-in users can upload photos" on storage.objects
  for insert with check (bucket_id = 'report-photos' and auth.uid() is not null);

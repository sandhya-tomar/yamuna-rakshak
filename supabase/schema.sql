-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

create table if not exists reports (
  id          uuid primary key default gen_random_uuid(),
  ghat_id     text not null,
  category    text not null,
  note        text,
  photo_url   text,
  cleaned     boolean not null default false,
  cleaned_at  timestamptz,
  created_at  timestamptz not null default now()
);

-- Reads are almost always "recent reports" or "reports for ghat X" -> index both.
create index if not exists idx_reports_created on reports (created_at desc);
create index if not exists idx_reports_ghat    on reports (ghat_id);

alter table reports enable row level security;

-- Anyone can read reports (this is a public transparency feed).
create policy "public read" on reports
  for select using (true);

-- Anyone can file a report (anonymous community reporting, no login friction).
create policy "public insert" on reports
  for insert with check (true);

-- Anyone can update a report (needed so "mark cleaned" works without login),
-- but a trigger (below) locks every column except cleaned/cleaned_at so a
-- report's origin data can't be tampered with post-submission.
create policy "public can update" on reports
  for update using (true) with check (true);

create or replace function reports_lock_immutable_fields()
returns trigger as $$
begin
  if new.ghat_id   is distinct from old.ghat_id
     or new.category  is distinct from old.category
     or new.note       is distinct from old.note
     or new.photo_url  is distinct from old.photo_url
     or new.created_at is distinct from old.created_at then
    raise exception 'Only cleaned/cleaned_at may be updated after creation';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_reports_lock_immutable_fields
  before update on reports
  for each row execute function reports_lock_immutable_fields();

-- Storage bucket for photos (run separately, or via dashboard: Storage -> New bucket -> "report-photos", public)
insert into storage.buckets (id, name, public)
values ('report-photos', 'report-photos', true)
on conflict (id) do nothing;

create policy "public can upload photos" on storage.objects
  for insert with check (bucket_id = 'report-photos');

create policy "public can read photos" on storage.objects
  for select using (bucket_id = 'report-photos');

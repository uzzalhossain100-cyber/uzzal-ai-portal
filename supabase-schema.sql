-- Uzzal AI Portal - Supabase Schema

-- 1. Files table for metadata + content preview
create table if not exists public.files (
  id text primary key,
  display_name text not null,
  description text,
  file_name text not null,
  file_type text,
  size bigint,
  content text, -- first 20k chars for AI
  full_content_preview text,
  uploaded_at bigint,
  user_id text default 'Uzzal',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.files enable row level security;

-- Policies (allow all for demo admin - tighten in production)
create policy "Allow all for demo"
on public.files for all
using (true)
with check (true);

-- 2. Storage bucket for actual files (optional)
insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public read reports"
on storage.objects for select
using (bucket_id = 'reports');

create policy "Allow upload reports"
on storage.objects for insert
with check (bucket_id = 'reports');

create policy "Allow delete reports"
on storage.objects for delete
using (bucket_id = 'reports');

create policy "Allow update reports"
on storage.objects for update
using (bucket_id = 'reports')
with check (bucket_id = 'reports');

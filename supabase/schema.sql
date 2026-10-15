-- Run once in the Supabase dashboard: SQL Editor > New query

-- One profile per account, holding the extra sign-up fields
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  gender text constraint profiles_gender_check check (gender in ('male', 'female')),
  created_by text check (created_by in ('self', 'parent-guardian')),
  parish text,
  -- Path of the picture in the avatars storage bucket; null until one is uploaded
  avatar_path text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

-- Copy the sign-up form fields into a profile whenever an account is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, gender, created_by, parish, avatar_path)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    lower(new.raw_user_meta_data ->> 'gender'),
    new.raw_user_meta_data ->> 'created_by',
    new.raw_user_meta_data ->> 'parish',
    new.raw_user_meta_data ->> 'avatar_path'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Profile pictures, stored as avatars/<user id>/<file name>
-- Private bucket: only signed-in users can view pictures
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  false,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp']
);

create policy "Signed-in users can view profile pictures"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'avatars');

create policy "Users can upload their own profile picture"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can replace their own profile picture"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete their own profile picture"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- Run once in the Supabase dashboard: SQL Editor > New query

-- One profile per account, holding the extra sign-up fields
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  gender text constraint profiles_gender_check check (gender in ('male', 'female')),
  created_by text check (created_by in ('self', 'parent-guardian')),
  parish text,
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
  insert into public.profiles (id, full_name, gender, created_by, parish)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    lower(new.raw_user_meta_data ->> 'gender'),
    new.raw_user_meta_data ->> 'created_by',
    new.raw_user_meta_data ->> 'parish'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

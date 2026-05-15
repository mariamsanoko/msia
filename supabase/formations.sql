create extension if not exists "pgcrypto";

create table if not exists public.formations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text,
  duration text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists formations_set_updated_at on public.formations;
create trigger formations_set_updated_at
before update on public.formations
for each row execute function public.set_updated_at();

alter table public.formations enable row level security;

drop policy if exists "Published formations are readable" on public.formations;
create policy "Published formations are readable"
on public.formations for select
using (is_published = true or auth.role() = 'authenticated');

drop policy if exists "Authenticated users can manage formations" on public.formations;
create policy "Authenticated users can manage formations"
on public.formations for all
to authenticated
using (true)
with check (true);

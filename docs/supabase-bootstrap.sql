-- Bootstrap for Africa GRC Summit config storage
-- Run this in Supabase SQL Editor for project `pwdajlamtdhjurqtuyry`

create table if not exists public.summit_config (
  id text primary key,
  content jsonb not null,
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

drop trigger if exists summit_config_set_updated_at on public.summit_config;
create trigger summit_config_set_updated_at
before update on public.summit_config
for each row execute function public.set_updated_at();

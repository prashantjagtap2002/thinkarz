-- Run this once in Supabase Dashboard > SQL Editor > New Query

create table if not exists public.cars (
  id text primary key,
  make text not null,
  model text not null,
  variant text not null,
  year int not null,
  fuel text not null,
  kms int not null,
  price bigint not null,
  image text not null,
  certified boolean not null default false,
  transmission text not null check (transmission in ('Manual', 'Automatic')),
  body_type text not null,
  owners int not null,
  city text not null,
  seller_type text not null,
  reg_number text not null,
  color text not null,
  seats int not null,
  engine text not null,
  power text not null,
  mileage text not null,
  insurance_valid_till text not null,
  features text[] not null default '{}',
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security: the public website may only READ cars.
-- All writes (insert/update/delete) go through the admin API routes using the
-- service_role key, which bypasses RLS entirely — so no write policy is needed
-- or wanted here. This is what keeps the anon key (used by the public site,
-- already visible in client-side code) safe to expose.
alter table public.cars enable row level security;

create policy "Public read access"
  on public.cars
  for select
  to anon, authenticated
  using (true);

-- Keep updated_at current on every update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cars_set_updated_at
  before update on public.cars
  for each row
  execute function public.set_updated_at();

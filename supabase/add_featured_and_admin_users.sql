-- Run this once in Supabase Dashboard > SQL Editor > New Query.
-- Adds (1) the "featured" flag used by the homepage Featured Cars strip and
-- (2) the admin_users table backing the "Users" screen in the admin console.

-- ---------------------------------------------------------------------------
-- 1. Featured vehicles
-- ---------------------------------------------------------------------------
alter table public.cars
  add column if not exists featured boolean not null default false;

create index if not exists cars_featured_idx on public.cars (featured);

-- ---------------------------------------------------------------------------
-- 2. Admin users
-- ---------------------------------------------------------------------------
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  name text not null default '',
  email text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  password_hash text not null,
  active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security with NO policies: the anon key can never touch this table.
-- Every read and write goes through the admin API routes using the service_role
-- key, which bypasses RLS. Password hashes must never reach the browser.
alter table public.admin_users enable row level security;

-- Reuses public.set_updated_at() created in create_cars_table.sql
drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
  before update on public.admin_users
  for each row
  execute function public.set_updated_at();

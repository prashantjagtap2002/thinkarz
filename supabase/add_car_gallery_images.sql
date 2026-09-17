-- Run this once in Supabase Dashboard > SQL Editor > New Query,
-- BEFORE deploying the build that adds the car photo gallery.
--
-- `image` stays the cover photo (used by listing cards, OG tags and the first
-- gallery slide). `images` holds any additional photos, in display order.

alter table public.cars
  add column if not exists images text[] not null default '{}';

comment on column public.cars.images is
  'Additional gallery photos, in display order. The cover photo lives in "image".';

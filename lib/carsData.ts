import { createClient } from '@supabase/supabase-js';
import { mapRowToCar } from '@/lib/carsMapper';
import type { Car } from '@/lib/cars';

const DEFAULT_URL = 'https://mygzhtmssyuhoettgpzm.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z3podG1zc3l1aG9ldHRncHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzQ5NjUsImV4cCI6MjEwMDQ1MDk2NX0.MGxn1ApcVJb_PL4xlD7hgpDwwBT5wCV_HAq3h7Os7cU';

// Cars live in Supabase (public.cars table), edited via the admin panel at /admin
// (writes go through lib/carsStore.ts using the service role key). Public reads use the
// anon key directly (no cookies) so this also works in build-time contexts like
// generateStaticParams, which cannot access request cookies. RLS restricts this key to SELECT.
export async function getCars(): Promise<Car[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });

  const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRowToCar);
}

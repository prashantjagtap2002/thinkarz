import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mygzhtmssyuhoettgpzm.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z3podG1zc3l1aG9ldHRncHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzQ5NjUsImV4cCI6MjEwMDQ1MDk2NX0.MGxn1ApcVJb_PL4xlD7hgpDwwBT5wCV_HAq3h7Os7cU';

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

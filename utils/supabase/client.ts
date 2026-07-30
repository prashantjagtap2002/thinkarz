import { createBrowserClient } from '@supabase/ssr';

const DEFAULT_URL = 'https://mygzhtmssyuhoettgpzm.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15Z3podG1zc3l1aG9ldHRncHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4NzQ5NjUsImV4cCI6MjEwMDQ1MDk2NX0.MGxn1ApcVJb_PL4xlD7hgpDwwBT5wCV_HAq3h7Os7cU';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

  return createBrowserClient(url, anonKey);
}

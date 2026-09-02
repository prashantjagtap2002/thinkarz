'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function AdminHeaderActions() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button onClick={logout} className="text-xs font-semibold text-slate-500 hover:text-brand-red">
      Log out
    </button>
  );
}

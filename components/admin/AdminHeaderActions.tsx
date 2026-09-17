'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car, ExternalLink, LogOut, User, Users } from 'lucide-react';

export default function AdminHeaderActions({
  username,
  role,
}: {
  username: string;
  role: 'admin' | 'editor';
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const onUsers = pathname.startsWith('/admin/users');

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Primary navigation */}
      <nav className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-1 text-xs font-semibold">
        <Link
          href="/admin"
          aria-label="Inventory"
          className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition ${
            onUsers ? 'text-slate-500 hover:text-slate-900' : 'bg-white text-slate-900 shadow-xs'
          }`}
        >
          <Car className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Inventory</span>
        </Link>

        {role === 'admin' && (
          <Link
            href="/admin/users"
            aria-label="Users"
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition ${
              onUsers ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Users</span>
          </Link>
        )}
      </nav>

      {/* View Live Showroom */}
      <Link
        href="/pre-owned-cars"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <span className="hidden sm:inline">Live Showroom</span>
        <span className="sm:hidden">Site</span>
        <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
      </Link>

      {/* Signed-in user badge */}
      <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 sm:flex">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-[10px] text-white">
          <User className="h-3 w-3" />
        </div>
        <span>{username}</span>
        <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
          {role === 'admin' ? 'Admin' : 'Editor'}
        </span>
      </div>

      {/* Log Out */}
      <button
        onClick={logout}
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600"
        title="Sign out of admin console"
        aria-label="Log out"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}

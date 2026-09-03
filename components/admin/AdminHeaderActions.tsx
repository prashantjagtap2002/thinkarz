'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, LogOut, User, Cloud } from 'lucide-react';

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
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Live System Status Pill */}
      <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-800">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        <Cloud className="h-3 w-3 text-emerald-600" />
        <span>R2 & Supabase Connected</span>
      </div>

      {/* View Live Showroom */}
      <Link
        href="/pre-owned-cars"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <span>Live Showroom</span>
        <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
      </Link>

      {/* User Badge */}
      <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy text-white text-[10px]">
          <User className="h-3 w-3" />
        </div>
        <span>admin</span>
      </div>

      {/* Log Out */}
      <button
        onClick={logout}
        className="inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-600"
        title="Sign out of admin console"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}

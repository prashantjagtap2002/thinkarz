import type { Metadata } from 'next';
import Link from 'next/link';
import AdminHeaderActions from '@/components/admin/AdminHeaderActions';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 transition group-hover:opacity-90">
                THIN<span className="text-brand-red text-[1.18em]">K</span>ARZ
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-100/80 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Admin Console
              </span>
            </Link>
          </div>
          <AdminHeaderActions />
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}

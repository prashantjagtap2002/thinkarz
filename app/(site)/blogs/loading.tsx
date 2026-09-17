// Mirrors the real blogs layout: navy hero, then the content column with the
// mobile discovery widgets above a 2-up / 3-up card grid.
export default function BlogsLoading() {
  return (
    <>
      <section className="bg-brand-navy">
        <div className="container-page py-16 sm:py-20">
          <div className="h-4 w-20 animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-9 w-72 max-w-full animate-pulse rounded-lg bg-white/20" />
          <div className="mt-4 h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-8 space-y-4 lg:hidden">
              <div className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />
              <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="bg-slate-50 p-3 sm:p-5">
                    <div className="mb-3 aspect-[16/10] w-full animate-pulse rounded-lg bg-slate-200 sm:mb-4" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                  </div>
                  <div className="space-y-2 p-3 pt-0 sm:p-5 sm:pt-0">
                    <div className="h-3 w-16 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden space-y-6 lg:block">
            <div className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            <div className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          </aside>
        </div>
      </section>
    </>
  );
}

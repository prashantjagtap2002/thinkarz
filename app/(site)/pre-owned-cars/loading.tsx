// Mirrors the real layout in PreOwnedCarsBrowser: same container, same
// sidebar track and the same 2-up / 3-up card grid. The previous skeleton used
// a different column structure, so content visibly jumped on hydration.
export default function PreOwnedCarsLoading() {
  return (
    <div className="container-page py-8 sm:py-14">
      {/* Title block */}
      <div className="mb-6 space-y-3">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-100" />
      </div>

      {/* Mobile filter + sort bar */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:hidden">
        <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
        <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="aspect-[4/3] w-full animate-pulse bg-slate-200" />
              <div className="space-y-3 p-3.5 sm:p-4">
                <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                <div className="h-8 w-full animate-pulse rounded-md bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

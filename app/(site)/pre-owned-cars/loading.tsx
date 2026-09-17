export default function PreOwnedCarsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* Grid layout skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar skeleton */}
        <div className="h-[600px] rounded-2xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse hidden lg:block">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-100 rounded-lg" />
          <div className="h-10 w-full bg-slate-100 rounded-lg" />
          <div className="h-10 w-full bg-slate-100 rounded-lg" />
        </div>

        {/* Cars cards skeleton */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 animate-pulse">
              <div className="h-48 w-full bg-slate-200 rounded-xl" />
              <div className="h-5 w-3/4 bg-slate-200 rounded" />
              <div className="h-4 w-1/2 bg-slate-100 rounded" />
              <div className="h-8 w-full bg-slate-200 rounded-lg mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

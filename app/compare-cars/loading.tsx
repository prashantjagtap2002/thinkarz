export default function CompareCarsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center space-y-3">
        <div className="mx-auto h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
        <div className="mx-auto h-4 w-96 bg-slate-100 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 animate-pulse">
            <div className="h-56 w-full bg-slate-200 rounded-xl" />
            <div className="h-6 w-3/4 bg-slate-200 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

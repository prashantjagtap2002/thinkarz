export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-brand-red animate-spin" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Loading THINKARZ...
        </p>
      </div>
    </div>
  );
}

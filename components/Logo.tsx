import Link from 'next/link';

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none shrink-0">
      <span
        className={`text-2xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}
      >
        Thin<span className="text-brand-red">k</span>arz
      </span>
      <span
        className={`mt-0.5 text-[10px] font-semibold tracking-wide ${dark ? 'text-slate-300' : 'text-slate-500'}`}
      >
        YOUR ULTIMATE CAR DESTINATION
      </span>
      <span
        className={`text-[8px] font-medium tracking-wide ${dark ? 'text-slate-400' : 'text-slate-400'}`}
      >
        BY GAUTAM MODI GROUP
      </span>
    </Link>
  );
}

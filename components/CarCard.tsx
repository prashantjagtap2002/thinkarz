import Image from 'next/image';
import Link from 'next/link';
import { Car, formatKms, formatPrice } from '@/lib/cars';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/pre-owned-cars/${car.id}`}
      target="_blank"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-red/20 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.variant}`}
          title={`${car.year} ${car.make} ${car.model} ${car.variant}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {car.certified && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Certified
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 text-center">
        <div className="flex flex-col gap-1 items-center">
          <h3 className="flex items-center justify-center text-xs sm:text-sm font-bold uppercase leading-snug text-slate-900 line-clamp-2 min-h-[2.5rem] text-center">
            {car.make} - {car.model}
          </h3>
          <p className="text-xs font-semibold text-slate-500 truncate h-4 w-full text-center">{car.variant}</p>
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 min-h-[2.25rem] text-center">
            {car.year} &middot; {car.fuel} &middot; {formatKms(car.kms)} &middot; {car.color}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100/90 text-center">
          <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">{formatPrice(car.price)}</p>
          <p className="mt-0.5 mb-3 text-[11px] sm:text-xs font-medium text-slate-500">
            EMI at Rs. {car.emi.toLocaleString('en-IN')}
          </p>
          <div className="btn btn-primary w-full !py-2 text-xs pointer-events-none text-center">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

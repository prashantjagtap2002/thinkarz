import Image from 'next/image';
import Link from 'next/link';
import { Car, formatKms, formatPrice } from '@/lib/cars';

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-red/20 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.variant}`}
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

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold uppercase leading-snug text-slate-900">
          {car.make} - {car.model}
        </h3>
        <p className="mb-2 text-xs font-medium text-slate-500">{car.variant}</p>

        <p className="mb-3 text-xs text-slate-500">
          {car.year} &middot; {car.fuel} &middot; {formatKms(car.kms)}
        </p>

        <p className="text-lg font-bold text-slate-900">{formatPrice(car.price)}</p>
        <p className="mb-4 text-xs text-slate-500">EMI at Rs. {car.emi.toLocaleString('en-IN')}</p>

        <div className="mt-auto flex gap-2">
          <Link
            href={`/pre-owned-cars/${car.id}`}
            className="btn btn-primary flex-1 !px-3 !py-2 text-xs"
          >
            View Details
          </Link>
          <Link
            href="/sell-your-car"
            className="btn btn-outline flex-1 !px-3 !py-2 text-xs"
          >
            Make Offer
          </Link>
        </div>
      </div>
    </div>
  );
}

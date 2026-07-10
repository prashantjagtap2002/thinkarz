import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Fuel, Gauge, Settings2, Users, MapPin, ShieldCheck } from 'lucide-react';
import { cars, formatKms, formatPrice } from '@/lib/cars';
import CarCard from '@/components/CarCard';

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  return { title: car ? `${car.make} ${car.model} | ThinkArz` : 'Car Not Found | ThinkArz' };
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  if (!car) notFound();

  const specs = [
    { icon: CalendarDays, label: 'Year', value: String(car.year) },
    { icon: Fuel, label: 'Fuel', value: car.fuel },
    { icon: Gauge, label: 'Kilometers', value: formatKms(car.kms) },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Users, label: 'Owners', value: `${car.owners} Owner${car.owners > 1 ? 's' : ''}` },
    { icon: MapPin, label: 'Location', value: car.city },
  ];

  const similar = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" />
            {car.certified && (
              <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-brand-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                <ShieldCheck size={14} /> Certified
              </span>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-slate-200 p-4">
                <Icon size={18} className="mb-2 text-brand-blue" />
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
            {car.bodyType}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold uppercase text-slate-900 sm:text-3xl">
            {car.make} - {car.model}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">{car.variant}</p>

          <div className="mt-6 rounded-xl border border-slate-200 p-6">
            <p className="text-3xl font-extrabold text-slate-900">{formatPrice(car.price)}</p>
            <p className="mt-1 text-sm text-slate-500">
              EMI starts at Rs. {car.emi.toLocaleString('en-IN')}/month
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link href="/book-a-test-drive" className="btn btn-primary w-full">
                Book Test Drive
              </Link>
              <Link href="/contact-us" className="btn btn-outline w-full">
                Make Offer
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Need help deciding?</p>
            <p className="mt-1 text-sm text-slate-600">
              Call our team at{' '}
              <a href="tel:02242125678" className="font-semibold text-brand-red">
                022 4212 5678
              </a>{' '}
              for expert guidance.
            </p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-extrabold text-slate-900">Similar Cars</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

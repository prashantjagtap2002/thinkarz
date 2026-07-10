import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarDays,
  Fuel,
  Gauge,
  Settings2,
  Users,
  MapPin,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Palette,
  Armchair,
} from 'lucide-react';
import { cars, formatKms, formatPrice, getHighlights } from '@/lib/cars';
import { carFaqs } from '@/lib/content';
import CarCard from '@/components/CarCard';
import CarGallery from '@/components/car-detail/CarGallery';
import EmiCalculator from '@/components/car-detail/EmiCalculator';
import InspectionReport from '@/components/car-detail/InspectionReport';
import FaqAccordion from '@/components/FaqAccordion';

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

  const quickSpecs = [
    { icon: CalendarDays, label: 'Year', value: String(car.year) },
    { icon: Fuel, label: 'Fuel', value: car.fuel },
    { icon: Gauge, label: 'Kilometers', value: formatKms(car.kms) },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Users, label: 'Owners', value: `${car.owners} Owner${car.owners > 1 ? 's' : ''}` },
    { icon: MapPin, label: 'Location', value: car.city },
    { icon: Palette, label: 'Colour', value: car.color },
    { icon: Armchair, label: 'Seats', value: `${car.seats} Seater` },
  ];

  const specGroups = [
    {
      title: 'Engine & Performance',
      rows: [
        ['Engine', car.engine],
        ['Power', car.power],
        ['Mileage', car.mileage],
        ['Fuel Type', car.fuel],
        ['Transmission', car.transmission],
      ],
    },
    {
      title: 'Registration & Ownership',
      rows: [
        ['Registration Number', car.regNumber],
        ['Registration Year', String(car.year)],
        ['Ownership', `${car.owners} Owner${car.owners > 1 ? 's' : ''}`],
        ['Insurance Valid Till', car.insuranceValidTill],
        ['RTO Location', `${car.city}, Maharashtra`],
      ],
    },
    {
      title: 'Body & Comfort',
      rows: [
        ['Body Type', car.bodyType],
        ['Colour', car.color],
        ['Seating Capacity', `${car.seats} Seater`],
        ['Kilometers Driven', formatKms(car.kms)],
        ['Certification', car.certified ? 'ThinkArz Certified' : 'Standard Listing'],
      ],
    },
  ];

  const highlights = getHighlights(car);
  const similar = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-red">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/pre-owned-cars" className="hover:text-brand-red">
          Pre Owned Cars
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-slate-700">
          {car.make} {car.model}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-red">
            {car.bodyType}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold uppercase text-slate-900 sm:text-3xl">
            {car.make} - {car.model}
          </h1>
          <p className="mb-6 mt-1 text-sm font-medium text-slate-500">{car.variant}</p>

          <CarGallery images={[car.image]} alt={`${car.make} ${car.model}`} certified={car.certified} />

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickSpecs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-slate-200 p-4">
                <Icon size={18} className="mb-2 text-brand-blue" />
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 p-6">
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

      {/* Highlights */}
      <div className="mt-16 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="text-brand-red" size={22} />
          <h2 className="text-xl font-extrabold text-slate-900">Why You&apos;ll Love This Car</h2>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Full specifications */}
      <div className="mt-10">
        <h2 className="mb-6 text-xl font-extrabold text-slate-900">Full Specifications</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {specGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-slate-200 p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-blue">
                {group.title}
              </h3>
              <dl className="space-y-3">
                {group.rows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 text-sm">
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-right font-semibold text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection report */}
      <div className="mt-10">
        <InspectionReport certified={car.certified} />
      </div>

      {/* EMI calculator */}
      <div className="mt-10">
        <EmiCalculator price={car.price} />
      </div>

      {/* Similar cars */}
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

      {/* FAQs */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        <FaqAccordion faqs={carFaqs} />
      </div>

      {/* CTA */}
      <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Interested in this {car.make} {car.model}?
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-300">
            Book a test drive or talk to our team to take the next step.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/book-a-test-drive" className="btn btn-primary">
            Book Test Drive
          </Link>
          <Link href="/contact-us" className="btn btn-outline-white">
            Talk to Expert
          </Link>
        </div>
      </div>
    </div>
  );
}

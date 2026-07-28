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
  ShieldCheck,
  RotateCcw,
  FileCheck2,
  MessageCircle,
} from 'lucide-react';
import { cars, formatKms, formatPrice, getHighlights } from '@/lib/cars';
import { carFaqs, contactInfo } from '@/lib/content';
import { generateCarSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';
import CarCard from '@/components/CarCard';
import CarGallery from '@/components/car-detail/CarGallery';
import CarComparison from '@/components/car-detail/CarComparison';
import EmiCalculator from '@/components/car-detail/EmiCalculator';
import InspectionReport from '@/components/car-detail/InspectionReport';
import FaqAccordion from '@/components/FaqAccordion';

import BackButton from '@/components/BackButton';

const trustBadges = [
  { icon: ShieldCheck, label: '140-Point Inspection' },
  { icon: RotateCcw, label: '7-Day Money Back' },
  { icon: FileCheck2, label: 'Free RC Transfer' },
];

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  if (!car) return { title: 'Car Not Found | THINKARZ' };
  const desc = `Buy ${car.year} ${car.make} ${car.model} ${car.variant} - ${formatKms(car.kms)} driven, ${car.fuel}, ${car.transmission}. THINKARZ certified pre-owned. Book test drive now.`;
  return {
    title: `${car.make} ${car.model} | THINKARZ`,
    description: desc,
    alternates: { canonical: `/pre-owned-cars/${car.id}` },
    openGraph: {
      title: `${car.year} ${car.make} ${car.model} - ${formatPrice(car.price)} | THINKARZ`,
      description: desc,
      images: [{ url: car.image, width: 800, height: 600, alt: `${car.make} ${car.model}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.year} ${car.make} ${car.model} - ${formatPrice(car.price)} | THINKARZ`,
      description: desc,
      images: [car.image],
    },
  };
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
        ['Certification', car.certified ? 'THINKARZ Certified' : 'Standard Listing'],
      ],
    },
  ];

  const highlights = getHighlights(car);
  const similar = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);

  return (
    <div className="container-page py-8 sm:py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateCarSchema({
              name: `${car.year} ${car.make} ${car.model} ${car.variant}`,
              description: car.description,
              image: car.image,
              make: car.make,
              model: car.model,
              year: car.year,
              price: car.price,
              fuel: car.fuel,
              transmission: car.transmission,
              kms: car.kms,
              color: car.color,
              id: car.id,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: 'https://thinkarz.com' },
              { name: 'Pre Owned Cars', url: 'https://thinkarz.com/pre-owned-cars' },
              {
                name: `${car.make} ${car.model}`,
                url: `https://thinkarz.com/pre-owned-cars/${car.id}`,
              },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(carFaqs)),
        }}
      />
      {/* Top Bar: Minimal Back Button + Breadcrumbs side by side on the left */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <BackButton label="Back" fallbackHref="/pre-owned-cars" />
        <span className="text-slate-300">|</span>
        <nav className="flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/pre-owned-cars" className="hover:text-brand-red transition-colors">
            Pre Owned Cars
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-semibold text-slate-700">
            {car.make} {car.model}
          </span>
        </nav>
      </div>

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

          {/* Vehicle Description */}
          {car.description && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="text-brand-red" size={20} />
                <h2 className="text-lg font-bold text-slate-900">Vehicle Overview & Condition</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{car.description}</p>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-slate-200">
                  <CheckCircle2 size={15} className="text-green-600" />
                  100% Non-Accidental Guaranteed
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-slate-200">
                  <CheckCircle2 size={15} className="text-green-600" />
                  Genuine Odometer Reading
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm border border-slate-200">
                  <CheckCircle2 size={15} className="text-green-600" />
                  All Documents Verified
                </span>
              </div>
            </div>
          )}
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
              <a
                href={`https://wa.me/${contactInfo.whatsappPhone}?text=${encodeURIComponent(
                  `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (${car.variant}) listed at ${formatPrice(car.price)} on THINKARZ.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={20} className="text-brand-blue" />
                  <p className="text-[11px] font-medium leading-tight text-slate-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-6">
            <p className="mb-3 text-sm font-semibold text-slate-900">Key Highlights</p>
            <ul className="space-y-2.5">
              {highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Need help deciding?</p>
            <p className="mt-1 text-sm text-slate-600">
              Call our team at{' '}
              <a href={`tel:${contactInfo.landlinePhone}`} className="font-semibold text-brand-red">
                {contactInfo.landlinePhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')}
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

      {/* Features */}
      {car.features && car.features.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-extrabold text-slate-900">Key Features</h2>
          <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {car.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-red" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Inspection report */}
      <div className="mt-10">
        <InspectionReport certified={car.certified} />
      </div>

      {/* Buyer Assurance Section */}
      <div className="mt-10">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg sm:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-block rounded-full bg-brand-red/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-red">
                Peace of Mind Guaranteed
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                The THINKARZ Buyer Assurance
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xs">
              Every certified vehicle comes bundled with industry-leading buyer protection benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
              <ShieldCheck className="mb-3 text-brand-red" size={24} />
              <h3 className="text-sm font-bold text-white">6-Month Warranty</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Comprehensive coverage on engine, gearbox, and primary electrical components.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
              <RotateCcw className="mb-3 text-brand-red" size={24} />
              <h3 className="text-sm font-bold text-white">7-Day Money Back</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Test drive it in your everyday life. If you aren&apos;t 100% in love, return it for a full refund.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
              <FileCheck2 className="mb-3 text-brand-red" size={24} />
              <h3 className="text-sm font-bold text-white">Free RC Transfer</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                We handle 100% of the RTO paperwork and registration transfer at zero extra charge.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
              <CheckCircle2 className="mb-3 text-green-400" size={24} />
              <h3 className="text-sm font-bold text-white">Fixed & Transparent</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                No hidden handling fees, no surprise refurbishment charges. What you see is what you pay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EMI calculator */}
      <div className="mt-10">
        <EmiCalculator price={car.price} />
      </div>

      {/* Compare with similar cars */}
      <div className="mt-16">
        <CarComparison current={car} similar={similar} allCars={cars} />
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
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
        {/* Left — heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
            Questions,
            <br />
            <span className="relative inline-block">
              answered.
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-brand-red" />
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Everything you need to know about this car before you decide.
          </p>
          <Link
            href="/contact-us"
            className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-slate-900 px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
          >
            Ask Us Directly →
          </Link>
        </div>

        {/* Right — accordion */}
        <div className="border-t border-slate-200">
          <FaqAccordion faqs={carFaqs} />
        </div>
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
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/book-a-test-drive" className="btn btn-primary w-full sm:w-auto">
            Book Test Drive
          </Link>
          <Link href="/contact-us" className="btn btn-outline-white w-full sm:w-auto">
            Talk to Expert
          </Link>
        </div>
      </div>
    </div>
  );
}

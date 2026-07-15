import Image from 'next/image';
import Link from 'next/link';
import {
  ScanSearch,
  ClipboardPenLine,
  WalletCards,
  BadgeIndianRupee,
  FileBadge2,
  TimerReset,
  ShieldEllipsis,
  Landmark,
  CalendarClock,
  ChevronRight,
} from 'lucide-react';
import SellValuationForm from '@/components/forms/SellValuationForm';

export const metadata = { title: 'Sell Your Car | Thinkarz' };

const steps = [
  { icon: ScanSearch, title: '1. Get Valuation', desc: 'Get instant price for your car.' },
  { icon: ClipboardPenLine, title: '2. Book Inspection', desc: 'Schedule a free inspection.' },
  { icon: WalletCards, title: '3. Get Paid', desc: 'Get instant payment on the spot.' },
];

const reasons = [
  {
    icon: BadgeIndianRupee,
    title: 'Best Price',
    desc: 'Get the best market price for your car.',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  {
    icon: FileBadge2,
    title: 'Free Inspection',
    desc: '100% free inspection at your doorstep.',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
  },
  {
    icon: TimerReset,
    title: 'Quick Process',
    desc: 'Sell your car in just a few hours.',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
  {
    icon: ShieldEllipsis,
    title: 'Secure & Safe',
    desc: 'Hassle-free and transparent process.',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
  },
  {
    icon: Landmark,
    title: 'Instant Payment',
    desc: 'Get paid instantly via secure transfer.',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
  },
];

export default function SellYourCarPage() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">Sell Your Car</span>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Sell Your Car.
              <br />
              Fast, Easy &amp; Hassle-Free.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Get the best value for your car with a quick, transparent and secure process.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg"
                alt="Sell your car with Thinkarz"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">Get Instant Valuation</h2>
            <p className="mb-6 text-sm text-slate-500">
              Enter your car details to get a free, no-obligation valuation.
            </p>
            <SellValuationForm />
          </div>
        </div>
      </section>

      {/* 3-step process */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Our Simple 3-Step Process
          </h2>
          <span className="mx-auto mb-12 block h-1 w-12 bg-brand-red" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute right-[-1.5rem] top-8 hidden -translate-y-1/2 items-center sm:flex">
                    <span className="h-px w-6 bg-slate-300" />
                    <ChevronRight size={16} className="-ml-0.5 text-slate-300" />
                  </div>
                )}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={26} />
                </div>
                <h3 className="mb-1 font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-brand-blue" size={22} />
              <p className="text-sm font-medium text-slate-700">
                Book a free inspection at your convenience.
              </p>
            </div>
            <Link href="/contact-us" className="btn btn-primary">
              Book Free Inspection
            </Link>
          </div>
        </div>
      </section>

      {/* Why sell to us */}
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-center text-2xl font-extrabold text-white sm:text-3xl">
            Why Sell Your Car to Thinkarz?
          </h2>
          <span className="mx-auto mb-12 block h-1 w-12 bg-brand-red" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              >
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
                  <Icon size={22} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-white">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-brand-navy">
          <div className="absolute inset-0">
            <Image
              src="https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.04.01-PM-1-768x1024.jpeg"
              alt=""
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Ready to sell your car?</h3>
              <p className="mt-2 max-w-md text-sm text-slate-300">
                Get the best value for your car with Thinkarz. It&apos;s quick, easy and
                hassle-free.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="btn btn-primary">
                Get Free Valuation
              </Link>
              <Link href="/contact-us" className="btn btn-outline-white">
                Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

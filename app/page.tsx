import Image from 'next/image';
import Link from 'next/link';
import {
  Wrench,
  RotateCcw,
  ShieldCheck,
  Tag,
  ArrowRight,
  CheckCircle2,
  FileText,
  Award,
  Users,
  Search,
  Car as CarIcon,
  CalendarCheck,
  FileCheck,
  Star,
} from 'lucide-react';
import CarCard from '@/components/CarCard';
import HeroSearchWidget from '@/components/HeroSearchWidget';
import Reveal from '@/components/Reveal';
import { cars } from '@/lib/cars';
import { testimonials } from '@/lib/content';

const trustBadges = [
  { icon: Wrench, value: '140+', label: 'Quality Checks' },
  { icon: RotateCcw, value: '7 Days', label: 'Easy Return' },
  { icon: ShieldCheck, value: '100%', label: 'Transparent Process' },
  { icon: Tag, value: 'Best Price', label: 'Guarantee' },
];

const whyChoose = [
  {
    icon: CheckCircle2,
    title: 'Quality Assured',
    desc: 'Every car undergoes 140+ rigorous quality checks.',
  },
  {
    icon: FileText,
    title: 'Transparent History',
    desc: 'Complete car history and documentation you can trust.',
  },
  {
    icon: Award,
    title: 'Best Value',
    desc: 'Market best prices with no hidden charges.',
  },
  {
    icon: Users,
    title: 'Customer First',
    desc: 'Dedicated support before, during and after your purchase.',
  },
];

const howItWorks = [
  { icon: Search, step: '1. Search', desc: 'Find the perfect car that suits your needs.' },
  { icon: CarIcon, step: '2. Choose', desc: 'Shortlist and get all the details.' },
  { icon: CalendarCheck, step: '3. Test Drive', desc: 'Book a test drive at your convenience.' },
  { icon: FileCheck, step: '4. Buy', desc: 'Hassle-free paperwork and instant delivery.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg"
            alt="ThinkArz featured car"
            fill
            priority
            className="hero-image-drift object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-brand-navy/20" />
        </div>

        <div className="container-page relative pb-16 pt-16 sm:pb-24 sm:pt-20">
          <div className="animate-fade-up max-w-xl">
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Trusted Cars.
              <br />
              Transparent Deals.
            </h1>
            <p className="mt-4 text-base text-slate-200">
              Find quality pre-owned cars you can trust
              <br className="hidden sm:block" /> at the best value.
            </p>
          </div>

          {/* Search widget */}
          <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
            <HeroSearchWidget />
          </div>

          <div
            className="mt-6 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '220ms' }}
          >
            <Link href="/pre-owned-cars" className="btn btn-primary">
              Browse Cars
            </Link>
            <Link href="/sell-your-car" className="btn btn-outline-white">
              Sell Your Car
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-slate-100 bg-white py-10">
        <div className="container-page grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustBadges.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} className="flex items-center gap-3" delay={i * 80}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Featured Cars</h2>
            <Link
              href="/pre-owned-cars"
              className="flex items-center gap-1 text-sm font-semibold text-brand-red transition-transform duration-300 hover:translate-x-1 hover:underline"
            >
              View All Cars <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.slice(0, 4).map((car, i) => (
              <Reveal key={car.id} delay={i * 80}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div>
            <span className="section-eyebrow">Why ThinkArz</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Why Choose ThinkArz?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              At ThinkArz, we are committed to delivering a seamless car buying experience with
              trust, transparency and complete peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <Reveal
                key={title}
                className="rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mb-1.5 font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map(({ icon: Icon, step, desc }, i) => (
              <Reveal key={step} className="relative text-center" delay={i * 100}>
                {i < howItWorks.length - 1 && (
                  <div className="absolute right-[-1rem] top-8 hidden h-px w-8 bg-slate-300 lg:block" />
                )}
                <div className="animate-soft-pulse mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={26} />
                </div>
                <h3 className="mb-1 font-bold text-slate-900">{step}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="container-page py-16 sm:py-20">
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">Looking to sell your car?</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Get the best value for your car with a quick, free and hassle-free valuation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/sell-your-car" className="btn btn-primary">
              Get Free Valuation
            </Link>
            <Link href="/sell-your-car" className="btn btn-outline-white">
              Sell Your Car
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What Our Customers Say
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                className="rounded-xl bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="mb-4 text-3xl font-serif text-brand-red">&ldquo;</p>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
                <div className="mb-2 flex gap-0.5 text-brand-red">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

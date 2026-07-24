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
  CarFront as CarIcon,
  CalendarCheck,
  FileCheck,
  Star,
  Scale,
  Clock,
  MoveRight,
  ChevronDown,
} from 'lucide-react';
import CarCard from '@/components/CarCard';
import HeroSearchWidget from '@/components/HeroSearchWidget';
import Reveal from '@/components/Reveal';
import BrandLogo from '@/components/BrandLogo';
import NewsletterSignup from '@/components/NewsletterSignup';
import { bodyTypes, budgetOptions, cars, formatPrice } from '@/lib/cars';
import { testimonials } from '@/lib/content';
import { blogs } from '@/lib/blogs';
import BodyTypeIcon from '@/components/BodyTypeIcon';

const brands = Array.from(new Set(cars.map((c) => c.make))).sort();


function countByBodyType(type: string) {
  return cars.filter((c) => c.bodyType === type).length;
}

function countByBudget(label: string) {
  return cars.filter((c) => {
    const option = budgetOptions.find((o) => o.label === label);
    if (!option) return false;
    const aboveMin = !('min' in option) || c.price >= option.min;
    const belowMax = !('max' in option) || c.price <= option.max;
    return aboveMin && belowMax;
  }).length;
}

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
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navyLight to-brand-navy" />
          <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-brand-red/[0.07] blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-brand-blue/[0.08] blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[80px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container-page relative pb-10 pt-16 sm:pb-16 sm:pt-24">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left column — Copy */}
            <div className="animate-fade-up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-soft-pulse" />
                <span className="text-xs font-medium text-slate-300">Trusted by 50,000+ customers across Mumbai</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Find Your Perfect
                <br />
                <span className="bg-gradient-to-r from-brand-red via-[#FF4D52] to-brand-red bg-clip-text text-transparent">Pre-Owned Car</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300/90">
                Quality-assured cars with transparent pricing, complete documentation, and hassle-free ownership transfer.
              </p>

              {/* Trust checkmarks */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  '140+ Quality Checks',
                  '7-Day Easy Returns',
                  'Best Price Guarantee',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-brand-red shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div
                className="mt-8 flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: '200ms' }}
              >
                <Link href="/pre-owned-cars" className="btn btn-primary px-8">
                  Browse All Cars
                  <ArrowRight size={16} />
                </Link>
                <Link href="/sell-your-car" className="btn btn-outline-white">
                  Sell Your Car
                </Link>
              </div>
            </div>

            {/* Right column — Search widget */}
            <div className="animate-fade-up relative z-20" style={{ animationDelay: '150ms' }}>
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl shadow-black/25 ring-1 ring-black/5">
                {/* Red accent bar */}
                <div className="h-1 w-12 rounded-full bg-brand-red mb-5" />
                <h2 className="text-xl font-extrabold text-slate-900 mb-1">Find Your Car</h2>
                <p className="text-sm text-slate-500 mb-6">Search from our curated collection</p>
                <HeroSearchWidget />
                {/* Sell CTA */}
                <div className="mt-5 pt-5 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 mb-2">Want to sell instead?</p>
                  <Link
                    href="/sell-your-car"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline transition-colors"
                  >
                    Get Free Valuation
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div
            className="mt-12 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-4 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            {trustBadges.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-300">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-[11px] text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by brand */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Browse by Brand</h2>
            <Link
              href="/pre-owned-cars"
              className="flex items-center gap-1 text-sm font-semibold text-brand-red transition-transform duration-300 hover:translate-x-1 hover:underline"
            >
              View All Brands <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-200 gap-[1px] sm:grid-cols-3 md:grid-cols-6">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  href={`/pre-owned-cars?make=${encodeURIComponent(brand)}`}
                  className="flex flex-col items-center justify-center bg-white p-6 text-center hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-16 w-full items-center justify-center overflow-hidden">
                    <BrandLogo brand={brand} size={52} />
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            <span className="section-eyebrow">Why Thinkarz</span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Why Choose Thinkarz?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              At Thinkarz, we are committed to delivering a seamless car buying experience with
              trust, transparency and complete peace of mind.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <Reveal
                key={title}
                className="rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {howItWorks.map(({ icon: Icon, step, desc }, i) => (
              <Reveal key={step} className="relative text-center" delay={i * 100}>
                {i < howItWorks.length - 1 && (
                  <>
                    <div className="absolute right-[-1.5rem] top-8 hidden -translate-y-1/2 text-slate-500 lg:block">
                      <MoveRight size={20} />
                    </div>
                    <div className="mb-4 flex justify-center text-slate-400 lg:hidden">
                      <ChevronDown size={20} />
                    </div>
                  </>
                )}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-800 border border-slate-200/60 shadow-sm">
                  <Icon size={24} />
                </div>
                <h3 className="mb-1 font-bold text-slate-900">{step}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banners */}
      <section className="container-page grid grid-cols-1 gap-6 py-16 sm:py-20 lg:grid-cols-2">
        <Reveal className="flex h-full flex-col items-start justify-between gap-6 rounded-2xl bg-brand-navy p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <Tag size={22} />
            </div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">Looking to sell your car?</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Get the best value for your car with a quick, free and hassle-free valuation.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/sell-your-car" className="btn btn-primary w-full sm:w-auto">
              Get Free Valuation
            </Link>
            <Link href="/sell-your-car" className="btn btn-outline-white w-full sm:w-auto">
              Sell Your Car
            </Link>
          </div>
        </Reveal>

        <Reveal
          delay={90}
          className="flex h-full flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
        >
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800">
              <Scale size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Not sure which car to pick?
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              Compare price, mileage, power and features side by side before you decide.
            </p>
          </div>
          <Link href="/compare-cars" className="btn btn-primary">
            Compare Cars
          </Link>
        </Reveal>
      </section>

      {/* Latest from blog */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Latest From Our Blog
            </h2>
            <Link
              href="/blogs"
              className="flex items-center gap-1 text-sm font-semibold text-brand-red transition-transform duration-300 hover:translate-x-1 hover:underline"
            >
              View All Blogs <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {blogs.slice(0, 3).map((post, i) => (
              <Reveal
                key={post.slug}
                delay={i * 90}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative aspect-[16/10] w-full">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                      <Clock size={12} /> {post.readTime}
                    </span>
                    <h3 className="mb-2 text-sm font-bold leading-snug text-slate-900">
                      {post.title}
                    </h3>
                    <span className="text-xs font-semibold text-brand-red">Read More &rarr;</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What Our Customers Say
            </h2>
          </Reveal>

          {/* Desktop grid */}
          <div className="hidden grid-cols-3 gap-6 sm:grid">
            {testimonials.map((t, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-md"
              >
                
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

          {/* Mobile carousel */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:hidden">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-[85vw] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                
                <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
                <div className="mb-2 flex gap-0.5 text-brand-red">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              </div>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-slate-300"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

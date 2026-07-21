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
  Truck,
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
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Thinkarz featured car"
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
          <div className="animate-fade-up relative z-20" style={{ animationDelay: '120ms' }}>
            <HeroSearchWidget />
          </div>

          <div
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 animate-fade-up relative z-10"
            style={{ animationDelay: '220ms' }}
          >
            <Link href="/pre-owned-cars" className="btn btn-primary w-full sm:w-auto">
              Browse Cars
            </Link>
            <Link href="/sell-your-car" className="btn btn-outline-white w-full sm:w-auto">
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

      {/* Shop by body type & budget */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Shop by Body Type
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {bodyTypes.map((type, i) => {
                return (
                  <Reveal key={type} delay={i * 70}>
                    <Link
                      href={`/pre-owned-cars?bodyType=${encodeURIComponent(type)}`}
                      className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-md"
                    >
                      <BodyTypeIcon bodyType={type} size={48} className="text-brand-blue" />
                      <span className="text-xs font-semibold text-slate-700">{type}</span>
                      <span className="text-[11px] text-slate-400">{countByBodyType(type)} Cars</span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Shop by Budget
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {budgetOptions.map((option, i) => (
                <Reveal key={option.label} delay={i * 70}>
                  <Link
                    href={`/pre-owned-cars?budget=${encodeURIComponent(option.label)}`}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-md"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{option.label}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {countByBudget(option.label)} Cars
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-brand-red" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
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
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">Looking to sell your car?</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Get the best value for your car with a quick, free and hassle-free valuation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
          className="flex flex-col items-start gap-6 rounded-2xl border border-slate-200 bg-white p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
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

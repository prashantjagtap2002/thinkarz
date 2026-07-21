import Image from 'next/image';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import {
  CalendarHeart,
  MapPinned,
  CarFront,
  CircleHelp,
  Sparkles,
  BadgeDollarSign,
  Route,
  GaugeCircle,
  MessageCircleMore,
  MoveRight,
  ChevronDown,
} from 'lucide-react';
import BookTestDriveCta from '@/components/BookTestDriveCta';
import { cars } from '@/lib/cars';

export const metadata = {
  title: 'Book a Test Drive | Thinkarz',
  description: 'Book a test drive for your favourite pre-owned car at our Malad West showroom. Choose your car, date and time slot.',
};

const steps = [
  {
    icon: CalendarHeart,
    title: '1. Choose Car & Slot',
    desc: 'Select your preferred car, date and time.',
  },
  {
    icon: MapPinned,
    title: '2. Visit Our Location',
    desc: 'Reach our showroom at Malad (West) on time.',
  },
  {
    icon: CarFront,
    title: '3. Test Drive',
    desc: 'Experience the car and get all your questions answered.',
  },
  {
    icon: CircleHelp,
    title: '4. Make the Right Choice',
    desc: 'Our experts help you choose the best fit.',
  },
];

const reasons = [
  {
    icon: Sparkles,
    title: 'Real Experience',
    desc: 'Feel the performance, comfort and features firsthand.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Better Decision',
    desc: "Make a confident choice that's right for you.",
  },
  {
    icon: Route,
    title: 'Know the Drive',
    desc: 'Understand the handling, pickup and overall driving experience.',
  },
  {
    icon: GaugeCircle,
    title: 'No Obligation',
    desc: "It's completely free with no commitment.",
  },
  {
    icon: MessageCircleMore,
    title: 'Expert Guidance',
    desc: 'Get your queries answered by our product experts.',
  },
];

const popularCars = cars.slice(0, 5);

export default function BookTestDrivePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/30" />
        </div>

        <div className="container-page relative grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">Book a Test Drive</span>
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Feel the Drive.
              <br />
              Make the Right Choice.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Experience the car you love before you buy. Book a test drive at your convenience.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: CarFront,
                  title: 'Certified Multi-Brand Fleet',
                  desc: 'Choose from our wide selection of thoroughly inspected pre-owned cars.',
                },
                {
                  icon: MapPinned,
                  title: 'Convenient Test Drive',
                  desc: 'Test drive at our prime showroom in Malad (West), Mumbai.',
                },
                {
                  icon: Sparkles,
                  title: 'Expert Guidance',
                  desc: 'Get feature walkthroughs and complete vehicle history from our product experts.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 max-w-md">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-red">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-slate-300 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BookTestDriveCta />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {steps.map(({ icon: Icon, title, desc }, index) => (
              <div key={title} className="relative text-center">
                {index < steps.length - 1 && (
                  <>
                    <div className="absolute right-[-2rem] top-8 hidden -translate-y-1/2 items-center lg:flex">
                      <MoveRight size={28} className="text-slate-400" />
                    </div>
                    <div className="mb-4 flex justify-center text-slate-400 lg:hidden">
                      <ChevronDown size={20} />
                    </div>
                  </>
                )}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-800 border border-slate-200/60 shadow-sm">
                  <Icon size={24} />
                </div>
                <h3 className="mb-1 font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Why Take a Test Drive?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800 border border-slate-200/60 shadow-sm">
                  <Icon size={18} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Popular Cars for Test Drive
            </h2>
            <Link href="/pre-owned-cars" className="text-sm font-semibold text-brand-red hover:underline">
              View All Cars
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {popularCars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1" title={`${car.make} ${car.model}`}>
                    {car.make} {car.model}
                  </h3>
                  <p className="mt-1 mb-3 text-xs text-slate-500">
                    {car.year} • {car.fuel} • {car.transmission}
                  </p>
                  <ScrollToTopButton className="btn btn-primary w-full !px-3 !py-2 text-xs">
                    Book Test Drive
                  </ScrollToTopButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">Can&apos;t Visit Right Now?</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Schedule your test drive at a time that suits you best. We&apos;ll make it happen!
            </p>
          </div>
          <ScrollToTopButton className="btn btn-primary">
            Schedule Test Drive
          </ScrollToTopButton>
        </div>
      </section>
    </>
  );
}

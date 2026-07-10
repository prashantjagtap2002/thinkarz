import Image from 'next/image';
import { ShieldCheck, MapPin, Users, Handshake, Flag, TrendingUp, Car } from 'lucide-react';

export const metadata = { title: 'About Us | ThinkArz' };

const stats = [
  { icon: ShieldCheck, value: '35+', label: 'Years of Legacy' },
  { icon: MapPin, value: '1', label: 'Branch' },
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Handshake, value: '100%', label: 'Transparency' },
];

const journey = [
  {
    icon: Flag,
    period: '1990s',
    desc: 'Gautam Modi Group was founded with a vision to serve customers with integrity and trust.',
  },
  {
    icon: TrendingUp,
    period: '2010s',
    desc: 'Expanded across automotive retail with multiple brands.',
  },
  {
    icon: Car,
    period: '2020s',
    desc: 'Launched ThinkArz to revolutionize the pre-owned car experience.',
  },
];

const leadership = [
  { name: 'Leadership Member', role: 'Designation' },
  { name: 'Leadership Member', role: 'Designation' },
  { name: 'Leadership Member', role: 'Designation' },
  { name: 'Leadership Member', role: 'Designation' },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">About ThinkArz</span>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Driven by Trust.
              <br />
              Built for You.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              ThinkArz is the pre-owned car venture of Gautam Modi Group, built on decades of
              trust, customer first approach, and a passion for mobility.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              We are committed to delivering quality cars, transparent deals, and a seamless
              ownership experience.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/thinkarz-showroom/1200/900"
              alt="ThinkArz showroom"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-12">
        <div className="container-page grid grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white p-8 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                <Icon size={22} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Our Journey</h2>
          <span className="mb-10 block h-1 w-12 bg-brand-red" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {journey.map(({ icon: Icon, period, desc }, i) => (
              <div key={period} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                    <Icon size={20} />
                  </div>
                  {i < journey.length - 1 && (
                    <div className="hidden h-px flex-1 bg-slate-300 sm:block" />
                  )}
                </div>
                <h3 className="mb-1.5 font-bold text-slate-900">{period}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Our Leadership Team
          </h2>
          <span className="mb-10 block h-1 w-12 bg-brand-red" />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {leadership.map((person, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                  <Users size={32} />
                </div>
                <p className="text-sm font-semibold text-slate-900">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

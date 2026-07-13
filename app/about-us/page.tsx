import Image from 'next/image';
import {
  ShieldCheck,
  MapPin,
  Users,
  Handshake,
  Flag,
  TrendingUp,
  Car,
  ClipboardCheck,
  Headphones,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

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
    title: 'Trust-led foundation',
    desc: 'Gautam Modi Group was founded with a vision to serve customers with integrity and trust.',
    note: 'Legacy begins',
  },
  {
    icon: TrendingUp,
    period: '2010s',
    title: 'Retail network growth',
    desc: 'Expanded across automotive retail with multiple brands.',
    note: 'Multi-brand experience',
  },
  {
    icon: Car,
    period: '2020s',
    title: 'ThinkArz launched',
    desc: 'Launched ThinkArz to revolutionize the pre-owned car experience.',
    note: 'Pre-owned focus',
  },
];

const leadership = [
  {
    icon: Users,
    area: 'Founder Office',
    role: 'Strategic Direction',
    desc: 'Sets the customer-first standards, pricing discipline, and long-term growth roadmap.',
  },
  {
    icon: Car,
    area: 'Retail Operations',
    role: 'Inventory & Delivery',
    desc: 'Manages sourcing, showroom readiness, test drives, and vehicle handover quality.',
  },
  {
    icon: ClipboardCheck,
    area: 'Quality Team',
    role: 'Inspection & Documents',
    desc: 'Owns verification, inspection checkpoints, service history, and paperwork accuracy.',
  },
  {
    icon: Headphones,
    area: 'Customer Desk',
    role: 'Support & Experience',
    desc: 'Keeps buyers and sellers informed from first enquiry to post-delivery support.',
  },
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {journey.map(({ icon: Icon, period, title, desc, note }, i) => (
              <Reveal
                key={period}
                delay={i * 120}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                    <Icon size={20} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-red">{period}</p>
                <h3 className="mt-1 text-lg font-extrabold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
                <div className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-brand-blue">
                  {note}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Our Leadership Team
              </h2>
              <span className="block h-1 w-12 bg-brand-red" />
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-slate-600">
              The team is structured around the moments that matter most: trusted sourcing,
              careful inspection, clear paperwork, and responsive customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map(({ icon: Icon, area, role, desc }, i) => (
              <Reveal
                key={area}
                delay={i * 90}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{area}</p>
                <h3 className="mt-1 text-base font-extrabold text-slate-900">{role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  MessageCircleHeart,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata = {
  title: 'About Us | Thinkarz',
  description:
    'Thinkarz is the pre-owned car venture of Gautam Modi Group. 35+ years of trust, 50,000+ cars sold, 140-point inspection. Learn about our story, values, and commitment.',
};

const stats = [
  { value: '50,000+', label: 'Cars Sold' },
  { value: '35+', label: 'Years in Business' },
  { value: '140-point', label: 'Quality Inspection' },
  { value: '97%', label: 'Customer Satisfaction' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & Transparency',
    desc: 'Every deal is backed by honest pricing, verified paperwork, and no hidden charges. We believe trust is earned, not claimed.',
  },
  {
    icon: Award,
    title: 'Quality First',
    desc: 'Every car undergoes a rigorous 140-point inspection before it reaches our showroom floor. Only the best make the cut.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Customer-Centric',
    desc: 'From your first enquiry to post-delivery support, our team is by your side. Your satisfaction is our only benchmark.',
  },
  {
    icon: Eye,
    title: 'Passion for Mobility',
    desc: 'Cars are not just products to us. We are enthusiasts who believe every Indian deserves access to a safe, quality vehicle.',
  },
];

const aboutFaqs = [
  {
    question: 'What is Thinkarz?',
    answer:
      'Thinkarz is the pre-owned car venture of the Gautam Modi Group, one of India\'s most trusted automotive business groups. We specialise in buying and selling quality-checked pre-owned cars with complete transparency, 140-point inspection, warranty, and easy finance options.',
  },
  {
    question: 'Is Thinkarz part of the Gautam Modi Group?',
    answer:
      'Yes. Thinkarz is owned and operated by the Gautam Modi Group, an automotive business group that also represents Hyundai, Audi, Mahindra, Kia and MG across India. The group has grown from a 100-member team to a 3,500+ strong organisation over three decades.',
  },
  {
    question: 'What is the 140-point inspection?',
    answer:
      'Every car we sell goes through a rigorous 140-point quality check covering the engine, transmission, electricals, brakes, suspension, tyres, interior, exterior, and paperwork. Only cars that pass all checkpoints are listed on our platform, ensuring you get a car that is safe, reliable, and ready to drive.',
  },
  {
    question: 'Do you offer warranty on pre-owned cars?',
    answer:
      'Yes. All Thinkarz-certified cars come with a comprehensive warranty package. Our team will walk you through the exact warranty terms, coverage period, and what is included at the time of purchase, so you have complete peace of mind.',
  },
  {
    question: 'Can I sell my car to Thinkarz?',
    answer:
      'Absolutely. You can sell your car to Thinkarz through our Sell Your Car programme. We offer instant valuation, free inspection at your doorstep or at our showroom, and guaranteed payment within 24 hours. Visit our Sell Your Car page to get started.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[380px] overflow-hidden bg-brand-navy sm:min-h-[440px]">
        <div className="absolute inset-0">
          <Image
            src="/showroom_image/thinkarz-malad-west-mumbai-second-hand-car-dealers-tinbrdbc9n.webp"
            alt="Thinkarz showroom in Malad West, Mumbai"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="container-page absolute inset-x-0 bottom-12 sm:bottom-14">
          <Reveal>
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-white/70">
              Who We Are
            </span>
            <h1 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              About Thinkarz
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              India&apos;s trusted pre-owned car destination from the Gautam Modi Group, built
              on 35+ years of automotive expertise and a customer-first promise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="section-eyebrow">Our Story</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Part of the Gautam Modi Group
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                Thinkarz is the pre-owned car venture of the Gautam Modi Group, one of
                India&apos;s most respected automotive business groups. With 35+ years in the
                industry, we have sold over 50,000 cars and built a reputation for trust,
                transparency, and quality.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                The Gautam Modi Group represents Hyundai, Audi, Mahindra, Kia and MG across
                multiple automotive businesses, alongside Krishiv Insurance. Grown over
                decades from a 100-member team to a 3,500+ strong organisation. Monthly sales
                have scaled from over 500 to more than 1,500 units, reflecting sustained
                market leadership and customer trust.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative min-h-[260px] overflow-hidden rounded-lg">
                <Image
                  src="/images/team-culture.jpg"
                  alt="Our team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 py-10">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 90} className="text-center">
                <p className="text-2xl font-extrabold text-brand-red sm:text-3xl">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <span className="section-eyebrow">What Drives Us</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Our Core Values
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 100}
                className="group rounded-lg border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_0_rgba(200,16,46,0.12)]"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-all duration-300 group-hover:bg-brand-red group-hover:text-white">
                    <Icon size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Backed by Trust */}
      <section className="bg-brand-navy py-14 sm:py-20">
        <div className="container-page text-center">
          <Reveal>
            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-white/60">
              Backed By
            </span>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Every Car, Verified
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              We don&apos;t just sell cars. Every vehicle on our platform passes a rigorous
              140-point quality check, comes with verified paperwork, and is backed by a
              warranty you can trust.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal
              delay={0}
              className="rounded-lg border border-white/15 bg-white/5 p-6 text-left"
            >
              <CheckCircle2 className="h-5 w-5 text-white" />
              <h3 className="mt-3 text-base font-semibold text-white">
                140-Point Quality Inspection
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Our factory-trained technicians inspect every car across 140 checkpoints
                covering the engine, transmission, brakes, suspension, electricals, tyres,
                interior, and exterior. Only cars that meet our standards make it to the
                showroom floor.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="rounded-lg border border-white/15 bg-white/5 p-6 text-left"
            >
              <CheckCircle2 className="h-5 w-5 text-white" />
              <h3 className="mt-3 text-base font-semibold text-white">
                7-Day Easy Return
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We stand behind every car we sell. If you&apos;re not completely satisfied
                with your purchase, our 7-day easy return window gives you the confidence to
                buy with zero stress. Plus, every car comes with a comprehensive warranty
                package.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <span className="section-eyebrow">Quick Answers</span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                About Thinkarz: Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Quick answers about our company, inspection process, and what we offer.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-2xl">
            <Reveal>
              <FaqAccordion faqs={aboutFaqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Ready to visit a showroom?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Book a free test drive or browse our handpicked inventory of certified
              pre-owned cars.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/book-a-test-drive" className="btn btn-primary">
                Book a Test Drive
              </Link>
              <Link href="/pre-owned-cars" className="btn btn-outline">
                Browse Cars
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

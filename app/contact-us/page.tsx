import { Suspense } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, PhoneCall } from 'lucide-react';
import OtpGatedContactForm from '@/components/forms/OtpGatedContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import { contactInfo } from '@/lib/content';

export const metadata = {
  title: 'Contact Us | Thinkarz',
  description: 'Get in touch with Thinkarz for pre-owned car inquiries, test drives, and expert guidance. Visit our Malad West showroom or call us today.',
};

const touchPoints = [
  { icon: MapPin, title: 'Visit Our Showroom', lines: contactInfo.address },
  { icon: Phone, title: 'Call Us', lines: [contactInfo.phone] },
  { icon: Mail, title: 'Email Us', lines: [contactInfo.email] },
  { icon: Clock, title: 'Business Hours', lines: contactInfo.hours },
];

export default function ContactUsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="/images/cars/mg-zs-ev.jpg"
            alt="MG ZS EV - Thinkarz showroom"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        </div>
        <div className="container-page relative py-16 sm:py-20">
          <span className="section-eyebrow">Contact Us</span>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            We&apos;re Here
            <br />
            To Help You.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
            Have a question or need assistance? Reach out to us &ndash; we&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10 lg:p-12">
            <h2 className="mb-4 text-[22px] font-bold text-[#1e293b]">
              Contact Information
            </h2>
            <p className="mb-8 text-sm leading-[1.6] text-slate-500">
              We are here to help with bookings, service queries, finance questions and anything else you need.
            </p>

            <div className="space-y-6">
              {touchPoints.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[#475569]">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-slate-600 break-words">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-full">
            <Suspense fallback={null}>
              <OtpGatedContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Map + showroom */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Thinkarz showroom location"
              src="https://maps.google.com/maps?q=19.182148,72.836216&z=15&output=embed"
              className="h-full w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/showroom.jpeg"
                alt="Thinkarz showroom"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-1.5 text-lg font-bold text-slate-900">Visit Our Showroom</h3>
              <span className="mb-3 block h-1 w-10 bg-brand-red" />
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Experience our wide range of pre-owned cars and get expert advice from our team.
                We look forward to welcoming you!
              </p>
              <a
                href="https://maps.app.goo.gl/j1DSAt9Dy3wuXHwy6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
          {/* Left — heading */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:max-w-[300px]">
            <h2 className="text-[32px] font-extrabold leading-[1.1] text-slate-900 sm:text-[38px]">
              About Thinkarz:
              <br />
              Frequently Asked
              <br />
              <span className="relative inline-block text-slate-900">
                Questions
                <span className="absolute -bottom-1 left-0 h-[6px] w-full rounded bg-brand-red/20" />
                <span className="absolute -bottom-1 left-0 h-[6px] w-1/3 rounded bg-brand-red" />
              </span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-slate-500 font-medium">
              Quick answers about our ownership, group and track record.
            </p>
            <a
              href={`tel:${contactInfo.phone}`}
              className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red to-[#cc181f] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <PhoneCall size={18} />
              Ask Us Directly
            </a>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-slate-200">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}

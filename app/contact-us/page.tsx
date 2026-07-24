import { Suspense } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import OtpGatedContactForm from '@/components/forms/OtpGatedContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import { contactInfo } from '@/lib/content';

export const metadata = {
  title: 'Contact Us | Thinkarz',
  description:
    'Get in touch with Thinkarz for pre-owned car inquiries, test drives, and expert guidance. Visit our Malad West showroom or call us today.',
};

const touchPoints = [
  { icon: MapPin, title: 'Visit Our Showroom', lines: contactInfo.address },
  { icon: Phone, title: 'Call Us', lines: [contactInfo.phone] },
  { icon: MessageCircle, title: 'WhatsApp', lines: [contactInfo.whatsappPhone.replace(/^91/, '+91 ')] },
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
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%),linear-gradient(110deg,rgba(3,15,38,0.96),rgba(6,23,55,0.9),rgba(9,30,64,0.68))]" />
        </div>
        <div className="container-page relative py-16 sm:py-20">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-100 backdrop-blur">
            Contact Us
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Reach our team for buying advice, test drives, and fast support.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Call, WhatsApp, email, or send a quick message here. We kept this page simple so it
            feels easy to use on both desktop and mobile.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f9fc_0%,#ffffff_18%,#ffffff_100%)] py-14 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(0,40,85,0.08),transparent_70%)]" />
        <div className="container-page relative">
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-500 sm:text-base">
              Reach our team by call, WhatsApp, email, or send a message here.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[30px] border border-slate-200/80 bg-[#f4f7fb] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
              <h2 className="mb-4 text-2xl font-extrabold text-slate-900">Contact Information</h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                We are here to help with bookings, car queries, finance questions, and anything
                else you need before your next visit.
              </p>

              <div className="space-y-5">
                {touchPoints.map(({ icon: Icon, title, lines }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-2xl bg-white/55 p-3.5 backdrop-blur-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dbe7f6] text-[#173a67] shadow-inner">
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="mb-0.5 text-sm font-semibold text-slate-500">{title}</p>
                      {lines.map((line) => (
                        <p
                          key={line}
                          className="break-words text-base font-bold leading-snug text-slate-900"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2f5c]"
                >
                  Call Now
                  <ArrowRight size={16} />
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsappPhone}?text=${encodeURIComponent('Hello Thinkarz, I need help with a car enquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-50"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex w-full items-stretch">
              <div className="w-full">
                <Suspense fallback={null}>
                  <OtpGatedContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Image src="/showroom.jpeg" alt="Thinkarz showroom" fill className="object-cover" />
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
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Questions,
              <br />
              <span className="relative inline-block">
                answered.
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-brand-red" />
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
              Still unsure about something? A quick call clears it up faster than any FAQ.
            </p>
            <a
              href={`tel:${contactInfo.phone}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
            >
              Ask Us Directly
            </a>
          </div>

          <div className="border-t border-slate-200">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactUsCta from '@/components/ContactUsCta';
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
            src="https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg"
            alt=""
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="mb-6 text-2xl font-extrabold text-slate-900">
              Our team is here to assist you
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-slate-600">
              Our team is here to assist you with all your car buying, selling, and after-sales
              service needs.
            </p>

            <div className="space-y-6">
              {touchPoints.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                    <Icon size={20} />
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

          <ContactUsCta />
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
                rel="noreferrer"
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
              Ask Us Directly →
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

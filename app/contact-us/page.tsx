import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SubmittableForm from '@/components/forms/SubmittableForm';
import FaqAccordion from '@/components/FaqAccordion';
import { contactInfo } from '@/lib/content';

export const metadata = { title: 'Contact Us | Thinkarz' };

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
                  <div>
                    <p className="text-sm font-bold text-slate-900">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-sm text-slate-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">Send Us a Message</h2>
            <p className="mb-6 text-sm text-slate-500">
              Fill in the details below and we&apos;ll get back to you shortly.
            </p>
            <SubmittableForm
              submitLabel="Send Message"
              successTitle="Message Sent!"
              successMessage="Thanks for reaching out. Our team will get back to you shortly."
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Full Name</label>
                  <input required className="field-input" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="field-label">Mobile Number</label>
                  <input required type="tel" className="field-input" placeholder="Enter your mobile number" />
                </div>
              </div>
              <div>
                <label className="field-label">Email Address</label>
                <input required type="email" className="field-input" placeholder="Enter your email address" />
              </div>
              <div>
                <label className="field-label">Subject</label>
                <select required className="field-input" defaultValue="">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>Buying a Car</option>
                  <option>Selling a Car</option>
                  <option>Service Appointment</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label className="field-label">Your Message</label>
                <textarea required className="field-input" rows={4} placeholder="Type your message here..." />
              </div>
            </SubmittableForm>
          </div>
        </div>
      </section>

      {/* Map + showroom */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Thinkarz showroom location"
              src="https://www.google.com/maps?q=Link+Road,+Malad+West,+Mumbai+400064&z=14&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="https://picsum.photos/seed/thinkarz-showroom-front/1200/750"
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
                href="https://maps.google.com/?q=Link+Road,+Malad+West,+Mumbai+400064"
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
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <span className="mb-10 block h-1 w-12 bg-brand-red" />
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}

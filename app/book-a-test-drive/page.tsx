import Image from 'next/image';
import {
  CalendarCheck,
  MapPinned,
  Car as CarIcon,
  ClipboardCheck,
  ShieldCheck,
  Scale,
  Route,
  Tag,
  Headset,
} from 'lucide-react';
import SubmittableForm from '@/components/forms/SubmittableForm';

export const metadata = { title: 'Book a Test Drive | ThinkArz' };

const steps = [
  { icon: CalendarCheck, title: '1. Choose Car & Slot', desc: 'Select your preferred car, date and time.' },
  { icon: MapPinned, title: '2. Visit Our Location', desc: 'Reach our showroom at Malad (West) on time.' },
  { icon: CarIcon, title: '3. Test Drive', desc: 'Experience the car and get all your questions answered.' },
  { icon: ClipboardCheck, title: '4. Make the Right Choice', desc: 'Our experts help you choose the best fit.' },
];

const reasons = [
  { icon: ShieldCheck, title: 'Real Experience', desc: 'Feel the performance, comfort and features firsthand.' },
  { icon: Scale, title: 'Better Decision', desc: "Make a confident choice that's right for you." },
  { icon: Route, title: 'Know the Drive', desc: 'Understand the handling, pickup and overall driving experience.' },
  { icon: Tag, title: 'No Obligation', desc: "It's completely free with no commitment." },
  { icon: Headset, title: 'Expert Guidance', desc: 'Get your queries answered by our product experts.' },
];

const popularCars = [
  { name: 'Tata Nexon EV', image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.04.01-PM-1-768x1024.jpeg' },
  { name: 'Hyundai Creta', image: 'https://picsum.photos/seed/hyundai-creta/600/450' },
  { name: 'Kia Seltos', image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.15.28-PM-1024x768.jpeg' },
  { name: 'Maruti Suzuki Grand Vitara', image: 'https://picsum.photos/seed/grand-vitara/600/450' },
  { name: 'MG Hector', image: 'https://picsum.photos/seed/mg-hector/600/450' },
];

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

        <div className="container-page relative grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-2">
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
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">Book Your Test Drive</h2>
            <p className="mb-6 text-sm text-slate-500">
              Fill in your details and we&apos;ll get in touch with you to confirm.
            </p>
            <SubmittableForm
              submitLabel="Book Test Drive"
              successTitle="Test Drive Booked!"
              successMessage="We'll call you shortly to confirm your slot at our Malad (West) showroom."
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Select Car</label>
                  <select required className="field-input" defaultValue="">
                    <option value="" disabled>
                      Select Car Model
                    </option>
                    {popularCars.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Select Variant (Optional)</label>
                  <select className="field-input" defaultValue="">
                    <option value="" disabled>
                      Select Variant
                    </option>
                    <option>Base</option>
                    <option>Mid</option>
                    <option>Top</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Preferred Date</label>
                  <input required type="date" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Preferred Time</label>
                  <select required className="field-input" defaultValue="">
                    <option value="" disabled>
                      Select Time
                    </option>
                    <option>10:00 AM</option>
                    <option>12:00 PM</option>
                    <option>2:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="field-label">Preferred Location</label>
                <input className="field-input" defaultValue="Malad (West), Mumbai" readOnly />
              </div>
              <div>
                <label className="field-label">Additional Notes (Optional)</label>
                <textarea className="field-input" rows={3} placeholder="Tell us anything we should know" />
              </div>
            </SubmittableForm>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute right-[-1rem] top-8 hidden h-px w-8 bg-slate-300 lg:block" />
                )}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={26} />
                </div>
                <h3 className="mb-1 font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why test drive */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-12 text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Why Take a Test Drive?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={22} />
                </div>
                <h3 className="mb-1.5 text-sm font-bold text-slate-900">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular cars */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Popular Cars for Test Drive
            </h2>
            <a href="/pre-owned-cars" className="text-sm font-semibold text-brand-red hover:underline">
              View All Cars →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {popularCars.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <p className="mb-3 text-sm font-bold text-slate-900">{c.name}</p>
                  <a href="#" className="btn btn-primary w-full !px-3 !py-2 text-xs">
                    Book Test Drive
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-brand-navy p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">Can&apos;t Visit Right Now?</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Schedule your test drive at a time that suits you best. We&apos;ll make it happen!
            </p>
          </div>
          <a href="#" className="btn btn-primary">
            Schedule Test Drive
          </a>
        </div>
      </section>
    </>
  );
}

import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Privacy Policy | Thinkarz',
  description: 'Learn how Thinkarz collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        description="Your privacy is extremely important to us. Here is how we manage your personal information."
        image="https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-page max-w-3xl">
          <Reveal className="prose prose-slate max-w-none">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We collect personal information that you voluntarily provide to us when you book a test drive, request a vehicle valuation, register for our newsletter, or contact us. This may include your name, email, telephone number, and vehicle specifications.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We use the collected information to process your requests, arrange inspection appointments, provide vehicle valuations, send updates or offers, and improve our services. We do not sell or lease your personal information to third parties.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Sharing and Disclosure</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Your details may be shared within the Gautam Modi Group entities to coordinate vehicle viewings, transactions, and support. We may also disclose your information if required by law or to protect our legal rights.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Security Measures</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Cookies</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We use cookies to enhance your browsing experience, analyze site traffic, and serve tailored content. You can choose to disable cookies through your browser settings, though this may limit some functionality.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

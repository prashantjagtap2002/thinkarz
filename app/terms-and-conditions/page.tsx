import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'Terms & Conditions | Thinkarz',
  description: 'Review the terms and conditions for using the Thinkarz platform and services.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms & Conditions"
        description="Please read these terms and conditions carefully before using our services."
        image="https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-page max-w-3xl">
          <Reveal className="prose prose-slate max-w-none">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              By accessing or using the Thinkarz website, services, or mobile applications, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not access our platform.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Services Offered</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Thinkarz acts as a platform for buying, listing, and requesting valuations for pre-owned vehicles. While we strive to verify all listings and certifications, we advise users to inspect vehicles independently before purchase.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">3. User Obligations</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Users agree to provide accurate, current, and complete information when booking test drives, requesting valuations, or making inquiries. Any fraudulent activity or misrepresentation will lead to termination of access.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Thinkarz, including the Gautam Modi Group, shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, our services or vehicles bought through the platform.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Governing Law</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { contactInfo } from '@/lib/content';

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
        image="/images/hero-banner.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-page max-w-3xl">
          <Reveal className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Thinkarz ("We," "Us," or "Our") is committed to safeguarding your privacy. This
              Privacy Policy outlines how we collect, use, disclose, and protect your personal
              information when you visit our website.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              By using our Website, you agree to the collection and use of information in
              accordance with this policy.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Information We Collect</h2>

            <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2">Personal Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you
              interact with our Website, including but not limited to:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed mb-4 list-disc pl-5">
              <li>Contact details: Name, email address, phone number, postal address.</li>
              <li>Professional information: Job title, company name, industry.</li>
              <li>Other information: Any additional information you choose to provide, such as through contact forms, inquiries, or registration.</li>
            </ul>

            <h3 className="text-base font-semibold text-slate-800 mt-6 mb-2">Automatically Collected Information</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              When you visit our Website, we may automatically collect certain information about
              your device and your usage of the Website, such as:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed mb-6 list-disc pl-5">
              <li>Usage data: Pages viewed, time spent on each page, clicks, and navigation paths.</li>
              <li>Cookies and similar technologies: We use cookies to enhance your browsing
              experience, provide analytics, and enable certain functionalities. You can control
              cookies through your browser settings.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed mb-6 list-disc pl-5">
              <li>To provide and improve our services: Ensuring that content from our Website is presented in the most effective manner for you and your device.</li>
              <li>To communicate with you: Responding to your inquiries, processing your requests, and providing you with information related to our services.</li>
              <li>To market our services: Sending you newsletters, promotional materials, or other communications that may interest you. You may opt-out of these communications at any time.</li>
              <li>To comply with legal obligations: Fulfilling our legal obligations, including responding to lawful requests from public authorities.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Sharing and Disclosure of Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We do not sell or lease your personal information to third parties. However, we may
              share your information under the following circumstances:
            </p>
            <ul className="text-sm text-slate-600 leading-relaxed mb-6 list-disc pl-5">
              <li>Service providers: We may share your information with trusted third-party
              service providers who assist us in operating our Website, conducting our business,
              or servicing you, subject to confidentiality agreements.</li>
              <li>Legal compliance: We may disclose your information when required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
              <li>Business transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred to the acquiring entity.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Retention of Your Information</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              We retain your personal information only for as long as necessary to fulfill the
              purposes for which it was collected, including for legal, accounting, or reporting
              requirements. When your information is no longer required, we will securely delete
              or anonymize it.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              our handling of your personal information,               please contact us at{' '}
              <a href={`mailto:${contactInfo.email}`} className="text-brand-red hover:underline">
                {contactInfo.email}
              </a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structuredData';
import { testimonials } from '@/lib/content';

// Public-site chrome. This lives in a route group rather than the root layout
// so the admin console at /admin does not inherit the marketing header, footer
// and floating WhatsApp button on top of its own UI.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema(testimonials)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />
      <Header />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingWhatsAppButton />
      </Suspense>
    </>
  );
}

import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import HomeContactSection from '@/components/HomeContactSection';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import TrustMetrics from '@/components/TrustMetrics';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <div className="bg-apple-bg min-h-screen relative selection:bg-apple-blue selection:text-white">
      {/* Smooth Mouse Follower Cursor */}
      <CustomCursor />

      {/* Hero Section */}
      <Hero />

      {/* Trust & Proof Metrics */}
      <TrustMetrics />

      {/* 2. Process Section */}
      <section id="process" className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-black/10 dark:border-white/10">
        <HowItWorks />
      </section>

      {/* 3. Client Reviews */}
      <div className="border-t border-black/10 dark:border-white/10">
        <ReviewsSection />
      </div>

      {/* 4. Contact Section */}
      <section id="contact" className="scroll-mt-24 border-t border-black/10 dark:border-white/10">
        <HomeContactSection />
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-black/10 dark:border-white/10">
        <FAQSection />
      </section>
    </div>
  );
}

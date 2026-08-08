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

      {/* View all work CTA */}
      <div className="flex justify-center py-8 border-b border-black/10 dark:border-white/10">
        <a
          href="/work"
          className="group inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-apple-text dark:text-white hover:opacity-60 transition-opacity duration-300"
        >
          View all work
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

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

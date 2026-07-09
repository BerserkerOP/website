"use client";

import FAQSection from '@/components/FAQSection';
import FadeIn from '@/components/FadeIn';

export default function FAQPage() {
  return (
    <div className="bg-apple-bg min-h-screen w-full pt-8 relative overflow-hidden flex flex-col">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex-grow flex flex-col items-center justify-center pt-20">
        <div className="w-full">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}

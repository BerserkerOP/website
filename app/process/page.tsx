"use client";

import HowItWorks from '@/components/HowItWorks';
import FadeIn from '@/components/FadeIn';

export default function ProcessPage() {
  return (
    <div className="bg-apple-bg min-h-screen w-full pt-8 relative overflow-hidden flex flex-col">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex-grow flex flex-col items-center justify-center">
        <FadeIn delay={0.2} className="w-full">
          <HowItWorks />
        </FadeIn>
      </div>
    </div>
  );
}

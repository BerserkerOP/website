"use client";

import HowItWorks from '@/components/HowItWorks';
import LiquidEther from '@/components/Backgrounds/LiquidEther';
import FadeIn from '@/components/FadeIn';

export default function ProcessPage() {
  return (
    <div className="bg-apple-bg min-h-screen w-full relative overflow-hidden pt-20">
      <FadeIn 
        duration={1.5}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div 
          className="absolute inset-0"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        >
          <LiquidEther />
        </div>
      </FadeIn>
      
      <div className="relative z-10">
        <HowItWorks />
      </div>
    </div>
  );
}

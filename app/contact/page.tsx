"use client";

import HomeContactSection from '@/components/HomeContactSection';
import CustomCursor from '@/components/CustomCursor';

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-16 sm:pt-24 pb-20 relative selection:bg-apple-blue selection:text-white">
      <CustomCursor />
      <HomeContactSection />
    </div>
  );
}

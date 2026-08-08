"use client";

import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-16 sm:pt-24 pb-20 relative selection:bg-apple-blue selection:text-white">
      <CustomCursor />
      <ContactSection />
    </div>
  );
}

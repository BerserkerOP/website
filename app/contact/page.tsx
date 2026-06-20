export const metadata = {
  title: 'Apply for a Project | HalftoneMotion',
  description: 'Apply for a custom motion design project with HalftoneMotion.',
};

import ContactForm from '@/components/ContactForm';
import LiquidEther from '@/components/Backgrounds/LiquidEther';

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-32 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/40 backdrop-blur-[1px]"></div>
      </div>
      <div className="bg-apple-card/95 backdrop-blur-3xl rounded-3xl shadow-[0_16px_64px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_16px_64px_-12px_rgba(255,255,255,0.05)] border border-apple-border/80 w-full max-w-lg flex flex-col relative z-10 transition-transform duration-500 hover:scale-[1.01]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-apple-border text-center">
          <h1 className="text-2xl font-bold text-apple-text tracking-tight">Apply for a Project</h1>
        </div>

        {/* Form Body */}
        <ContactForm />
      </div>
    </div>
  );
}

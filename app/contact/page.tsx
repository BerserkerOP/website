export const metadata = {
  title: 'Apply for a Project | HalftoneMotion',
  description: 'Apply for a custom motion design project with HalftoneMotion.',
};

import ContactForm from '@/components/ContactForm';
import LiquidEther from '@/components/Backgrounds/LiquidEther';

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-32 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LiquidEther />
      </div>
      <div className="bg-apple-card/60 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-apple-border/50 w-full max-w-lg flex flex-col relative z-10">
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

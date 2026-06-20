export const metadata = {
  title: 'Apply for a Project | HalftoneMotion',
  description: 'Apply for a custom motion design project with HalftoneMotion.',
};

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="bg-apple-card rounded-2xl shadow-xl border border-apple-border w-full max-w-lg flex flex-col">
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

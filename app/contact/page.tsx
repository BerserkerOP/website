import HomeContactSection from '@/components/HomeContactSection';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'Contact — HalftoneMotion',
  description: 'Get in touch to discuss your project. Schedule a consultation and let us help bring your vision to life.',
};

export default function ContactPage() {
  return (
    <div className="bg-apple-bg min-h-screen relative selection:bg-apple-blue selection:text-white">
      <CustomCursor />
      {/* Spacer for fixed navbar */}
      <div className="pt-24 sm:pt-28 pb-24">
        <HomeContactSection />
      </div>
    </div>
  );
}

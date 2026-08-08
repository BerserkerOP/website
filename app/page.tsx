import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import HowItWorks from '@/components/HowItWorks';
import FAQSection from '@/components/FAQSection';
import TrustMetrics from '@/components/TrustMetrics';
import CustomCursor from '@/components/CustomCursor';
import AvatarButton from '@/components/AvatarButton';

export default function Home() {
  const projects: Array<{
    title: string;
    category: React.ReactNode;
    videoUrl: string;
    thumbnailUrl?: string;
    themeColor: string;
    textColorTheme: 'light' | 'dark';
    tag: string;
  }> = [
    {
      title: "Todoist Explainer",
      category: (
        <>
          <strong>Task management workflow promo</strong> with fluid, satisfying product motions.
        </>
      ),
      videoUrl: "https://youtu.be/EzRyQUU5jTQ",
      themeColor: "#E44332",
      textColorTheme: "light" as const,
      tag: "Product Promo"
    },
    {
      title: "Tryclean AI Launch Video",
      category: (
        <>
          <strong>Cinematic feature walkthroughs</strong> that convert browsers into buyers.
        </>
      ),
      videoUrl: "https://youtu.be/ZjsuD1AFPEw",
      themeColor: "#0A0D14",
      textColorTheme: "light" as const,
      tag: "SaaS Demo"
    },
    {
      title: "Instagram Explainer",
      category: (
        <>
          <strong>High-fidelity rap visualizer</strong> featuring custom rapid text-tracking.
        </>
      ),
      videoUrl: "https://youtube.com/shorts/G3eaRQawEjs?si=8HubGyRk-OL0s1cw",
      themeColor: "#0F172A",
      textColorTheme: "light" as const,
      tag: "Typography"
    },
    {
      title: "Vercel Explainer",
      category: (
        <>
          <strong>Sleek framework promo campaigns</strong> designed to engage modern developers.
        </>
      ),
      videoUrl: "https://youtube.com/shorts/PtRm5WejE_g?feature=share",
      themeColor: "#0A0A0A",
      textColorTheme: "light" as const,
      tag: "Explainer Video"
    },
  ];

  return (
    <div className="bg-apple-bg min-h-screen relative selection:bg-apple-blue selection:text-white">
      {/* Smooth Mouse Follower Cursor */}
      <CustomCursor />

      {/* Hero Section */}
      <Hero />
      
      {/* 1. Selected Work / Projects Section */}
      <section id="work" className="py-20 sm:py-28 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
        <div className="mb-14 max-w-3xl lg:max-w-none text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div>
            <p className="text-apple-blue text-xs font-bold uppercase tracking-widest mb-2">Our Portfolio</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-apple-text dark:text-white leading-[1.1] tracking-tight">Featured Projects</h2>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md font-medium">
            From SaaS product walkthroughs to viral launch videos, explore our latest motion design work built for tech leaders.
          </p>
        </div>

        {/* 2-Column Grid of 3D Monitor Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              delay={index * 0.1}
              videoUrl={project.videoUrl}
              thumbnailUrl={project.thumbnailUrl}
              themeColor={project.themeColor}
              textColorTheme={project.textColorTheme}
              tag={project.tag}
            />
          ))}
        </div>
      </section>

      {/* Trust & Proof Metrics */}
      <TrustMetrics />

      {/* 2. Process Section */}
      <section id="process" className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
        <HowItWorks />
      </section>

      {/* 3. Client Reviews */}
      <ReviewsSection />

      {/* 4. FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
        <FAQSection />
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>
    </div>
  );
}

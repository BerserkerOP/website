import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ReviewsSection from '@/components/ReviewsSection';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';
import SpotlightButton from '@/components/SpotlightButton';

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
      title: "SaaS Demo Videos",
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
      title: "Vercel Explainer",
      category: (
        <>
          <strong>Sleek framework promo campaigns</strong> designed to engage modern developers.
        </>
      ),
      videoUrl: "https://youtube.com/shorts/PtRm5WejE_g?feature=share",
      themeColor: "#0A0A0A",
      textColorTheme: "light" as const,
      tag: "Explainer"
    },
  ];

  return (
    <div className="bg-apple-bg">
      <Hero />
      
      <section id="store" className="py-20 sm:py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl lg:max-w-none text-left flex flex-col items-start">
          <p className="text-apple-blue text-xs font-bold uppercase tracking-widest mb-2">What We Do</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-apple-text leading-[1.1] tracking-tight">Every video type your SaaS needs</h2>
        </div>

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

        <div className="flex justify-center">
          <SpotlightButton href="/work" text="EXPLORE ALL OUR WORK" />
        </div>
      </section>

      <HowItWorks />
      <ReviewsSection />
      <ContactSection />
    </div>
  );
}

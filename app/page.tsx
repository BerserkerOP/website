import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ReviewsSection from '@/components/ReviewsSection';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';
import SpotlightButton from '@/components/SpotlightButton';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  const projects = [
    {
      title: "SaaS Demo Videos",
      category: "Cinematic feature walkthroughs",
      videoUrl: "https://youtu.be/ixG3a8z213k"
    },
    { title: "Explainer Videos", category: "Complex features made instantly clear", videoUrl: "https://youtu.be/L3MB9hYLbBI", thumbnailUrl: "https://img.youtube.com/vi/L3MB9hYLbBI/hqdefault.jpg" },
  ];

  return (
    <div className="bg-apple-bg">
      <Hero />
      
      <section id="store" className="py-20 sm:py-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-16 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-apple-blue/10 border border-apple-blue/20">
            <p className="text-apple-blue text-xs font-bold uppercase tracking-widest">Featured Assets</p>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-apple-text leading-[1.1] tracking-tight">Specialized video solutions<br className="hidden sm:block" /> tailored to your needs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              delay={index * 0.1}
              videoUrl={(project as any).videoUrl}
              thumbnailUrl={(project as any).thumbnailUrl}
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
      <FAQSection />
    </div>
  );
}

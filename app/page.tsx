import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ReviewsSection from '@/components/ReviewsSection';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const projects = [
    {
      title: "SaaS Demo Videos",
      category: "Cinematic feature walkthroughs",
      videoUrl: "https://youtu.be/WtwCp9cqKa8"
    },
    { title: "Explainer Videos", category: "Complex features made instantly clear", videoUrl: "https://youtu.be/L3MB9hYLbBI", thumbnailUrl: "https://img.youtube.com/vi/L3MB9hYLbBI/hqdefault.jpg" },
    { title: "ChatGPT Animation", category: "High-energy kinetic typography for artists", videoUrl: "https://youtube.com/shorts/altZ7ZOHWNo?feature=share" },
    { title: "Onboarding Sequences", category: "Get users to their aha moment", videoUrl: "https://youtu.be/NhGNe4KJ1cU" },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
      </section>

      <HowItWorks />
      <ReviewsSection />
      <ContactSection />
    </div>
  );
}

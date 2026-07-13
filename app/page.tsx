import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ReviewsSection from '@/components/ReviewsSection';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';
import SpotlightButton from '@/components/SpotlightButton';

export default function Home() {
  const projects = [
    {
      title: "PayPal Ad",
      category: (
        <>
          <strong>High-impact brand animation</strong> for commercial campaign releases.
        </>
      ),
      videoUrl: "https://youtu.be/FMt2LcZDSnI",
      themeColor: "#003087",
      textColorTheme: "light" as const,
      tag: "Promo"
    },
    {
      title: "SaaS Demo Videos",
      category: (
        <>
          <strong>Cinematic feature walkthroughs</strong> that convert browsers into buyers.
        </>
      ),
      videoUrl: "https://youtu.be/ixG3a8z213k",
      themeColor: "#0A0D14",
      textColorTheme: "light" as const,
      tag: "SaaS Demo"
    },
    {
      title: "Explainer Videos",
      category: (
        <>
          <strong>Complex features made instantly clear</strong> in 60 seconds or less.
        </>
      ),
      videoUrl: "https://youtu.be/L3MB9hYLbBI",
      thumbnailUrl: "https://img.youtube.com/vi/L3MB9hYLbBI/hqdefault.jpg",
      themeColor: "#120E16",
      textColorTheme: "light" as const,
      tag: "Explainer"
    },
    {
      title: "ChatGPT Animation",
      category: (
        <>
          <strong>High-energy kinetic typography</strong> visualizers designed for artists.
        </>
      ),
      videoUrl: "https://youtube.com/shorts/altZ7ZOHWNo?feature=share",
      themeColor: "#EAEAEA",
      textColorTheme: "dark" as const,
      tag: "Typography"
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

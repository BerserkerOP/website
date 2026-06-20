import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const projects = [
    { title: "SaaS Demo Videos", category: "Cinematic feature walkthroughs", videoUrl: "https://www.youtube.com/watch?v=diH5NhlPvGM" },
    { title: "Explainer Videos", category: "Complex features made instantly clear", videoUrl: "https://youtu.be/L3MB9hYLbBI" },
    { title: "Dynamic Lyric Visualizers", category: "High-energy kinetic typography for artists", videoUrl: "https://www.youtube.com/watch?v=5xiQWsoAHr4" },
  ];

  return (
    <div className="bg-apple-bg">
      <Hero />
      
      <section id="store" className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3">Featured Assets</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-apple-text leading-tight tracking-tight">Specialized video solutions tailored to your needs</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              delay={index * 0.1}
              videoUrl={(project as any).videoUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

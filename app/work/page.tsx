import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Our Work | HalftoneMotion',
  description: 'A showcase of our recent motion design and video projects.',
};

export default function WorkPage() {
  const projects = [
    { title: "SaaS Demo Videos", category: "Cinematic feature walkthroughs", videoUrl: "https://www.youtube.com/watch?v=diH5NhlPvGM" },
    { title: "Explainer Videos", category: "Complex features made instantly clear", videoUrl: "https://youtu.be/L3MB9hYLbBI" },
    { title: "Dynamic Lyric Visualizers", category: "High-energy kinetic typography for artists", videoUrl: "https://www.youtube.com/watch?v=5xiQWsoAHr4" },
    { title: "Onboarding Sequences", category: "Get users to their aha moment", videoUrl: "https://www.youtube.com/watch?v=diH5NhlPvGM" },
    { title: "Promo Campaigns", category: "Social ready feature launches", videoUrl: "https://youtu.be/L3MB9hYLbBI" },
    { title: "Product Teasers", category: "Generate hype before launch", videoUrl: "https://www.youtube.com/watch?v=5xiQWsoAHr4" },
  ];

  return (
    <div className="bg-apple-bg min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-apple-text tracking-tight mb-4">
            Selected Work
          </h1>
          <p className="text-lg text-apple-subtext max-w-2xl">
            A collection of our recent projects, from SaaS product tours to high-energy visualizers.
          </p>
        </div>

        {/* 2-column grid for the work page as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              delay={index * 0.1}
              videoUrl={project.videoUrl}
              hoverGradient={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

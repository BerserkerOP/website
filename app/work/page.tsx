import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Our Work | HalftoneMotion',
  description: 'A showcase of our recent motion design and video projects.',
};

export default function WorkPage() {
  const projects = [
    { 
      title: "PayPal Ad", 
      category: "High-impact brand animation", 
      videoUrl: "https://youtu.be/FMt2LcZDSnI",
      themeColor: "#003087",
      textColorTheme: "light" as const
    },
    { 
      title: "SaaS Demo Videos", 
      category: "Cinematic feature walkthroughs", 
      videoUrl: "https://youtu.be/ixG3a8z213k",
      themeColor: "#0A0D14",
      textColorTheme: "light" as const
    },
    { 
      title: "Discord Animation", 
      category: "Community platform walkthroughs", 
      videoUrl: "https://www.youtube.com/watch?v=diH5NhlPvGM",
      themeColor: "#0E0F13",
      textColorTheme: "light" as const
    },
    { 
      title: "Explainer Videos", 
      category: "Complex features made instantly clear", 
      videoUrl: "https://youtu.be/L3MB9hYLbBI", 
      thumbnailUrl: "https://img.youtube.com/vi/L3MB9hYLbBI/hqdefault.jpg",
      themeColor: "#120E16",
      textColorTheme: "light" as const
    },
    { 
      title: "ChatGPT Animation", 
      category: "High-energy kinetic typography for artists", 
      videoUrl: "https://youtube.com/shorts/altZ7ZOHWNo?feature=share",
      themeColor: "#EAEAEA",
      textColorTheme: "dark" as const
    },
    { 
      title: "Onboarding Sequences", 
      category: "Get users to their aha moment", 
      videoUrl: "https://youtu.be/NhGNe4KJ1cU",
      themeColor: "#0A0B10",
      textColorTheme: "light" as const
    },
    { 
      title: "Promo Campaigns", 
      category: "Social ready feature launches", 
      videoUrl: "https://youtu.be/N45oL-Qm8AI",
      themeColor: "#E2E7ED",
      textColorTheme: "dark" as const
    },
  ];

  return (
    <div className="bg-apple-bg min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">
            Selected Work
          </h1>
          <p className="text-base sm:text-lg text-apple-subtext max-w-2xl">
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
              thumbnailUrl={project.thumbnailUrl}
              themeColor={project.themeColor}
              textColorTheme={project.textColorTheme}
              hoverGradient={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

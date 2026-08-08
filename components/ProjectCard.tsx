"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import VideoModal from './VideoModal';

interface ProjectCardProps {
  title: string;
  category: React.ReactNode;
  delay?: number;
  videoUrl?: string;
  hoverGradient?: boolean;
  thumbnailUrl?: string;
  themeColor?: string;
  textColorTheme?: 'light' | 'dark';
  tag?: string;
}

export default function ProjectCard({ 
  title, 
  category, 
  delay = 0, 
  videoUrl, 
  thumbnailUrl,
  tag
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const videoIdMatch = videoUrl?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/)
  const videoId = (videoIdMatch && videoIdMatch[2].length === 11) ? videoIdMatch[2] : null;
  const imageUrl = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);

  // Mouse position relative to card for the follower badge
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        // data-hide-cursor hides the trailing dot when hovering this card
        data-hide-cursor
        className="group relative flex flex-col cursor-none"
      >
        {/* View Project badge — follows cursor, mix-blend-difference for invert effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-30 hidden sm:block select-none"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "10px",
              translateY: "10px",
            }}
          >
            {/* Outer mix-blend-difference wrapper — inverts against video bg */}
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-extrabold text-xs whitespace-nowrap"
              style={{
                mixBlendMode: "difference",
                backgroundColor: "white",
                color: "white",
              }}
            >
              {/* Inner text re-inverts so it's always readable */}
              <span style={{ mixBlendMode: "difference", color: "white" }}>
                View Project
              </span>
              <svg
                className="w-3 h-3 shrink-0"
                style={{ color: "white", mixBlendMode: "difference" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </motion.div>
        )}

        {/* Standalone Video Thumbnail Container */}
        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden bg-zinc-950 shadow-sm group-hover:shadow-2xl transition-all duration-500 isolate">
          {tag && (
            <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider select-none">
              {tag}
            </div>
          )}

          {imageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-[0_10px_35px_rgba(0,0,0,0.3)] transform transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">[ VIDEO PREVIEW ]</span>
            </div>
          )}
        </div>

        {/* Bottom Title Row */}
        <div className="pt-3.5 sm:pt-4 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight group-hover:text-apple-blue transition-colors">
              {title}
            </h3>
            <div className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {category}
            </div>
          </div>

          {/* Right View Project Link */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 pt-0.5">
            <span>View Project</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        category={category}
        videoUrl={videoUrl}
      />
    </>
  );
}

"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import GlareHover from './GlareHover';

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

function getYouTubeEmbedUrl(url: string | undefined) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&enablejsapi=1`
    : null;
}

export default function ProjectCard({ 
  title, 
  category, 
  delay = 0, 
  videoUrl, 
  hoverGradient = false, 
  thumbnailUrl,
  themeColor,
  textColorTheme,
  tag
}: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoIdMatch = videoUrl?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/);
  const videoId = (videoIdMatch && videoIdMatch[2].length === 11) ? videoIdMatch[2] : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1` : null;
  const imageUrl = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const tellListening = () => {
      iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');
    };
    
    tellListening();
    iframe.addEventListener('load', tellListening);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      if (event.source !== iframe.contentWindow) return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'infoDelivery' && data.info && data.info.playerState === 1) {
          window.dispatchEvent(new CustomEvent('global-video-play', { detail: { source: iframe } }));
        }
      } catch (e) {}
    };

    window.addEventListener('message', handleMessage);

    const handleGlobalPlay = (e: any) => {
      if (e.detail.source !== iframe) {
        iframe.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*');
        setIsPlaying(false);
      }
    };

    window.addEventListener('global-video-play', handleGlobalPlay);

    return () => {
      iframe.removeEventListener('load', tellListening);
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('global-video-play', handleGlobalPlay);
    };
  }, []);
  
  // Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      var(--spotlight-color),
      transparent 80%
    )
  `;

  // 3D Tilt
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);
  const xSpring = useSpring(xPct, { stiffness: 400, damping: 30 });
  const ySpring = useSpring(yPct, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(ySpring, [0, 1], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [0, 1], ["-5deg", "5deg"]);
  
  // Glare
  const glareX = useTransform(xSpring, [0, 1], ["100%", "0%"]);
  const glareY = useTransform(ySpring, [0, 1], ["100%", "0%"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isPlaying) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const mx = clientX - left;
    const my = clientY - top;
    
    // For spotlight
    mouseX.set(mx);
    mouseY.set(my);
    
    // For tilt
    xPct.set(mx / width);
    yPct.set(my / height);
  }

  function handleMouseLeave() {
    xPct.set(0.5);
    yPct.set(0.5);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      className="relative [perspective:1000px] flex flex-col group rounded-[24px] border border-transparent hover:border-transparent transition-all duration-500 hover:-translate-y-3"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
        }}
        className="relative flex flex-col h-full w-full rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] dark:shadow-none dark:group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500"
      >
        {/* Apple Blue Gradient Border & Glow on hover/active */}
        <div className="absolute -inset-[2px] rounded-[26px] bg-gradient-to-br from-[#007AFF] via-[#5AC8FA] to-[#007AFF] opacity-0 group-hover:opacity-100 group-active:opacity-100 blur-[1px] transition-all duration-500 group-active:duration-100 group-active:scale-[0.98]" />
        <div className="absolute -inset-[2px] rounded-[26px] bg-gradient-to-br from-[#007AFF] via-[#5AC8FA] to-[#007AFF] opacity-0 group-hover:opacity-80 group-active:opacity-100 blur-2xl transition-all duration-500 group-active:duration-100 group-active:scale-[0.98]" />

        <div 
          className={`relative flex flex-col h-full w-full rounded-[24px] overflow-hidden z-10 transition-transform duration-200 group-active:scale-[0.98] ${themeColor ? '' : 'bg-apple-card'}`}
          style={themeColor ? { backgroundColor: themeColor } : {}}
        >
          {/* Spotlight Hover Glow (Behind Content) */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
            style={{
              background: spotlightBackground,
            }}
          />

          {/* Colorful Gradient Hover Glow */}
          {hoverGradient && (
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          
          {/* Glare Layer (ReactBits) */}
          <GlareHover className="absolute inset-0 z-50 rounded-[24px] mix-blend-overlay" transitionDuration={600} glareOpacity={0.8} />

          {/* 3D Apple Studio Display / Monitor Frame Styling */}
          <div className="relative z-10 w-full p-2.5 sm:p-3.5 bg-gradient-to-b from-[#1C1C1E] to-[#0D0D0E] dark:from-[#18181B] dark:to-[#09090B] border-b border-black/10 dark:border-white/10 flex flex-col items-center">
            {/* Top Webcam Dot */}
            <div className="w-2 h-2 rounded-full bg-black/80 dark:bg-white/20 border border-white/10 mb-2 shadow-inner" />
            
            {/* Screen Container */}
            <div 
              className="relative w-full aspect-video bg-zinc-950 overflow-hidden cursor-pointer group/video rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl isolate"
              onClick={() => {
                if (!isPlaying) {
                  setIsPlaying(true);
                  xPct.set(0.5);
                  yPct.set(0.5);
                }
              }}
            >
              {tag && (
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white uppercase tracking-wider select-none">
                  {tag}
                </div>
              )}
              {!isPlaying && imageUrl ? (
                <div className="relative w-full h-full">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/video:bg-black/20 transition-colors">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transform transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-white/30">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-0.5 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : embedUrl ? (
                <iframe 
                  ref={iframeRef}
                  className="w-full h-full"
                  src={embedUrl} 
                  title={title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <span className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">[ VIDEO PREVIEW ]</span>
                </div>
              )}
            </div>

            {/* Monitor Stand Accent Bar */}
            <div className="w-24 sm:w-32 h-1.5 mt-2 rounded-b-md bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 opacity-60 shadow-sm" />
          </div>

          {/* Title Row with Clip Masters Style View Project Link */}
          <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 flex-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
            <div className="flex flex-col gap-0.5">
              <h3 className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${textColorTheme === 'dark' ? 'text-black' : textColorTheme === 'light' ? 'text-white' : 'text-apple-text dark:text-white'}`}>{title}</h3>
              <p className={`text-xs sm:text-sm font-medium transition-colors ${textColorTheme === 'dark' ? 'text-black/60' : textColorTheme === 'light' ? 'text-white/60' : 'text-apple-subtext dark:text-zinc-400'}`}>
                {category}
              </p>
            </div>

            {/* View Project CTA Link */}
            <div className="flex items-center gap-1 text-xs font-semibold text-apple-blue dark:text-blue-400 hover:underline shrink-0 cursor-pointer group/link">
              <span>View Project</span>
              <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

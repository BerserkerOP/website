"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import GlareHover from './GlareHover';

interface ProjectCardProps {
  title: string;
  category: string;
  delay?: number;
  videoUrl?: string;
  hoverGradient?: boolean;
  thumbnailUrl?: string;
}

function getYouTubeEmbedUrl(url: string | undefined) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&enablejsapi=1`
    : null;
}

export default function ProjectCard({ title, category, delay = 0, videoUrl, hoverGradient = false, thumbnailUrl }: ProjectCardProps) {
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

        <div className="relative flex flex-col h-full w-full rounded-[24px] overflow-hidden bg-apple-card z-10 transition-transform duration-200 group-active:scale-[0.98]">
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

          <div 
            className="relative z-10 w-full aspect-video bg-zinc-900 overflow-hidden cursor-pointer group/video rounded-t-[24px] isolate"
            onClick={() => {
              if (!isPlaying) {
                setIsPlaying(true);
                xPct.set(0.5);
                yPct.set(0.5);
              }
            }}
          >
            {!isPlaying && imageUrl ? (
              <div className="relative w-full h-full">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/10 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transform transition-transform group-hover/video:scale-110">
                    <svg className="w-10 h-10 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
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
              <div className="w-full h-full bg-zinc-800/50 flex items-center justify-center">
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">[ VIDEO PLACEHOLDER ]</span>
              </div>
            )}
          </div>

          {/* Text Container */}
          <div className="relative z-10 px-6 py-6 flex flex-col gap-1.5 flex-1 bg-transparent">
            <h3 className="text-lg font-bold text-apple-text tracking-tight">{title}</h3>
            <p className="text-sm text-apple-subtext leading-relaxed">
              {category}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

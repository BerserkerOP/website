"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: React.ReactNode;
  videoUrl?: string;
}

function getEmbedUrl(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`;
  }
  return url;
}

export default function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  const embedUrl = getEmbedUrl(videoUrl);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-zinc-950 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Top Modal Header (matching Image 2) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-apple-blue flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-tight">
                    {title}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400 leading-tight">
                    HalftoneMotion | Video Production Agency
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white text-sm transition-all hover:scale-105"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-500 text-sm">
                  <span>Video Preview Unavailable</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

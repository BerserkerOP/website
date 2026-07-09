"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    headline: "Fast turnaround & great quality",
    text: "I needed a promo video for my app and halftonemotion delivered it with great video quality in just a few days at a reasonable price.",
    name: "Akil Gurram",
    role: "Founder of WTM",
    image: "/reviews/akil.jpg"
  },
  {
    headline: "Reliable and highly skilled",
    text: "It has been a pleasure working with halftonemotion. They are highly responsive, communicate well, and take genuine ownership of their work. I can confidently recommend them to anyone looking for reliable and skilled motion design and video editing support.",
    name: "Rhythm Shandlya",
    role: "Founder of Vionna",
    image: "/reviews/rhythm.jpg"
  },
  {
    headline: "Incredible attention to detail",
    text: "The onboarding sequence increased our user retention by 30%. Their attention to detail, smooth motion design, and quick turnaround times make them the absolute best in the business.",
    name: "Sarah Jenkins",
    role: "Product Manager"
  }
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface Message {
  text: string;
  isMe: boolean;
  reaction?: string;
  isVideo?: boolean;
}

interface Chat {
  avatarText: string;
  avatarColor: string;
  messages: Message[];
}

// Chat screenshots data from user uploads
const chatsData: Chat[] = [
  {
    avatarText: "E",
    avatarColor: "#007AFF",
    messages: [
      { text: "Thanks for posting.", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "J",
    avatarColor: "#34C759",
    messages: [
      { text: "No problem brother love the work you do. Just now seeing this sorry about the late reply for some reason it was in hidden messages.", isMe: false }
    ]
  },
  {
    avatarText: "T",
    avatarColor: "#FF9500",
    messages: [
      { text: "Ayyy this ain't much bru the edit was tuff asl", isMe: false, reaction: "❤️" },
      { text: "Thankyou so much king 👑💖", isMe: true },
      { text: "Keep dropping more of these twin", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "S",
    avatarColor: "#AF52DE",
    messages: [
      { text: "Word", isMe: false, reaction: "❤️" },
      { text: "Btw I like your editing style", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "L",
    avatarColor: "#FF2D55",
    messages: [
      { text: "Nah bro appreciate you your editing style is tuff keep up the good work fr all love bro", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "B",
    avatarColor: "#5856D6",
    messages: [
      { text: "One of the best edit of all time of this song", isMe: false, reaction: "❤️" },
      { text: "God bless u", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "G",
    avatarColor: "#FF9500",
    messages: [
      { text: "ppreciate you", isMe: true },
      { text: "It was a good edit.", isMe: false, reaction: "❤️" }
    ]
  },
  {
    avatarText: "W",
    avatarColor: "#007AFF",
    messages: [
      { text: "", isMe: false, isVideo: true },
      { text: "Wow bhai just wow don't have words 🙏", isMe: false, reaction: "❤️" }
    ]
  }
];

function ScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % chatsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + chatsData.length) % chatsData.length);
  };

  return (
    <div className="relative w-full max-w-4xl flex flex-col items-center justify-center min-h-[460px] select-none py-10 px-4">
      {/* Cards stack container */}
      <div className="relative w-full flex items-center justify-center h-[340px] md:h-[380px]">
        {chatsData.map((chat, idx) => {
          // Calculate distance from activeIndex
          let distance = idx - activeIndex;
          
          // Handle wrap-around for slider display
          const length = chatsData.length;
          if (distance < -1) {
            if (distance === -(length - 1)) distance = 1;
          }
          if (distance > 1) {
            if (distance === length - 1) distance = -1;
          }
          
          const isActive = distance === 0;
          const isLeft = distance === -1;
          const isRight = distance === 1;
          
          const isVisible = isActive || isLeft || isRight;

          if (!isVisible) return null;

          return (
            <motion.div
              key={idx}
              style={{ transformOrigin: "center bottom" }}
              animate={{
                scale: isActive ? 1 : 0.82,
                x: isActive ? 0 : (isMobile ? (isLeft ? -40 : 40) : (isLeft ? -180 : 180)),
                z: isActive ? 0 : -100,
                opacity: isActive ? 1 : (isMobile ? 0 : 0.35),
                zIndex: isActive ? 20 : 10,
                pointerEvents: isActive ? "auto" : "none",
                filter: isActive ? "blur(0px)" : "blur(3px)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              className="absolute w-[290px] sm:w-[330px] h-[330px] md:h-[360px] bg-zinc-950 dark:bg-black rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden text-white font-sans"
            >
              {/* Instagram Style Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border shrink-0"
                    style={{
                      backgroundColor: `${chat.avatarColor}20`,
                      color: chat.avatarColor,
                      borderColor: `${chat.avatarColor}35`
                    }}
                  >
                    {chat.avatarText}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/80 tracking-tight">Active now</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 text-white/60">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
              </div>

              {/* Chat Content Body */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-zinc-950 dark:bg-black scrollbar-none justify-end">
                {chat.messages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex flex-col max-w-[85%] ${msg.isMe ? 'self-end items-end' : 'self-start items-start'} relative`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed font-medium ${
                        msg.isMe
                          ? 'bg-[#007AFF] text-white rounded-tr-sm'
                          : 'bg-zinc-800 text-white rounded-tl-sm'
                      } relative`}
                    >
                      {msg.isVideo ? (
                        /* Video Post Sharing Mockup */
                        <div className="w-[170px] h-[95px] bg-zinc-900 rounded-xl border border-white/10 flex flex-col overflow-hidden shadow-inner">
                          <div className="flex-1 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center relative">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-zinc-900 flex items-center justify-between text-[8px] text-white/50 border-t border-white/5 font-semibold">
                            <span>Watch Video</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      ) : (
                        msg.text
                      )}

                      {/* Heart Reaction Badge */}
                      {msg.reaction && (
                        <div className="absolute -bottom-2 bg-zinc-900 border border-white/10 rounded-full px-1.5 py-0.5 text-[8px] flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform duration-200" style={{ [msg.isMe ? 'right' : 'left']: '8px' }}>
                          {msg.reaction}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center gap-5 mt-6">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {chatsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="w-6 h-3 flex items-center justify-center focus:outline-none"
            >
              <motion.div
                animate={{
                  width: idx === activeIndex ? 16 : 6,
                  height: 6,
                  backgroundColor: idx === activeIndex ? "#007AFF" : "rgba(255, 255, 255, 0.2)",
                  borderRadius: 3,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        {/* Arrow Buttons */}
        <div className="flex items-center gap-5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 active:scale-95 transition-all text-apple-text dark:text-white/70 hover:text-apple-text dark:hover:text-white"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 active:scale-95 transition-all text-apple-text dark:text-white/70 hover:text-apple-text dark:hover:text-white"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 px-6 lg:px-16 max-w-7xl mx-auto border-t border-apple-border/50">
      {/* Styled Chat Screenshots Carousel */}
      <div className="w-full flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-apple-text dark:text-white mb-10 tracking-tight text-center">
          What they say in DMs
        </h3>
        
        <ScreenshotCarousel />
      </div>
    </section>
  );
}

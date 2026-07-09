"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Project Kickoff",
    desc: "We start by understanding your brand and goals through our intake form. Whether you have a script ready or need one from scratch, we lock in the core narrative first."
  },
  {
    num: "02",
    title: "Storyboarding",
    desc: "We sketch a frame-by-frame storyboard. This helps you visualize the flow, pacing, and visual direction, ensuring we're perfectly aligned before any design begins."
  },
  {
    num: "03",
    title: "Style Approval",
    desc: "Our designers build custom illustrations and UI mockups. We then jump on a quick call where you approve the exact visual style and guarantee it matches your brand."
  },
  {
    num: "04",
    title: "Animation & Sound",
    desc: "The magic happens here. We bring the approved assets to life with buttery-smooth motion design, perfectly timed voiceovers, and premium sound effects."
  },
  {
    num: "05",
    title: "Revisions & Delivery",
    desc: "You review the video and leave consolidated feedback via timestamped comments. After final tweaks, your premium video is rendered and delivered in 4K."
  }
];

// Custom Visual Mockups
const IntakeFormMockup = () => {
  const [clicked, setClicked] = useState(false);
  
  const handleEasterEggClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  return (
  <div className="w-full h-full bg-white dark:bg-[#1C1C1E] rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 flex flex-col font-sans max-h-[350px]">
    <div className="bg-[#007AFF] px-6 py-4 flex items-center shadow-md z-10">
      <span className="text-white font-bold tracking-[0.1em] text-xs uppercase">Project Intake Form</span>
    </div>
    <div className="p-4 flex flex-col gap-3 flex-grow bg-zinc-50 dark:bg-black/20">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="w-16 h-2 bg-black/10 dark:bg-white/10 rounded-full"></div>
          <div className="h-7 w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg"></div>
        </div>
        <div className="space-y-1.5">
          <div className="w-16 h-2 bg-black/10 dark:bg-white/10 rounded-full"></div>
          <div className="h-7 w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg"></div>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="w-20 h-2 bg-black/10 dark:bg-white/10 rounded-full"></div>
        <div className="h-7 w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg"></div>
      </div>
      <div className="space-y-1.5">
        <div className="w-24 h-2 bg-black/10 dark:bg-white/10 rounded-full"></div>
        <div className="h-16 w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg"></div>
      </div>
      <div className="mt-auto pt-1 flex justify-start shrink-0">
        <motion.div 
          onClick={handleEasterEggClick}
          className={`w-full h-9 ${clicked ? 'bg-[#FF3B30] max-w-[180px]' : 'bg-[#007AFF] hover:bg-[#005bb5] max-w-[120px]'} transition-all duration-300 cursor-pointer rounded-lg flex items-center justify-center text-white font-bold text-[13px] shadow-lg ${clicked ? 'shadow-red-500/30' : 'shadow-blue-500/30'}`}
        >
          <AnimatePresence mode="wait">
            {clicked ? (
              <motion.span key="clicked" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 whitespace-nowrap">
                Don't click me 😡
              </motion.span>
            ) : (
              <motion.span key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -5 }}>
                Submit
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  </div>
  );
};

const StoryboardMockup = () => (
  <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col font-sans max-h-[350px]">
    <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-[#2d2d2d] shrink-0">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
      </div>
      <div className="text-white/60 text-xs font-medium">Storyboard v2.fig</div>
      <div className="bg-[#007AFF] text-white text-[10px] font-bold px-3 py-1 rounded-md shadow-md">Share</div>
    </div>
    <div className="p-6 flex-grow flex flex-col bg-[#1e1e1e]">
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <span className="text-white/60 text-xs">Page 1</span>
        <span className="text-white/30 text-xs">|</span>
        <span className="text-white font-bold text-xs">Storyboard</span>
      </div>
      <div className="grid grid-cols-3 gap-3 flex-grow">
        {['Opening', 'Problem', 'Solution', 'Feature 1', 'Feature 2', 'CTA'].map((title, i) => (
          <div key={i} className="flex flex-col gap-2 items-center h-full">
            <div className="w-full h-full bg-[#2a2a2a] border border-white/5 rounded-lg flex flex-col items-center justify-center gap-1.5 shadow-inner">
              <div className="w-6 h-1 bg-white/10 rounded-full"></div>
              <div className="w-10 h-1 bg-white/10 rounded-full"></div>
              <div className="w-8 h-1 bg-white/10 rounded-full"></div>
            </div>
            <span className="text-white/50 text-[9px] font-medium shrink-0">{title}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MeetCallMockup = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "Uday", text: "Yo, are you guys joining the call?", time: "15:21" },
    { sender: "Rhythm", text: "Yeah, already in. Just waiting on Atharv.", time: "15:22" },
    { sender: "Atharv", text: "Hey! Sorry, just finished exporting the storyboard.", time: "15:23" },
    { sender: "Rhythm", text: "Sweet. Let's look at the style frames.", time: "15:24" }
  ]);

  const [activeSpeaker, setActiveSpeaker] = useState<"Atharv" | "Uday" | "Rhythm" | null>(null);
  const [isUdayMuted, setIsUdayMuted] = useState(true);

  // Active speaker simulation loop
  useEffect(() => {
    if (callEnded) return;

    const speakerInterval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.25) {
        setActiveSpeaker(null); // Pause/silence
      } else if (rand < 0.55) {
        setActiveSpeaker("Rhythm");
      } else if (rand < 0.8) {
        if (!isUdayMuted) {
          setActiveSpeaker("Uday");
        } else {
          setActiveSpeaker(null);
        }
      } else {
        if (!isMicMuted) {
          setActiveSpeaker("Atharv");
        } else {
          setActiveSpeaker(null);
        }
      }
    }, 2500);

    return () => clearInterval(speakerInterval);
  }, [isMicMuted, isUdayMuted, callEnded]);

  // Uday mute/unmute simulation loop
  useEffect(() => {
    if (callEnded) return;

    const muteInterval = setInterval(() => {
      setIsUdayMuted(prev => {
        const nextMute = !prev;
        if (nextMute) {
          setActiveSpeaker(curr => curr === "Uday" ? null : curr);
        }
        return nextMute;
      });
    }, 6000);

    return () => clearInterval(muteInterval);
  }, [callEnded]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [...prev, {
      sender: "Atharv",
      text: chatInput,
      time: timeStr
    }]);
    setChatInput("");
  };

  if (callEnded) {
    return (
      <div className="w-full h-full min-h-[280px] bg-[#202124] rounded-xl flex flex-col items-center justify-center gap-4 text-white font-sans max-h-[350px] p-6 border border-white/10 shadow-2xl">
        <h3 className="text-sm font-bold tracking-tight">You left the meeting</h3>
        <p className="text-[10px] text-white/50 -mt-2">Did you forget to say goodbye?</p>
        <button 
          onClick={() => {
            setCallEnded(false);
            setIsMicMuted(false);
            setIsCameraOff(false);
            setShowChat(false);
            setIsUdayMuted(true);
            setActiveSpeaker(null);
            setMessages([
              { sender: "Uday", text: "Yo, are you guys joining the call?", time: "15:21" },
              { sender: "Rhythm", text: "Yeah, already in. Just waiting on Atharv.", time: "15:22" },
              { sender: "Atharv", text: "Hey! Sorry, just finished exporting the storyboard.", time: "15:23" },
              { sender: "Rhythm", text: "Sweet. Let's look at the style frames.", time: "15:24" }
            ]);
          }} 
          className="px-5 py-2 rounded-full bg-[#8AB4F8] text-[#202124] font-bold text-[10px] hover:bg-[#8AB4F8]/90 transition-colors shadow-lg shadow-blue-500/20"
        >
          Rejoin Call
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#202124] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col font-sans max-h-[350px]">
      <div className="p-3 flex justify-between items-center shrink-0 border-b border-white/5 bg-[#202124]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#34A853] flex items-center justify-center shadow-lg shadow-green-500/20">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          </div>
          <span className="text-white font-semibold text-xs tracking-tight">Finalization Call - HalftoneMotion</span>
        </div>
        <span className="text-white/60 text-[10px] font-medium font-mono">15:24</span>
      </div>
      
      <div className="flex-grow flex min-h-0 relative overflow-hidden bg-[#18191B]">
        <div className={`p-3 flex-grow grid gap-2.5 transition-all duration-300 ${showChat ? 'grid-cols-2' : 'grid-cols-3'}`}>
          <div className={`bg-[#3C4043]/90 rounded-xl relative flex flex-col items-center justify-center transition-all duration-300 py-3 ${(activeSpeaker === "Atharv" && !isMicMuted && !isCameraOff) ? 'border-2 border-[#8AB4F8] shadow-[0_0_12px_rgba(138,180,248,0.2)]' : 'border border-white/5'}`}>
            {isMicMuted && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EA4335] flex items-center justify-center shadow-md border border-white/10">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/><line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
            )}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold mb-1 shadow-inner shrink-0 relative transition-all duration-300 ${isCameraOff ? 'bg-black/50 border border-white/10 text-white/40 scale-90' : 'bg-[#5F6368]'}`}>
              {isCameraOff ? (
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : 'A'}
              
              {activeSpeaker === "Atharv" && !isMicMuted && !isCameraOff && (
                <span className="absolute inset-0 rounded-full border border-[#8AB4F8] animate-ping opacity-20"></span>
              )}
            </div>
            <span className="text-white text-[8px] font-bold tracking-wide">Atharv (You)</span>
          </div>
          
          <div className={`bg-[#3C4043]/90 rounded-xl relative flex flex-col items-center justify-center transition-all duration-300 py-3 ${(activeSpeaker === "Uday" && !isUdayMuted) ? 'border-2 border-[#8AB4F8] shadow-[0_0_12px_rgba(138,180,248,0.2)]' : 'border border-white/5'}`}>
            {isUdayMuted && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EA4335] flex items-center justify-center shadow-md border border-white/10">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/><line x1="4" y1="4" x2="20" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
            )}
            <div className="w-9 h-9 rounded-full bg-[#5F6368] flex items-center justify-center text-white text-sm font-bold mb-1 shadow-inner shrink-0 relative">
              U
              {activeSpeaker === "Uday" && !isUdayMuted && (
                <span className="absolute inset-0 rounded-full border border-[#8AB4F8] animate-ping opacity-20"></span>
              )}
            </div>
            <span className="text-white text-[8px] font-medium tracking-wide">Uday</span>
          </div>

          <div className={`bg-[#3C4043]/90 rounded-xl relative flex flex-col items-center justify-center transition-all duration-300 py-3 ${activeSpeaker === "Rhythm" ? 'border-2 border-[#8AB4F8] shadow-[0_0_12px_rgba(138,180,248,0.2)]' : 'border border-white/5'} ${showChat ? 'hidden' : 'flex'}`}>
            <div className="w-9 h-9 rounded-full bg-[#5F6368] flex items-center justify-center text-white text-sm font-bold mb-1 shadow-inner shrink-0 relative">
              R
              {activeSpeaker === "Rhythm" && (
                <span className="absolute inset-0 rounded-full border border-[#8AB4F8] animate-ping opacity-20"></span>
              )}
            </div>
            <span className="text-white text-[8px] font-medium tracking-wide">Rhythm</span>
          </div>
        </div>

        <AnimatePresence>
          {showChat && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 170, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-[170px] border-l border-white/10 bg-[#202124] flex flex-col h-full shrink-0 min-h-0"
            >
              <div className="p-2 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#202124]">
                <span className="text-white text-[8px] font-bold tracking-wider uppercase opacity-80">In-call Messages</span>
                <button onClick={() => setShowChat(false)} className="p-1 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              <div 
                ref={chatContainerRef}
                className="flex-1 p-2 overflow-y-auto flex flex-col gap-2 bg-[#1C1C1E]/50 scrollbar-none min-h-0"
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col text-[9px]">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className={`font-bold ${msg.sender === "Atharv" ? 'text-[#8AB4F8]' : 'text-white/80'}`}>{msg.sender}</span>
                      <span className="text-[7px] text-white/40">{msg.time}</span>
                    </div>
                    <p className="text-white/70 leading-normal font-medium bg-white/5 px-2 py-1 rounded-md max-w-[95%] break-words">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-1.5 border-t border-white/5 flex gap-1 shrink-0 bg-[#202124]">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  placeholder="Message..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-[9px] text-white placeholder-white/30 focus:outline-none focus:border-[#8AB4F8]/50"
                />
                <button type="submit" className="p-1 rounded-full bg-[#8AB4F8] text-[#202124] hover:bg-[#8AB4F8]/90 transition-colors shrink-0">
                  <svg className="w-3 h-3 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-14 bg-[#202124] border-t border-white/5 flex items-center justify-center gap-2.5 shrink-0">
        <button 
          onClick={() => setIsMicMuted(!isMicMuted)} 
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${isMicMuted ? 'bg-[#EA4335] text-white hover:bg-[#EA4335]/90 shadow-red-500/10' : 'bg-[#3C4043] text-white hover:bg-white/5'}`}
        >
          {isMicMuted ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
          )}
        </button>

        <button 
          onClick={() => setIsCameraOff(!isCameraOff)} 
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${isCameraOff ? 'bg-[#EA4335] text-white hover:bg-[#EA4335]/90 shadow-red-500/10' : 'bg-[#3C4043] text-white hover:bg-white/5'}`}
        >
          {isCameraOff ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          )}
        </button>

        <button 
          onClick={() => setCallEnded(true)} 
          className="w-11 h-7 rounded-full bg-[#EA4335] flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-[#EA4335]/90 transition-colors"
        >
          <svg className="w-4 h-4 text-white transform rotate-[135deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </button>

        <button 
          onClick={() => setShowChat(!showChat)} 
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-200 ${showChat ? 'bg-[#8AB4F8] text-[#202124] hover:bg-[#8AB4F8]/90 shadow-blue-500/10' : 'bg-[#3C4043] text-white hover:bg-white/5'}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </button>
      </div>
    </div>
  );
};

const RevisionCommentsMockup = () => {
  const [showReply, setShowReply] = useState(false);

  return (
  <div className="w-full h-full bg-white dark:bg-[#1C1C1E] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col font-sans max-h-[350px]">
    <div className="px-5 py-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
      <span className="font-bold text-apple-text dark:text-white text-sm">Revision Comments</span>
      <div className="bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full text-xs font-bold">2 comments</div>
    </div>
    
    <div className="flex-grow flex flex-col overflow-y-auto bg-black/5 dark:bg-black/20">
      <div className="px-5 py-2 bg-black/5 dark:bg-white/5 flex justify-between items-center border-y border-black/5 dark:border-white/5">
        <span className="text-[10px] font-bold text-apple-text/50 dark:text-white/50 tracking-wider">MON</span>
        <span className="text-[10px] font-medium text-apple-text/40 dark:text-white/40 uppercase tracking-widest">12 May</span>
      </div>
      
      <div className="px-5 py-5 flex gap-4 border-b border-black/5 dark:border-white/5">
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
          <span className="font-bold text-sm text-apple-text dark:text-white">R</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-apple-text dark:text-white tracking-tight">Rhythm</span>
            <span className="text-xs font-bold text-apple-blue">0:15</span>
          </div>
          <p className="text-sm text-apple-text/80 dark:text-white/80 leading-relaxed font-medium">Can we nudge the logo slightly to the left here?</p>
          
          <AnimatePresence mode="wait">
            {showReply ? (
              <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 12 }} className="flex gap-3 border-l-2 border-black/10 dark:border-white/10 pl-3">
                <div className="w-7 h-7 rounded-full bg-[#007AFF] flex items-center justify-center shrink-0 shadow-md">
                  <span className="font-bold text-[10px] text-white">H</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-xs text-apple-text dark:text-white">HalftoneMotion</span>
                  <p className="text-xs text-apple-text/70 dark:text-white/70 font-medium">Absolutely! We'll shift it left by 10 pixels in the next render.</p>
                </div>
              </motion.div>
            ) : (
              <motion.span 
                key="reply-btn"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowReply(true)} 
                className="text-[10px] font-bold text-apple-text/40 dark:text-white/40 mt-1 uppercase tracking-wider cursor-pointer hover:text-apple-blue transition-colors w-fit"
              >
                1 reply
              </motion.span>
            )}
          </AnimatePresence>

        </div>
      </div>
      
      <div className="px-5 py-5 flex gap-4 border-b border-black/5 dark:border-white/5">
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
          <span className="font-bold text-sm text-apple-text dark:text-white">R</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-apple-text dark:text-white tracking-tight">Rhythm</span>
            <span className="text-xs font-bold text-apple-blue">0:42</span>
          </div>
          <p className="text-sm text-apple-text/80 dark:text-white/80 leading-relaxed font-medium">Love this transition, keep exactly as is.</p>
        </div>
      </div>
    </div>
  </div>
  );
};

const VideoPlayerMockup = () => {
  const [mgWidth, setMgWidth] = useState(80);
  const [voWidth, setVoWidth] = useState(60);
  const [muWidth, setMuWidth] = useState(95);
  const [sfxWidth, setSfxWidth] = useState(45);
  const [playhead, setPlayhead] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const [apiReady, setApiReady] = useState(false);
  const containerId = "yt-player-step";

  const totalSeconds = 17; // Exact duration of J. Cole - 39 Intro YouTube Short

  useEffect(() => {
    // Load YouTube IFrame API script
    if (typeof window !== 'undefined') {
      if (!(window as any).YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        (window as any).onYouTubeIframeAPIReady = () => {
          setApiReady(true);
        };
      } else {
        setApiReady(true);
      }
    }
  }, []);

  useEffect(() => {
    if (apiReady && !playerRef.current) {
      playerRef.current = new (window as any).YT.Player(containerId, {
        height: '100%',
        width: '100%',
        videoId: '_87r8kmzot8',
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: '_87r8kmzot8',
          playsinline: 1
        },
        events: {
          onStateChange: (event: any) => {
            // event.data: 1 is playing, 2 is paused
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    }
  }, [apiReady]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
          const current = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration() || totalSeconds;
          setPlayhead((current / duration) * 100);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayClick = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePauseClick = () => {
    if (playerRef.current && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const startDrag = (setFn: (val: number) => void) => (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    const isTouch = 'touches' in e;
    
    const updateWidth = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
      setFn(pct);

      if (setFn === setPlayhead && playerRef.current && playerRef.current.seekTo) {
        const duration = playerRef.current.getDuration() || totalSeconds;
        playerRef.current.seekTo((pct / 100) * duration, true);
      }
    };

    const initialClientX = isTouch ? e.touches[0].clientX : e.clientX;
    updateWidth(initialClientX);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      updateWidth(clientX);
    };

    const handleEnd = () => {
      if (isTouch) {
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    };

    if (isTouch) {
      window.addEventListener('touchmove', handleMove, { passive: true });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  };

  const currentSeconds = Math.round((playhead / 100) * totalSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full h-full bg-[#1C1C1E] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col font-sans max-h-[350px]">
      <div className="flex-grow bg-black relative flex flex-col justify-end min-h-[140px] overflow-hidden">
        {/* Video Player Container */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <div id={containerId} className="w-full h-full" />
        </div>

        {/* Play/Pause Click Handler Overlay */}
        <div 
          onClick={isPlaying ? handlePauseClick : handlePlayClick} 
          className="absolute inset-0 cursor-pointer bg-transparent z-10" 
        />

        {/* Overlay Play Button when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-xl scale-100 hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}

        <div className="px-4 pb-2 flex flex-col gap-1.5 relative z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8">
          <div 
            onMouseDown={startDrag(setPlayhead)}
            onTouchStart={startDrag(setPlayhead)}
            className="w-full h-3 flex items-center cursor-ew-resize group/playhead"
          >
            <div className="w-full h-1 bg-white/20 rounded-full relative">
              <div 
                style={{ width: `${playhead}%` }} 
                className="h-full bg-[#007AFF] shadow-[0_0_10px_rgba(0,122,255,0.8)] rounded-full relative flex items-center justify-end"
              >
                <div className="absolute -right-1.5 w-3 h-3 rounded-full bg-white shadow-md border-2 border-[#007AFF] scale-0 group-hover/playhead:scale-100 transition-transform duration-150 shrink-0" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <button 
              onClick={isPlaying ? handlePauseClick : handlePlayClick}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isPlaying ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <span className="text-white/60 text-[9px] font-mono tracking-wider">
              {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-[#2A2A2C] p-4 flex flex-col gap-2 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-[9px] w-[70px] shrink-0 font-medium">Motion Graphics</span>
          <div 
            onMouseDown={startDrag(setMgWidth)}
            onTouchStart={startDrag(setMgWidth)}
            className="flex-grow h-4 bg-black/40 rounded flex items-center px-1 cursor-ew-resize hover:bg-black/60 transition-colors duration-150 relative group/track"
          >
            <div 
              style={{ width: `${mgWidth}%` }} 
              className="h-2.5 bg-[#007AFF] rounded-sm shadow-[0_0_5px_rgba(0,122,255,0.4)] relative flex items-center justify-end min-w-[5%]"
            >
              <div className="w-0.5 h-2 bg-white/70 rounded-full mr-0.5 opacity-0 group-hover/track:opacity-100 transition-opacity duration-150" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-[9px] w-[70px] shrink-0 font-medium">Voiceover</span>
          <div 
            onMouseDown={startDrag(setVoWidth)}
            onTouchStart={startDrag(setVoWidth)}
            className="flex-grow h-4 bg-black/40 rounded flex items-center px-1 cursor-ew-resize hover:bg-black/60 transition-colors duration-150 relative group/track"
          >
            <div 
              style={{ width: `${voWidth}%` }} 
              className="h-2.5 bg-[#34C759] rounded-sm shadow-[0_0_5px_rgba(52,199,89,0.4)] relative flex items-center justify-end min-w-[5%]"
            >
              <div className="w-0.5 h-2 bg-white/70 rounded-full mr-0.5 opacity-0 group-hover/track:opacity-100 transition-opacity duration-150" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-[9px] w-[70px] shrink-0 font-medium">Music</span>
          <div 
            onMouseDown={startDrag(setMuWidth)}
            onTouchStart={startDrag(setMuWidth)}
            className="flex-grow h-4 bg-black/40 rounded flex items-center px-1 cursor-ew-resize hover:bg-black/60 transition-colors duration-150 relative group/track"
          >
            <div 
              style={{ width: `${muWidth}%` }} 
              className="h-2.5 bg-[#FF9500] rounded-sm shadow-[0_0_5px_rgba(255,149,0,0.4)] relative flex items-center justify-end min-w-[5%]"
            >
              <div className="w-0.5 h-2 bg-white/70 rounded-full mr-0.5 opacity-0 group-hover/track:opacity-100 transition-opacity duration-150" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-[9px] w-[70px] shrink-0 font-medium">SFX</span>
          <div 
            onMouseDown={startDrag(setSfxWidth)}
            onTouchStart={startDrag(setSfxWidth)}
            className="flex-grow h-4 bg-black/40 rounded flex items-center px-1 cursor-ew-resize hover:bg-black/60 transition-colors duration-150 relative group/track"
          >
            <div 
              style={{ width: `${sfxWidth}%` }} 
              className="h-2.5 bg-[#AF52DE] rounded-sm shadow-[0_0_5px_rgba(175,82,222,0.4)] relative flex items-center justify-end min-w-[5%]"
            >
              <div className="w-0.5 h-2 bg-white/70 rounded-full mr-0.5 opacity-0 group-hover/track:opacity-100 transition-opacity duration-150" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mockups = [
  <IntakeFormMockup key="step0" />,
  <StoryboardMockup key="step1" />,
  <MeetCallMockup key="step2" />,
  <VideoPlayerMockup key="step3" />,
  <RevisionCommentsMockup key="step4" />
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="py-20 sm:py-32 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden">
      
      <div className="mb-16 text-center max-w-2xl mx-auto relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-apple-blue text-sm font-semibold uppercase tracking-widest mb-3"
        >
          Our Process
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-apple-text leading-tight tracking-tight"
        >
          From concept to final render in days.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 relative z-10 items-start">
        
        {/* Left Column: Interactive List */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-3"
        >
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div key={index} className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left rounded-2xl px-6 py-5 transition-all duration-300 focus:outline-none flex items-center gap-4 border ${
                    isActive 
                      ? 'bg-apple-blue shadow-lg shadow-apple-blue/20 border-transparent' 
                      : 'bg-apple-card/40 backdrop-blur-sm border-black/5 dark:border-white/5 hover:bg-apple-card/80 hover:border-black/10 dark:hover:border-white/10'
                  }`}
                >
                  <span 
                    className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-inner' 
                        : 'bg-apple-blue/10 text-apple-blue dark:bg-white/5 dark:text-white/60'
                    }`}
                  >
                    {step.num}
                  </span>
                  <h3 
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-apple-text'
                    }`}
                  >
                    {step.title}
                  </h3>
                </button>

                {/* Mobile Accordion Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:hidden overflow-hidden"
                    >
                      <div className="bg-apple-card/60 dark:bg-apple-card/40 backdrop-blur-xl rounded-[24px] p-5 border border-black/5 dark:border-white/5 shadow-sm mt-1 mb-2 flex flex-col gap-5">
                        <p className="text-apple-text/80 text-sm leading-relaxed font-medium">
                          {step.desc}
                        </p>
                        <div className="w-full h-[320px] sm:h-[350px] flex items-center justify-center">
                          {mockups[index]}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Right Column: Active Card Display with Visual Mockups (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block lg:col-span-7 relative h-full min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0 w-full h-fit bg-apple-card/60 dark:bg-apple-card/40 backdrop-blur-3xl rounded-[32px] p-6 lg:p-8 border border-black/5 dark:border-white/5 overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] flex flex-col gap-6"
            >
              {/* Top Text Description */}
              <div className="relative z-10 flex flex-col shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-apple-blue/10 dark:bg-apple-blue/20 flex items-center justify-center">
                    <span className="text-apple-blue font-bold text-xs">{steps[activeStep].num}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-apple-blue tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                </div>
                
                <p className="text-apple-text/80 text-sm leading-relaxed font-medium">
                  {steps[activeStep].desc}
                </p>
              </div>

              {/* Dynamic Mockup Container */}
              <div className="relative z-10 w-full flex-grow flex items-center justify-center">
                {mockups[activeStep]}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none z-0" />
    </section>
  );
}

'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.38,
      smoothWheel: true,
      easing: (time) => 1 - Math.pow(1 - time, 3),
    });

    return () => lenis.destroy();
  }, [reduceMotion]);

  return null;
}

export function FirstVisitIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion || sessionStorage.getItem('halftone-intro-seen')) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem('halftone-intro-seen', '1');
    const thumbnail = new Image();
    thumbnail.src = 'https://i.ytimg.com/vi/CKRGb22UZQA/maxresdefault.jpg';
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="first-visit-intro"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <div className="intro-lockup"><span>HALFTONE</span><span>MOTION</span></div>
          <div className="intro-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }} /></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PageExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-page"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="route-wipe"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

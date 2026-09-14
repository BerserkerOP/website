'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {useTheme} from 'next-themes';
import {Sun, Moon, ArrowUpRight} from 'lucide-react';

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
  const {setTheme, resolvedTheme}=useTheme();
  const reduceMotion=useReducedMotion();
  const dialog=useRef<HTMLDialogElement>(null);
  const timer=useRef<ReturnType<typeof setTimeout>>();
  const [visible,setVisible]=useState(false);
  const [closing,setClosing]=useState(false);
  const [preview,setPreview]=useState('light');
  useEffect(()=>{
    setVisible(true);
    ['/clear-sky.webp','/cloud-original.webp'].forEach(src=>{const img=new Image();img.src=src});
    return()=>clearTimeout(timer.current);
  },[]);
  useEffect(()=>{
    if(!visible)return;
    dialog.current?.showModal();
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=previous};
  },[visible]);
  const choose=(theme:string)=>{
    if(closing)return;
    setTheme(theme);setPreview(theme);setClosing(true);
    timer.current=setTimeout(()=>{dialog.current?.close();setVisible(false);document.querySelector<HTMLAnchorElement>('.wordmark')?.focus({preventScroll:true})},reduceMotion?0:450);
  };
  if(!visible)return null;
  return <dialog ref={dialog} className={`atmosphere-picker ${closing?'is-leaving':''}`} data-preview={preview} aria-labelledby="atmosphere-title" onCancel={e=>{e.preventDefault();choose(resolvedTheme==='dark'?'dark':'light')}} data-lenis-prevent>
    <div className="picker-sky" aria-hidden="true"/><div className="picker-clouds" aria-hidden="true"/>
    <div className="picker-content"><span className="mono picker-kicker">A DIFFERENT LIGHT. THE SAME MOTION.</span><h1 id="atmosphere-title">Choose your<br/><em>atmosphere.</em></h1><p>Step into your kind of sky.</p>
      <div className="atmosphere-options">
        <button type="button" autoFocus onPointerEnter={()=>setPreview('light')} onFocus={()=>setPreview('light')} onClick={()=>choose('light')} disabled={closing}><Sun size={27}/><span><strong>Daylight</strong><small>Clear skies. Fresh ideas.</small></span><ArrowUpRight size={21}/></button>
        <button type="button" onPointerEnter={()=>setPreview('dark')} onFocus={()=>setPreview('dark')} onClick={()=>choose('dark')} disabled={closing}><Moon size={27}/><span><strong>After dark</strong><small>Quiet skies. Bright ideas.</small></span><ArrowUpRight size={21}/></button>
      </div><span className="picker-note">You can switch anytime using the sun or moon in the header.</span>
    </div>
  </dialog>;
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

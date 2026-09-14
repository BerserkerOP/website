'use client';

import {useEffect, useRef, useState} from 'react';
import {useReducedMotion} from 'framer-motion';

export function HeroAtmosphere(){
  const ref=useRef<HTMLDivElement>(null);
  const reduce=useReducedMotion();
  useEffect(()=>{
    const hero=ref.current?.closest<HTMLElement>('.hero');
    if(!hero || reduce || !matchMedia('(pointer:fine)').matches) return;
    let frame=0, x=0, y=0, tx=0, ty=0;
    const tick=()=>{
      x+=(tx-x)*.075; y+=(ty-y)*.075;
      hero.style.setProperty('--cloud-x',`${x*20}px`);
      hero.style.setProperty('--cloud-y',`${y*10}px`);
      hero.style.setProperty('--sky-x',`${x*5}px`);
      hero.style.setProperty('--sky-y',`${y*3}px`);
      if(Math.abs(tx-x)+Math.abs(ty-y)>.002) frame=requestAnimationFrame(tick); else frame=0;
    };
    const start=()=>{if(!frame)frame=requestAnimationFrame(tick)};
    const move=(e:PointerEvent)=>{const b=hero.getBoundingClientRect();tx=(e.clientX-b.left)/b.width*2-1;ty=(e.clientY-b.top)/b.height*2-1;start()};
    const reset=()=>{tx=0;ty=0;start()};
    hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',reset);
    return()=>{cancelAnimationFrame(frame);hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',reset);['--cloud-x','--cloud-y','--sky-x','--sky-y'].forEach(p=>hero.style.removeProperty(p))};
  },[reduce]);
  return <div ref={ref} className="night-sky" aria-hidden="true">{Array.from({length:62},(_,i)=><i key={i} className="sky-star" style={{left:`${(i*37.71+7)%100}%`,top:`${(i*19.37+3)%76}%`,width:i%9===0?3:1.5,height:i%9===0?3:1.5,animationDelay:`-${i%11}s`,animationDuration:`${5+i%5}s`}}/>)}<span className="shooting-star"/><span className="shooting-star second-shooting"/></div>;
}

export function EdgeBlur(){
  const [active,setActive]=useState(false);
  useEffect(()=>{let frame=0;const update=()=>{frame=0;setActive(window.scrollY>80 && window.scrollY+window.innerHeight<document.documentElement.scrollHeight-36)};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener('scroll',scroll,{passive:true});return()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame)}},[]);
  return <div className={`edge-blur ${active?'is-active':''}`} aria-hidden="true">{[1,2,4,8,16].map((blur,i)=><div key={blur} style={{backdropFilter:`blur(${blur}px)`,WebkitBackdropFilter:`blur(${blur}px)`,maskImage:`linear-gradient(to bottom, transparent ${i*16}%, black ${i*16+20}%)`,WebkitMaskImage:`linear-gradient(to bottom, transparent ${i*16}%, black ${i*16+20}%)`}}/>)}</div>;
}

'use client';
import {useEffect,useRef,useState} from 'react';
import {motion,useMotionValueEvent,useReducedMotion,useScroll,useTransform} from 'framer-motion';
import {Play,Pause,X,ArrowUpRight} from 'lucide-react';
import VideoThumbnail from './VideoThumbnail';

type Player={playVideo:()=>void;pauseVideo:()=>void;seekTo:(seconds:number,allowSeekAhead:boolean)=>void;getCurrentTime:()=>number;getDuration:()=>number;getPlayerState:()=>number;destroy:()=>void};
type API={Player:new(node:HTMLElement,options:Record<string,unknown>)=>Player};
let apiPromise:Promise<API>|undefined;
function loadAPI(){if(apiPromise)return apiPromise;apiPromise=new Promise((resolve,reject)=>{const w=window as typeof window&{YT?:API;onYouTubeIframeAPIReady?:()=>void};if(w.YT?.Player){resolve(w.YT);return;}const previous=w.onYouTubeIframeAPIReady;const timeout=window.setTimeout(()=>reject(new Error('Player unavailable')),15000);w.onYouTubeIframeAPIReady=()=>{previous?.();window.clearTimeout(timeout);if(w.YT)resolve(w.YT)};const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.onerror=()=>{window.clearTimeout(timeout);reject(new Error('Player unavailable'))};document.head.appendChild(script)});return apiPromise;}
export default function FeaturedPlayer(){
 const stage=useRef<HTMLElement>(null),host=useRef<HTMLDivElement>(null),panel=useRef<HTMLDivElement>(null),player=useRef<Player>(),returnFocus=useRef<HTMLElement|null>(null);
 const reduceMotion=useReducedMotion();
 const {scrollYProgress}=useScroll({target:stage,offset:['start end','end end']});
 const lidAngle=useTransform(scrollYProgress,[0,.6],[reduceMotion?0:76,0]);
 const deviceScale=useTransform(scrollYProgress,[0,.62],[reduceMotion?1:.7,1]);
 const deviceY=useTransform(scrollYProgress,[0,.62],[reduceMotion?0:100,0]);
 const desktopOpacity=useTransform(scrollYProgress,[.3,.58],[0,1]);
 const appScale=useTransform(scrollYProgress,[.6,.82],[.08,1]);
 const appY=useTransform(scrollYProgress,[.6,.82],[170,0]);
 const appOpacity=useTransform(scrollYProgress,[.58,.7],[0,1]);
 const [opened,setOpened]=useState(Boolean(reduceMotion));
 const [started,setStarted]=useState(false),[ready,setReady]=useState(false),[playing,setPlaying]=useState(false),[expanded,setExpanded]=useState(false),[failed,setFailed]=useState(false),[time,setTime]=useState(0),[duration,setDuration]=useState(0);
 useMotionValueEvent(scrollYProgress,'change',latest=>setOpened(latest>.77||Boolean(reduceMotion)));
 useEffect(()=>{if(!started)return;let disposed=false;let timer:ReturnType<typeof setInterval>|undefined;
 loadAPI().then(api=>{if(disposed||!host.current)return;const mount=document.createElement('div');host.current.appendChild(mount);player.current=new api.Player(mount,{host:'https://www.youtube-nocookie.com',videoId:'CKRGb22UZQA',width:'100%',height:'100%',playerVars:{playsinline:1,controls:1,rel:0,origin:window.location.origin},events:{onReady:()=>{if(disposed)return;setReady(true);player.current?.playVideo();timer=setInterval(()=>{const p=player.current;if(!p)return;setTime(p.getCurrentTime()||0);setDuration(p.getDuration()||0)},100)},onStateChange:(e:{data:number})=>{if(!disposed)setPlaying(e.data===1)},onError:()=>{if(!disposed)setFailed(true)}}})}).catch(()=>{if(!disposed)setFailed(true)});
 return()=>{disposed=true;clearInterval(timer);player.current?.destroy();player.current=undefined;};},[started]);
 // Expand the existing element without reparenting its iframe (which would reload it).
 function expand(){returnFocus.current=document.activeElement as HTMLElement;setStarted(true);setExpanded(true);player.current?.playVideo();}
 function collapse(){setExpanded(false);player.current?.pauseVideo();setPlaying(false);requestAnimationFrame(()=>returnFocus.current?.focus());}
 useEffect(()=>{if(!expanded)return;const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';const container=panel.current;const rest=Array.from(document.querySelectorAll<HTMLElement>('.navigation,footer,.hero-meta,.hero h1,.hero-intro,.synced-timeline,.discipline-strip,main>.section'));const previous=rest.map(el=>el.inert);rest.forEach(el=>el.inert=true);container?.querySelector<HTMLButtonElement>('.close-film')?.focus();function key(e:KeyboardEvent){if(e.key==='Escape'){e.preventDefault();collapse();}if(e.key==='Tab'&&container){const focusable=Array.from(container.querySelectorAll<HTMLElement>('button,a,iframe')).filter(el=>!el.hasAttribute('disabled'));const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}}document.addEventListener('keydown',key);return()=>{document.body.style.overflow=oldOverflow;rest.forEach((el,i)=>el.inert=previous[i]);document.removeEventListener('keydown',key)}},[expanded]);
 function toggle(){if(!started){setStarted(true);return;}if(playing)player.current?.pauseVideo();else player.current?.playVideo();}
 const progress=duration?Math.min(100,time/duration*100):0;
 const stamp=(value:number)=>`${String(Math.floor(value/60)).padStart(2,'0')}:${String(Math.floor(value%60)).padStart(2,'0')}`;
 const playerError=failed?<p className="player-message" role="alert">Playback is unavailable. <a href="https://www.youtube.com/watch?v=CKRGb22UZQA" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></p>:null;
 return <section className="spotlight-scroll" ref={stage} aria-label="Motion Reel 2026 spotlight">
  {expanded&&<div className="featured-backdrop" onClick={collapse} aria-hidden="true"/>}
  <div className="spotlight-sticky">
   <div className="spotlight-heading wrap"><span className="eyebrow">IN THE SPOTLIGHT</span><span className="mono">SCROLL / OPEN / PLAY</span></div>
   <motion.div className="device-scene" style={{scale:deviceScale,y:deviceY}}>
    <div className="stone-plinth" aria-hidden="true"/>
    <motion.div className="macbook-lid" style={{rotateX:lidAngle}}>
     <div className="macbook-screen">
      <motion.div className="mac-desktop" style={{opacity:desktopOpacity}}>
       <div className="mac-menu" aria-hidden="true"><span>● ● ●</span><span>HalftoneMotion&nbsp;&nbsp; 10:24</span></div>
       <motion.div className="mac-app" style={expanded?undefined:{scale:appScale,y:appY,opacity:appOpacity}}>
        <div className={`hero-feature ${expanded?'is-expanded':''}`} ref={panel} role={expanded?'dialog':undefined} aria-modal={expanded?true:undefined} aria-label={expanded?'Motion Reel 2026 playback':undefined}>
         {expanded&&<button className="close-film" aria-label="Close video" onClick={collapse}><X/></button>}
         <div className="mac-window-bar" aria-hidden="true"><span><i/><i/><i/></span><b>MOTION REEL 2026</b></div>
         <div className={`film hero-film featured-inline ${started?'has-started':''}`}><VideoThumbnail id="CKRGb22UZQA" title="Motion Reel 2026" eager/><div className="inline-mount"><div className="youtube-host" ref={host}/></div>{!started&&<><span className="film-shade"/><button className="play-circle" onClick={toggle} disabled={!opened} aria-label="Play Motion Reel 2026 inline"><Play size={24} fill="currentColor"/></button></>}{started&&!ready&&!failed&&<span className="player-message" role="status">Loading film…</span>}{playerError}</div>
         <div className="featured-caption"><span>Motion Reel 2026</span>{expanded?<a href="https://www.youtube.com/watch?v=CKRGb22UZQA" target="_blank" rel="noreferrer" className="text-link mono">WATCH ON YOUTUBE <ArrowUpRight size={16}/></a>:<button onClick={expand} className="text-link mono">WATCH PROJECT <ArrowUpRight size={16}/></button>}</div>
        </div>
       </motion.div>
       <div className="mac-dock" aria-hidden="true"><span/><span>H</span><span/><span/></div>
      </motion.div>
     </div>
    </motion.div>
    <div className="macbook-base" aria-hidden="true"><i/></div>
   </motion.div>
   <div className="timeline synced-timeline wrap"><button className="timeline-toggle" onClick={toggle} disabled={!opened||(started&&!ready)} aria-label={playing?'Pause video':'Play video'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button><div className="timeline-label mono">MOTION REEL 2026</div><div className="timeline-track"><span className="timeline-clip">IDEA</span><span className="timeline-clip">DESIGN</span><span className="timeline-clip lime">MOTION</span><i style={{left:`${progress}%`}}/><input type="range" min="0" max={duration||1} step="0.1" value={Math.min(time,duration||1)} disabled={!ready||!duration} aria-label="Seek featured video" aria-valuetext={`${stamp(time)} of ${stamp(duration)}`} onChange={e=>{const value=Number(e.target.value);player.current?.seekTo(value,true);setTime(value)}}/></div><span className="mono playback-time">{stamp(time)} / {stamp(duration)}</span></div>
  </div>
 </section>;
}

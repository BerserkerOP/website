'use client';
import {useEffect,useState} from 'react';
import {useTheme} from 'next-themes';
import {Moon,Sun} from 'lucide-react';

export default function AppearanceToggle(){
  const {resolvedTheme,setTheme}=useTheme();
  const [mounted,setMounted]=useState(false);
  useEffect(()=>setMounted(true),[]);
  const dark=mounted&&resolvedTheme==='dark';
  const changeTheme=()=>{
    const root=document.documentElement;
    root.classList.add('theme-changing');
    setTheme(dark?'light':'dark');
    requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('theme-changing')));
  };
  return <button className="appearance-toggle" type="button" disabled={!mounted} aria-label={dark?'Switch to light theme':'Switch to dark theme'} title={dark?'Light theme':'Dark theme'} onClick={changeTheme}><span key={dark?'sun':'moon'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</span></button>;
}

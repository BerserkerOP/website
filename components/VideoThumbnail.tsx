'use client';
import {useState} from 'react';
/** Prefer native 16:9 artwork; fall back when YouTube has no high-resolution still. */
export default function VideoThumbnail({id,title,eager=false}:{id:string;title:string;eager?:boolean}){
 const [quality,setQuality]=useState(0);
 const variants=['maxresdefault','sddefault','hqdefault'];
 const fallback=()=>setQuality(q=>Math.min(q+1,variants.length-1));
 return <img className={quality>0?'thumbnail-fallback':''} src={`https://i.ytimg.com/vi/${id}/${variants[quality]}.jpg`} alt={`${title} video thumbnail`} loading={eager?'eager':'lazy'} decoding="async" onError={fallback} onLoad={e=>{if(e.currentTarget.naturalWidth<200&&quality<2)fallback()}}/>;
}

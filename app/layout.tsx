import './globals.css';
import {EdgeBlur} from '@/components/Atmosphere';
import type {Metadata} from 'next';
import {Navigation,Footer} from '@/components/Studio';
import {ThemeProvider} from '@/components/ThemeProvider';
import {FirstVisitIntro,PageExperience,SmoothScroll} from '@/components/PageExperience';
export const metadata:Metadata={metadataBase:new URL('https://halftonemotion.studio'),openGraph:{title:'HalftoneMotion',siteName:'HalftoneMotion',type:'website'},twitter:{card:'summary_large_image',title:'HalftoneMotion'},title:{default:'HalftoneMotion',template:'%s · HalftoneMotion'},description:'Independent motion designer crafting product films, SaaS explainers, and kinetic typography. From first thought to final frame.',icons:{icon:'/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="halftone-theme"><SmoothScroll/><FirstVisitIntro/><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main"><PageExperience>{children}</PageExperience></main><Footer/><EdgeBlur/></ThemeProvider></body></html>}

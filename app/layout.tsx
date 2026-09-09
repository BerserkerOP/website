import './globals.css';
import type {Metadata} from 'next';
import {Navigation,Footer} from '@/components/Studio';
import {ThemeProvider} from '@/components/ThemeProvider';
import {FirstVisitIntro,PageExperience} from '@/components/PageExperience';
export const metadata:Metadata={title:{default:'HalftoneMotion · Motion by Atharv',template:'%s · HalftoneMotion'},description:'Independent motion designer crafting product films, SaaS explainers, and kinetic typography. From first thought to final frame.',icons:{icon:'/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="halftone-theme"><FirstVisitIntro/><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main"><PageExperience>{children}</PageExperience></main><Footer/></ThemeProvider></body></html>}

import './globals.css';
import type {Metadata} from 'next';
import {Navigation,Footer} from '@/components/Studio';
export const metadata:Metadata={title:{default:'HalftoneMotion · Motion by Atharv',template:'%s · HalftoneMotion'},description:'Independent motion designer crafting product films, SaaS explainers, and kinetic typography. From first thought to final frame.',icons:{icon:'/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation/><main id="main">{children}</main><Footer/></body></html>}

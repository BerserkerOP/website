import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import { ThemeProvider } from '@/components/ThemeProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HalftoneMotion',
  description: 'Next-Level Motion Design Portfolio',
  icons: {
    icon: '/profile.jpg',
    shortcut: '/profile.jpg',
    apple: '/profile.jpg',
  },
  openGraph: {
    title: 'HalftoneMotion',
    description: 'Next-Level Motion Design Portfolio',
    siteName: 'HalftoneMotion',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HalftoneMotion Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HalftoneMotion',
    description: 'Next-Level Motion Design Portfolio',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-apple-bg text-apple-text selection:bg-apple-blue/20 relative select-none`}>
        {/* Global Dot Grid Background */}
        <div 
          className="fixed inset-0 pointer-events-none -z-10 transform-gpu" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, var(--dot-color) 2px, transparent 2px)', 
            backgroundSize: '24px 24px',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        ></div>
        
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ContactModal />
        </ThemeProvider>
      </body>
    </html>
  )
}

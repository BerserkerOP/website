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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-apple-bg text-apple-text selection:bg-apple-blue/20 relative`}>
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

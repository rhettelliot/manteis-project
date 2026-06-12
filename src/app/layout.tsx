import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Manteis Project',
  description: 'Ambient. Experimental. Signal processing as sound architecture. Manteis Recordings.',
  metadataBase: new URL('https://themanteisproject.com'),
  openGraph: {
    title: 'The Manteis Project',
    description: 'Ambient / Experimental — Manteis Recordings',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'The Manteis Project — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Manteis Project',
    description: 'Ambient / Experimental — Manteis Recordings',
    images: ['/og.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-void text-light antialiased">
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#007AFF', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            The Manteis Project is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        <div className="scan-overlay" />
        {children}
      </body>
    </html>
  )
}